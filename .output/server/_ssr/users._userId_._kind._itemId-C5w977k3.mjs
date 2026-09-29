import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as getUserDashboard } from "./users.functions-gFHApHCx.mjs";
import { w as withOverall } from "./scoring-DaYUboHb.mjs";
import { W as Route, D as UserCircle, m as Tv, F as Film, G as ArrowLeft, M as Music2, H as Heart } from "./router-B00edaQI.mjs";
import { C as CATEGORY_ICONS } from "./category-icons-C_t9wQei.mjs";
import { M as MusicPlayer } from "./music-player-BqZ6qqnT.mjs";
import { u as useItemSequence, I as ItemNavigator } from "./item-navigator-C276qtZd.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "./server-BzaL-fNz.mjs";
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
import "./auth-middleware-D7PVwcUc.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "./slider-BEs5bBs7.mjs";
import "../_libs/radix-ui__react-slider.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./confirm-dialog-CGd4zKgK.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./button-DA2gxxPy.mjs";
import "../_libs/class-variance-authority.mjs";
import "./error-message-BA287X-o.mjs";
function MemberItemDetail() {
  const {
    userId,
    kind,
    itemId
  } = Route.useParams();
  const isGames = kind === "games";
  const idKey = isGames ? "game_id" : "media_id";
  const fetchUserDashboard = useServerFn(getUserDashboard);
  const query = useQuery({
    queryKey: ["user-dashboard", userId],
    queryFn: () => fetchUserDashboard({
      data: {
        userId
      }
    })
  });
  const lib = reactExports.useMemo(() => {
    if (!query.data) return null;
    const src = isGames ? query.data.games : query.data.media;
    return {
      items: isGames ? query.data.games.games : query.data.media.media,
      ratings: src.ratings,
      categories: src.categories,
      favoriteIds: src.favoriteIds
    };
  }, [query.data, isGames]);
  const allWithOverall = reactExports.useMemo(() => lib ? withOverall(lib.items, lib.ratings, lib.categories, idKey) : [], [lib, idKey]);
  const item = allWithOverall.find((x) => x.id === itemId) ?? null;
  const overall = item?.overall ?? null;
  const neighbors = reactExports.useMemo(() => {
    if (overall === null) return {
      above: [],
      below: []
    };
    const others = allWithOverall.filter((x) => x.overall !== null && x.id !== itemId).sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0));
    const above = others.filter((x) => (x.overall ?? 0) > overall).slice(-3).reverse();
    const below = others.filter((x) => (x.overall ?? 0) < overall).slice(0, 3);
    return {
      above,
      below
    };
  }, [allWithOverall, overall, itemId]);
  const navigate = useNavigate();
  const scoreOrder = reactExports.useMemo(() => [...allWithOverall].sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1) || a.title.localeCompare(b.title)).map((x) => x.id), [allWithOverall]);
  const sequence = useItemSequence(isGames ? "user-games" : "user-media", itemId, lib?.items ?? [], scoreOrder);
  const goTo = reactExports.useCallback((id) => navigate({
    to: "/users/$userId/$kind/$itemId",
    params: {
      userId,
      kind,
      itemId: id
    },
    replace: true
  }), [navigate, userId, kind]);
  if (query.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (query.isError || !query.data || !lib || !item) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircle, { className: "h-12 w-12 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
        isGames ? "Game" : "Title",
        " not found"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/users/$userId", params: {
        userId
      }, search: {
        tab: isGames ? void 0 : "media"
      }, className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "← Back to profile" })
    ] });
  }
  const {
    user
  } = query.data;
  const ownerName = user.display_name || "Player";
  const itemRatings = lib.ratings.filter((r) => r[idKey] === itemId);
  const isFavorite = lib.favoriteIds.includes(itemId);
  const TypeIcon = item.media_type === "series" ? Tv : Film;
  const kindLabel = isGames ? "Game" : item.media_type === "series" ? "Series" : "Movie";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, className: "space-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [
      item.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 scale-110", style: {
        backgroundImage: `url(${item.cover_url})`,
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline", children: [
            "Back to ",
            ownerName
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-6 p-6 sm:p-8 md:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 sm:w-36 md:w-44 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10", children: item.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.cover_url, alt: item.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center bg-gradient-to-br from-primary/30 to-muted", children: isGames ? /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-10 w-10 text-muted-foreground/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-10 w-10 text-muted-foreground/50" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-end gap-3 py-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-1.5", children: [
              !isGames && /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-3 w-3" }),
              kindLabel,
              isFavorite && /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "ml-1 h-3 w-3 fill-red-400 text-red-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none line-clamp-2", children: item.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
            item.release_date && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(item.release_date).getFullYear() }),
            item.hours_played != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Number(item.hours_played),
                "h played"
              ] })
            ] }),
            overall !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold tabular-nums text-foreground", children: overall.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "/ 10" })
              ] })
            ] })
          ] }),
          (neighbors.above.length > 0 || neighbors.below.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
            neighbors.above.slice(0, 2).map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goTo(x.id), className: "inline-flex items-center gap-1 rounded-full bg-muted/50 border border-border/40 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-60", children: "↑" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: x.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-70", children: x.overall?.toFixed(1) })
            ] }, x.id)),
            neighbors.below.slice(0, 2).map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => goTo(x.id), className: "inline-flex items-center gap-1 rounded-full bg-muted/30 border border-border/30 px-2.5 py-0.5 text-xs text-muted-foreground/60 transition-colors hover:border-primary/40 hover:text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-60", children: "↓" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[80px]", children: x.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-60", children: x.overall?.toFixed(1) })
            ] }, x.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/50 bg-card px-4 py-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60", children: "Rated by" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/users/$userId", params: {
          userId
        }, search: {
          tab: isGames ? void 0 : "media"
        }, className: "block truncate text-sm font-medium text-foreground hover:text-primary transition-colors", children: ownerName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          itemRatings.length,
          " / ",
          lib.categories.length,
          " categories rated"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-wide text-muted-foreground uppercase", children: "Ratings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[70vh] overflow-y-auto pr-1", children: lib.categories.map((cat) => {
          const r = itemRatings.find((x) => x.category_id === cat.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ReadOnlyRatingRow, { categoryName: cat.name, icon: cat.icon, isDefault: !!cat.is_default, score: r ? Number(r.score) : null, coefficient: Number(cat.coefficient ?? 1) }, cat.id);
        }) })
      ] })
    ] }),
    item.music_url && /* @__PURE__ */ jsxRuntimeExports.jsx(MusicPlayer, { url: item.music_url, start: item.music_start, title: item.title }, `${item.id}:${item.music_url}:${item.music_start ?? 0}`)
  ] }, itemId);
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-28 rounded-full bg-muted/40 animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-muted/20 animate-pulse h-52" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-xl bg-muted/30 animate-pulse" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 rounded-xl bg-muted/20 animate-pulse", style: {
        animationDelay: `${i * 60}ms`
      } }, i)) })
    ] })
  ] });
}
function ReadOnlyRatingRow({
  categoryName,
  icon,
  isDefault,
  score,
  coefficient
}) {
  const IconComp = icon ? CATEGORY_ICONS[icon] : null;
  const rated = score !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: ["rounded-xl border p-4", rated ? "bg-background border-border/50" : "bg-muted/20 border-border/30 opacity-70"].join(" "), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 min-w-0", children: [
        IconComp && /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: "h-4 w-4 text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm truncate", children: categoryName }),
        !isDefault && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary", children: [
          "×",
          coefficient % 1 === 0 ? String(coefficient) : coefficient.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 shrink-0 text-right text-xl font-bold tabular-nums", children: rated ? score.toFixed(1) : "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted", children: rated && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      width: 0
    }, animate: {
      width: `${score * 10}%`
    }, transition: {
      duration: 0.5,
      ease: "easeOut"
    }, className: "h-full rounded-full bg-primary" }) })
  ] });
}
export {
  MemberItemDetail as component
};
