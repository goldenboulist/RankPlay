import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserDashboard } from "@/lib/users.functions";
import { withOverall } from "@/lib/scoring";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORY_ICONS, CategoryIconName } from "@/lib/category-icons";
import { rememberSequence } from "@/components/item-navigator";
import {
  Trophy, Star, Film, Tv, Heart, Search, SlidersHorizontal,
  ArrowLeft, UserCircle, CalendarDays,
} from "@/lib/icons";

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/_authenticated/users/$userId")({
  // All optional so plain links to a profile don't have to spell out the filters
  validateSearch: (s: Record<string, unknown>): {
    tab?: "games" | "media";
    type?: "all" | "movie" | "series";
    category?: string;
    search?: string;
    sort?: string;
    favOnly?: boolean;
  } => ({
    tab: s.tab === "media" ? "media" : undefined,
    type: s.type === "movie" || s.type === "series" ? s.type : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    search: typeof s.search === "string" ? s.search : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
    favOnly: s.favOnly === true || s.favOnly === "true" || undefined,
  }),
  head: () => ({ meta: [{ title: "User Profile" }] }),
  component: UserProfilePage,
});

// ─── Avatar gradients (same logic as list page) ───────────────────────────────
const AVATAR_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-sky-500 to-indigo-600",
];

