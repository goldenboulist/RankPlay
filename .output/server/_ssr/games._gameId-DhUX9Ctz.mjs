import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { g as getGame, u as updateGame, a as createCategory, b as upsertRating, e as deleteRating, f as deleteCategory, h as updateCategoryCoefficient, i as deleteGameMusic, j as setGameStatus, l as listGames } from "./games.functions-DGuPoniN.mjs";
import { c as computeOverall, w as withOverall } from "./scoring-DaYUboHb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { p as parseDecimal, S as Slider } from "./slider-BEs5bBs7.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { N as Route$1, G as ArrowLeft, M as Music2, J as ChevronUp, j as Plus, g as Check, X, y as Trash2 } from "./router-z7_BG863.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as describeError } from "./error-message-BA287X-o.mjs";
import { C as ConfirmDialog } from "./confirm-dialog-CGd4zKgK.mjs";
import { C as CATEGORY_ICONS } from "./category-icons-CF4rui85.mjs";
import { M as MusicPicker } from "./music-picker-NZDtCZBw.mjs";
import { M as MusicPlayer } from "./music-player-BysIg9DT.mjs";
import { u as useItemSequence, I as ItemNavigator } from "./item-navigator-DNbQuAYG.mjs";
import { S as StatusPicker, G as GenrePlatformFields } from "./game-fields-CoY1jMjM.mjs";
import { s as splitGenres } from "./game-meta-6uk4yxsb.mjs";
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
import "./server-BhBj06PP.mjs";
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
import "./auth-middleware-PUlRi-fz.mjs";
import "./types-B16xxWPT.mjs";
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
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/cmdk.mjs";
import "./label-JU3yqRBo.mjs";
import "../_libs/radix-ui__react-label.mjs";
function GameDetail() {
  const {
    gameId
  } = Route$1.useParams();
  const qc = useQueryClient();
  const list = useServerFn(listGames);
  const get = useServerFn(getGame);
  const all = useQuery({
    queryKey: ["games"],
    queryFn: () => list()
  });
  const detail = useQuery({
    queryKey: ["games", gameId],
    queryFn: () => get({
      data: {
        id: gameId
      }
    })
  });
  const ratings = reactExports.useMemo(() => {
    if (!all.data || !detail.data) return [];
    const others = all.data.ratings.filter((r) => r.game_id !== gameId);
    return [...others, ...detail.data.ratings];
  }, [all.data, detail.data, gameId]);
  const overall = detail.data ? computeOverall(gameId, ratings, all.data?.categories ?? []) : null;
  const allWithOverall = reactExports.useMemo(() => all.data ? withOverall(all.data.games, ratings, all.data.categories ?? []) : [], [all.data, ratings]);
  const sortedByScore = reactExports.useMemo(() => allWithOverall.filter((g) => g.overall !== null).sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0)), [allWithOverall]);
  const neighbors = reactExports.useMemo(() => {
    if (overall === null) return {
      above: [],
      below: []
    };
    const others = sortedByScore.filter((g) => g.id !== gameId);
    const above = others.filter((g) => (g.overall ?? 0) > overall).slice(-3).reverse();
    const below = others.filter((g) => (g.overall ?? 0) < overall).slice(0, 3);
    return {
      above,
      below
    };
  }, [sortedByScore, overall, gameId]);
  const navigate = useNavigate();
  const scoreOrder = reactExports.useMemo(() => [...allWithOverall].sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1) || a.title.localeCompare(b.title)).map((g) => g.id), [allWithOverall]);
  const sequence = useItemSequence("games", gameId, all.data?.games ?? [], scoreOrder);
  const goTo = reactExports.useCallback((id) => navigate({
    to: "/games/$gameId",
    params: {
      gameId: id
    },
    replace: true
  }), [navigate]);
  reactExports.useEffect(() => {
    for (const item of [sequence.prev, sequence.next]) {
      if (item) qc.prefetchQuery({
        queryKey: ["games", item.id],
        queryFn: () => get({
          data: {
            id: item.id
          }
        }),
        staleTime: 3e4
      });
    }
  }, [sequence.prev, sequence.next, qc, get]);
  const removeMusic = useServerFn(deleteGameMusic);
  const saveStatus = useServerFn(setGameStatus);
  const statusMut = useMutation({
    mutationFn: (status) => saveStatus({
      data: {
        id: gameId,
        status
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["games", gameId]
      });
      qc.invalidateQueries({
        queryKey: ["games"],
        exact: true
      });
    },
    onError: (e) => toast.error(describeError("update the status", e))
  });
  if (all.isLoading || detail.isLoading || !all.data || !detail.data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  }
  const {
    game
  } = detail.data;
  const categories = all.data.categories;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, className: "space-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [
      game.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 scale-110", style: {
        backgroundImage: `url(${game.cover_url})`,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to library" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-6 p-6 sm:p-8 md:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 sm:w-36 md:w-44 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10", children: game.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: game.cover_url, alt: game.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center bg-gradient-to-br from-primary/30 to-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-10 w-10 text-muted-foreground/50" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-end gap-3 py-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-1.5", children: "Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight line-clamp-2", children: game.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
            game.release_date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(game.release_date).getFullYear() }),
            game.hours_played != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Number(game.hours_played),
                "h played"
              ] })
            ] }),
            game.platform && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: game.platform })
            ] }),
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
          splitGenres(game.genre).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: splitGenres(game.genre).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border/50 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground", children: g }, g)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPicker, { value: game.status, onChange: (status) => statusMut.mutate(status), disabled: statusMut.isPending }),
          (neighbors.above.length > 0 || neighbors.below.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
            neighbors.above.slice(0, 2).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goTo(g.id), className: "inline-flex items-center gap-1 rounded-full bg-muted/50 border border-border/40 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-60", children: "↑" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: g.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-70", children: g.overall?.toFixed(1) })
            ] }, g.id)),
            neighbors.below.slice(0, 2).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goTo(g.id), className: "inline-flex items-center gap-1 rounded-full bg-muted/30 border border-border/30 px-2.5 py-0.5 text-xs text-muted-foreground/60 transition-colors hover:border-primary/40 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-60", children: "↓" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: g.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-60", children: g.overall?.toFixed(1) })
            ] }, g.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditMetaCard, { game, onSaved: () => qc.invalidateQueries({
        queryKey: ["games"]
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-wide text-muted-foreground uppercase", children: "Ratings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AddCategoryButton, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[70vh] overflow-y-auto pr-1", children: categories.map((cat) => {
          const r = detail.data.ratings.find((x) => x.category_id === cat.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(RatingRow, { gameId, categoryId: cat.id, categoryName: cat.name, icon: cat.icon, isDefault: cat.is_default, score: r ? Number(r.score) : null, coefficient: Number(cat.coefficient ?? 1), allRatings: ratings, allGames: all.data.games.filter((g) => g.id !== gameId).map((g) => ({
            id: g.id,
            title: g.title
          })) }, cat.id);
        }) })
      ] })
    ] }),
    game.music_url && /* @__PURE__ */ jsxRuntimeExports.jsx(MusicPlayer, { url: game.music_url, start: game.music_start, title: game.title, removeDescription: "Remove the music track from this game?", onRemove: () => removeMusic({
      data: {
        id: game.id
      }
    }).then(() => {
      toast.success("Music removed");
      qc.invalidateQueries({
        queryKey: ["games"]
      });
    }).catch((e) => toast.error(describeError("remove the music", e))) }, `${game.id}:${game.music_url}:${game.music_start ?? 0}`)
  ] }, gameId);
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
  gameId,
  categoryId,
  categoryName,
  icon,
  isDefault,
  score,
  coefficient,
  allRatings,
  allGames
}) {
  const qc = useQueryClient();
  const up = useServerFn(upsertRating);
  const del = useServerFn(deleteRating);
  const delCat = useServerFn(deleteCategory);
  const [local, setLocal] = reactExports.useState(score ?? 5);
  const [focused, setFocused] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (score !== null) setLocal(score);
  }, [score]);
  const save = useMutation({
    mutationFn: (val) => up({
      data: {
        game_id: gameId,
        category_id: categoryId,
        score: val
      }
    }),
    onSuccess: () => qc.invalidateQueries(),
    onError: (e) => toast.error(describeError(`save the “${categoryName}” rating`, e))
  });
  const remove = useMutation({
    mutationFn: () => del({
      data: {
        game_id: gameId,
        category_id: categoryId
      }
    }),
    onSuccess: () => qc.invalidateQueries(),
    onError: (e) => toast.error(describeError(`clear the “${categoryName}” rating`, e))
  });
  const removeCat = useMutation({
    mutationFn: () => delCat({
      data: {
        id: categoryId
      }
    }),
    onSuccess: () => qc.invalidateQueries(),
    onError: (e) => toast.error(describeError(`delete the category “${categoryName}”`, e))
  });
  const updateCoeff = useServerFn(updateCategoryCoefficient);
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
    onError: (e) => toast.error(describeError(`update the weight of “${categoryName}”`, e))
  });
  const categoryNeighbors = reactExports.useMemo(() => {
    const othersWithScore = allRatings.filter((r) => r.category_id === categoryId && r.game_id !== gameId).flatMap((r) => {
      const g = allGames.find((x) => x.id === r.game_id);
      return g ? [{
        id: g.id,
        title: g.title,
        score: Number(r.score)
      }] : [];
    });
    const sorted = [...othersWithScore].sort((a, b) => b.score - a.score);
    const above = sorted.filter((g) => g.score > local).slice(-3).reverse();
    const below = sorted.filter((g) => g.score < local).slice(0, 3);
    return {
      above,
      below
    };
  }, [allRatings, allGames, categoryId, gameId, local]);
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
      categoryNeighbors.above.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 text-[10px]", children: "↑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-muted-foreground", children: g.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground tabular-nums", children: g.score.toFixed(1) })
      ] }, g.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 my-1.5" }),
      categoryNeighbors.below.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 text-[10px]", children: "↓" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-muted-foreground/60", children: g.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground/60 tabular-nums", children: g.score.toFixed(1) })
      ] }, g.id))
    ] }) }) })
  ] });
}
function AddCategoryButton() {
  const [open, setOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [icon, setIcon] = reactExports.useState("");
  const [coefficient, setCoefficient] = reactExports.useState(1);
  const qc = useQueryClient();
  const create = useServerFn(createCategory);
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
    onError: (e) => toast.error(describeError(`create the category “${name}”`, e))
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
  game,
  onSaved
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: game.title,
    cover_url: game.cover_url ?? "",
    release_date: game.release_date ?? "",
    music_url: game.music_url ?? "",
    music_start: game.music_start,
    hours_played: game.hours_played != null ? String(game.hours_played) : "",
    genre: game.genre ?? "",
    platform: game.platform ?? ""
  });
  const update = useServerFn(updateGame);
  const mut = useMutation({
    mutationFn: () => update({
      data: {
        id: game.id,
        ...form,
        cover_url: form.cover_url || null,
        release_date: form.release_date || null,
        music_url: form.music_url || null,
        music_start: form.music_url ? form.music_start : null,
        hours_played: parseDecimal(form.hours_played),
        genre: form.genre || null,
        platform: form.platform || null
      }
    }),
    onSuccess: () => {
      toast.success("Saved");
      setEditing(false);
      onSaved();
    },
    onError: (e) => toast.error(describeError("save your changes", e))
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Release date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.release_date, onChange: (e) => setForm({
          ...form,
          release_date: e.target.value
        }), className: "h-8 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Hours played" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", max: "99999", step: "any", inputMode: "decimal", value: form.hours_played, onChange: (e) => setForm({
          ...form,
          hours_played: e.target.value
        }), placeholder: "0.0", className: "h-8 text-sm" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GenrePlatformFields, { compact: true, genre: form.genre, platform: form.platform, onChange: (patch) => setForm((f) => ({
      ...f,
      ...patch
    })) }),
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
  GameDetail as component
};
