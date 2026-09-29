import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { g as getMedia, u as updateMedia, a as createMediaCategory, b as upsertMediaRating, e as deleteMediaRating, f as deleteMediaCategory, h as updateMediaCategoryCoefficient, i as deleteMediaMusic, l as listMedia } from "./media.functions-CiOpO8vG.mjs";
import { c as computeOverall, w as withOverall } from "./scoring-DaYUboHb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Slider } from "./slider-BEs5bBs7.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { I as Route$3, m as Tv, F as Film, G as ArrowLeft, J as ChevronUp, M as Music2, j as Plus, g as Check, X, y as Trash2 } from "./router-3WV5o_3p.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as ConfirmDialog } from "./confirm-dialog-CGd4zKgK.mjs";
import { C as CATEGORY_ICONS } from "./category-icons-oq1w1fDV.mjs";
import { M as MusicPicker } from "./music-picker-BpNDJwtk.mjs";
import { M as MusicPlayer } from "./music-player-BVfQkqhT.mjs";
import { u as useItemSequence, I as ItemNavigator } from "./item-navigator-rw1p1C5o.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-B4ncXPsG.mjs";
import "node:async_hooks";
import "fs";
import "path";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/jose.mjs";
import "node:crypto";
import "node:util";
import "node:buffer";
import "./auth-middleware-CwhVd4pZ.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slider.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "./games.functions-DwM8oso1.mjs";
import "./types-B16xxWPT.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/cmdk.mjs";
function MediaDetail() {
  const {
    mediaId
  } = Route$3.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listMedia);
  const getFn = useServerFn(getMedia);
  const all = useQuery({
    queryKey: ["media"],
    queryFn: () => listFn()
  });
  const detail = useQuery({
    queryKey: ["media", mediaId],
    queryFn: () => getFn({
      data: {
        id: mediaId
      }
    })
  });
  const ratings = reactExports.useMemo(() => {
    if (!all.data || !detail.data) return [];
    const others = all.data.ratings.filter((r) => r.media_id !== mediaId).map((r) => ({
      ...r,
      game_id: r.media_id
    }));
    const own = detail.data.ratings.map((r) => ({
      ...r,
      game_id: r.media_id
    }));
    return [...others, ...own];
  }, [all.data, detail.data, mediaId]);
  const overall = detail.data ? computeOverall(mediaId, ratings, all.data?.categories ?? []) : null;
  const allWithOverall = reactExports.useMemo(() => all.data ? withOverall(all.data.media.map((m) => ({
    ...m
  })), ratings, all.data.categories ?? []) : [], [all.data, ratings]);
  const sortedByScore = reactExports.useMemo(() => allWithOverall.filter((m) => m.overall !== null).sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0)), [allWithOverall]);
  const neighbors = reactExports.useMemo(() => {
    if (overall === null) return {
      above: [],
      below: []
    };
    const others = sortedByScore.filter((m) => m.id !== mediaId);
    const above = others.filter((m) => (m.overall ?? 0) > overall).slice(-3).reverse();
    const below = others.filter((m) => (m.overall ?? 0) < overall).slice(0, 3);
    return {
      above,
      below
    };
  }, [sortedByScore, overall, mediaId]);
  const navigate = useNavigate();
  const scoreOrder = reactExports.useMemo(() => [...allWithOverall].sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1) || a.title.localeCompare(b.title)).map((m) => m.id), [allWithOverall]);
  const sequence = useItemSequence("media", mediaId, all.data?.media ?? [], scoreOrder);
  const goTo = reactExports.useCallback((id) => navigate({
    to: "/media/$mediaId",
    params: {
      mediaId: id
    },
    replace: true
  }), [navigate]);
  reactExports.useEffect(() => {
    for (const item of [sequence.prev, sequence.next]) {
      if (item) qc.prefetchQuery({
        queryKey: ["media", item.id],
        queryFn: () => getFn({
          data: {
            id: item.id
          }
        }),
        staleTime: 3e4
      });
    }
  }, [sequence.prev, sequence.next, qc, getFn]);
  const removeMusic = useServerFn(deleteMediaMusic);
  if (all.isLoading || detail.isLoading || !all.data || !detail.data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  }
  const {
    media
  } = detail.data;
  const categories = all.data.categories;
  const TypeIcon = media.media_type === "series" ? Tv : Film;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, className: "space-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [
      media.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 scale-110", style: {
        backgroundImage: `url(${media.cover_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(40px) saturate(1.4)",
        opacity: 0.35
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-6 right-6 z-10 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemNavigator, { ...sequence, onNavigate: goTo }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.history.back(), className: "inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background/95 px-4 text-sm font-medium text-foreground shadow-md backdrop-blur transition-all hover:shadow-lg hover:bg-accent hover:text-accent-foreground group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover:-translate-x-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to media" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-6 p-6 sm:p-8 md:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 sm:w-36 md:w-44 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10", children: media.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: media.cover_url, alt: media.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center bg-gradient-to-br from-primary/30 to-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-10 w-10 text-muted-foreground/50" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-end gap-3 py-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-1.5", children: media.media_type === "series" ? "Series" : "Movie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none line-clamp-2", children: media.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
            media.release_date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(media.release_date).getFullYear() }),
            overall !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
                  scale: 1.4,
                  color: "var(--color-primary)"
                }, animate: {
                  scale: 1,
                  color: "currentColor"
                }, className: "text-2xl font-bold tabular-nums text-foreground", children: overall.toFixed(1) }, overall),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "/ 10" })
              ] })
            ] })
          ] }),
          (neighbors.above.length > 0 || neighbors.below.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
            neighbors.above.slice(0, 2).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goTo(m.id), className: "inline-flex items-center gap-1 rounded-full bg-muted/50 border border-border/40 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-60", children: "↑" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: m.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-70", children: m.overall?.toFixed(1) })
            ] }, m.id)),
            neighbors.below.slice(0, 2).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goTo(m.id), className: "inline-flex items-center gap-1 rounded-full bg-muted/30 border border-border/30 px-2.5 py-0.5 text-xs text-muted-foreground/60 transition-colors hover:border-primary/40 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-60", children: "↓" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: m.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-60", children: m.overall?.toFixed(1) })
            ] }, m.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditMetaCard, { media, onSaved: () => {
        qc.invalidateQueries({
          queryKey: ["media"]
        });
        qc.invalidateQueries({
          queryKey: ["media", mediaId]
        });
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-wide text-muted-foreground uppercase", children: "Ratings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AddCategoryButton, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[70vh] overflow-y-auto pr-1", children: categories.map((cat) => {
          const r = detail.data.ratings.find((x) => x.category_id === cat.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(RatingRow, { mediaId, categoryId: cat.id, categoryName: cat.name, icon: cat.icon, isDefault: cat.is_default, score: r ? Number(r.score) : null, coefficient: Number(cat.coefficient ?? 1), allRatings: ratings, allMedia: all.data.media.filter((m) => m.id !== mediaId).map((m) => ({
            id: m.id,
            title: m.title
          })) }, cat.id);
        }) })
      ] })
    ] }),
    media.music_url && /* @__PURE__ */ jsxRuntimeExports.jsx(MusicPlayer, { url: media.music_url, start: media.music_start, title: media.title, removeDescription: "Remove the music track from this title?", onRemove: () => removeMusic({
      data: {
        id: media.id
      }
    }).then(() => {
      toast.success("Music removed");
      qc.invalidateQueries({
        queryKey: ["media"]
      });
    }).catch(() => toast.error("Failed to remove music")) }, `${media.id}:${media.music_url}:${media.music_start ?? 0}`)
  ] }, mediaId);
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-28 rounded-full bg-muted/40 animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-muted/20 animate-pulse h-52" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-xl bg-muted/30 animate-pulse" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-xl bg-muted/20 animate-pulse", style: {
        animationDelay: `${i * 60}ms`
      } }, i)) })
    ] })
  ] });
}
function RatingRow({
  mediaId,
  categoryId,
  categoryName,
  icon,
  isDefault,
  score,
  coefficient,
  allRatings,
  allMedia
}) {
  const qc = useQueryClient();
  const up = useServerFn(upsertMediaRating);
  const del = useServerFn(deleteMediaRating);
  const delCat = useServerFn(deleteMediaCategory);
  const [local, setLocal] = reactExports.useState(score ?? 5);
  const [focused, setFocused] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (score !== null) setLocal(score);
  }, [score]);
  const save = useMutation({
    mutationFn: (val) => up({
      data: {
        media_id: mediaId,
        category_id: categoryId,
        score: val
      }
    }),
    onSuccess: () => qc.invalidateQueries()
  });
  const remove = useMutation({
    mutationFn: () => del({
      data: {
        media_id: mediaId,
        category_id: categoryId
      }
    }),
    onSuccess: () => qc.invalidateQueries()
  });
  const removeCat = useMutation({
    mutationFn: () => delCat({
      data: {
        id: categoryId
      }
    }),
    onSuccess: () => qc.invalidateQueries()
  });
  const updateCoeff = useServerFn(updateMediaCategoryCoefficient);
  const [editingCoeff, setEditingCoeff] = reactExports.useState(false);
  const [localCoeff, setLocalCoeff] = reactExports.useState(coefficient);
  const saveCoeff = useMutation({
    mutationFn: (val) => updateCoeff({
      data: {
        id: categoryId,
        coefficient: val
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries();
      setEditingCoeff(false);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  const categoryNeighbors = reactExports.useMemo(() => {
    const othersWithScore = allRatings.filter((r) => r.category_id === categoryId && r.game_id !== mediaId).flatMap((r) => {
      const m = allMedia.find((x) => x.id === r.game_id);
      return m ? [{
        id: m.id,
        title: m.title,
        score: Number(r.score)
      }] : [];
    });
    const sorted = [...othersWithScore].sort((a, b) => b.score - a.score);
    const above = sorted.filter((m) => m.score > local).slice(-3).reverse();
    const below = sorted.filter((m) => m.score < local).slice(0, 3);
    return {
      above,
      below
    };
  }, [allRatings, allMedia, categoryId, mediaId, local]);
  const IconComp = icon ? CATEGORY_ICONS[icon] : null;
  const rated = score !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: ["rounded-xl border p-4 transition-colors", rated ? "bg-background border-border/50" : "bg-muted/20 border-border/30 opacity-70 hover:opacity-100"].join(" "), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 min-w-0", children: [
        IconComp && /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: "h-4 w-4 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm truncate", children: categoryName }),
        !isDefault && (editingCoeff ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          saveCoeff.mutate(localCoeff);
        }, className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "×" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 100, step: 0.1, value: localCoeff, onChange: (e) => setLocalCoeff(Number(e.target.value)), className: "w-12 h-6 rounded border border-border bg-background px-1 text-xs text-center font-mono", autoFocus: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "grid h-6 w-6 place-items-center rounded text-primary hover:bg-primary/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setLocalCoeff(coefficient);
            setEditingCoeff(false);
          }, className: "grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-muted/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setLocalCoeff(coefficient);
          setEditingCoeff(true);
        }, className: "shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary hover:bg-primary/20 transition-colors", children: [
          "×",
          coefficient.toFixed(2) === "1.00" ? "1" : coefficient % 1 === 0 ? String(coefficient) : coefficient.toFixed(2)
        ] }))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        rated && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove.mutate(), className: "text-muted-foreground/40 hover:text-destructive transition-colors", "aria-label": "Remove rating", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }),
        !isDefault && !editingCoeff && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-muted-foreground/40 hover:text-destructive transition-colors", "aria-label": "Remove category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }), title: "Remove category", description: `Remove the "${categoryName}" category? This will also delete all ratings for this category.`, confirmLabel: "Remove", onConfirm: () => removeCat.mutate() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
          scale: 1.25,
          color: "var(--color-primary)"
        }, animate: {
          scale: 1,
          color: "var(--color-foreground)"
        }, className: "w-10 text-right text-xl font-bold tabular-nums", children: local.toFixed(1) }, local)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { value: [local], min: 0, max: 10, step: 0.1, onValueChange: (v) => {
      setLocal(v[0]);
      setFocused(true);
    }, onValueCommit: (v) => save.mutate(v[0]), className: "mt-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: focused && (categoryNeighbors.above.length > 0 || categoryNeighbors.below.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      height: 0
    }, animate: {
      opacity: 1,
      height: "auto"
    }, exit: {
      opacity: 0,
      height: 0
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-lg bg-muted/40 border border-border/30 p-3 text-xs space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 mb-2", children: [
        "Nearby — ",
        categoryName
      ] }),
      categoryNeighbors.above.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 text-[10px]", children: "↑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-muted-foreground", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground tabular-nums", children: m.score.toFixed(1) })
      ] }, m.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 my-1.5" }),
      categoryNeighbors.below.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 text-[10px]", children: "↓" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-muted-foreground/60", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground/60 tabular-nums", children: m.score.toFixed(1) })
      ] }, m.id))
    ] }) }) })
  ] });
}
function AddCategoryButton() {
  const [open, setOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [icon, setIcon] = reactExports.useState("");
  const [coefficient, setCoefficient] = reactExports.useState(1);
  const qc = useQueryClient();
  const create = useServerFn(createMediaCategory);
  const mut = useMutation({
    mutationFn: () => create({
      data: {
        name,
        icon: icon || null,
        coefficient
      }
    }),
    onSuccess: () => {
      setName("");
      setIcon("");
      setCoefficient(1);
      setOpen(false);
      qc.invalidateQueries();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed")
  });
  if (!open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setOpen(true), className: "h-7 gap-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
      "Add category"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    if (name.trim()) mut.mutate();
  }, className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: icon, onValueChange: setIcon, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[120px] h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Icon" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No icon" }),
        Object.keys(CATEGORY_ICONS).map((key) => {
          const IconComponent = CATEGORY_ICONS[key];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: key, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-3.5 h-3.5" }),
            key
          ] }) }, key);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "Category name", className: "h-8 w-36 text-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "×" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 100, step: 0.1, value: coefficient, onChange: (e) => setCoefficient(Number(e.target.value)), title: "Weight coefficient", className: "w-14 h-8 rounded border border-border bg-background px-2 text-xs text-center font-mono" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", type: "submit", className: "h-8", children: "Add" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", type: "button", onClick: () => setOpen(false), className: "h-8", children: "Cancel" })
  ] });
}
function EditMetaCard({
  media,
  onSaved
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: media.title,
    media_type: media.media_type,
    cover_url: media.cover_url ?? "",
    release_date: media.release_date ?? "",
    music_url: media.music_url ?? "",
    music_start: media.music_start
  });
  const update = useServerFn(updateMedia);
  const mut = useMutation({
    mutationFn: () => update({
      data: {
        id: media.id,
        ...form,
        cover_url: form.cover_url || null,
        release_date: form.release_date || null,
        music_url: form.music_url || null,
        music_start: form.music_url ? form.music_start : null
      }
    }),
    onSuccess: () => {
      toast.success("Saved");
      setEditing(false);
      onSaved();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to save")
  });
  if (!editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(true), className: "w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors text-left", children: "Edit details…" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 4
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-xl border border-border/60 bg-card p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(false), className: "flex w-full items-center justify-between rounded-lg px-1 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Edit details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["movie", "series"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setForm((f) => ({
        ...f,
        media_type: t
      })), className: `flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium border transition-all ${form.media_type === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`, children: [
        t === "movie" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-3.5 w-3.5" }),
        t === "movie" ? "Movie" : "Series"
      ] }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
        ...form,
        title: e.target.value
      }), className: "h-8 text-sm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Cover URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.cover_url, onChange: (e) => setForm({
        ...form,
        cover_url: e.target.value
      }), placeholder: "https://…", className: "h-8 text-sm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Release date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.release_date, onChange: (e) => setForm({
        ...form,
        release_date: e.target.value
      }), className: "h-8 text-sm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3 w-3" }),
        " Music"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MusicPicker, { value: {
        url: form.music_url,
        start: form.music_start
      }, onChange: ({
        url,
        start
      }) => setForm((f) => ({
        ...f,
        music_url: url,
        music_start: start
      })) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => mut.mutate(), disabled: mut.isPending, className: "h-8", children: mut.isPending ? "Saving…" : "Save" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditing(false), className: "h-8", children: "Cancel" })
    ] })
  ] });
}
export {
  MediaDetail as component
};
