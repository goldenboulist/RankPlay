import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createGame, t as toggleFavorite, d as deleteGame, l as listGames } from "./games.functions-D5V1gS5a.mjs";
import { s as searchSteamGames, g as getSteamGameDetails } from "./steam.functions-CtBFb_dc.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, C as CatalogSearch, e as DialogFooter } from "./catalog-search-fUaPIcEp.mjs";
import { s as splitGenres, S as STATUS_LABELS, a as STATUS_STYLES } from "./game-meta-6uk4yxsb.mjs";
import { w as withOverall } from "./scoring-DaYUboHb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { z as Route$5, v as LayoutGrid, H as Heart, o as Star, A as Layers, w as Search, x as SlidersHorizontal, j as Plus, M as Music2, y as Trash2 } from "./router-B00edaQI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as describeError } from "./error-message-BA287X-o.mjs";
import { C as ConfirmDialog } from "./confirm-dialog-CGd4zKgK.mjs";
import { C as CATEGORY_ICONS } from "./category-icons-C_t9wQei.mjs";
import { M as MusicPicker } from "./music-picker-CxckuJha.mjs";
import { G as GenrePlatformFields, S as StatusPicker } from "./game-fields-CoY1jMjM.mjs";
import { r as rememberSequence } from "./item-navigator-C276qtZd.mjs";
import { p as parseDecimal } from "./slider-BEs5bBs7.mjs";
import { G as GAME_STATUSES } from "./types-B16xxWPT.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-slider.mjs";
function GamesPage() {
  const list = useServerFn(listGames);
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["games"],
    queryFn: () => list()
  });
  const {
    category,
    search,
    sort,
    favOnly,
    status = "all",
    genre = "all",
    platform = "all"
  } = Route$5.useSearch();
  const navigate = useNavigate({
    from: Route$5.fullPath
  });
  const categoryFilter = category ?? "all";
  const setCategoryFilter = (v) => navigate({
    search: (prev) => ({
      ...prev,
      category: v
    }),
    replace: true
  });
  const setSearch = (v) => navigate({
    search: (prev) => ({
      ...prev,
      search: v
    }),
    replace: true
  });
  const setSort = (v) => navigate({
    search: (prev) => ({
      ...prev,
      sort: v
    }),
    replace: true
  });
  const setFavOnly = (fn) => navigate({
    search: (prev) => ({
      ...prev,
      favOnly: fn(prev.favOnly ?? false)
    }),
    replace: true
  });
  const setFilter = (key, v) => navigate({
    search: (prev) => ({
      ...prev,
      [key]: v
    }),
    replace: true
  });
  const genres = reactExports.useMemo(() => [...new Set(query.data?.games.flatMap((g) => splitGenres(g.genre)) ?? [])].sort(), [query.data]);
  const platforms = reactExports.useMemo(() => [...new Set(query.data?.games.map((g) => g.platform).filter((p) => !!p) ?? [])].sort(), [query.data]);
  reactExports.useEffect(() => {
    if (!query.data) return;
    const id = sessionStorage.getItem("scrollToGame");
    if (!id) return;
    sessionStorage.removeItem("scrollToGame");
    const el = document.getElementById("game-" + id);
    if (el) el.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }, [query.data]);
  const enriched = reactExports.useMemo(() => {
    if (!query.data) return [];
    const favSet = new Set(query.data.favoriteIds);
    let games = withOverall(query.data.games, query.data.ratings, query.data.categories).map((g) => ({
      ...g,
      isFavorite: favSet.has(g.id)
    }));
    if (search.trim()) {
      const s = search.toLowerCase();
      games = games.filter((g) => g.title.toLowerCase().includes(s));
    }
    if (categoryFilter !== "all") {
      games = games.filter((g) => query.data?.ratings.some((r) => r.game_id === g.id && r.category_id === categoryFilter));
    }
    if (favOnly) games = games.filter((g) => g.isFavorite);
    if (status === "none") games = games.filter((g) => !g.status);
    else if (status !== "all") games = games.filter((g) => g.status === status);
    if (genre !== "all") games = games.filter((g) => splitGenres(g.genre).includes(genre));
    if (platform !== "all") games = games.filter((g) => g.platform === platform);
    games.sort((a, b) => {
      if (sort === "score_desc") {
        if (categoryFilter !== "all") {
          const rA = query.data?.ratings.find((r) => r.game_id === a.id && r.category_id === categoryFilter);
          const rB = query.data?.ratings.find((r) => r.game_id === b.id && r.category_id === categoryFilter);
          return (Number(rB?.score) || -1) - (Number(rA?.score) || -1);
        }
        return (b.overall ?? -1) - (a.overall ?? -1);
      }
      if (sort === "score_asc") {
        if (categoryFilter !== "all") {
          const rA = query.data?.ratings.find((r) => r.game_id === a.id && r.category_id === categoryFilter);
          const rB = query.data?.ratings.find((r) => r.game_id === b.id && r.category_id === categoryFilter);
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
  reactExports.useEffect(() => {
    if (query.data) rememberSequence("games", enriched.map((g) => g.id));
  }, [enriched, query.data]);
  if (query.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  const totalFavs = query.data?.favoriteIds.length ?? 0;
  const ratedCount = query.data ? new Set(query.data.ratings.map((r) => r.game_id)).size : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tracking-widest uppercase text-muted-foreground/60 select-none", children: "Library" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight leading-none", children: "My Games" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              query.data?.games.length ?? 0,
              " titles"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              totalFavs,
              " favorites"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              ratedCount,
              " rated"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/games/tiers", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
          "Tier list"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AddGameDialog, { onCreated: () => qc.invalidateQueries({
          queryKey: ["games"]
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search titles…", className: "pl-9 h-9 text-sm bg-muted/30 border-border/50 focus:bg-background" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-9 w-auto min-w-[140px] text-sm gap-1.5 bg-muted/30 border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All categories" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All categories" }),
            query.data?.categories.filter((c) => !c.is_default).map((c) => {
              const Icon = c.icon && CATEGORY_ICONS[c.icon];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.name })
              ] }) }, c.id);
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: (v) => setFilter("status", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-auto min-w-[130px] text-sm bg-muted/30 border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
            GAME_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: STATUS_LABELS[s] }, s)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No status" })
          ] })
        ] }),
        genres.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: genre, onValueChange: (v) => setFilter("genre", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-auto min-w-[120px] text-sm bg-muted/30 border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All genres" }),
            genres.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g))
          ] })
        ] }),
        platforms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: platform, onValueChange: (v) => setFilter("platform", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-auto min-w-[130px] text-sm bg-muted/30 border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All platforms" }),
            platforms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: setSort, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-auto min-w-[180px] text-sm bg-muted/30 border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "score_desc", children: categoryFilter === "all" ? "Score: High → Low" : "Category: High → Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "score_asc", children: categoryFilter === "all" ? "Score: Low → High" : "Category: Low → High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "title", children: "Title (A–Z)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "release", children: "Newest release" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFavOnly((v) => !v), className: ["inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium transition-colors", favOnly ? "bg-primary text-primary-foreground" : "bg-muted/30 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/60"].join(" "), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-3.5 w-3.5 ${favOnly ? "fill-current" : ""}` }),
          "Favorites"
        ] })
      ] })
    ] }),
    (search || categoryFilter !== "all" || favOnly || status !== "all" || genre !== "all" || platform !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
      opacity: 0,
      y: -4
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-xs text-muted-foreground -mt-4", children: [
      "Showing ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: enriched.length }),
      " ",
      enriched.length === 1 ? "game" : "games",
      search && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " matching ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
          '"',
          search,
          '"'
        ] })
      ] }),
      categoryFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: query.data?.categories.find((c) => c.id === categoryFilter)?.name })
      ] }),
      status !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " · ",
        status === "none" ? "no status" : STATUS_LABELS[status]
      ] }),
      genre !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " · ",
        genre
      ] }),
      platform !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " · ",
        platform
      ] }),
      favOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: " · favorites only" })
    ] }),
    enriched.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { hasFilters: !!(search || categoryFilter !== "all" || favOnly || status !== "all" || genre !== "all" || platform !== "all") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: enriched.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      scale: 0.88
    }, transition: {
      duration: 0.2,
      delay: Math.min(i * 0.018, 0.28)
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "game-" + g.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameCard, { game: g, categoryFilter, ratings: query.data?.ratings ?? [], categories: query.data?.categories ?? [] }) }) }, g.id)) }) })
  ] });
}
function EmptyState({
  hasFilters
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "flex flex-col items-center justify-center py-24 text-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-muted/50 rotate-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-muted/30 -rotate-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid place-items-center h-full rounded-2xl bg-muted/60 border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 text-muted-foreground/60" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: hasFilters ? "No games match your filters" : "Your library is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[240px]", children: hasFilters ? "Try adjusting your search or filters to find what you're looking for." : "Add your first game to start building your ranking." })
    ] })
  ] });
}
function PageLoading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pb-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 rounded-full bg-muted/50 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-40 rounded-lg bg-muted/50 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-48 rounded-full bg-muted/30 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8", children: Array.from({
      length: 12
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-xl bg-muted/30 animate-pulse", style: {
      animationDelay: `${i * 40}ms`
    } }, i)) })
  ] });
}
function GameCard({
  game,
  categoryFilter = "all",
  ratings = [],
  categories = []
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fav = useServerFn(toggleFavorite);
  const del = useServerFn(deleteGame);
  const handleCardClick = () => {
    sessionStorage.setItem("scrollToGame", game.id);
    navigate({
      to: "/games/$gameId",
      params: {
        gameId: game.id
      }
    });
  };
  const activeCategoryScore = categoryFilter !== "all" ? (() => {
    const r = ratings.find((x) => x.game_id === game.id && x.category_id === categoryFilter);
    return r ? Number(r.score) : null;
  })() : null;
  const activeCategoryName = categoryFilter !== "all" ? categories.find((c) => c.id === categoryFilter)?.name ?? null : null;
  const toggleFav = useMutation({
    mutationFn: () => fav({
      data: {
        id: game.id,
        favorite: !game.isFavorite
      }
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["games"]
    }),
    onError: (e) => toast.error(describeError(`update favorites for “${game.title}”`, e))
  });
  const removeGame = useMutation({
    mutationFn: () => del({
      data: {
        id: game.id
      }
    }),
    onSuccess: () => {
      toast.success("Game removed");
      qc.invalidateQueries({
        queryKey: ["games"]
      });
    },
    onError: (e) => toast.error(describeError(`remove “${game.title}”`, e))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: handleCardClick, className: "group relative block overflow-hidden rounded-xl cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] bg-muted overflow-hidden", children: [
      game.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: game.cover_url, alt: game.title, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center bg-gradient-to-br from-muted to-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-8 w-8 text-muted-foreground/40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" }),
      game.status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold shadow ${STATUS_STYLES[game.status]}`, children: STATUS_LABELS[game.status] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
        e.stopPropagation();
        toggleFav.mutate();
      }, className: ["absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full", "bg-black/40 backdrop-blur-sm border border-white/10", "opacity-0 group-hover:opacity-100 transition-all duration-200", "hover:bg-black/60 hover:scale-110"].join(" "), "aria-label": "Toggle favorite", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-3.5 w-3.5 transition-colors ${game.isFavorite ? "fill-red-400 text-red-400" : "text-white/70"}` }) }),
      game.isFavorite && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 group-hover:opacity-0 transition-opacity pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 fill-red-400 text-red-400" }) }),
      game.overall !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 0,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, transition: {
        type: "spring",
        stiffness: 200,
        damping: 18
      }, className: ["absolute bottom-2 left-2 h-10 w-10 grid place-items-center rounded-full", "bg-primary text-primary-foreground font-bold text-sm", "shadow-lg ring-2 ring-black/20", categoryFilter !== "all" ? "opacity-60 scale-90" : ""].join(" "), children: game.overall.toFixed(1) }),
      activeCategoryScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        scale: 0,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, className: "absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground px-2 py-1 shadow-lg ring-1 ring-black/20 min-w-[44px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium leading-none opacity-75 truncate max-w-[52px]", children: activeCategoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold leading-snug", children: activeCategoryScore.toFixed(1) })
      ] }),
      categoryFilter !== "all" && activeCategoryScore === null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white/50 px-2 py-1 ring-1 ring-white/10 min-w-[44px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium leading-none truncate max-w-[52px]", children: activeCategoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold leading-snug", children: "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 pt-2 pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-1 text-sm font-semibold leading-tight", title: game.title, children: game.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: game.release_date ? new Date(game.release_date).getFullYear() : "—" }),
        game.hours_played != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          game.hours_played,
          "h"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/0 group-hover:text-muted-foreground transition-colors hover:!text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
        " Remove"
      ] }), title: "Delete game", description: `Delete "${game.title}"? This will permanently remove the game and all its ratings.`, confirmLabel: "Delete", onConfirm: () => removeGame.mutate() }) })
    ] })
  ] });
}
function AddGameDialog({
  onCreated
}) {
  const emptyForm = {
    title: "",
    cover_url: "",
    release_date: "",
    music_url: "",
    music_start: null,
    hours_played: "",
    genre: "",
    platform: "",
    status: null,
    steam_appid: null
  };
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(emptyForm);
  const create = useServerFn(createGame);
  const steamSearch = useServerFn(searchSteamGames);
  const steamDetails = useServerFn(getSteamGameDetails);
  const mut = useMutation({
    mutationFn: () => create({
      data: {
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
      toast.success("Game added");
      setForm(emptyForm);
      setOpen(false);
      onCreated();
    },
    onError: (e) => toast.error(describeError(`add “${form.title}”`, e))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      "Add game"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add a game" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        mut.mutate();
      }, className: "space-y-4 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogSearch, { label: "Search on Steam", placeholder: "Type a game name to autofill…", queryKey: "steam-search", search: (term) => steamSearch({
          data: {
            term
          }
        }), getKey: (r) => r.appId, renderItem: (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.thumb, alt: "", className: "h-8 w-[85px] shrink-0 rounded object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: r.name })
        ] }), onPick: async (r) => {
          const d = await steamDetails({
            data: {
              appId: r.appId
            }
          });
          setForm((f) => ({
            ...f,
            title: d.title,
            cover_url: d.cover_url ?? "",
            release_date: d.release_date ?? "",
            genre: d.genre ?? "",
            platform: f.platform || "PC",
            steam_appid: d.steam_appid
          }));
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm", children: [
            "Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { required: true, value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }), placeholder: "e.g. Elden Ring" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Cover image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            form.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.cover_url, alt: "", className: "h-14 w-[42px] shrink-0 rounded object-cover bg-muted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.cover_url, onChange: (e) => setForm({
              ...form,
              cover_url: e.target.value
            }), placeholder: "https://…" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Release date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.release_date, onChange: (e) => setForm({
              ...form,
              release_date: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Hours played" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "0", max: "99999", step: "any", inputMode: "decimal", value: form.hours_played, onChange: (e) => setForm({
              ...form,
              hours_played: e.target.value
            }), placeholder: "0.0" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GenrePlatformFields, { genre: form.genre, platform: form.platform, onChange: (patch) => setForm((f) => ({
          ...f,
          ...patch
        })) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPicker, { value: form.status, onChange: (status) => setForm((f) => ({
            ...f,
            status
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3.5 w-3.5" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: mut.isPending, children: mut.isPending ? "Adding…" : "Add game" })
        ] })
      ] })
    ] })
  ] });
}
export {
  GamesPage as component
};
