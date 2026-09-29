import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { describeError } from "@/lib/error-message";
import {
  getRecommendations,
  type Recommendation,
} from "@/lib/recommendations.functions";
import { getSteamGameDetails, listSteamTags } from "@/lib/steam.functions";
import { createGame, listGames } from "@/lib/games.functions";
import { withOverall } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Compass,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Check,
  ChevronDown,
  Gamepad2,
  Sparkles,
  Gem,
  X,
} from "@/lib/icons";

// Must match the limits in recommendations.functions.ts
const MAX_SEEDS = 12;
const MAX_INCLUDE = 5;

type DiscoverSearch = {
  /** Games the recommendations are based on; none = automatic (top-rated games) */
  seeds?: string[];
  /** Tags every recommendation must have */
  include?: string[];
  /** Tags removed from the taste profile and from the results */
  exclude?: string[];
  maxPrice?: number;
  minReviews?: number;
  since?: number;
  deck?: "playable" | "verified";
  /** Closeness to your taste; none = balanced */
  explore?: "familiar" | "surprise";
  /** Only little-known games with near-perfect reviews */
  gems?: boolean;
};

const strings = (v: unknown) =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === "string")
    : undefined;
const num = (v: unknown) => {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
};

export const Route = createFileRoute("/_authenticated/discover")({
  validateSearch: (s: Record<string, unknown>): DiscoverSearch => ({
    seeds: strings(s.seeds),
    include: strings(s.include),
    exclude: strings(s.exclude),
    maxPrice: num(s.maxPrice),
    minReviews: num(s.minReviews),
    since: num(s.since),
    deck: s.deck === "playable" || s.deck === "verified" ? s.deck : undefined,
    explore:
      s.explore === "familiar" || s.explore === "surprise"
        ? s.explore
        : undefined,
    gems: s.gems === true || s.gems === "true" ? true : undefined,
  }),
  head: () => ({ meta: [{ title: "Discover" }] }),
  component: DiscoverPage,
});

const ANY = "any";
const toNumber = (v: string | undefined) =>
  v === undefined ? undefined : Number(v);
const THIS_YEAR = new Date().getFullYear();
const PRICE_OPTIONS = [
  { value: ANY, label: "Any price" },
  { value: "0", label: "Free" },
  { value: "5", label: "Under $5" },
  { value: "10", label: "Under $10" },
  { value: "20", label: "Under $20" },
  { value: "40", label: "Under $40" },
];
const REVIEW_OPTIONS = [
  { value: ANY, label: "500+ reviews" },
  { value: "2000", label: "2k+ reviews" },
  { value: "10000", label: "10k+ reviews" },
  { value: "50000", label: "50k+ reviews" },
];
const YEAR_OPTIONS = [
  { value: ANY, label: "Any year" },
  ...[1, 3, 5, 10].map((n) => ({
    value: String(THIS_YEAR - n),
    label: `Since ${THIS_YEAR - n}`,
  })),
];
const EXPLORE_OPTIONS = [
  {
    value: "familiar",
    label: "Familiar",
    hint: "Games sharing several tags with yours",
  },
  { value: undefined, label: "Balanced", hint: "The usual mix" },
  {
    value: "surprise",
    label: "Surprise me",
    hint: "Games sharing a single tag with yours, reshuffled on every refresh",
  },
] as const;
// Must match GEM_MAX_REVIEWS in recommendations.functions.ts
const GEM_MAX_REVIEWS_LABEL = "5k";
const DECK_OPTIONS = [
  { value: ANY, label: "Any device" },
  { value: "playable", label: "Deck playable" },
  { value: "verified", label: "Deck verified" },
];

