import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as describeError } from "./error-message-BA287X-o.mjs";
import { s as saveTierList, l as listGames } from "./games.functions-DGuPoniN.mjs";
import { w as withOverall } from "./scoring-DaYUboHb.mjs";
import { T as TIERS } from "./types-B16xxWPT.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { C as ConfirmDialog } from "./confirm-dialog-CGd4zKgK.mjs";
import { L as Loader2, G as ArrowLeft, e as Sparkles, K as Download, o as Star } from "./router-z7_BG863.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const ROWS = [...TIERS, "pool"];
const TIER_COLORS = {
  S: "#ff7f7f",
  A: "#ffbf7f",
  B: "#ffdf7f",
  C: "#bfff7f",
  D: "#7fbfff"
};
const SCORE_TIERS = [["S", 9], ["A", 8], ["B", 7], ["C", 5.5], ["D", 0]];
const emptyBoard = () => ({
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  pool: []
});
function TierListPage() {
  const list = useServerFn(listGames);
  const save = useServerFn(saveTierList);
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["games"],
    queryFn: () => list()
  });
  const items = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    if (!query.data) return map;
    for (const g of withOverall(query.data.games, query.data.ratings, query.data.categories)) {
      map.set(g.id, {
        id: g.id,
        title: g.title,
        cover_url: g.cover_url,
        overall: g.overall
      });
    }
    return map;
  }, [query.data]);
  const [board, setBoard] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [dirty, setDirty] = reactExports.useState(false);
  const dragId = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!query.data || board) return;
    const b = emptyBoard();
    const sorted = [...query.data.games].sort((a, c) => (a.tier_pos ?? 0) - (c.tier_pos ?? 0));
    for (const g of sorted) {
      const tier = g.tier;
      if (tier && TIERS.includes(tier)) b[tier].push(g.id);
    }
    const placed = new Set(TIERS.flatMap((t) => b[t]));
    b.pool = [...items.values()].filter((i) => !placed.has(i.id)).sort((a, c) => (c.overall ?? -1) - (a.overall ?? -1) || a.title.localeCompare(c.title)).map((i) => i.id);
    setBoard(b);
  }, [query.data, items, board]);
  const persist = useMutation({
    mutationFn: (b) => save({
      data: {
        placements: ROWS.flatMap((row) => b[row].map((id, pos) => ({
          id,
          tier: row === "pool" ? null : row,
          pos
        })))
      }
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["games"]
    }),
    onError: (e) => toast.error(describeError("save the tier list", e))
  });
  reactExports.useEffect(() => {
    if (!board || !dirty) return;
    const t = setTimeout(() => {
      setDirty(false);
      persist.mutate(board);
    }, 700);
    return () => clearTimeout(t);
  }, [board, dirty]);
  function update(next) {
    setBoard(next);
    setDirty(true);
  }
  function move(id, to, index) {
    if (!board) return;
    const next = emptyBoard();
    for (const row of ROWS) next[row] = board[row].filter((x) => x !== id);
    const target = next[to];
    target.splice(index ?? target.length, 0, id);
    update(next);
    setSelected(null);
  }
  function fillFromScores() {
    if (!board) return;
    const next = emptyBoard();
    const ranked = [...items.values()].sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1));
    for (const item of ranked) {
      const tier = item.overall === null ? null : SCORE_TIERS.find(([, min]) => item.overall >= min)[0];
      next[tier ?? "pool"].push(item.id);
    }
    update(next);
  }
  if (query.isLoading || !board) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-24 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "h-6 w-6 animate-spin" }) });
  }
  const cardProps = (id, row, index) => ({
    item: items.get(id),
    selected: selected === id,
    onClick: () => setSelected((s) => s === id ? null : id),
    onDragStart: () => {
      dragId.current = id;
    },
    onDropOnCard: () => {
      if (dragId.current && dragId.current !== id) move(dragId.current, row, index);
      dragId.current = null;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/games", search: {
          category: "all",
          search: "",
          sort: "score_desc",
          favOnly: false
        }, className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground no-underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          " My Games"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight leading-none", children: "Tier list" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-1 text-xs text-muted-foreground", children: [
          "Drag games between tiers — or tap a game, then tap a tier.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center gap-1", children: persist.isPending || dirty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "h-3 w-3 animate-spin" }),
            " Saving…"
          ] }) : "Saved" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          "Fill from scores"
        ] }), title: "Fill from scores", description: "Place every rated game by its overall score (S ≥ 9, A ≥ 8, B ≥ 7, C ≥ 5.5, D below). This replaces your current tiers.", confirmLabel: "Fill", onConfirm: fillFromScores }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-2", onClick: () => exportPng(board, items).catch((e) => toast.error(describeError("export the tier list image", e))), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          "Export image"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border/60", children: TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: () => {
      if (dragId.current) move(dragId.current, tier);
      dragId.current = null;
    }, onClick: () => selected && move(selected, tier), className: `flex min-h-[104px] border-b border-border/60 last:border-b-0 ${selected ? "cursor-pointer" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-16 shrink-0 place-items-center text-2xl font-bold text-black sm:w-20", style: {
        background: TIER_COLORS[tier]
      }, children: tier }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 flex-wrap content-start gap-1.5 bg-muted/20 p-1.5", children: board[tier].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TierCard, { ...cardProps(id, tier, i) }, id)) })
    ] }, tier)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: () => {
      if (dragId.current) move(dragId.current, "pool");
      dragId.current = null;
    }, onClick: () => selected && !board.pool.includes(selected) && move(selected, "pool"), className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: [
        "Unranked · ",
        board.pool.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[104px] flex-wrap content-start gap-1.5 rounded-xl border border-dashed border-border/60 p-1.5", children: board.pool.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TierCard, { ...cardProps(id, "pool", i) }, id)) })
    ] })
  ] });
}
function TierCard({
  item,
  selected,
  onClick,
  onDragStart,
  onDropOnCard
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", draggable: true, onDragStart, onDragOver: (e) => e.preventDefault(), onDrop: (e) => {
    e.stopPropagation();
    onDropOnCard();
  }, onClick: (e) => {
    e.stopPropagation();
    onClick();
  }, title: item.overall !== null ? `${item.title} · ${item.overall.toFixed(1)}` : item.title, className: `relative aspect-[3/4] w-[68px] shrink-0 cursor-grab overflow-hidden rounded-md bg-muted ring-offset-2 ring-offset-background transition active:cursor-grabbing sm:w-[76px] ${selected ? "ring-2 ring-primary scale-105" : "hover:ring-1 hover:ring-white/30"}`, children: item.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.cover_url, alt: item.title, draggable: false, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid h-full w-full place-items-center p-1 text-center text-[10px] leading-tight text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "mb-1 h-4 w-4 opacity-40" }),
    item.title
  ] }) });
}
const loadImage = (src) => new Promise((resolve) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => resolve(img);
  img.onerror = () => resolve(null);
  img.src = src;
});
async function exportPng(board, items) {
  const COVER_W = 90;
  const COVER_H = 120;
  const GAP = 6;
  const LABEL_W = 110;
  const PER_ROW = 10;
  const PAD = 12;
  const width = LABEL_W + PAD * 2 + PER_ROW * (COVER_W + GAP);
  const rowHeights = TIERS.map((t) => {
    const lines = Math.max(1, Math.ceil(board[t].length / PER_ROW));
    return lines * (COVER_H + GAP) + GAP;
  });
  const height = rowHeights.reduce((a2, b) => a2 + b, 0) + 40;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#16161a";
  ctx.fillRect(0, 0, width, height);
  const covers = /* @__PURE__ */ new Map();
  await Promise.all(TIERS.flatMap((t) => board[t]).map(async (id) => {
    const url = items.get(id)?.cover_url;
    covers.set(id, url ? await loadImage(url) : null);
  }));
  let y = 0;
  TIERS.forEach((tier, r) => {
    const h = rowHeights[r];
    ctx.fillStyle = TIER_COLORS[tier];
    ctx.fillRect(0, y, LABEL_W, h - 2);
    ctx.fillStyle = "#111";
    ctx.font = "bold 48px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(tier, LABEL_W / 2, y + h / 2);
    board[tier].forEach((id, i) => {
      const x = LABEL_W + PAD + i % PER_ROW * (COVER_W + GAP);
      const cy = y + GAP + Math.floor(i / PER_ROW) * (COVER_H + GAP);
      const img = covers.get(id);
      if (img) {
        const scale = Math.max(COVER_W / img.width, COVER_H / img.height);
        const sw = COVER_W / scale;
        const sh = COVER_H / scale;
        ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, cy, COVER_W, COVER_H);
      } else {
        ctx.fillStyle = "#2a2a31";
        ctx.fillRect(x, cy, COVER_W, COVER_H);
        ctx.fillStyle = "#ccc";
        ctx.font = "11px system-ui, sans-serif";
        wrapText(ctx, items.get(id)?.title ?? "", x + COVER_W / 2, cy + COVER_H / 2, COVER_W - 8);
      }
    });
    y += h;
  });
  ctx.fillStyle = "#777";
  ctx.font = "13px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("RankPlay", width - PAD, height - 20);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Canvas export failed");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "rankplay-tier-list.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
}
function wrapText(ctx, text, cx, cy, maxW) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  lines.push(line);
  const shown = lines.slice(0, 4);
  shown.forEach((l, i) => ctx.fillText(l, cx, cy + (i - (shown.length - 1) / 2) * 13));
}
export {
  TierListPage as component
};
