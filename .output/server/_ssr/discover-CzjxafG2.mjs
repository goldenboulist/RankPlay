import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQuery, u as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as RefreshCw, L as Loader2, C as Compass, i as ExternalLink, g as Check, j as Plus, h as createSsrRpc } from "./router-3WV5o_3p.mjs";
import { c as createServerFn } from "./server-B4ncXPsG.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CwhVd4pZ.mjs";
import { g as getSteamGameDetails } from "./steam.functions-B5ICi_7u.mjs";
import { c as createGame } from "./games.functions-DwM8oso1.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/zod.mjs";
import "fs";
import "path";
import "node:async_hooks";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "./types-B16xxWPT.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
const getRecommendations = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("cc8ece31eba14c95ac1289a8eae31f48cdbd31002a0acd4ff8de6c15a0aae461"));
function DiscoverPage() {
  const get = useServerFn(getRecommendations);
  const query = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => get(),
    staleTime: 60 * 6e4,
    retry: false
  });
  const [added, setAdded] = reactExports.useState(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tracking-widest uppercase text-muted-foreground/60 select-none", children: "Recommendations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight leading-none", children: "Discover" }),
        query.data && query.data.basedOn.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-2 text-xs text-muted-foreground max-w-2xl", children: [
          "Based on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: query.data.basedOn.slice(0, 5).join(", ") }),
          query.data.basedOn.length > 5 && ` and ${query.data.basedOn.length - 5} more`
        ] }),
        query.data && query.data.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-2", children: query.data.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary", children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-2", onClick: () => query.refetch(), disabled: query.isFetching, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${query.isFetching ? "animate-spin" : ""}` }),
        "Refresh"
      ] })
    ] }),
    query.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-24 text-center text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "h-6 w-6 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Analysing your library…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70", children: "The first time can take up to ~30 seconds while game tags are fetched." })
    ] }) : query.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-24 text-center text-sm text-muted-foreground", children: [
      "Couldn't compute recommendations right now (",
      query.error instanceof Error ? query.error.message : "error",
      ")."
    ] }) : !query.data || query.data.recommendations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-8 w-8 text-muted-foreground/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Nothing to recommend yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: "Rate a few games you liked — recommendations are built from the Steam tags of your favourite games." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6", children: query.data.recommendations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.2,
      delay: Math.min(i * 0.02, 0.3)
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecommendationCard, { rec: r, added: added.has(r.appId), onAdded: () => setAdded((s) => new Set(s).add(r.appId)) }) }, r.appId)) })
  ] });
}
function RecommendationCard({
  rec,
  added,
  onAdded
}) {
  const qc = useQueryClient();
  const details = useServerFn(getSteamGameDetails);
  const create = useServerFn(createGame);
  const [cover, setCover] = reactExports.useState(rec.cover);
  const add = useMutation({
    mutationFn: async () => {
      const d = await details({
        data: {
          appId: rec.appId
        }
      }).catch(() => null);
      return create({
        data: {
          title: d?.title ?? rec.name,
          cover_url: d?.cover_url ?? rec.fallbackCover,
          release_date: d?.release_date ?? null,
          genre: d?.genre ?? null,
          platform: "PC",
          status: "backlog",
          steam_appid: rec.appId
        }
      });
    },
    onSuccess: () => {
      toast.success(`${rec.name} added to “To play”`);
      onAdded();
      qc.invalidateQueries({
        queryKey: ["games"]
      });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to add")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://store.steampowered.com/app/${rec.appId}`, target: "_blank", rel: "noreferrer noopener", className: "relative block aspect-[3/4] overflow-hidden bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: cover,
          alt: rec.name,
          loading: "lazy",
          onError: () => cover !== rec.fallbackCover && setCover(rec.fallbackCover),
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm", children: [
        rec.positiveRatio,
        "% 👍"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-1.5 p-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-1 text-sm font-semibold", title: rec.name, children: rec.name }),
      rec.because.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "line-clamp-2 text-[11px] text-muted-foreground", children: [
        "Because you liked",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: rec.because.join(" & ") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: rec.matchedTags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground", children: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: added ? "ghost" : "secondary", className: "mt-auto h-7 gap-1.5 text-xs", disabled: added || add.isPending, onClick: () => add.mutate(), children: added ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
        " Added"
      ] }) : add.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " To play"
      ] }) })
    ] })
  ] });
}
export {
  DiscoverPage as component
};