function DiscoverPage() {
  const search = Route.useSearch();
  const {
    seeds = [],
    include = [],
    exclude = [],
    maxPrice,
    minReviews,
    since,
    deck,
    explore,
    gems,
  } = search;
  const navigate = useNavigate({ from: Route.fullPath });
  const update = (patch: Partial<DiscoverSearch>) =>
    navigate({
      search: (prev) => {
        const next = { ...prev, ...patch };
        // Keep the URL clean: empty lists mean "no filter"
        for (const k of ["seeds", "include", "exclude"] as const)
          if (next[k]?.length === 0) next[k] = undefined;
        return next;
      },
      replace: true,
    });

  const includeTag = (t: string) =>
    update({
      include: include.includes(t) ? include : [...include, t],
      exclude: exclude.filter((x) => x !== t),
    });
  const excludeTag = (t: string) =>
    update({
      exclude: exclude.includes(t) ? exclude : [...exclude, t],
      include: include.filter((x) => x !== t),
    });
  const hasFilters =
    include.length > 0 ||
    exclude.length > 0 ||
    maxPrice !== undefined ||
    minReviews !== undefined ||
    since !== undefined ||
    deck !== undefined ||
    gems !== undefined;
  const resetFilters = () =>
    update({
      include: undefined,
      exclude: undefined,
      maxPrice: undefined,
      minReviews: undefined,
      since: undefined,
      deck: undefined,
      gems: undefined,
    });

  const get = useServerFn(getRecommendations);
  const query = useQuery({
    queryKey: ["recommendations", search],
    queryFn: () =>
      get({
        data: {
          seedIds: seeds,
          include,
          exclude,
          maxPrice,
          minReviews,
          since,
          deck,
          explore,
          gems,
        },
      }),
    staleTime: 60 * 60_000,
    retry: false,
    // Keep the current results on screen while a filter change is computed
    placeholderData: keepPreviousData,
  });
  const updating = query.isFetching && query.isPlaceholderData;
  const [added, setAdded] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/60 select-none">
            Recommendations
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-none">
            Discover
          </h1>
          {query.data && query.data.basedOn.length > 0 && (
            <p className="pt-2 text-xs text-muted-foreground max-w-2xl">
              Based on{" "}
              <span className="text-foreground">
                {query.data.basedOn.slice(0, 5).join(", ")}
              </span>
              {query.data.basedOn.length > 5 &&
                ` and ${query.data.basedOn.length - 5} more`}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {include.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  update({ include: include.filter((x) => x !== t) })
                }
                title="Required tag — click to remove"
                className="group inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground"
              >
                <Check className="h-3 w-3" />
                {t}
                <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
              </button>
            ))}
            {(query.data?.tags ?? [])
              .filter((t) => !include.includes(t))
              .map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => excludeTag(t)}
                  title="Hide games with this tag"
                  className="group inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  {t}
                  <X className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            {exclude.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  update({ exclude: exclude.filter((x) => x !== t) })
                }
                title="Excluded — click to allow this tag again"
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground line-through decoration-destructive/70 transition-colors hover:text-foreground"
              >
                {t}
              </button>
            ))}
            <TagPicker
              disabled={include.length >= MAX_INCLUDE}
              selected={include}
              onPick={includeTag}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SeedPicker
            value={seeds}
            onChange={(next) => update({ seeds: next })}
          />
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => query.refetch()}
            disabled={query.isFetching}
          >
            <RefreshCw
              className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`}
            />
            {explore === "surprise" ? "Shuffle" : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div
          role="radiogroup"
          aria-label="How close to your taste"
          className="inline-flex h-8 items-center rounded-md border border-border/50 bg-muted/30 p-0.5"
        >
          {EXPLORE_OPTIONS.map((o) => {
            const active = explore === o.value;
            return (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={active}
                title={o.hint}
                onClick={() => update({ explore: o.value })}
                className={cn(
                  "inline-flex h-full items-center gap-1.5 rounded px-2.5 text-xs transition-colors",
                  active
                    ? "bg-background font-medium text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {o.value === "surprise" && <Sparkles className="h-3.5 w-3.5" />}
                {o.label}
              </button>
            );
          })}
        </div>
        <span className="mx-1 hidden h-5 w-px bg-border/60 sm:block" />
        <FilterSelect
          value={maxPrice}
          options={PRICE_OPTIONS}
          onChange={(v) => update({ maxPrice: toNumber(v) })}
        />
        <button
          type="button"
          aria-pressed={!!gems}
          onClick={() => update({ gems: gems ? undefined : true })}
          title={`Little-known games (under ${GEM_MAX_REVIEWS_LABEL} reviews) with 95%+ positive reviews`}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs transition-colors",
            gems
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border/50 bg-muted/30 text-muted-foreground hover:text-foreground",
          )}
        >
          <Gem className="h-3.5 w-3.5" />
          Hidden gems
        </button>
        {/* Gems set their own review range */}
        {!gems && (
          <FilterSelect
            value={minReviews}
            options={REVIEW_OPTIONS}
            onChange={(v) => update({ minReviews: toNumber(v) })}
          />
        )}
        <FilterSelect
          value={since}
          options={YEAR_OPTIONS}
          onChange={(v) => update({ since: toNumber(v) })}
        />
        <FilterSelect
          value={deck}
          options={DECK_OPTIONS}
          onChange={(v) =>
            update({ deck: v as DiscoverSearch["deck"] | undefined })
          }
        />
        {hasFilters && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1.5 text-xs text-muted-foreground"
            onClick={resetFilters}
          >
            <X className="h-3.5 w-3.5" />
            Reset filters
          </Button>
        )}
        {updating && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Updating…
          </span>
        )}
      </div>

      {query.isLoading ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center text-sm text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Analysing your library…</p>
          <p className="text-xs opacity-70">
            The first time can take up to ~30 seconds while game tags are
            fetched.
          </p>
        </div>
      ) : query.isError ? (
        <p className="py-24 text-center text-sm text-muted-foreground">
          Couldn't compute recommendations right now (
          {query.error instanceof Error ? query.error.message : "error"}).
        </p>
      ) : !query.data || query.data.recommendations.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <Compass className="h-8 w-8 text-muted-foreground/50" />
          {hasFilters ? (
            <>
              <p className="font-semibold">No game matches these filters</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try loosening a filter or removing a required tag.
              </p>
              <Button size="sm" variant="outline" onClick={resetFilters}>
                Reset filters
              </Button>
            </>
          ) : seeds.length > 0 ? (
            <>
              <p className="font-semibold">Nothing similar found</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Recommendations are built from Steam tags — make sure the
                selected games exist on Steam, or pick other ones.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold">Nothing to recommend yet</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Rate a few games you liked — recommendations are built from the Steam tags of your favourite
                games.
              </p>
            </>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 transition-opacity",
            updating && "pointer-events-none opacity-50",
          )}
        >
          {query.data.recommendations.map((r, i) => (
            <motion.div
              key={r.appId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
            >
              <RecommendationCard
                rec={r}
                // "Because you liked X" is noise when X is the only seed
                showBecause={query.data.basedOn.length > 1}
                added={added.has(r.appId)}
                onAdded={() => setAdded((s) => new Set(s).add(r.appId))}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/** A select whose "any" option clears the filter. */
function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: number | string | undefined;
  options: { value: string; label: string }[];
  onChange: (v: string | undefined) => void;
}) {
  const current = value === undefined ? ANY : String(value);
  return (
    <Select
      value={current}
      onValueChange={(v) => onChange(v === ANY ? undefined : v)}
    >
      <SelectTrigger
        className={cn(
          "h-8 w-auto min-w-[120px] gap-1.5 border-border/50 bg-muted/30 text-xs",
          current !== ANY && "border-primary/50 text-primary",
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value} className="text-xs">
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Add a required tag, from Steam's full tag list. */
function TagPicker({
  selected,
  disabled,
  onPick,
}: {
  selected: string[];
  disabled: boolean;
  onPick: (tag: string) => void;
}) {
  const list = useServerFn(listSteamTags);
  const [open, setOpen] = useState(false);
  const query = useQuery({
    queryKey: ["steam-tags"],
    queryFn: () => list(),
    staleTime: Infinity,
    // Only needed once the picker is opened
    enabled: open,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          title={
            disabled
              ? `Up to ${MAX_INCLUDE} required tags`
              : "Only show games with a given tag"
          }
          className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
        >
          <Plus className="h-3 w-3" />
          Tag
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Metroidvania, Roguelike…" />
          <CommandList className="max-h-64">
            <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">
              {query.isLoading
                ? "Loading tags…"
                : query.isError
                  ? describeError("load the Steam tags", query.error)
                  : "No tag found"}
            </CommandEmpty>
            <CommandGroup heading="Only show games tagged…">
              {(query.data ?? [])
                .filter((t) => !selected.includes(t))
                .map((t) => (
                  <CommandItem
                    key={t}
                    value={t}
                    onSelect={() => {
                      onPick(t);
                      setOpen(false);
                    }}
                    className="text-xs"
                  >
                    {t}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/** Pick the games recommendations are based on; empty = automatic. */
function SeedPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (ids: string[]) => void;
}) {
  const list = useServerFn(listGames);
  const query = useQuery({ queryKey: ["games"], queryFn: () => list() });
  const [open, setOpen] = useState(false);

  // Best-rated first: those are the games you most likely want more of
  const games = useMemo(() => {
    if (!query.data) return [];
    const { games, ratings, categories } = query.data;
    return withOverall(games, ratings, categories).sort(
      (a, b) =>
        (b.overall ?? -1) - (a.overall ?? -1) || a.title.localeCompare(b.title),
    );
  }, [query.data]);

  const selected = new Set(value);
  const toggle = (id: string) =>
    onChange(selected.has(id) ? value.filter((v) => v !== id) : [...value, id]);
  const label =
    value.length === 0
      ? "Your top games"
      : value.length === 1
        ? (games.find((g) => g.id === value[0])?.title ?? "1 game")
        : `${value.length} games`;

  return (
    <div className="flex items-center gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="max-w-64 gap-2"
            title="Games the recommendations are based on"
          >
            {value.length === 0 ? (
              <Sparkles className="h-4 w-4 shrink-0" />
            ) : (
              <Gamepad2 className="h-4 w-4 shrink-0 text-primary" />
            )}
            <span className="truncate">{label}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <Command>
            <CommandInput placeholder="Search your games…" />
            <CommandList className="max-h-72">
              <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">
                {query.isLoading ? "Loading games…" : "No game found"}
              </CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="automatic top-rated games"
                  onSelect={() => {
                    onChange([]);
                    setOpen(false);
                  }}
                  className="gap-2 text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                  <span className="flex-1">Automatic — your top-rated games</span>
                  {value.length === 0 && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  )}
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Based on…">
                {games.map((g) => {
                  const isSelected = selected.has(g.id);
                  return (
                    <CommandItem
                      key={g.id}
                      // Ids keep two games with the same title apart
                      value={`${g.title} ${g.id}`}
                      disabled={!isSelected && value.length >= MAX_SEEDS}
                      onSelect={() => toggle(g.id)}
                      className="gap-2 text-xs"
                    >
                      <div className="h-8 w-6 shrink-0 overflow-hidden rounded-sm bg-muted">
                        {g.cover_url && (
                          <img
                            src={g.cover_url}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <span className="flex-1 truncate" title={g.title}>
                        {g.title}
                      </span>
                      {g.overall !== null && (
                        <span className="shrink-0 tabular-nums text-muted-foreground">
                          {g.overall.toFixed(1)}
                        </span>
                      )}
                      <Check
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 text-primary",
                          !isSelected && "invisible",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onChange([])}
          aria-label="Back to automatic recommendations"
          title="Back to automatic recommendations"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function RecommendationCard({
  rec,
  showBecause,
  added,
  onAdded,
}: {
  rec: Recommendation;
  showBecause: boolean;
  added: boolean;
  onAdded: () => void;
}) {
  const qc = useQueryClient();
  const details = useServerFn(getSteamGameDetails);
  const create = useServerFn(createGame);
  const [cover, setCover] = useState(rec.cover);

  const add = useMutation({
    mutationFn: async () => {
      const d = await details({ data: { appId: rec.appId } }).catch(() => null);
      return create({
        data: {
          title: d?.title ?? rec.name,
          cover_url: d?.cover_url ?? rec.fallbackCover,
          release_date: d?.release_date ?? null,
          genre: d?.genre ?? null,
          platform: "PC",
          status: "backlog",
          steam_appid: rec.appId,
        },
      });
    },
    onSuccess: () => {
      toast.success(`${rec.name} added to “To play”`);
      onAdded();
      qc.invalidateQueries({ queryKey: ["games"] });
    },
    onError: (e) =>
      toast.error(describeError(`add “${rec.name}”`, e)),
  });

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
      <a
        href={`https://store.steampowered.com/app/${rec.appId}`}
        target="_blank"
        rel="noreferrer noopener"
        className="relative block aspect-[3/4] overflow-hidden bg-muted"
      >
        <img
          src={cover}
          alt={rec.name}
          loading="lazy"
          // Not every game has a portrait capsule; the header image always exists
          onError={() =>
            cover !== rec.fallbackCover && setCover(rec.fallbackCover)
          }
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {rec.price !== null && (
          <span className="absolute left-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {rec.price === 0 ? "Free" : `$${(rec.price / 100).toFixed(2)}`}
          </span>
        )}
        <span className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          {rec.positiveRatio}% 👍
        </span>
        <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </a>
      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <h3 className="line-clamp-1 text-sm font-semibold" title={rec.name}>
          {rec.name}
        </h3>
        {showBecause && rec.because.length > 0 && (
          <p className="line-clamp-2 text-[11px] text-muted-foreground">
            Because you liked{" "}
            <span className="text-foreground">{rec.because.join(" & ")}</span>
          </p>
        )}
        <div className="flex flex-wrap gap-1">
          {rec.matchedTags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <Button
          size="sm"
          variant={added ? "ghost" : "secondary"}
          className="mt-auto h-7 gap-1.5 text-xs"
          disabled={added || add.isPending}
          onClick={() => add.mutate()}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5" /> Added
            </>
          ) : add.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> To play
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
