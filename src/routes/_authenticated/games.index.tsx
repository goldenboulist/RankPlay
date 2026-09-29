import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { listGames, createGame, toggleFavorite, deleteGame } from "@/lib/games.functions";
import { searchSteamGames, getSteamGameDetails, type SteamSearchResult } from "@/lib/steam.functions";
import { CatalogSearch } from "@/components/catalog-search";
import { GAME_STATUSES, STATUS_LABELS, STATUS_STYLES, PLATFORM_SUGGESTIONS, splitGenres } from "@/lib/game-meta";
import type { GameStatus } from "@/integrations/supabase/types";
import { withOverall } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Heart, Plus, Search, Trash2, Star, Music2, SlidersHorizontal, LayoutGrid, Layers } from "@/lib/icons";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CATEGORY_ICONS, CategoryIconName } from "@/lib/category-icons";
import { MusicPicker } from "@/components/music-picker";
import { GenrePlatformFields, StatusPicker } from "@/components/game-fields";
import { rememberSequence } from "@/components/item-navigator";
import { parseDecimal } from "@/lib/timecode";

export const Route = createFileRoute("/_authenticated/games/")({
  validateSearch: (
    s: Record<string, unknown>,
  ): {
    category: string;
    search: string;
    sort: string;
    favOnly: boolean;
    status?: string;
    genre?: string;
    platform?: string;
  } => ({
    category: typeof s.category === "string" ? s.category : "all",
    search: typeof s.search === "string" ? s.search : "",
    sort: typeof s.sort === "string" ? s.sort : "score_desc",
    favOnly: s.favOnly === true || s.favOnly === "true",
    // Optional so existing links to /games don't have to pass them
    status: typeof s.status === "string" ? s.status : undefined,
    genre: typeof s.genre === "string" ? s.genre : undefined,
    platform: typeof s.platform === "string" ? s.platform : undefined,
  }),
  head: () => ({ meta: [{ title: "Games" }] }),
  component: GamesPage,
});

