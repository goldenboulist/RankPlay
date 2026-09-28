import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listGames } from "./games.functions-CHrK6l2_.mjs";
import { l as listMedia } from "./media.functions-nxk-xkuR.mjs";
import { w as withOverall, C as CATEGORY_ICONS } from "./category-icons-DEN1ZaB4.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { R as Route$7, T as Trophy, F as Film, g as Tv, h as Plus, i as Crown, j as Star } from "./router-cdSR3IL0.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { m as motion, A as AnimatePresence, u as useReducedMotion } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, B as BarChart, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, C as Cell } from "../_libs/recharts.mjs";
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
import "./server-CKhcZQ3s.mjs";
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
import "./auth-middleware-C8T2NKNy.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const MEDAL_CSS = ["var(--color-gold, #c9913a)", "var(--color-silver, #9ca3af)", "var(--color-bronze, #a16207)"];
const TABS = [{
  value: "games",
  label: "Games",
  singular: "game",
  Icon: Trophy
}, {
  value: "movies",
  label: "Movies",
  singular: "movie",
  Icon: Film
}, {
  value: "series",
  label: "Series",
  singular: "series",
  Icon: Tv
}];
function computeStats(items, ratings, categories, idKey) {
  const ranked = withOverall(items, ratings, categories, idKey).filter((g) => g.overall !== null).sort((a, b) => b.overall - a.overall);
  const unrated = items.filter((it) => !ranked.some((r) => r.id === it.id));
  const avg = ranked.length ? ranked.reduce((a, b) => a + b.overall, 0) / ranked.length : 0;
  const buckets = Array.from({
    length: 10
  }, (_, i) => ({
    from: i,
    label: `${i}–${i + 1}`,
    count: 0
  }));
  ranked.forEach((g) => {
    buckets[Math.min(9, Math.floor(g.overall))].count++;
  });
  const byCategory = categories.map((cat) => {
    const scored = ratings.filter((r) => r.category_id === cat.id).flatMap((r) => {
      const item = items.find((x) => x.id === r[idKey]);
      return item ? [{
        ...item,
        score: Number(r.score)
      }] : [];
    }).sort((a, b) => b.score - a.score);
    const avg2 = scored.length ? scored.reduce((a, b) => a + b.score, 0) / scored.length : 0;
    return {
      category: cat,
      avg: avg2,
      count: scored.length,
      leaders: scored.slice(0, 3)
    };
  }).filter((c) => c.count > 0);
  return {
    ranked,
    unrated,
    avg,
    buckets,
    byCategory
  };
}
function Counter({
  value,
  decimals = 0
}) {
  const reduce = useReducedMotion();
  const [v, setV] = reactExports.useState(reduce ? value : 0);
  reactExports.useEffect(() => {
    if (reduce) {
      setV(value);
      return;
    }
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setV(value * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: v.toFixed(decimals) });
}
function Cover({
  item,
  className
}) {
  return item.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.cover_url, alt: "", loading: "lazy", className: `${className} object-cover` }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${className} grid place-items-center bg-muted`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-1/3 w-1/3 text-muted-foreground/40" }) });
}
function ItemLink({
  tab,
  id,
  className,
  title,
  children
}) {
  return tab === "games" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/games/$gameId", params: {
    gameId: id
  }, className, title, children }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/media/$mediaId", params: {
    mediaId: id
  }, className, title, children });
}
function LibraryLink({
  tab,
  className,
  children
}) {
  const base = {
    category: "all",
    search: "",
    sort: "score_desc",
    favOnly: false
  };
  return tab === "games" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/games", search: base, className, children }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/media", search: {
    ...base,
    type: tab === "movies" ? "movie" : "series"
  }, className, children });
}
function Panel({
  title,
  aside,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `rounded-2xl border border-border/50 bg-card/80 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-baseline justify-between gap-3 px-5 pt-4 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-semibold tracking-tight", children: title }),
      aside
    ] }),
    children
  ] });
}
function formatScore(n) {
  return n.toFixed(1);
}
function Champion({
  stats,
  tab,
  config
}) {
  const reduce = useReducedMotion();
  const champ = stats.ranked[0];
  const facts = [{
    value: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { value: stats.ranked.length }),
    label: "rated"
  }, {
    value: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { value: stats.avg, decimals: 1 }),
    label: "average score"
  }, {
    value: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { value: stats.unrated.length }),
    label: "not rated yet"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-2xl border border-[var(--color-gold,#c9913a)]/25 bg-card", children: [
    champ.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-0 scale-110", style: {
      backgroundImage: `url(${champ.cover_url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(40px) saturate(1.4)",
      opacity: 0.35
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemLink, { tab, id: champ.id, className: "group flex min-w-0 items-end gap-5 no-underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: reduce ? false : {
          opacity: 0,
          scale: 0.92,
          rotate: -2
        }, animate: {
          opacity: 1,
          scale: 1,
          rotate: 0
        }, transition: {
          type: "spring",
          stiffness: 160,
          damping: 18
        }, className: "relative shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { item: champ, className: "w-24 sm:w-32 aspect-[3/4] rounded-xl shadow-2xl ring-2 ring-[var(--color-gold,#c9913a)]/60 transition-transform duration-300 group-hover:-translate-y-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full shadow-lg", style: {
            background: MEDAL_CSS[0]
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4.5 w-4.5 text-black/75" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 pb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Your #1 ",
            config.singular
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-2xl sm:text-4xl font-bold tracking-tight leading-tight line-clamp-2 group-hover:underline decoration-[var(--color-gold,#c9913a)]/50 underline-offset-4", children: champ.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-baseline gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl sm:text-5xl font-light tabular-nums leading-none text-[var(--color-gold,#c9913a)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { value: champ.overall, decimals: 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/ 10" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-3 gap-x-6 gap-y-1 md:shrink-0 md:gap-x-8", children: facts.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: f.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-2xl sm:text-3xl font-light tabular-nums leading-tight", children: f.value })
      ] }, f.label)) })
    ] })
  ] });
}
function Ranking({
  stats,
  tab,
  config
}) {
  const rows = stats.ranked.slice(1, 10);
  const last = stats.ranked.length > 10 ? stats.ranked[stats.ranked.length - 1] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Top 10", aside: /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryLink, { tab, className: "text-xs text-muted-foreground hover:text-foreground transition-colors", children: "Full ranking" }), children: [
    rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-5 pb-5 text-sm text-muted-foreground", children: [
      "Rate another ",
      config.singular,
      " to start a ranking."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "pb-2", start: 2, children: rows.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RankRow, { item, rank: i + 2, tab }, item.id)) }),
    last && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 px-2 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pt-1 text-xs text-muted-foreground", children: "Last place" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { start: stats.ranked.length, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankRow, { item: last, rank: stats.ranked.length, tab }) })
    ] })
  ] });
}
function RankRow({
  item,
  rank,
  tab
}) {
  const medal = rank <= 3 ? MEDAL_CSS[rank - 1] : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemLink, { tab, id: item.id, className: "mx-2 grid grid-cols-[1.75rem_2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-3 py-1.5 no-underline transition-colors hover:bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right text-sm font-semibold tabular-nums", style: {
      color: medal ?? "var(--color-muted-foreground)"
    }, children: rank }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { item, className: "h-10 w-8 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-medium text-foreground", children: item.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 block h-1 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full rounded-full", style: {
        width: `${item.overall * 10}%`,
        background: medal ?? "var(--color-primary)"
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 text-right text-lg font-light tabular-nums text-foreground", children: formatScore(item.overall) })
  ] }) });
}
function Distribution({
  stats,
  config
}) {
  const peak = stats.buckets.reduce((a, b) => b.count > a.count ? b : a);
  const plural = config.value === "series" ? "series" : `${config.singular}s`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: `Most of your ${plural} score between ${peak.from} and ${peak.from + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 px-3 pb-3", role: "img", "aria-label": `Score distribution: ${stats.buckets.map((b) => `${b.label}: ${b.count}`).join(", ")}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats.buckets, margin: {
    top: 8,
    right: 4,
    bottom: 0,
    left: -28
  }, barCategoryGap: 2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "from", tickLine: false, axisLine: {
      stroke: "var(--color-border)"
    }, tick: {
      fill: "var(--color-muted-foreground)",
      fontSize: 11
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { allowDecimals: false, tickLine: false, axisLine: false, tick: {
      fill: "var(--color-muted-foreground)",
      fontSize: 11
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: {
      fill: "var(--color-muted)",
      opacity: 0.4
    }, content: ({
      active,
      payload
    }) => {
      if (!active || !payload?.length) return null;
      const b = payload[0].payload;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-popover px-3 py-2 text-xs shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: b.count }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "scored ",
          b.label
        ] })
      ] });
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [4, 4, 0, 0], isAnimationActive: false, children: stats.buckets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: "var(--color-primary)", fillOpacity: b.from === peak.from ? 1 : 0.55 }, b.from)) })
  ] }) }) }) });
}
function CategoryAverages({
  stats
}) {
  const rows = [...stats.byCategory].sort((a, b) => b.avg - a.avg);
  if (rows.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Average by category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 px-5 pb-5", children: rows.map(({
    category,
    avg,
    count
  }) => {
    const Icon = category.icon ? CATEGORY_ICONS[category.icon] : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[minmax(0,8rem)_1fr_2.25rem] items-center gap-3", title: `${category.name}: ${formatScore(avg)} average over ${count} rating${count > 1 ? "s" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground", children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: category.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full rounded-full bg-primary", style: {
        width: `${avg * 10}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right text-sm tabular-nums", children: formatScore(avg) })
    ] }, category.id);
  }) }) });
}
function CategoryLeaders({
  stats,
  tab
}) {
  if (stats.byCategory.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Best in each category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border/40 border-t border-border/40", children: stats.byCategory.map(({
    category,
    leaders
  }) => {
    const Icon = category.icon ? CATEGORY_ICONS[category.icon] : null;
    const [first, ...runnersUp] = leaders;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-1 gap-2 px-5 py-3 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2 text-sm font-medium", children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: category.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemLink, { tab, id: first.id, className: "group flex min-w-0 items-center gap-3 no-underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { item: first, className: "h-11 w-8 shrink-0 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm text-foreground group-hover:underline underline-offset-4", children: first.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto shrink-0 text-lg font-light tabular-nums sm:ml-0", style: {
          color: MEDAL_CSS[0]
        }, children: formatScore(first.score) })
      ] }),
      runnersUp.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: runnersUp.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemLink, { tab, id: r.id, title: `${i + 2}. ${r.title}: ${formatScore(r.score)}`, className: "flex items-center gap-1.5 rounded-md py-0.5 pl-0.5 pr-2 no-underline transition-colors hover:bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { item: r, className: "h-8 w-6 rounded-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tabular-nums", style: {
          color: MEDAL_CSS[i + 1]
        }, children: formatScore(r.score) })
      ] }, r.id)) })
    ] }, category.id);
  }) }) });
}
function Unrated({
  stats,
  tab,
  config
}) {
  const shown = stats.unrated.slice(0, 12);
  if (shown.length === 0) return null;
  const more = stats.unrated.length - shown.length;
  const plural = config.value === "series" ? "series" : `${config.singular}s`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: `${stats.unrated.length} ${stats.unrated.length === 1 ? config.singular : plural} waiting for a rating`, aside: more > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(LibraryLink, { tab, className: "text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
    more,
    " more in your library"
  ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-4 gap-3 px-5 pb-5 sm:grid-cols-6 lg:grid-cols-12", children: shown.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemLink, { tab, id: item.id, title: `Rate ${item.title}`, className: "group block no-underline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Cover, { item, className: "aspect-[3/4] w-full rounded-lg opacity-70 ring-1 ring-border/50 transition-all group-hover:opacity-100 group-hover:ring-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block truncate text-[11px] text-muted-foreground group-hover:text-foreground", children: item.title })
  ] }) }, item.id)) }) });
}
function EmptyState({
  stats,
  tab,
  config
}) {
  const plural = config.value === "series" ? "series" : `${config.singular}s`;
  const hasItems = !!stats && stats.unrated.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/60 px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(config.Icon, { className: "h-8 w-8 text-muted-foreground/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
          "No rated ",
          plural,
          " yet"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-xs text-sm text-muted-foreground", children: hasItems ? `Rate one of your ${plural} below and it will show up here.` : `Add a ${config.singular} to your library, then rate it to build your ranking.` })
      ] }),
      !hasItems && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LibraryLink, { tab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add a ",
        config.singular
      ] }) })
    ] }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsx(Unrated, { stats, tab, config })
  ] });
}
function DashboardView({
  stats,
  tab
}) {
  const config = TABS.find((t) => t.value === tab);
  if (!stats || stats.ranked.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { stats, tab, config });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Champion, { stats, tab, config }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Ranking, { stats, tab, config }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Distribution, { stats, config }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryAverages, { stats })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryLeaders, { stats, tab }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Unrated, { stats, tab, config })
  ] });
}
function Dashboard() {
  const fetchGames = useServerFn(listGames);
  const fetchMedia = useServerFn(listMedia);
  const queryGames = useQuery({
    queryKey: ["games"],
    queryFn: () => fetchGames()
  });
  const queryMedia = useQuery({
    queryKey: ["media"],
    queryFn: () => fetchMedia()
  });
  const {
    tab = "games"
  } = Route$7.useSearch();
  const navigate = useNavigate({
    from: Route$7.fullPath
  });
  const setTab = (t) => navigate({
    search: {
      tab: t === "games" ? void 0 : t
    },
    replace: true
  });
  const gameStats = reactExports.useMemo(() => {
    if (!queryGames.data) return null;
    return computeStats(queryGames.data.games, queryGames.data.ratings, queryGames.data.categories, "game_id");
  }, [queryGames.data]);
  const mediaStats = reactExports.useMemo(() => {
    if (!queryMedia.data) return null;
    const {
      media,
      ratings,
      categories
    } = queryMedia.data;
    const forType = (t) => {
      const items = media.filter((m) => m.media_type === t);
      const ids = new Set(items.map((m) => m.id));
      return computeStats(items, ratings.filter((r) => ids.has(r.media_id)), categories, "media_id");
    };
    return {
      movies: forType("movie"),
      series: forType("series")
    };
  }, [queryMedia.data]);
  const statsMap = {
    games: gameStats,
    movies: mediaStats?.movies ?? null,
    series: mediaStats?.series ?? null
  };
  const isLoading = queryGames.isLoading || queryMedia.isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "tablist", "aria-label": "Library", className: "flex gap-1 rounded-xl border border-border/50 bg-muted/30 p-1", children: TABS.map(({
        value,
        label,
        Icon
      }) => {
        const active = tab === value;
        const count = statsMap[value]?.ranked.length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { role: "tab", "aria-selected": active, onClick: () => setTab(value), className: ["relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"].join(" "), children: [
          active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "tab-pill", className: "absolute inset-0 rounded-lg bg-background border border-border/60 shadow-sm", transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "relative h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: label }),
          count != null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative text-xs tabular-nums text-muted-foreground", children: count })
        ] }, value);
      }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, transition: {
      duration: 0.15
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardView, { stats: statsMap[tab], tab }) }, tab) })
  ] });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 rounded-2xl bg-muted/30 animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[30rem] rounded-2xl bg-muted/20 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 rounded-2xl bg-muted/20 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 rounded-2xl bg-muted/20 animate-pulse" })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