function avatarGradient(id: string) {
  let hash = 0;
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function getInitials(user: { display_name: string | null }) {
  if (user.display_name) {
    return user.display_name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return "?";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Library view (read-only variant of the Games / Media pages) ─────────────
type LibraryKind = "games" | "media";

type LibraryItem = {
  id: string;
  title: string;
  cover_url: string | null;
  release_date: string | null;
  hours_played?: number | null;
  media_type?: "movie" | "series";
};

type LibraryRating = { category_id: string; score: number | string } & Record<string, any>;

type LibraryCategory = {
  id: string;
  name: string;
  icon: string | null;
  coefficient: number | string;
  is_default?: boolean | number;
};

function LibraryView({ userId, kind, items, ratings, categories, favoriteIds }: {
  userId: string;
  kind: LibraryKind;
  items: LibraryItem[];
  ratings: LibraryRating[];
  categories: LibraryCategory[];
  favoriteIds: string[];
}) {
  const idKey = kind === "games" ? "game_id" : "media_id";
  const {
    type = "all", category: categoryFilter = "all", search = "", sort = "score_desc", favOnly = false,
  } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setFilter = (patch: Partial<ReturnType<typeof Route.useSearch>>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });
  const setType = (v: "all" | "movie" | "series") => setFilter({ type: v });
  const setSearch = (v: string) => setFilter({ search: v });
  const setCategoryFilter = (v: string) => setFilter({ category: v });
  const setSort = (v: string) => setFilter({ sort: v });
  const setFavOnly = (fn: (prev: boolean) => boolean) => setFilter({ favOnly: fn(favOnly) });

  useEffect(() => {
    const id = sessionStorage.getItem("scrollToUserItem");
    if (!id) return;
    sessionStorage.removeItem("scrollToUserItem");
    document.getElementById("item-" + id)?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  const scoreIn = (itemId: string, categoryId: string) => {
    const r = ratings.find((x) => x[idKey] === itemId && x.category_id === categoryId);
    return r ? Number(r.score) : null;
  };

  const enriched = useMemo(() => {
    const favSet = new Set(favoriteIds);
    let list = withOverall(items, ratings as any, categories, idKey).map((it) => ({
      ...it,
      isFavorite: favSet.has(it.id),
    }));
    if (kind === "media" && type !== "all") list = list.filter((m) => m.media_type === type);
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter((it) => it.title.toLowerCase().includes(s));
    }
    if (categoryFilter !== "all") list = list.filter((it) => scoreIn(it.id, categoryFilter) !== null);
    if (favOnly) list = list.filter((it) => it.isFavorite);
    list.sort((a, b) => {
      if (sort === "score_desc") {
        if (categoryFilter !== "all") {
          return (scoreIn(b.id, categoryFilter) ?? -1) - (scoreIn(a.id, categoryFilter) ?? -1);
        }
        return (b.overall ?? -1) - (a.overall ?? -1);
      }
      if (sort === "score_asc") {
        if (categoryFilter !== "all") {
          return (scoreIn(a.id, categoryFilter) ?? 11) - (scoreIn(b.id, categoryFilter) ?? 11);
        }
        return (a.overall ?? 11) - (b.overall ?? 11);
      }
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "release") return (b.release_date ?? "").localeCompare(a.release_date ?? "");
      return 0;
    });
    return list;
  }, [items, ratings, categories, favoriteIds, kind, type, search, categoryFilter, sort, favOnly]);

  // Detail pages navigate prev/next in the order currently shown here
  useEffect(() => {
    rememberSequence(kind === "games" ? "user-games" : "user-media", enriched.map((it) => it.id));
  }, [enriched, kind]);

  const openItem = (itemId: string) => {
    sessionStorage.setItem("scrollToUserItem", itemId);
    navigate({ to: "/users/$userId/$kind/$itemId", params: { userId, kind, itemId } });
  };

  const hasFilters = !!(search || categoryFilter !== "all" || favOnly || (kind === "media" && type !== "all"));
  const activeCategoryName = categories.find((c) => c.id === categoryFilter)?.name ?? null;
  const noun = kind === "games"
    ? (enriched.length === 1 ? "game" : "games")
    : (enriched.length === 1 ? "title" : "titles");

  return (
    <div className="space-y-8">
      {/* ── Filter toolbar ── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles…"
            className="pl-9 h-9 text-sm bg-muted/30 border-border/50 focus:bg-background"
          />
        </div>

        {/* Type switch chips */}
        {kind === "media" && (
          <div className="flex items-center gap-2">
            {(["all", "movie", "series"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={[
                  "inline-flex items-center gap-1.5 h-8 px-4 rounded-full text-xs font-medium transition-colors",
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {t === "all" && <Star className="h-3.5 w-3.5" />}
                {t === "movie" && <Film className="h-3.5 w-3.5" />}
                {t === "series" && <Tv className="h-3.5 w-3.5" />}
                {t === "all" ? "All" : t === "movie" ? "Movies" : "Series"}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Category filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-9 w-auto min-w-[140px] text-sm gap-1.5 bg-muted/30 border-border/50">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.filter((c) => !c.is_default).map((c) => {
                const Icon = c.icon && CATEGORY_ICONS[c.icon as CategoryIconName];
                return (
                  <SelectItem key={c.id} value={c.id}>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{c.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-9 w-auto min-w-[180px] text-sm bg-muted/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score_desc">
                {categoryFilter === "all" ? "Score: High → Low" : "Category: High → Low"}
              </SelectItem>
              <SelectItem value="score_asc">
                {categoryFilter === "all" ? "Score: Low → High" : "Category: Low → High"}
              </SelectItem>
              <SelectItem value="title">Title (A–Z)</SelectItem>
              <SelectItem value="release">Newest release</SelectItem>
            </SelectContent>
          </Select>

          {/* Favorites toggle */}
          <button
            onClick={() => setFavOnly((v) => !v)}
            className={[
              "inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium transition-colors",
              favOnly
                ? "bg-primary text-primary-foreground"
                : "bg-muted/30 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/60",
            ].join(" ")}
          >
            <Heart className={`h-3.5 w-3.5 ${favOnly ? "fill-current" : ""}`} />
            Favorites
          </button>
        </div>
      </div>

      {/* ── Active filter context label ── */}
      {hasFilters && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground -mt-4"
        >
          Showing <span className="text-foreground font-medium">{enriched.length}</span> {noun}
          {search && <> matching <span className="text-foreground font-medium">"{search}"</span></>}
          {categoryFilter !== "all" && (
            <> in <span className="text-foreground font-medium">{activeCategoryName}</span></>
          )}
          {kind === "media" && type !== "all" && <> · {type === "movie" ? "movies" : "series"} only</>}
          {favOnly && <> · favorites only</>}
        </motion.p>
      )}

      {/* ── Grid / Empty ── */}
      {enriched.length === 0 ? (
        <EmptyState hasFilters={hasFilters} kind={kind} />
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          <AnimatePresence mode="popLayout">
            {enriched.map((it, i) => (
              <motion.div
                layout
                key={it.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.018, 0.28) }}
              >
                <div id={"item-" + it.id}>
                  <LibraryCard
                    item={it}
                    categoryScore={categoryFilter !== "all" ? scoreIn(it.id, categoryFilter) : undefined}
                    categoryName={activeCategoryName}
                    onOpen={() => openItem(it.id)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ hasFilters, kind }: { hasFilters: boolean; kind: LibraryKind }) {
  const noun = kind === "games" ? "games" : "titles";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-4"
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-2xl bg-muted/50 rotate-6" />
        <div className="absolute inset-0 rounded-2xl bg-muted/30 -rotate-3" />
        <div className="relative grid place-items-center h-full rounded-2xl bg-muted/60 border border-border/40">
          <Star className="h-6 w-6 text-muted-foreground/60" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-foreground">
          {hasFilters ? `No ${noun} match your filters` : "This library is empty"}
        </p>
        <p className="text-sm text-muted-foreground max-w-[240px]">
          {hasFilters
            ? "Try adjusting your search or filters to find what you're looking for."
            : `This user hasn't added any ${noun} yet.`}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Library card (read-only: no favorite toggle, no delete) ─────────────────
// categoryScore: undefined = no category filter, null = filtered but unrated
function LibraryCard({ item, categoryScore, categoryName, onOpen }: {
  item: LibraryItem & { overall: number | null; isFavorite: boolean };
  categoryScore: number | null | undefined;
  categoryName: string | null;
  onOpen: () => void;
}) {
  const TypeIcon = item.media_type === "series" ? Tv : item.media_type === "movie" ? Film : Star;
  const filtered = categoryScore !== undefined;

  return (
    <div onClick={onOpen} className="group relative block overflow-hidden rounded-xl cursor-pointer">
      {/* Cover art */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {item.cover_url ? (
          <img
            src={item.cover_url}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-muted to-muted/60">
            <TypeIcon className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" />

        {/* Media type indicator badge */}
        {item.media_type && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/90">
            <TypeIcon className="h-3 w-3" />
            {item.media_type === "series" ? "Series" : "Movie"}
          </div>
        )}

        {/* Favorite indicator */}
        {item.isFavorite && (
          <div className="absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 pointer-events-none">
            <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" />
          </div>
        )}

        {/* Overall score badge */}
        {item.overall !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className={[
              "absolute bottom-2 left-2 h-10 w-10 grid place-items-center rounded-full",
              "bg-primary text-primary-foreground font-bold text-sm",
              "shadow-lg ring-2 ring-black/20",
              filtered ? "opacity-60 scale-90" : "",
            ].join(" ")}
          >
            {item.overall.toFixed(1)}
          </motion.div>
        )}

        {/* Category score badge */}
        {filtered && categoryScore !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground px-2 py-1 shadow-lg ring-1 ring-black/20 min-w-[44px]"
          >
            <span className="text-[9px] font-medium leading-none opacity-75 truncate max-w-[52px]">
              {categoryName}
            </span>
            <span className="text-sm font-bold leading-snug">{categoryScore.toFixed(1)}</span>
          </motion.div>
        )}

        {filtered && categoryScore === null && (
          <div className="absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white/50 px-2 py-1 ring-1 ring-white/10 min-w-[44px]">
            <span className="text-[9px] font-medium leading-none truncate max-w-[52px]">
              {categoryName}
            </span>
            <span className="text-sm font-bold leading-snug">—</span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-1 pt-2 pb-1">
        <h3 className="line-clamp-1 text-sm font-semibold leading-tight" title={item.title}>
          {item.title}
        </h3>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {item.release_date ? new Date(item.release_date).getFullYear() : "—"}
          </span>
          {item.hours_played != null && (
            <span className="text-[11px] text-muted-foreground">{item.hours_played}h</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { value: "games", label: "Games", Icon: Trophy },
  { value: "media", label: "Movies & Series", Icon: Film },
] as const;

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="pb-6 border-b border-border/40 flex items-center gap-5">
        <div className="h-16 w-16 rounded-full bg-muted/40 animate-pulse shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-6 w-48 rounded bg-muted/40 animate-pulse" />
          <div className="h-4 w-32 rounded bg-muted/30 animate-pulse" />
        </div>
      </div>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-xl bg-muted/30 animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function UserProfilePage() {
  const { userId } = Route.useParams();
  const fetchUserDashboard = useServerFn(getUserDashboard);
  const query = useQuery({
    queryKey: ["user-dashboard", userId],
    queryFn: () => fetchUserDashboard({ data: { userId } }),
  });
  const { tab = "games" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  // Categories differ between games and media, so switching tab resets the filters
  const setTab = (t: LibraryKind) =>
    navigate({
      search: { tab: t === "media" ? "media" : undefined },
      replace: true,
    });

  const data = query.data;

  const ratedCounts = useMemo(() => {
    if (!data) return { games: 0, movies: 0, series: 0 };
    const ratedGames = new Set(data.games.ratings.map((r) => r.game_id));
    const ratedMedia = new Set(data.media.ratings.map((r) => r.media_id));
    const countMedia = (t: "movie" | "series") =>
      data.media.media.filter((m) => m.media_type === t && ratedMedia.has(m.id)).length;
    return {
      games: data.games.games.filter((g) => ratedGames.has(g.id)).length,
      movies: countMedia("movie"),
      series: countMedia("series"),
    };
  }, [data]);

  if (query.isLoading) return <PageSkeleton />;

  if (query.isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <UserCircle className="h-12 w-12 text-muted-foreground/30" />
        <p className="font-semibold">User not found</p>
        <Link to="/users" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to users
        </Link>
      </div>
    );
  }

  const { user } = data;
  const displayName = user.display_name || "Player";
  const gradient = avatarGradient(user.id);
  const initials = getInitials(user);

  return (
    <div className="space-y-8">
      {/* ── Back link ── */}
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          to="/users"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors no-underline group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All users
        </Link>
      </motion.div>

      {/* ── Profile header ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 }}
        className="pb-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-end gap-5"
      >
        {/* Avatar */}
        <div
          className={`grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradient} shadow-xl ring-2 ring-white/10`}
        >
          <span className="text-3xl font-bold text-white">{initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1">
            Member profile
          </p>
          <h1 className="text-3xl font-bold tracking-tight leading-none truncate">{displayName}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted-foreground/60">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Member since {formatDate(user.created_at)}</span>
          </div>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          {[
            { label: "Games rated", count: ratedCounts.games, icon: Trophy },
            { label: "Movies rated", count: ratedCounts.movies, icon: Film },
            { label: "Series rated", count: ratedCounts.series, icon: Tv },
          ].map(({ label, count, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2"
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[13px] font-medium tabular-nums">{count}</span>
              <span className="text-[11px] text-muted-foreground hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Tab bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex gap-1 rounded-xl border border-border/50 bg-muted/30 p-1 w-fit"
      >
        {TABS.map(({ value, label, Icon }) => {
          const active = tab === value;
          return (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={[
                "relative flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {active && (
                <motion.div
                  layoutId="user-tab-pill"
                  className="absolute inset-0 rounded-lg bg-background border border-border/60 shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="relative h-3.5 w-3.5" />
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "games" ? (
            <LibraryView
              userId={userId}
              kind="games"
              items={data.games.games}
              ratings={data.games.ratings}
              categories={data.games.categories}
              favoriteIds={data.games.favoriteIds}
            />
          ) : (
            <LibraryView
              userId={userId}
              kind="media"
              items={data.media.media}
              ratings={data.media.ratings}
              categories={data.media.categories}
              favoriteIds={data.media.favoriteIds}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
