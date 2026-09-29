import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { getUserDashboard } from "@/lib/users.functions";
import { withOverall } from "@/lib/scoring";
import { ArrowLeft, Music2, Film, Tv, Heart, UserCircle } from "@/lib/icons";
import { CATEGORY_ICONS, CategoryIconName } from "@/lib/category-icons";
import { MusicPlayer } from "@/components/music-player";
import { ItemNavigator, useItemSequence } from "@/components/item-navigator";

// Read-only view of another member's game or movie/series.
// Not nested under /users/$userId (trailing "_"), so it renders on its own page.
export const Route = createFileRoute("/_authenticated/users/$userId_/$kind/$itemId")({
  beforeLoad: ({ params }) => {
    if (params.kind !== "games" && params.kind !== "media") throw notFound();
  },
  head: () => ({ meta: [{ title: "Member rating" }] }),
  component: MemberItemDetail,
});

type Item = {
  id: string;
  title: string;
  cover_url: string | null;
  release_date: string | null;
  music_url: string | null;
  music_start: number | null;
  hours_played?: number | null;
  media_type?: "movie" | "series";
};

/* ─── Page ────────────────────────────────────────────────────────── */

function MemberItemDetail() {
  const { userId, kind, itemId } = Route.useParams();
  const isGames = kind === "games";
  const idKey = isGames ? "game_id" : "media_id";

  const fetchUserDashboard = useServerFn(getUserDashboard);
  const query = useQuery({
    queryKey: ["user-dashboard", userId],
    queryFn: () => fetchUserDashboard({ data: { userId } }),
  });

  const lib = useMemo(() => {
    if (!query.data) return null;
    const src = isGames ? query.data.games : query.data.media;
    return {
      items: (isGames ? query.data.games.games : query.data.media.media) as Item[],
      ratings: src.ratings as { category_id: string; score: number | string; [k: string]: any }[],
      categories: src.categories,
      favoriteIds: src.favoriteIds,
    };
  }, [query.data, isGames]);

  const allWithOverall = useMemo(
    () => (lib ? withOverall(lib.items, lib.ratings as any, lib.categories, idKey) : []),
    [lib, idKey],
  );

  const item = allWithOverall.find((x) => x.id === itemId) ?? null;
  const overall = item?.overall ?? null;

  const neighbors = useMemo(() => {
    if (overall === null) return { above: [], below: [] };
    const others = allWithOverall
      .filter((x) => x.overall !== null && x.id !== itemId)
      .sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0));
    const above = others.filter((x) => (x.overall ?? 0) > overall).slice(-3).reverse();
    const below = others.filter((x) => (x.overall ?? 0) < overall).slice(0, 3);
    return { above, below };
  }, [allWithOverall, overall, itemId]);

  const navigate = useNavigate();
  const scoreOrder = useMemo(
    () =>
      [...allWithOverall]
        .sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1) || a.title.localeCompare(b.title))
        .map((x) => x.id),
    [allWithOverall],
  );
  const sequence = useItemSequence(isGames ? "user-games" : "user-media", itemId, lib?.items ?? [], scoreOrder);
  const goTo = useCallback(
    (id: string) =>
      navigate({ to: "/users/$userId/$kind/$itemId", params: { userId, kind, itemId: id }, replace: true }),
    [navigate, userId, kind],
  );

  if (query.isLoading) return <DetailSkeleton />;

  if (query.isError || !query.data || !lib || !item) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <UserCircle className="h-12 w-12 text-muted-foreground/30" />
        <p className="font-semibold">{isGames ? "Game" : "Title"} not found</p>
        <Link
          to="/users/$userId"
          params={{ userId }}
          search={{ tab: isGames ? undefined : "media" }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to profile
        </Link>
      </div>
    );
  }

  const { user } = query.data;
  const ownerName = user.display_name || "Player";
  const itemRatings = lib.ratings.filter((r) => r[idKey] === itemId);
  const isFavorite = lib.favoriteIds.includes(itemId);
  const TypeIcon = item.media_type === "series" ? Tv : Film;
  const kindLabel = isGames ? "Game" : item.media_type === "series" ? "Series" : "Movie";

  return (
    <motion.div key={itemId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Blurred backdrop */}
        {item.cover_url && (
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${item.cover_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(40px) saturate(1.4)",
              opacity: 0.35,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          <ItemNavigator {...sequence} onNavigate={goTo} />
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background/95 px-4 text-sm font-medium text-foreground shadow-md backdrop-blur transition-all hover:shadow-lg hover:bg-accent hover:text-accent-foreground group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to {ownerName}</span>
          </button>
        </div>

        {/* Hero content */}
        <div className="relative flex gap-6 p-6 sm:p-8 md:gap-8">
          {/* Cover */}
          <div className="shrink-0">
            <div className="w-28 sm:w-36 md:w-44 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
              {item.cover_url ? (
                <img src={item.cover_url} alt={item.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/30 to-muted">
                  {isGames
                    ? <Music2 className="h-10 w-10 text-muted-foreground/50" />
                    : <TypeIcon className="h-10 w-10 text-muted-foreground/50" />}
                </div>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-col justify-end gap-3 py-2 min-w-0">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-1.5">
                {!isGames && <TypeIcon className="h-3 w-3" />}
                {kindLabel}
                {isFavorite && <Heart className="ml-1 h-3 w-3 fill-red-400 text-red-400" />}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight line-clamp-2">
                {item.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {item.release_date && (
                <span>{new Date(item.release_date).getFullYear()}</span>
              )}
              {item.hours_played != null && (
                <>
                  <span className="h-3 w-px bg-border/60" />
                  <span>{Number(item.hours_played)}h played</span>
                </>
              )}
              {overall !== null && (
                <>
                  <span className="h-3 w-px bg-border/60" />
                  <span className="flex items-center gap-1.5">
                    <span className="text-2xl font-bold tabular-nums text-foreground">{overall.toFixed(1)}</span>
                    <span className="text-xs">/ 10</span>
                  </span>
                </>
              )}
            </div>

            {/* Rank context */}
            {(neighbors.above.length > 0 || neighbors.below.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {neighbors.above.slice(0, 2).map((x) => (
                  <button key={x.id} type="button" onClick={() => goTo(x.id)} className="inline-flex items-center gap-1 rounded-full bg-muted/50 border border-border/40 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                    <span className="text-[10px] opacity-60">↑</span>
                    <span className="truncate max-w-[80px]">{x.title}</span>
                    <span className="font-mono opacity-70">{x.overall?.toFixed(1)}</span>
                  </button>
                ))}
                {neighbors.below.slice(0, 2).map((x) => (
                  <button key={x.id} type="button" onClick={() => goTo(x.id)} className="inline-flex items-center gap-1 rounded-full bg-muted/30 border border-border/30 px-2.5 py-0.5 text-xs text-muted-foreground/60 transition-colors hover:border-primary/40 hover:text-foreground">
                    <span className="text-[10px] opacity-60">↓</span>
                    <span className="truncate max-w-[80px]">{x.title}</span>
                    <span className="font-mono opacity-60">{x.overall?.toFixed(1)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">

        {/* Left — owner */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border/50 bg-card px-4 py-3 space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">Rated by</p>
            <Link
              to="/users/$userId"
              params={{ userId }}
              search={{ tab: isGames ? undefined : "media" }}
              className="block truncate text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {ownerName}
            </Link>
            <p className="text-xs text-muted-foreground">
              {itemRatings.length} / {lib.categories.length} categories rated
            </p>
          </div>
        </div>

        {/* Right — ratings */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Ratings
          </h2>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {lib.categories.map((cat) => {
              const r = itemRatings.find((x) => x.category_id === cat.id);
              return (
                <ReadOnlyRatingRow
                  key={cat.id}
                  categoryName={cat.name}
                  icon={cat.icon}
                  isDefault={!!cat.is_default}
                  score={r ? Number(r.score) : null}
                  coefficient={Number(cat.coefficient ?? 1)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Music player (no remove button: it's not ours) */}
      {item.music_url && (
        <MusicPlayer
          key={`${item.id}:${item.music_url}:${item.music_start ?? 0}`}
          url={item.music_url}
          start={item.music_start}
          title={item.title}
        />
      )}
    </motion.div>
  );
}

/* ─── Detail skeleton ─────────────────────────────────────────────── */

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-28 rounded-full bg-muted/40 animate-pulse" />
      <div className="rounded-2xl bg-muted/20 animate-pulse h-52" />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-3">
          <div className="h-20 rounded-xl bg-muted/30 animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/20 animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Read-only rating row ────────────────────────────────────────── */

function ReadOnlyRatingRow({ categoryName, icon, isDefault, score, coefficient }: {
  categoryName: string; icon: string | null; isDefault: boolean; score: number | null; coefficient: number;
}) {
  const IconComp = icon ? CATEGORY_ICONS[icon as CategoryIconName] : null;
  const rated = score !== null;

  return (
    <div
      className={[
        "rounded-xl border p-4",
        rated ? "bg-background border-border/50" : "bg-muted/20 border-border/30 opacity-70",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          {IconComp && <IconComp className="h-4 w-4 text-primary shrink-0" />}
          <span className="font-medium text-sm truncate">{categoryName}</span>
          {!isDefault && (
            <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary">
              ×{coefficient % 1 === 0 ? String(coefficient) : coefficient.toFixed(2)}
            </span>
          )}
        </div>
        <span className="w-10 shrink-0 text-right text-xl font-bold tabular-nums">
          {rated ? score.toFixed(1) : "—"}
        </span>
      </div>

      {/* Static score bar in place of the slider */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        {rated && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score * 10}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        )}
      </div>
    </div>
  );
}
