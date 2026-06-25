import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  listMedia,
  getMedia,
  upsertMediaRating,
  deleteMediaRating,
  createMediaCategory,
  deleteMediaCategory,
  updateMediaCategoryCoefficient,
  updateMedia,
  deleteMediaMusic,
  listUploads,
} from "@/lib/media.functions";
import { withOverall, computeOverall } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, X, Check, Play, Pause, Volume2, VolumeX, Music2, Film, Tv, ChevronDown, ChevronUp } from "@/lib/icons";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CATEGORY_ICONS, CategoryIconName } from "@/lib/category-icons";

export const Route = createFileRoute("/_authenticated/media/$mediaId")({
  head: () => ({ meta: [{ title: "Media" }] }),
  component: MediaDetail,
});

/* ─── Page ────────────────────────────────────────────────────────── */

function MediaDetail() {
  const { mediaId } = Route.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listMedia);
  const getFn = useServerFn(getMedia);
  const all = useQuery({ queryKey: ["media"], queryFn: () => listFn() });
  const detail = useQuery({ queryKey: ["media", mediaId], queryFn: () => getFn({ data: { id: mediaId } }) });

  const ratings = useMemo(() => {
    if (!all.data || !detail.data) return [];
    const others = all.data.ratings.filter((r) => r.media_id !== mediaId).map((r) => ({ ...r, game_id: r.media_id }));
    const own = detail.data.ratings.map((r) => ({ ...r, game_id: r.media_id }));
    return [...others, ...own];
  }, [all.data, detail.data, mediaId]);

  const overall = detail.data ? computeOverall(mediaId, ratings, all.data?.categories ?? []) : null;

  const allWithOverall = useMemo(
    () => (all.data ? withOverall(all.data.media.map((m) => ({ ...m })), ratings, all.data.categories ?? []) : []),
    [all.data, ratings],
  );

  const sortedByScore = useMemo(
    () => allWithOverall.filter((m) => m.overall !== null).sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0)),
    [allWithOverall],
  );

  const neighbors = useMemo(() => {
    if (overall === null) return { above: [], below: [] };
    const others = sortedByScore.filter((m) => m.id !== mediaId);
    const above = others.filter((m) => (m.overall ?? 0) > overall).slice(-3).reverse();
    const below = others.filter((m) => (m.overall ?? 0) < overall).slice(0, 3);
    return { above, below };
  }, [sortedByScore, overall, mediaId]);

  if (all.isLoading || detail.isLoading || !all.data || !detail.data) {
    return <DetailSkeleton />;
  }

  const { media } = detail.data;
  const categories = all.data.categories;
  const TypeIcon = media.media_type === "series" ? Tv : Film;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Blurred backdrop */}
        {media.cover_url && (
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${media.cover_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(40px) saturate(1.4)",
              opacity: 0.35,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        <button
          onClick={() => window.history.back()}
          className="absolute top-6 right-6 z-10 inline-flex items-center gap-2 rounded-lg border border-border bg-background/95 px-4 py-2 text-sm font-medium text-foreground shadow-md backdrop-blur transition-all hover:shadow-lg hover:bg-accent hover:text-accent-foreground group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to media
        </button>

        {/* Hero content */}
        <div className="relative flex gap-6 p-6 sm:p-8 md:gap-8">
          {/* Cover */}
          <div className="shrink-0">
            <div className="w-28 sm:w-36 md:w-44 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
              {media.cover_url ? (
                <img src={media.cover_url} alt={media.title} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/30 to-muted">
                  <TypeIcon className="h-10 w-10 text-muted-foreground/50" />
                </div>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-col justify-end gap-3 py-2 min-w-0">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-1.5">
                {media.media_type === "series" ? "Series" : "Movie"}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none line-clamp-2">
                {media.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {media.release_date && (
                <span>{new Date(media.release_date).getFullYear()}</span>
              )}
              {overall !== null && (
                <>
                  <span className="h-3 w-px bg-border/60" />
                  <span className="flex items-center gap-1.5">
                    <motion.span
                      key={overall}
                      initial={{ scale: 1.4, color: "var(--color-primary)" }}
                      animate={{ scale: 1, color: "currentColor" }}
                      className="text-2xl font-bold tabular-nums text-foreground"
                    >
                      {overall.toFixed(1)}
                    </motion.span>
                    <span className="text-xs">/ 10</span>
                  </span>
                </>
              )}
            </div>

            {/* Rank context */}
            {(neighbors.above.length > 0 || neighbors.below.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {neighbors.above.slice(0, 2).map((m) => (
                  <span key={m.id} className="inline-flex items-center gap-1 rounded-full bg-muted/50 border border-border/40 px-2.5 py-0.5 text-xs text-muted-foreground">
                    <span className="text-[10px] opacity-60">↑</span>
                    <span className="truncate max-w-[80px]">{m.title}</span>
                    <span className="font-mono opacity-70">{m.overall?.toFixed(1)}</span>
                  </span>
                ))}
                {neighbors.below.slice(0, 2).map((m) => (
                  <span key={m.id} className="inline-flex items-center gap-1 rounded-full bg-muted/30 border border-border/30 px-2.5 py-0.5 text-xs text-muted-foreground/60">
                    <span className="text-[10px] opacity-60">↓</span>
                    <span className="truncate max-w-[80px]">{m.title}</span>
                    <span className="font-mono opacity-60">{m.overall?.toFixed(1)}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">

        {/* Left — edit + meta */}
        <div className="space-y-4">
          <EditMetaCard media={media} onSaved={() => { qc.invalidateQueries({ queryKey: ["media"] }); qc.invalidateQueries({ queryKey: ["media", mediaId] }); }} />
        </div>

        {/* Right — ratings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Ratings
            </h2>
            <AddCategoryButton />
          </div>

          <div className="space-y-2">
            {categories.map((cat) => {
              const r = detail.data!.ratings.find((x) => x.category_id === cat.id);
              return (
                <RatingRow
                  key={cat.id}
                  mediaId={mediaId}
                  categoryId={cat.id}
                  categoryName={cat.name}
                  icon={cat.icon}
                  isDefault={cat.is_default}
                  score={r ? Number(r.score) : null}
                  coefficient={Number(cat.coefficient ?? 1)}
                  allRatings={ratings}
                  allMedia={all.data!.media
                    .filter((m) => m.id !== mediaId)
                    .map((m) => ({ id: m.id, title: m.title }))}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Music player */}
      {media.music_url && (
        <MusicPlayer
          url={media.music_url}
          title={media.title}
          mediaId={media.id}
          onDeleted={() => qc.invalidateQueries({ queryKey: ["media"] })}
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
          <div className="h-40 rounded-xl bg-muted/30 animate-pulse" />
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

/* ─── Rating row ──────────────────────────────────────────────────── */

function RatingRow({
  mediaId, categoryId, categoryName, icon, isDefault, score, coefficient, allRatings, allMedia,
}: {
  mediaId: string; categoryId: string; categoryName: string; icon: string | null; isDefault: boolean;
  score: number | null; coefficient: number;
  allRatings: { game_id: string; category_id: string; score: number }[];
  allMedia: { id: string; title: string }[];
}) {
  const qc = useQueryClient();
  const up = useServerFn(upsertMediaRating);
  const del = useServerFn(deleteMediaRating);
  const delCat = useServerFn(deleteMediaCategory);
  const [local, setLocal] = useState(score ?? 5);
  const [focused, setFocused] = useState(false);

  useEffect(() => { if (score !== null) setLocal(score); }, [score]);

  const save = useMutation({
    mutationFn: (val: number) => up({ data: { media_id: mediaId, category_id: categoryId, score: val } }),
    onSuccess: () => qc.invalidateQueries(),
  });

  const remove = useMutation({
    mutationFn: () => del({ data: { media_id: mediaId, category_id: categoryId } }),
    onSuccess: () => qc.invalidateQueries(),
  });

  const removeCat = useMutation({
    mutationFn: () => delCat({ data: { id: categoryId } }),
    onSuccess: () => qc.invalidateQueries(),
  });

  const updateCoeff = useServerFn(updateMediaCategoryCoefficient);
  const [editingCoeff, setEditingCoeff] = useState(false);
  const [localCoeff, setLocalCoeff] = useState(coefficient);
  const saveCoeff = useMutation({
    mutationFn: (val: number) => updateCoeff({ data: { id: categoryId, coefficient: val } }),
    onSuccess: () => { qc.invalidateQueries(); setEditingCoeff(false); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const categoryNeighbors = useMemo(() => {
    const othersWithScore = allRatings
      .filter((r) => r.category_id === categoryId && r.game_id !== mediaId)
      .flatMap((r) => {
        const m = allMedia.find((x) => x.id === r.game_id);
        return m ? [{ id: m.id, title: m.title, score: Number(r.score) }] : [];
      });
    const sorted = [...othersWithScore].sort((a, b) => b.score - a.score);
    const above = sorted.filter((m) => m.score > local).slice(-3).reverse();
    const below = sorted.filter((m) => m.score < local).slice(0, 3);
    return { above, below };
  }, [allRatings, allMedia, categoryId, mediaId, local]);

  const IconComp = icon ? CATEGORY_ICONS[icon as CategoryIconName] : null;
  const rated = score !== null;

  return (
    <div
      className={[
        "rounded-xl border p-4 transition-colors",
        rated
          ? "bg-background border-border/50"
          : "bg-muted/20 border-border/30 opacity-70 hover:opacity-100",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        {/* Icon + name */}
        <div className="flex flex-1 items-center gap-2 min-w-0">
          {IconComp && <IconComp className="h-4 w-4 text-primary shrink-0" />}
          <span className="font-medium text-sm truncate">{categoryName}</span>

          {/* Coefficient chip */}
          {!isDefault && (
            editingCoeff ? (
              <form
                onSubmit={(e) => { e.preventDefault(); saveCoeff.mutate(localCoeff); }}
                className="flex items-center gap-1 shrink-0"
              >
                <span className="text-xs text-muted-foreground">×</span>
                <input
                  type="number" min={0} max={100} step={0.1}
                  value={localCoeff}
                  onChange={(e) => setLocalCoeff(Number(e.target.value))}
                  className="w-12 h-6 rounded border border-border bg-background px-1 text-xs text-center font-mono"
                  autoFocus
                />
                <button type="submit" className="grid h-6 w-6 place-items-center rounded text-primary hover:bg-primary/10 transition-colors">
                  <Check className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => { setLocalCoeff(coefficient); setEditingCoeff(false); }}
                  className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => { setLocalCoeff(coefficient); setEditingCoeff(true); }}
                className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary hover:bg-primary/20 transition-colors"
              >
                ×{coefficient.toFixed(2) === "1.00" ? "1" : coefficient % 1 === 0 ? String(coefficient) : coefficient.toFixed(2)}
              </button>
            )
          )}
        </div>

        {/* Right: score + actions */}
        <div className="flex items-center gap-2 shrink-0">
          {rated && (
            <button
              onClick={() => remove.mutate()}
              className="text-muted-foreground/40 hover:text-destructive transition-colors"
              aria-label="Remove rating"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          {!isDefault && !editingCoeff && (
            <ConfirmDialog
              trigger={
                <button className="text-muted-foreground/40 hover:text-destructive transition-colors" aria-label="Remove category">
                  <X className="h-3.5 w-3.5" />
                </button>
              }
              title="Remove category"
              description={`Remove the "${categoryName}" category? This will also delete all ratings for this category.`}
              confirmLabel="Remove"
              onConfirm={() => removeCat.mutate()}
            />
          )}
          <motion.span
            key={local}
            initial={{ scale: 1.25, color: "var(--color-primary)" }}
            animate={{ scale: 1, color: "var(--color-foreground)" }}
            className="w-10 text-right text-xl font-bold tabular-nums"
          >
            {local.toFixed(1)}
          </motion.span>
        </div>
      </div>

      <Slider
        value={[local]}
        min={0} max={10} step={0.1}
        onValueChange={(v) => { setLocal(v[0]); setFocused(true); }}
        onValueCommit={(v) => save.mutate(v[0])}
        className="mt-3"
      />

      {/* Neighbor context */}
      <AnimatePresence>
        {focused && (categoryNeighbors.above.length > 0 || categoryNeighbors.below.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-lg bg-muted/40 border border-border/30 p-3 text-xs space-y-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 mb-2">
                Nearby — {categoryName}
              </p>
              {categoryNeighbors.above.map((m) => (
                <div key={m.id} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground/60 text-[10px]">↑</span>
                  <span className="flex-1 truncate text-muted-foreground">{m.title}</span>
                  <span className="font-mono text-muted-foreground tabular-nums">{m.score.toFixed(1)}</span>
                </div>
              ))}
              <div className="border-t border-border/40 my-1.5" />
              {categoryNeighbors.below.map((m) => (
                <div key={m.id} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground/40 text-[10px]">↓</span>
                  <span className="flex-1 truncate text-muted-foreground/60">{m.title}</span>
                  <span className="font-mono text-muted-foreground/60 tabular-nums">{m.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Add category button ─────────────────────────────────────────── */

function AddCategoryButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [coefficient, setCoefficient] = useState(1);
  const qc = useQueryClient();
  const create = useServerFn(createMediaCategory);
  const mut = useMutation({
    mutationFn: () => create({ data: { name, icon: icon || null, coefficient } }),
    onSuccess: () => { setName(""); setIcon(""); setCoefficient(1); setOpen(false); qc.invalidateQueries(); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)} className="h-7 gap-1.5 text-xs">
        <Plus className="h-3 w-3" />
        Add category
      </Button>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (name.trim()) mut.mutate(); }}
      className="flex flex-wrap items-center gap-2"
    >
      <Select value={icon} onValueChange={setIcon}>
        <SelectTrigger className="w-[120px] h-8 text-xs">
          <SelectValue placeholder="Icon" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No icon</SelectItem>
          {Object.keys(CATEGORY_ICONS).map((key) => {
            const IconComponent = CATEGORY_ICONS[key as CategoryIconName];
            return (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2 text-xs">
                  <IconComponent className="w-3.5 h-3.5" />
                  {key}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="h-8 w-36 text-sm"
      />
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">×</span>
        <input
          type="number" min={0} max={100} step={0.1}
          value={coefficient}
          onChange={(e) => setCoefficient(Number(e.target.value))}
          title="Weight coefficient"
          className="w-14 h-8 rounded border border-border bg-background px-2 text-xs text-center font-mono"
        />
      </div>
      <Button size="sm" type="submit" className="h-8">Add</Button>
      <Button size="sm" variant="ghost" type="button" onClick={() => setOpen(false)} className="h-8">
        Cancel
      </Button>
    </form>
  );
}

/* ─── Music selector (detail) ─────────────────────────────────────── */

type UploadedTrack = { filename: string; url: string; label: string };

function MusicSelectorDetail({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const getUploads = useServerFn(listUploads);
  const musicQuery = useQuery<UploadedTrack[]>({
    queryKey: ["uploaded-tracks"],
    queryFn: async () => getUploads(),
    staleTime: 30_000,
  });
  const tracks = musicQuery.data ?? [];

  return (
    <div className="space-y-2">
      <Select
        value={value && tracks.some((t) => t.url === value) ? value : "__none__"}
        onValueChange={(v) => onChange(v === "__none__" ? "" : v)}
        disabled={musicQuery.isLoading}
      >
        <SelectTrigger className="w-full h-8 text-xs">
          <SelectValue placeholder={musicQuery.isLoading ? "Loading…" : "Pick a track…"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none__">— No selection —</SelectItem>
          {tracks.length === 0 && !musicQuery.isLoading && (
            <SelectItem value="__empty__" disabled>No tracks uploaded yet</SelectItem>
          )}
          {tracks.map((t) => (
            <SelectItem key={t.url} value={t.url}>
              <span className="flex items-center gap-1.5 text-xs">
                <Music2 className="h-3 w-3 text-primary" />
                {t.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Music URL (mp3)"
          className="h-8 text-xs"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 rounded-md px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <Button asChild variant="outline" size="sm" type="button" className="w-full h-8 text-xs">
        <label className="cursor-pointer">
          Upload audio file
          <input
            type="file" accept="audio/*" className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const toastId = toast.loading("Uploading…");
              try {
                const fd = new FormData();
                fd.append("file", file);
                const res = await fetch("/api/upload", { method: "POST", body: fd });
                if (!res.ok) throw new Error("Upload failed");
                const data = await res.json();
                onChange(data.url);
                toast.success("Uploaded!", { id: toastId });
              } catch {
                toast.error("Failed to upload", { id: toastId });
              }
            }}
          />
        </label>
      </Button>
    </div>
  );
}

/* ─── Edit meta card ──────────────────────────────────────────────── */

function EditMetaCard({
  media,
  onSaved,
}: {
  media: { id: string; title: string; media_type: "movie" | "series"; cover_url: string | null; release_date: string | null; music_url: string | null };
  onSaved: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: media.title,
    media_type: media.media_type,
    cover_url: media.cover_url ?? "",
    release_date: media.release_date ?? "",
    music_url: media.music_url ?? "",
  });

  const update = useServerFn(updateMedia);
  const mut = useMutation({
    mutationFn: () =>
      update({
        data: {
          id: media.id,
          ...form,
          cover_url: form.cover_url || null,
          release_date: form.release_date || null,
          music_url: form.music_url || null,
        },
      }),
    onSuccess: () => { toast.success("Saved"); setEditing(false); onSaved(); },
  });

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
      >
        Edit details…
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border/60 bg-card p-4 space-y-3"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Edit details</p>

      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Type</label>
        <div className="flex gap-2">
          {(["movie", "series"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((f) => ({ ...f, media_type: t }))}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium border transition-all ${form.media_type === t
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
        <label className="text-xs text-muted-foreground">Title</label>
        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-8 text-sm" />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Cover URL</label>
        <Input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} placeholder="https://…" className="h-8 text-sm" />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Release date</label>
        <Input type="date" value={form.release_date} onChange={(e) => setForm({ ...form, release_date: e.target.value })} className="h-8 text-sm" />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Music2 className="h-3 w-3" /> Music
        </label>
        <MusicSelectorDetail
          value={form.music_url}
          onChange={(url) => setForm((f) => ({ ...f, music_url: url }))}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={() => mut.mutate()} disabled={mut.isPending} className="h-8">
          {mut.isPending ? "Saving…" : "Save"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="h-8">
          Cancel
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Music player ────────────────────────────────────────────────── */

function MusicPlayer({ url, title, mediaId, onDeleted }: { url: string; title: string; mediaId: string; onDeleted: () => void }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("music-volume") : null;
    return saved !== null ? Number(saved) : 0.7;
  });
  const [muted, setMuted] = useState(false);
  const delMusic = useServerFn(deleteMediaMusic);

  const deleteMusic = useMutation({
    mutationFn: async () => {
      const a = ref.current;
      if (a) { a.pause(); setPlaying(false); }
      return delMusic({ data: { id: mediaId } });
    },
    onSuccess: () => { toast.success("Music removed"); onDeleted(); },
    onError: () => toast.error("Failed to remove music"),
  });

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
    a.play().then(() => setPlaying(true)).catch(() => { });
  }, []);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => toast.error("Could not play audio")); }
  };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className={`fixed bottom-5 left-5 z-50 overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-2xl backdrop-blur-2xl transition-all ${minimized ? "w-auto" : "w-72"}`}
    >
      <audio ref={ref} src={url} onEnded={() => setPlaying(false)} preload="none" />

      {/* Subtle top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {minimized ? (
        <div className="flex items-center gap-3 px-3 py-2">
          <button
            onClick={toggle}
            className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 translate-x-0.5" />}
          </button>
          <div className="max-w-[120px]">
            <p className="line-clamp-1 text-xs font-semibold">{title}</p>
          </div>
          <button
            onClick={() => setMinimized(false)}
            title="Expand"
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ml-1"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Play/pause */}
            <button
              onClick={toggle}
              className="h-11 w-11 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
            </button>

            {/* Title + EQ */}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-semibold">{title}</p>
              <div className="mt-1.5 flex h-3 items-end gap-[3px]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-primary/70"
                    animate={playing ? {
                      height: ["30%", "100%", "50%", "80%", "30%"],
                    } : { height: "20%" }}
                    transition={playing ? {
                      duration: 0.6 + i * 0.07,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: i * 0.1,
                    } : {}}
                    style={{ display: "block" }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setMinimized(true)}
                title="Minimize"
                className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => setMuted((m) => !m)}
                className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              <ConfirmDialog
                trigger={
                  <button
                    title="Remove music"
                    className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                }
                title="Remove music"
                description="Remove the music track from this media?"
                confirmLabel="Remove"
                onConfirm={() => deleteMusic.mutate()}
                disabled={deleteMusic.isPending}
              />
            </div>
          </div>

          {/* Volume slider */}
          <Slider
            value={[volume * 100]}
            min={0} max={100} step={1}
            onValueChange={(v) => {
              const val = v[0] / 100;
              setVolume(val);
              localStorage.setItem("music-volume", String(val));
            }}
          />
        </div>
      )}
    </motion.div>
  );
}