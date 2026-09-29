import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { describeError } from "@/lib/error-message";
import { listGames, saveTierList } from "@/lib/games.functions";
import { withOverall } from "@/lib/scoring";
import { TIERS, type Tier } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ArrowLeft, Download, Loader2, Sparkles, Star } from "@/lib/icons";

export const Route = createFileRoute("/_authenticated/games/tiers")({
  head: () => ({ meta: [{ title: "Tier list" }] }),
  component: TierListPage,
});

type Row = Tier | "pool";
type Board = Record<Row, string[]>;
type Item = {
  id: string;
  title: string;
  cover_url: string | null;
  overall: number | null;
};

const ROWS: Row[] = [...TIERS, "pool"];

const TIER_COLORS: Record<Tier, string> = {
  S: "#ff7f7f",
  A: "#ffbf7f",
  B: "#ffdf7f",
  C: "#bfff7f",
  D: "#7fbfff",
};

// Thresholds for "Fill from scores"
const SCORE_TIERS: [Tier, number][] = [
  ["S", 9],
  ["A", 8],
  ["B", 7],
  ["C", 5.5],
  ["D", 0],
];

const emptyBoard = (): Board => ({
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  pool: [],
});

function TierListPage() {
  const list = useServerFn(listGames);
  const save = useServerFn(saveTierList);
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["games"], queryFn: () => list() });

  const items = useMemo(() => {
    const map = new Map<string, Item>();
    if (!query.data) return map;
    for (const g of withOverall(
      query.data.games,
      query.data.ratings,
      query.data.categories,
    )) {
      map.set(g.id, {
        id: g.id,
        title: g.title,
        cover_url: g.cover_url,
        overall: g.overall,
      });
    }
    return map;
  }, [query.data]);

  const [board, setBoard] = useState<Board | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const dragId = useRef<string | null>(null);

  // Build the board once from the saved placements
  useEffect(() => {
    if (!query.data || board) return;
    const b = emptyBoard();
    const sorted = [...query.data.games].sort(
      (a, c) => (a.tier_pos ?? 0) - (c.tier_pos ?? 0),
    );
    for (const g of sorted) {
      const tier = g.tier as Tier | null;
      if (tier && TIERS.includes(tier)) b[tier].push(g.id);
    }
    const placed = new Set(TIERS.flatMap((t) => b[t]));
    b.pool = [...items.values()]
      .filter((i) => !placed.has(i.id))
      .sort(
        (a, c) =>
          (c.overall ?? -1) - (a.overall ?? -1) ||
          a.title.localeCompare(c.title),
      )
      .map((i) => i.id);
    setBoard(b);
  }, [query.data, items, board]);

  const persist = useMutation({
    mutationFn: (b: Board) =>
      save({
        data: {
          placements: ROWS.flatMap((row) =>
            b[row].map((id, pos) => ({
              id,
              tier: row === "pool" ? null : row,
              pos,
            })),
          ),
        },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["games"] }),
    onError: (e) => toast.error(describeError("save the tier list", e)),
  });

  // Auto-save shortly after the last move
  useEffect(() => {
    if (!board || !dirty) return;
    const t = setTimeout(() => {
      setDirty(false);
      persist.mutate(board);
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, dirty]);

  function update(next: Board) {
    setBoard(next);
    setDirty(true);
  }

  function move(id: string, to: Row, index?: number) {
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
    const ranked = [...items.values()].sort(
      (a, b) => (b.overall ?? -1) - (a.overall ?? -1),
    );
    for (const item of ranked) {
      const tier =
        item.overall === null
          ? null
          : SCORE_TIERS.find(([, min]) => item.overall! >= min)![0];
      next[tier ?? "pool"].push(item.id);
    }
    update(next);
  }

  if (query.isLoading || !board) {
    return (
      <div className="grid place-items-center py-24 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const cardProps = (id: string, row: Row, index: number) => ({
    item: items.get(id)!,
    selected: selected === id,
    onClick: () => setSelected((s) => (s === id ? null : id)),
    onDragStart: () => {
      dragId.current = id;
    },
    onDropOnCard: () => {
      if (dragId.current && dragId.current !== id)
        move(dragId.current, row, index);
      dragId.current = null;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div className="space-y-1">
          <Link
            to="/games"
            search={{
              category: "all",
              search: "",
              sort: "score_desc",
              favOnly: false,
            }}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> My Games
          </Link>
          <h1 className="text-4xl font-bold tracking-tight leading-none">
            Tier list
          </h1>
          <p className="pt-1 text-xs text-muted-foreground">
            Drag games between tiers — or tap a game, then tap a tier.
            <span className="ml-2 inline-flex items-center gap-1">
              {persist.isPending || dirty ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> Saving…
                </>
              ) : (
                "Saved"
              )}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ConfirmDialog
            trigger={
              <Button size="sm" variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Fill from scores
              </Button>
            }
            title="Fill from scores"
            description="Place every rated game by its overall score (S ≥ 9, A ≥ 8, B ≥ 7, C ≥ 5.5, D below). This replaces your current tiers."
            confirmLabel="Fill"
            onConfirm={fillFromScores}
          />
          <Button
            size="sm"
            className="gap-2"
            onClick={() =>
              exportPng(board, items).catch((e) => toast.error(describeError("export the tier list image", e)))
            }
          >
            <Download className="h-4 w-4" />
            Export image
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60">
        {TIERS.map((tier) => (
          <div
            key={tier}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragId.current) move(dragId.current, tier);
              dragId.current = null;
            }}
            onClick={() => selected && move(selected, tier)}
            className={`flex min-h-[104px] border-b border-border/60 last:border-b-0 ${
              selected ? "cursor-pointer" : ""
            }`}
          >
            <div
              className="grid w-16 shrink-0 place-items-center text-2xl font-bold text-black sm:w-20"
              style={{ background: TIER_COLORS[tier] }}
            >
              {tier}
            </div>
            <div className="flex flex-1 flex-wrap content-start gap-1.5 bg-muted/20 p-1.5">
              {board[tier].map((id, i) => (
                <TierCard key={id} {...cardProps(id, tier, i)} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (dragId.current) move(dragId.current, "pool");
          dragId.current = null;
        }}
        onClick={() =>
          selected && !board.pool.includes(selected) && move(selected, "pool")
        }
        className="space-y-2"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Unranked · {board.pool.length}
        </h2>
        <div className="flex min-h-[104px] flex-wrap content-start gap-1.5 rounded-xl border border-dashed border-border/60 p-1.5">
          {board.pool.map((id, i) => (
            <TierCard key={id} {...cardProps(id, "pool", i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TierCard({
  item,
  selected,
  onClick,
  onDragStart,
  onDropOnCard,
}: {
  item: Item;
  selected: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDropOnCard: () => void;
}) {
  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        // Dropping on a card inserts before it instead of appending to the row
        e.stopPropagation();
        onDropOnCard();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={
        item.overall !== null
          ? `${item.title} · ${item.overall.toFixed(1)}`
          : item.title
      }
      className={`relative aspect-[3/4] w-[68px] shrink-0 cursor-grab overflow-hidden rounded-md bg-muted ring-offset-2 ring-offset-background transition active:cursor-grabbing sm:w-[76px] ${
        selected
          ? "ring-2 ring-primary scale-105"
          : "hover:ring-1 hover:ring-white/30"
      }`}
    >
      {item.cover_url ? (
        <img
          src={item.cover_url}
          alt={item.title}
          draggable={false}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center p-1 text-center text-[10px] leading-tight text-muted-foreground">
          <Star className="mb-1 h-4 w-4 opacity-40" />
          {item.title}
        </div>
      )}
    </button>
  );
}

/* ─── PNG export (drawn by hand so no extra dependency is needed) ─── */

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    // Steam/TMDB/TVmaze/Wikimedia CDNs allow CORS; covers from other hosts fall back to a text tile
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

async function exportPng(board: Board, items: Map<string, Item>) {
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
  const height = rowHeights.reduce((a, b) => a + b, 0) + 40;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#16161a";
  ctx.fillRect(0, 0, width, height);

  const covers = new Map<string, HTMLImageElement | null>();
  await Promise.all(
    TIERS.flatMap((t) => board[t]).map(async (id) => {
      const url = items.get(id)?.cover_url;
      covers.set(id, url ? await loadImage(url) : null);
    }),
  );

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
      const x = LABEL_W + PAD + (i % PER_ROW) * (COVER_W + GAP);
      const cy = y + GAP + Math.floor(i / PER_ROW) * (COVER_H + GAP);
      const img = covers.get(id);
      if (img) {
        // object-fit: cover
        const scale = Math.max(COVER_W / img.width, COVER_H / img.height);
        const sw = COVER_W / scale;
        const sh = COVER_H / scale;
        ctx.drawImage(
          img,
          (img.width - sw) / 2,
          (img.height - sh) / 2,
          sw,
          sh,
          x,
          cy,
          COVER_W,
          COVER_H,
        );
      } else {
        ctx.fillStyle = "#2a2a31";
        ctx.fillRect(x, cy, COVER_W, COVER_H);
        ctx.fillStyle = "#ccc";
        ctx.font = "11px system-ui, sans-serif";
        wrapText(
          ctx,
          items.get(id)?.title ?? "",
          x + COVER_W / 2,
          cy + COVER_H / 2,
          COVER_W - 8,
        );
      }
    });
    y += h;
  });

  ctx.fillStyle = "#777";
  ctx.font = "13px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("RankPlay", width - PAD, height - 20);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("Canvas export failed");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "rankplay-tier-list.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  maxW: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
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
  shown.forEach((l, i) =>
    ctx.fillText(l, cx, cy + (i - (shown.length - 1) / 2) * 13),
  );
}
