import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as getUserDashboard } from "./users.functions-gFHApHCx.mjs";
import { w as withOverall } from "./scoring-DaYUboHb.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { C as CATEGORY_ICONS } from "./category-icons-C_t9wQei.mjs";
import { r as rememberSequence } from "./item-navigator-C276qtZd.mjs";
import { B as Route$4, D as UserCircle, G as ArrowLeft, p as CalendarDays, T as Trophy, F as Film, m as Tv, w as Search, o as Star, x as SlidersHorizontal, H as Heart } from "./router-B00edaQI.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
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
const AVATAR_GRADIENTS = ["from-violet-500 to-purple-600", "from-blue-500 to-cyan-600", "from-emerald-500 to-teal-600", "from-orange-500 to-amber-600", "from-pink-500 to-rose-600", "from-indigo-500 to-blue-600", "from-fuchsia-500 to-pink-600", "from-sky-500 to-indigo-600"];
function avatarGradient(id) {
  let hash = 0;
  for (const c of id) hash = hash * 31 + c.charCodeAt(0) & 4294967295;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}
function getInitials(user) {
  if (user.display_name) {
    return user.display_name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }
  return "?";
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function LibraryView({
  userId,
  kind,
  items,
  ratings,
  categories,
  favoriteIds
}) {
  const idKey = kind === "games" ? "game_id" : "media_id";
  const {
    type = "all",
    category: categoryFilter = "all",
    search = "",
    sort = "score_desc",
    favOnly = false
  } = Route$4.useSearch();
  const navigate = useNavigate({
    from: Route$4.fullPath
  });
  const setFilter = (patch) => navigate({
    search: (prev) => ({
      ...prev,
      ...patch
    }),
    replace: true
  });
  const setType = (v) => setFilter({
    type: v
  });
  const setSearch = (v) => setFilter({
    search: v
  });
  const setCategoryFilter = (v) => setFilter({
    category: v
  });
  const setSort = (v) => setFilter({
    sort: v
  });
  const setFavOnly = (fn) => setFilter({
    favOnly: fn(favOnly)
  });
  reactExports.useEffect(() => {
    const id = sessionStorage.getItem("scrollToUserItem");
    if (!id) return;
    sessionStorage.removeItem("scrollToUserItem");
    document.getElementById("item-" + id)?.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }, []);
  const scoreIn = (itemId, categoryId) => {
    const r = ratings.find((x) => x[idKey] === itemId && x.category_id === categoryId);
    return r ? Number(r.score) : null;
  };
  const enriched = reactExports.useMemo(() => {
    const favSet = new Set(favoriteIds);
    let list = withOverall(items, ratings, categories, idKey).map((it) => ({
      ...it,
      isFavorite: favSet.has(it.id)
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
  reactExports.useEffect(() => {
    rememberSequence(kind === "games" ? "user-games" : "user-media", enriched.map((it) => it.id));
  }, [enriched, kind]);
  const openItem = (itemId) => {
    sessionStorage.setItem("scrollToUserItem", itemId);
    navigate({
      to: "/users/$userId/$kind/$itemId",
      params: {
        userId,
        kind,
        itemId
      }
    });
  };
  const hasFilters = !!(search || categoryFilter !== "all" || favOnly || kind === "media" && type !== "all");
  const activeCategoryName = categories.find((c) => c.id === categoryFilter)?.name ?? null;
  const noun = kind === "games" ? enriched.length === 1 ? "game" : "games" : enriched.length === 1 ? "title" : "titles";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search titles…", className: "pl-9 h-9 text-sm bg-muted/30 border-border/50 focus:bg-background" })
      ] }),
      kind === "media" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: ["all", "movie", "series"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setType(t), className: ["inline-flex items-center gap-1.5 h-8 px-4 rounded-full text-xs font-medium transition-colors", type === t ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"].join(" "), children: [
        t === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
        t === "movie" && /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "h-3.5 w-3.5" }),
        t === "series" && /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-3.5 w-3.5" }),
        t === "all" ? "All" : t === "movie" ? "Movies" : "Series"
      ] }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-9 w-auto min-w-[140px] text-sm gap-1.5 bg-muted/30 border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All categories" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All categories" }),
            categories.filter((c) => !c.is_default).map((c) => {
              const Icon = c.icon && CATEGORY_ICONS[c.icon];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.name })
              ] }) }, c.id);
            })
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
    hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
      opacity: 0,
      y: -4
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-xs text-muted-foreground -mt-4", children: [
      "Showing ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: enriched.length }),
      " ",
      noun,
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: activeCategoryName })
      ] }),
      kind === "media" && type !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " · ",
        type === "movie" ? "movies" : "series",
        " only"
      ] }),
      favOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: " · favorites only" })
    ] }),
    enriched.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { hasFilters, kind }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: enriched.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, initial: {
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
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "item-" + it.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryCard, { item: it, categoryScore: categoryFilter !== "all" ? scoreIn(it.id, categoryFilter) : void 0, categoryName: activeCategoryName, onOpen: () => openItem(it.id) }) }) }, it.id)) }) })
  ] });
}
function EmptyState({
  hasFilters,
  kind
}) {
  const noun = kind === "games" ? "games" : "titles";
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: hasFilters ? `No ${noun} match your filters` : "This library is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[240px]", children: hasFilters ? "Try adjusting your search or filters to find what you're looking for." : `This user hasn't added any ${noun} yet.` })
    ] })
  ] });
}
function LibraryCard({
  item,
  categoryScore,
  categoryName,
  onOpen
}) {
  const TypeIcon = item.media_type === "series" ? Tv : item.media_type === "movie" ? Film : Star;
  const filtered = categoryScore !== void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: onOpen, className: "group relative block overflow-hidden rounded-xl cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] bg-muted overflow-hidden", children: [
      item.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.cover_url, alt: item.title, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center bg-gradient-to-br from-muted to-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-8 w-8 text-muted-foreground/40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" }),
      item.media_type && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-3 w-3" }),
        item.media_type === "series" ? "Series" : "Movie"
      ] }),
      item.isFavorite && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 fill-red-400 text-red-400" }) }),
      item.overall !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 0,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, transition: {
        type: "spring",
        stiffness: 200,
        damping: 18
      }, className: ["absolute bottom-2 left-2 h-10 w-10 grid place-items-center rounded-full", "bg-primary text-primary-foreground font-bold text-sm", "shadow-lg ring-2 ring-black/20", filtered ? "opacity-60 scale-90" : ""].join(" "), children: item.overall.toFixed(1) }),
      filtered && categoryScore !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        scale: 0,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, className: "absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground px-2 py-1 shadow-lg ring-1 ring-black/20 min-w-[44px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium leading-none opacity-75 truncate max-w-[52px]", children: categoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold leading-snug", children: categoryScore.toFixed(1) })
      ] }),
      filtered && categoryScore === null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex flex-col items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white/50 px-2 py-1 ring-1 ring-white/10 min-w-[44px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium leading-none truncate max-w-[52px]", children: categoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold leading-snug", children: "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 pt-2 pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-1 text-sm font-semibold leading-tight", title: item.title, children: item.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: item.release_date ? new Date(item.release_date).getFullYear() : "—" }),
        item.hours_played != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          item.hours_played,
          "h"
        ] })
      ] })
    ] })
  ] });
}
const TABS = [{
  value: "games",
  label: "Games",
  Icon: Trophy
}, {
  value: "media",
  label: "Movies & Series",
  Icon: Film
}];
function PageSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6 border-b border-border/40 flex items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted/40 animate-pulse shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-48 rounded bg-muted/40 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-32 rounded bg-muted/30 animate-pulse" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8", children: Array.from({
      length: 12
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-xl bg-muted/30 animate-pulse", style: {
      animationDelay: `${i * 40}ms`
    } }, i)) })
  ] });
}
function UserProfilePage() {
  const {
    userId
  } = Route$4.useParams();
  const fetchUserDashboard = useServerFn(getUserDashboard);
  const query = useQuery({
    queryKey: ["user-dashboard", userId],
    queryFn: () => fetchUserDashboard({
      data: {
        userId
      }
    })
  });
  const {
    tab = "games"
  } = Route$4.useSearch();
  const navigate = useNavigate({
    from: Route$4.fullPath
  });
  const setTab = (t) => navigate({
    search: {
      tab: t === "media" ? "media" : void 0
    },
    replace: true
  });
  const data = query.data;
  const ratedCounts = reactExports.useMemo(() => {
    if (!data) return {
      games: 0,
      movies: 0,
      series: 0
    };
    const ratedGames = new Set(data.games.ratings.map((r) => r.game_id));
    const ratedMedia = new Set(data.media.ratings.map((r) => r.media_id));
    const countMedia = (t) => data.media.media.filter((m) => m.media_type === t && ratedMedia.has(m.id)).length;
    return {
      games: data.games.games.filter((g) => ratedGames.has(g.id)).length,
      movies: countMedia("movie"),
      series: countMedia("series")
    };
  }, [data]);
  if (query.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageSkeleton, {});
  if (query.isError || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCircle, { className: "h-12 w-12 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "User not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/users", className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "← Back to users" })
    ] });
  }
  const {
    user
  } = data;
  const displayName = user.display_name || "Player";
  const gradient = avatarGradient(user.id);
  const initials = getInitials(user);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      x: -8
    }, animate: {
      opacity: 1,
      x: 0
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/users", className: "inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors no-underline group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" }),
      "All users"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.04
    }, className: "pb-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-end gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradient} shadow-xl ring-2 ring-white/10`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-white", children: initials }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1", children: "Member profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight leading-none truncate", children: displayName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-[12px] text-muted-foreground/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Member since ",
            formatDate(user.created_at)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 sm:shrink-0", children: [{
        label: "Games rated",
        count: ratedCounts.games,
        icon: Trophy
      }, {
        label: "Movies rated",
        count: ratedCounts.movies,
        icon: Film
      }, {
        label: "Series rated",
        count: ratedCounts.series,
        icon: Tv
      }].map(({
        label,
        count,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-medium tabular-nums", children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground hidden sm:inline", children: label })
      ] }, label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.08
    }, className: "flex gap-1 rounded-xl border border-border/50 bg-muted/30 p-1 w-fit", children: TABS.map(({
      value,
      label,
      Icon
    }) => {
      const active = tab === value;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(value), className: ["relative flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"].join(" "), children: [
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "user-tab-pill", className: "absolute inset-0 rounded-lg bg-background border border-border/60 shadow-sm", transition: {
          type: "spring",
          stiffness: 300,
          damping: 30
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "relative h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: label })
      ] }, value);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -4
    }, transition: {
      duration: 0.2
    }, children: tab === "games" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryView, { userId, kind: "games", items: data.games.games, ratings: data.games.ratings, categories: data.games.categories, favoriteIds: data.games.favoriteIds }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryView, { userId, kind: "media", items: data.media.media, ratings: data.media.ratings, categories: data.media.categories, favoriteIds: data.media.favoriteIds }) }, tab) })
  ] });
}
export {
  UserProfilePage as component
};