function GamesPage() {
  const list = useServerFn(listGames);
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["games"], queryFn: () => list() });

  const { category, search, sort, favOnly, status = "all", genre = "all", platform = "all" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const categoryFilter = category ?? "all";
  const setCategoryFilter = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, category: v }), replace: true });
  const setSearch = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, search: v }), replace: true });
  const setSort = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, sort: v }), replace: true });
  const setFavOnly = (fn: (prev: boolean) => boolean) =>
    navigate({ search: (prev) => ({ ...prev, favOnly: fn(prev.favOnly ?? false) }), replace: true });
  const setFilter = (key: "status" | "genre" | "platform", v: string) =>
    navigate({ search: (prev) => ({ ...prev, [key]: v }), replace: true });

  // Filter options come from what's actually in the library
  const genres = useMemo(
    () => [...new Set(query.data?.games.flatMap((g) => splitGenres(g.genre)) ?? [])].sort(),
    [query.data],
  );
  const platforms = useMemo(
    () => [...new Set(query.data?.games.map((g) => g.platform).filter((p): p is string => !!p) ?? [])].sort(),
    [query.data],
  );

  useEffect(() => {
    if (!query.data) return;
    const id = sessionStorage.getItem("scrollToGame");
    if (!id) return;
    sessionStorage.removeItem("scrollToGame");
    const el = document.getElementById("game-" + id);
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [query.data]);

  const enriched = useMemo(() => {
    if (!query.data) return [];
    const favSet = new Set(query.data.favoriteIds);
    let games = withOverall(query.data.games, query.data.ratings, query.data.categories).map((g) => ({
      ...g,
      isFavorite: favSet.has(g.id),
    }));
    if (search.trim()) {
      const s = search.toLowerCase();
      games = games.filter((g) => g.title.toLowerCase().includes(s));
    }
    if (categoryFilter !== "all") {
      games = games.filter((g) => query.data?.ratings.some(r => r.game_id === g.id && r.category_id === categoryFilter));
    }
    if (favOnly) games = games.filter((g) => g.isFavorite);
    if (status === "none") games = games.filter((g) => !g.status);
    else if (status !== "all") games = games.filter((g) => g.status === status);
    if (genre !== "all") games = games.filter((g) => splitGenres(g.genre).includes(genre));
    if (platform !== "all") games = games.filter((g) => g.platform === platform);
    games.sort((a, b) => {
      if (sort === "score_desc") {
        if (categoryFilter !== "all") {
          const rA = query.data?.ratings.find(r => r.game_id === a.id && r.category_id === categoryFilter);
          const rB = query.data?.ratings.find(r => r.game_id === b.id && r.category_id === categoryFilter);
          return (Number(rB?.score) || -1) - (Number(rA?.score) || -1);
        }
        return (b.overall ?? -1) - (a.overall ?? -1);
      }
      if (sort === "score_asc") {
        if (categoryFilter !== "all") {
          const rA = query.data?.ratings.find(r => r.game_id === a.id && r.category_id === categoryFilter);
          const rB = query.data?.ratings.find(r => r.game_id === b.id && r.category_id === categoryFilter);
          return (Number(rA?.score) || 11) - (Number(rB?.score) || 11);
        }
        return (a.overall ?? 11) - (b.overall ?? 11);
      }
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "release") return (b.release_date ?? "").localeCompare(a.release_date ?? "");
      return 0;
    });
    return games;
  }, [query.data, search, sort, categoryFilter, favOnly, status, genre, platform]);

  // Detail pages navigate prev/next in the order currently shown here
  useEffect(() => {
    if (query.data) rememberSequence("games", enriched.map((g) => g.id));
  }, [enriched, query.data]);

  if (query.isLoading) return <PageLoading />;

  const totalFavs = query.data?.favoriteIds.length ?? 0;
  const ratedCount = query.data ? new Set(query.data.ratings.map(r => r.game_id)).size : 0;

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/60 select-none">
            Library
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-none">
            My Games
          </h1>
          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{query.data?.games.length ?? 0} titles</span>
            </span>
            <span className="h-3 w-px bg-border/60" />
            <span className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5" />
              <span>{totalFavs} favorites</span>
            </span>
            <span className="h-3 w-px bg-border/60" />
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5" />
              <span>{ratedCount} rated</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm" variant="outline" className="gap-2">
            <Link to="/games/tiers">
              <Layers className="h-4 w-4" />
              Tier list
            </Link>
          </Button>
          <AddGameDialog onCreated={() => qc.invalidateQueries({ queryKey: ["games"] })} />
        </div>
      </div>

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

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Category filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-9 w-auto min-w-[140px] text-sm gap-1.5 bg-muted/30 border-border/50">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {query.data?.categories.filter(c => !c.is_default).map((c) => {
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

          {/* Status filter */}
          <Select value={status} onValueChange={(v) => setFilter("status", v)}>
            <SelectTrigger className="h-9 w-auto min-w-[130px] text-sm bg-muted/30 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {GAME_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
              <SelectItem value="none">No status</SelectItem>
            </SelectContent>
          </Select>

          {/* Genre filter */}
          {genres.length > 0 && (
            <Select value={genre} onValueChange={(v) => setFilter("genre", v)}>
              <SelectTrigger className="h-9 w-auto min-w-[120px] text-sm bg-muted/30 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All genres</SelectItem>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Platform filter */}
          {platforms.length > 0 && (
            <Select value={platform} onValueChange={(v) => setFilter("platform", v)}>
              <SelectTrigger className="h-9 w-auto min-w-[130px] text-sm bg-muted/30 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                {platforms.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

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
      {(search || categoryFilter !== "all" || favOnly || status !== "all" || genre !== "all" || platform !== "all") && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground -mt-4"
        >
          Showing <span className="text-foreground font-medium">{enriched.length}</span>{" "}
          {enriched.length === 1 ? "game" : "games"}
          {search && <> matching <span className="text-foreground font-medium">"{search}"</span></>}
          {categoryFilter !== "all" && (
            <> in <span className="text-foreground font-medium">{query.data?.categories.find(c => c.id === categoryFilter)?.name}</span></>
          )}
          {status !== "all" && <> · {status === "none" ? "no status" : STATUS_LABELS[status as GameStatus]}</>}
          {genre !== "all" && <> · {genre}</>}
          {platform !== "all" && <> · {platform}</>}
          {favOnly && <> · favorites only</>}
        </motion.p>
      )}

      {/* ── Grid / Empty ── */}
      {enriched.length === 0 ? (
        <EmptyState
          hasFilters={!!(search || categoryFilter !== "all" || favOnly || status !== "all" || genre !== "all" || platform !== "all")}
        />
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          <AnimatePresence mode="popLayout">
            {enriched.map((g, i) => (
              <motion.div
                layout
                key={g.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.018, 0.28) }}
              >
                <div id={"game-" + g.id}>
                  <GameCard
                    game={g}
                    categoryFilter={categoryFilter}
                    ratings={query.data?.ratings ?? []}
                    categories={query.data?.categories ?? []}
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

/* ─── Empty state ─────────────────────────────────────────────────── */

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
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
          {hasFilters ? "No games match your filters" : "Your library is empty"}
        </p>
        <p className="text-sm text-muted-foreground max-w-[240px]">
          {hasFilters
            ? "Try adjusting your search or filters to find what you're looking for."
            : "Add your first game to start building your ranking."}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Loading skeleton ────────────────────────────────────────────── */

function PageLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3 pb-6 border-b border-border/40">
        <div className="h-3 w-16 rounded-full bg-muted/50 animate-pulse" />
        <div className="h-9 w-40 rounded-lg bg-muted/50 animate-pulse" />
        <div className="h-3 w-48 rounded-full bg-muted/30 animate-pulse" />
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

/* ─── Game card ───────────────────────────────────────────────────── */

function GameCard({
  game,
  categoryFilter = "all",
  ratings = [],
  categories = [],
}: {
  game: {
    id: string;
    title: string;
    cover_url: string | null;
    release_date: string | null;
    overall: number | null;
    isFavorite: boolean;
    hours_played?: number | null;
    status?: GameStatus | null;
  };
  categoryFilter?: string;
  ratings?: { game_id: string; category_id: string; score: number }[];
  categories?: { id: string; name: string; icon: string | null; coefficient: number }[];
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fav = useServerFn(toggleFavorite);
  const del = useServerFn(deleteGame);

  const handleCardClick = () => {
    sessionStorage.setItem("scrollToGame", game.id);
    navigate({ to: "/games/$gameId", params: { gameId: game.id } });
  };

  const activeCategoryScore =
    categoryFilter !== "all"
      ? (() => {
        const r = ratings.find((x) => x.game_id === game.id && x.category_id === categoryFilter);
        return r ? Number(r.score) : null;
      })()
      : null;

  const activeCategoryName =
    categoryFilter !== "all"
      ? categories.find((c) => c.id === categoryFilter)?.name ?? null
      : null;

  const toggleFav = useMutation({
    mutationFn: () => fav({ data: { id: game.id, favorite: !game.isFavorite } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["games"] }),
  });

  const removeGame = useMutation({
    mutationFn: () => del({ data: { id: game.id } }),
    onSuccess: () => {
      toast.success("Game removed");
      qc.invalidateQueries({ queryKey: ["games"] });
    },
  });

  return (
    <div
      onClick={handleCardClick}
      className="group relative block overflow-hidden rounded-xl cursor-pointer"
    >
      {/* Cover art */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {game.cover_url ? (
          <img
            src={game.cover_url}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-muted to-muted/60">
            <Star className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" />

        {/* Play status */}
        {game.status && (
          <span
            className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold shadow ${STATUS_STYLES[game.status]}`}
          >
            {STATUS_LABELS[game.status]}
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFav.mutate(); }}
          className={[
            "absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full",
            "bg-black/40 backdrop-blur-sm border border-white/10",
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "hover:bg-black/60 hover:scale-110",
          ].join(" ")}
          aria-label="Toggle favorite"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${game.isFavorite ? "fill-red-400 text-red-400" : "text-white/70"
              }`}
          />
        </button>

        {/* Favorite indicator (always visible when fav) */}
        {game.isFavorite && (
          <div className="absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 group-hover:opacity-0 transition-opacity pointer-events-none">
            <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" />
          </div>
        )}

        {/* Overall score badge */}
        {game.overall !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className={[
              "absolute bottom-2 left-2 h-10 w-10 grid place-items-center rounded-full",
              "bg-primary text-primary-foreground font-bold text-sm",
              "shadow-lg ring-2 ring-black/20",
              categoryFilter !== "all" ? "opacity-60 scale-90" : "",
            ].join(" ")}
          >
            {game.overall.toFixed(1)}
          </motion.div>
        )}

        {/* Category score badge */}
        {activeCategoryScore !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground px-2 py-1 shadow-lg ring-1 ring-black/20 min-w-[44px]"
          >
            <span className="text-[9px] font-medium leading-none opacity-75 truncate max-w-[52px]">
              {activeCategoryName}
            </span>
            <span className="text-sm font-bold leading-snug">{activeCategoryScore.toFixed(1)}</span>
          </motion.div>
        )}

        {categoryFilter !== "all" && activeCategoryScore === null && (
          <div className="absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white/50 px-2 py-1 ring-1 ring-white/10 min-w-[44px]">
            <span className="text-[9px] font-medium leading-none truncate max-w-[52px]">
              {activeCategoryName}
            </span>
            <span className="text-sm font-bold leading-snug">—</span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="px-1 pt-2 pb-1">
        <h3 className="line-clamp-1 text-sm font-semibold leading-tight" title={game.title}>
          {game.title}
        </h3>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {game.release_date ? new Date(game.release_date).getFullYear() : "—"}
          </span>
          {game.hours_played != null && (
            <span className="text-[11px] text-muted-foreground">{game.hours_played}h</span>
          )}
        </div>

        {/* Delete — only visible on hover */}
        <div onClick={(e) => e.stopPropagation()}>
          <ConfirmDialog
            trigger={
              <button className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/0 group-hover:text-muted-foreground transition-colors hover:!text-destructive">
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            }
            title="Delete game"
            description={`Delete "${game.title}"? This will permanently remove the game and all its ratings.`}
            confirmLabel="Delete"
            onConfirm={() => removeGame.mutate()}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Add game dialog ─────────────────────────────────────────────── */

function AddGameDialog({ onCreated }: { onCreated: () => void }) {
  const emptyForm = {
    title: "",
    cover_url: "",
    release_date: "",
    music_url: "",
    music_start: null as number | null,
    hours_played: "",
    genre: "",
    platform: "",
    status: null as GameStatus | null,
    steam_appid: null as number | null,
  };
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const create = useServerFn(createGame);
  const steamSearch = useServerFn(searchSteamGames);
  const steamDetails = useServerFn(getSteamGameDetails);
  const mut = useMutation({
    mutationFn: () =>
      create({
        data: {
          ...form,
          cover_url: form.cover_url || null,
          release_date: form.release_date || null,
          music_url: form.music_url || null,
          music_start: form.music_url ? form.music_start : null,
          hours_played: parseDecimal(form.hours_played),
          genre: form.genre || null,
          platform: form.platform || null,
        },
      }),
    onSuccess: () => {
      toast.success("Game added");
      setForm(emptyForm);
      setOpen(false);
      onCreated();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add game
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a game</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => { e.preventDefault(); mut.mutate(); }}
          className="space-y-4 pt-1"
        >
          <CatalogSearch<SteamSearchResult>
            label="Search on Steam"
            placeholder="Type a game name to autofill…"
            queryKey="steam-search"
            search={(term) => steamSearch({ data: { term } })}
            getKey={(r) => r.appId}
            renderItem={(r) => (
              <>
                <img src={r.thumb} alt="" className="h-8 w-[85px] shrink-0 rounded object-cover" loading="lazy" />
                <span className="line-clamp-1">{r.name}</span>
              </>
            )}
            onPick={async (r) => {
              const d = await steamDetails({ data: { appId: r.appId } });
              setForm((f) => ({
                ...f,
                title: d.title,
                cover_url: d.cover_url ?? "",
                release_date: d.release_date ?? "",
                genre: d.genre ?? "",
                platform: f.platform || "PC",
                steam_appid: d.steam_appid,
              }));
            }}
          />

          <div className="space-y-1.5">
            <Label className="text-sm">Title <span className="text-destructive">*</span></Label>
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Elden Ring"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Cover image URL</Label>
            <div className="flex items-center gap-3">
              {form.cover_url && (
                <img src={form.cover_url} alt="" className="h-14 w-[42px] shrink-0 rounded object-cover bg-muted" />
              )}
              <Input
                value={form.cover_url}
                onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                placeholder="https://…"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm">Release date</Label>
              <Input
                type="date"
                value={form.release_date}
                onChange={(e) => setForm({ ...form, release_date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Hours played</Label>
              <Input
                type="number"
                min="0"
                max="99999"
                step="any"
                inputMode="decimal"
                value={form.hours_played}
                onChange={(e) => setForm({ ...form, hours_played: e.target.value })}
                placeholder="0.0"
              />
            </div>
          </div>

          <GenrePlatformFields
            genre={form.genre}
            platform={form.platform}
            onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
          />

          <div className="space-y-1.5">
            <Label className="text-sm">Status</Label>
            <StatusPicker value={form.status} onChange={(status) => setForm((f) => ({ ...f, status }))} />
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-sm">
              <Music2 className="h-3.5 w-3.5" /> Music
            </Label>
            <MusicPicker
              value={{ url: form.music_url, start: form.music_start }}
              onChange={({ url, start }) => setForm((f) => ({ ...f, music_url: url, music_start: start }))}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mut.isPending}>
              {mut.isPending ? "Adding…" : "Add game"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
