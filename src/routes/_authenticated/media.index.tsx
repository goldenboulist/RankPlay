import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  listMedia,
  createMedia,
  toggleMediaFavorite,
  deleteMedia,
} from "@/lib/media.functions";
import { withOverall } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Heart, Plus, Search, Trash2, Star, Film, Tv, SlidersHorizontal, LayoutGrid } from "@/lib/icons";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CATEGORY_ICONS, CategoryIconName } from "@/lib/category-icons";

export const Route = createFileRoute("/_authenticated/media/")({
  validateSearch: (s: Record<string, unknown>) => ({
    type: typeof s.type === "string" ? s.type : "all",
    category: typeof s.category === "string" ? s.category : "all",
    search: typeof s.search === "string" ? s.search : "",
    sort: typeof s.sort === "string" ? s.sort : "score_desc",
    favOnly: s.favOnly === true || s.favOnly === "true",
  }),
  head: () => ({ meta: [{ title: "Movies & Series" }] }),
  component: MediaPage,
});

function MediaPage() {
  const listFn = useServerFn(listMedia);
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["media"], queryFn: () => listFn() });

  const { type, category, search, sort, favOnly } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const categoryFilter = category ?? "all";

  const setType = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, type: v }), replace: true });
  const setCategoryFilter = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, category: v }), replace: true });
  const setSearch = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, search: v }), replace: true });
  const setSort = (v: string) =>
    navigate({ search: (prev) => ({ ...prev, sort: v }), replace: true });
  const setFavOnly = (fn: (prev: boolean) => boolean) =>
    navigate({ search: (prev) => ({ ...prev, favOnly: fn(prev.favOnly ?? false) }), replace: true });

  useEffect(() => {
    if (!query.data) return;
    const id = sessionStorage.getItem("scrollToMedia");
    if (!id) return;
    sessionStorage.removeItem("scrollToMedia");
    const el = document.getElementById("media-" + id);
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [query.data]);

  const enriched = useMemo(() => {
    if (!query.data) return [];
    const favSet = new Set(query.data.favoriteIds);

    const adapted = query.data.media.map((m) => ({ ...m, id: m.id }));
    const ratingsAdapted = query.data.ratings.map((r) => ({ ...r, game_id: r.media_id }));

    let items = withOverall(adapted, ratingsAdapted, query.data.categories).map((m) => ({
      ...m,
      isFavorite: favSet.has(m.id),
    }));

    if (type && type !== "all") {
      items = items.filter((m) => m.media_type === type);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      items = items.filter((m) => m.title.toLowerCase().includes(s));
    }
    if (categoryFilter !== "all") {
      items = items.filter((m) => query.data?.ratings.some(r => r.media_id === m.id && r.category_id === categoryFilter));
    }
    if (favOnly) items = items.filter((m) => m.isFavorite);

    items.sort((a, b) => {
      if (sort === "score_desc") {
        if (categoryFilter !== "all") {
          const rA = query.data?.ratings.find(r => r.media_id === a.id && r.category_id === categoryFilter);
          const rB = query.data?.ratings.find(r => r.media_id === b.id && r.category_id === categoryFilter);
          return (Number(rB?.score) || -1) - (Number(rA?.score) || -1);
        }
        return (b.overall ?? -1) - (a.overall ?? -1);
      }
      if (sort === "score_asc") {
        if (categoryFilter !== "all") {
          const rA = query.data?.ratings.find(r => r.media_id === a.id && r.category_id === categoryFilter);
          const rB = query.data?.ratings.find(r => r.media_id === b.id && r.category_id === categoryFilter);
          return (Number(rA?.score) || 11) - (Number(rB?.score) || 11);
        }
        return (a.overall ?? 11) - (b.overall ?? 11);
      }
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "release") return (b.release_date ?? "").localeCompare(a.release_date ?? "");
      return 0;
    });
    return items;
  }, [query.data, search, sort, categoryFilter, favOnly, type]);

  if (query.isLoading) return <PageLoading />;

  const totalFavs = query.data?.favoriteIds.length ?? 0;
  const ratedCount = query.data ? new Set(query.data.ratings.map(r => r.media_id)).size : 0;
  const moviesCount = query.data?.media.filter(m => m.media_type === "movie").length ?? 0;
  const seriesCount = query.data?.media.filter(m => m.media_type === "series").length ?? 0;

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/60 select-none">
            Library
          </p>
          <h1 className="text-4xl font-bold tracking-tight leading-none">
            Movies & Series
          </h1>
          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{moviesCount} movies / {seriesCount} series</span>
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
        <AddMediaDialog onCreated={() => qc.invalidateQueries({ queryKey: ["media"] })} />
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

        {/* ── Type Switch Chips ── */}
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
              {t === "all" ? "All Layouts" : t === "movie" ? "Movies" : "Series"}
            </button>
          ))}
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
      {(search || categoryFilter !== "all" || favOnly || (type && type !== "all")) && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground -mt-4"
        >
          Showing <span className="text-foreground font-medium">{enriched.length}</span>{" "}
          {enriched.length === 1 ? "title" : "titles"}
          {search && <> matching <span className="text-foreground font-medium">"{search}"</span></>}
          {categoryFilter !== "all" && (
            <> in <span className="text-foreground font-medium">{query.data?.categories.find(c => c.id === categoryFilter)?.name}</span></>
          )}
          {type && type !== "all" && <> · {type === "movie" ? "movies" : "series"} only</>}
          {favOnly && <> · favorites only</>}
        </motion.p>
      )}

      {/* ── Grid / Empty ── */}
      {enriched.length === 0 ? (
        <EmptyState hasFilters={!!(search || categoryFilter !== "all" || favOnly || (type && type !== "all"))} />
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          <AnimatePresence mode="popLayout">
            {enriched.map((m, i) => (
              <motion.div
                layout
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.018, 0.28) }}
              >
                <div id={"media-" + m.id}>
                  <MediaCard
                    item={{
                      ...m,
                      media_type: query.data?.media.find((x) => x.id === m.id)?.media_type ?? "movie"
                    }}
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
          {hasFilters ? "No titles match your filters" : "Your library is empty"}
        </p>
        <p className="text-sm text-muted-foreground max-w-[240px]">
          {hasFilters
            ? "Try adjusting your search or filters to find what you're looking for."
            : "Add your first title to start building your ranking."}
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

/* ─── Media card ──────────────────────────────────────────────────── */

function MediaCard({
  item,
  categoryFilter = "all",
  ratings = [],
  categories = [],
}: {
  item: {
    id: string;
    title: string;
    cover_url: string | null;
    release_date: string | null;
    overall: number | null;
    isFavorite: boolean;
    media_type: "movie" | "series";
  };
  categoryFilter?: string;
  ratings?: { media_id: string; category_id: string; score: number }[];
  categories?: { id: string; name: string; icon: string | null; coefficient: number }[];
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fav = useServerFn(toggleMediaFavorite);
  const del = useServerFn(deleteMedia);

  const handleCardClick = () => {
    sessionStorage.setItem("scrollToMedia", item.id);
    navigate({ to: "/media/$mediaId", params: { mediaId: item.id } });
  };

  const activeCategoryScore =
    categoryFilter !== "all"
      ? (() => {
        const r = ratings.find((x) => x.media_id === item.id && x.category_id === categoryFilter);
        return r ? Number(r.score) : null;
      })()
      : null;

  const activeCategoryName =
    categoryFilter !== "all"
      ? categories.find((c) => c.id === categoryFilter)?.name ?? null
      : null;

  const toggleFav = useMutation({
    mutationFn: () => fav({ data: { id: item.id, favorite: !item.isFavorite } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });

  const removeMedia = useMutation({
    mutationFn: () => del({ data: { id: item.id } }),
    onSuccess: () => {
      toast.success("Removed");
      qc.invalidateQueries({ queryKey: ["media"] });
    },
  });

  const TypeIcon = item.media_type === "series" ? Tv : Film;

  return (
    <div
      onClick={handleCardClick}
      className="group relative block overflow-hidden rounded-xl cursor-pointer"
    >
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
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/90">
          <TypeIcon className="h-3 w-3" />
          {item.media_type === "series" ? "Series" : "Movie"}
        </div>

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
            className={`h-3.5 w-3.5 transition-colors ${item.isFavorite ? "fill-red-400 text-red-400" : "text-white/70"}`}
          />
        </button>

        {/* Favorite indicator (always visible when fav) */}
        {item.isFavorite && (
          <div className="absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 group-hover:opacity-0 transition-opacity pointer-events-none">
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
              categoryFilter !== "all" ? "opacity-60 scale-90" : "",
            ].join(" ")}
          >
            {item.overall.toFixed(1)}
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
        <h3 className="line-clamp-1 text-sm font-semibold leading-tight" title={item.title}>
          {item.title}
        </h3>
        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {item.release_date ? new Date(item.release_date).getFullYear() : "—"}
          </span>
        </div>

        {/* Delete — only visible on hover */}
        <div onClick={(e) => e.stopPropagation()}>
          <ConfirmDialog
            trigger={
              <button className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/0 group-hover:text-muted-foreground transition-colors hover:!text-destructive">
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            }
            title="Delete title"
            description={`Delete "${item.title}"? This will permanently remove it and all its ratings.`}
            confirmLabel="Delete"
            onConfirm={() => removeMedia.mutate()}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Add media dialog ────────────────────────────────────────────── */

function AddMediaDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", media_type: "movie" as "movie" | "series", cover_url: "", release_date: "",
  });
  const create = useServerFn(createMedia);
  const mut = useMutation({
    mutationFn: () =>
      create({
        data: {
          ...form,
          cover_url: form.cover_url || null,
          release_date: form.release_date || null,
        },
      }),
    onSuccess: () => {
      toast.success("Added!");
      setForm({ title: "", media_type: "movie", cover_url: "", release_date: "" });
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
          Add title
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a movie or series</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => { e.preventDefault(); mut.mutate(); }}
          className="space-y-4 pt-1"
        >
          <div className="space-y-1.5">
            <Label className="text-sm">Type</Label>
            <div className="flex gap-2">
              {(["movie", "series"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, media_type: t }))}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium border transition-all ${form.media_type === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                >
                  {t === "movie" ? <Film className="h-3.5 w-3.5" /> : <Tv className="h-3.5 w-3.5" />}
                  {t === "movie" ? "Movie" : "Series"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Title <span className="text-destructive">*</span></Label>
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Inception"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Cover image URL</Label>
            <Input
              value={form.cover_url}
              onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
              placeholder="https://…"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Release date</Label>
            <Input
              type="date"
              value={form.release_date}
              onChange={(e) => setForm({ ...form, release_date: e.target.value })}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mut.isPending}>
              {mut.isPending ? "Adding…" : "Add title"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}