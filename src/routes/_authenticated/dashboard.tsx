import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { listGames } from "@/lib/games.functions";
import { listMedia } from "@/lib/media.functions";
import { withOverall } from "@/lib/scoring";
import { Trophy, Library, Star, TrendingUp, TrendingDown, Gauge, Film, Tv } from "@/lib/icons";

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard" }] }),
  component: Dashboard,
});

// ─── Medal colors ─────────────────────────────────────────────────────────────
const MEDAL_CSS = [
  "var(--color-gold, #c9913a)",
  "var(--color-silver, #9ca3af)",
  "var(--color-bronze, #a16207)",
] as const;

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(value * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{v.toFixed(decimals)}</>;
}

// ─── computeStats (logic unchanged) ──────────────────────────────────────────
function computeStats(items: any[], ratings: any[], categories: any[], idKey: "game_id" | "media_id") {
  const enriched = withOverall(items, ratings, categories, idKey).filter((g: any) => g.overall !== null);
  const sorted = [...enriched].sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0));
  const avg = enriched.length
    ? enriched.reduce((a, b) => a + (b.overall ?? 0), 0) / enriched.length
    : 0;
  const buckets = Array.from({ length: 10 }, (_, i) => ({ range: `${i}–${i + 1}`, count: 0 }));
  enriched.forEach((g) => { buckets[Math.min(9, Math.floor(g.overall ?? 0))].count++; });
  const catTotals = new Map();
  ratings.forEach((r: any) => {
    const cat = categories.find((c: any) => c.id === r.category_id);
    if (!cat) return;
    const cur = catTotals.get(cat.id) ?? { sum: 0, count: 0, name: cat.name };
    cur.sum += Number(r.score); cur.count++;
    catTotals.set(cat.id, cur);
  });
  const catData = Array.from(catTotals.values()).map((c: any) => ({
    name: c.name, value: +(c.sum / c.count).toFixed(2),
  }));
  const catTop3 = categories.map((cat: any) => {
    const topArr = ratings
      .filter((r: any) => r.category_id === cat.id)
      .flatMap((r: any) => {
        const item = items.find((x: any) => x.id === r[idKey]);
        return item ? [{ id: item.id, title: item.title, cover_url: item.cover_url ?? null, score: Number(r.score) }] : [];
      })
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3);
    return { category: cat, top: topArr };
  }).filter((c: any) => c.top.length > 0);
  return { total: items.length, avg, top: sorted[0], bottom: sorted[sorted.length - 1], sorted, buckets, catData, catTop3 };
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, gold }: {
  icon: React.ComponentType<any>; label: string; value: React.ReactNode; sub?: string; gold?: boolean;
}) {
  return (
    <div className={[
      "relative overflow-hidden rounded-xl border p-5 transition-colors",
      gold
        ? "border-[var(--color-gold,#c9913a)]/20 bg-[var(--color-gold,#c9913a)]/5"
        : "border-border/50 bg-card",
    ].join(" ")}>
      {gold && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--color-gold,#c9913a)/8%,transparent_60%)]" />
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
            {label}
          </p>
          <p className={[
            "mt-2.5 text-[38px] font-light leading-none tabular-nums",
            gold ? "text-[var(--color-gold,#c9913a)]" : "text-foreground",
          ].join(" ")}>
            {value}
          </p>
          {sub && (
            <p className="mt-2 truncate text-[11px] text-muted-foreground">{sub}</p>
          )}
        </div>
        <div className={[
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
          gold ? "bg-[var(--color-gold,#c9913a)]/15" : "bg-muted/40",
        ].join(" ")}>
          <Icon className={[
            "h-3.5 w-3.5",
            gold ? "text-[var(--color-gold,#c9913a)]" : "text-muted-foreground",
          ].join(" ")} />
        </div>
      </div>
    </div>
  );
}

// ─── Podium ───────────────────────────────────────────────────────────────────
function Podium({ items, itemRoute, typeLabel }: { items: any[]; itemRoute: string; typeLabel: string }) {
  if (!items.length) return null;
  const [first, second, third] = items;
  const slots = [second, first, third].filter(Boolean);
  // rank: index in slots → 2nd, 1st, 3rd
  const rankOf = (vi: number) => (vi === 1 ? 1 : vi === 0 ? 2 : 3);

  return (
    <div className="flex items-end justify-center gap-2 px-4 pt-6 pb-0">
      {slots.map((item, vi) => {
        const rank = rankOf(vi);
        const isFirst = rank === 1;
        const pedH = isFirst ? 52 : rank === 2 ? 32 : 18;
        const color = MEDAL_CSS[rank - 1];
        const params = (typeLabel === "Games" ? { gameId: item.id } : { mediaId: item.id }) as any;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + vi * 0.08, duration: 0.35 }}
            style={{ flex: isFirst ? "0 0 192px" : "0 0 150px" }}
          >
            <Link to={itemRoute} params={params} className="block no-underline">
              {/* Card */}
              <div className={[
                "rounded-t-xl border-x border-t px-3 pb-4 pt-4 flex flex-col items-center gap-2.5",
                isFirst
                  ? "bg-card border-[var(--color-gold,#c9913a)]/20 relative overflow-hidden"
                  : "bg-muted/30 border-border/40",
              ].join(" ")}>
                {isFirst && (
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-gold,#c9913a)/8%,transparent_65%)]" />
                )}
                {/* Rank label */}
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color }}
                >
                  {["1st", "2nd", "3rd"][rank - 1]}
                </span>
                {/* Cover */}
                {item.cover_url ? (
                  <img
                    src={item.cover_url} alt={item.title}
                    className="rounded-md object-cover shadow-md"
                    style={{
                      width: isFirst ? 68 : 50,
                      height: isFirst ? 90 : 66,
                    }}
                  />
                ) : (
                  <div
                    className="rounded-md bg-muted grid place-items-center"
                    style={{ width: isFirst ? 68 : 50, height: isFirst ? 90 : 66 }}
                  >
                    <Star className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                )}
                {/* Title */}
                <p className={[
                  "m-0 text-center font-medium leading-snug text-foreground line-clamp-2 w-full",
                  isFirst ? "text-[12px]" : "text-[11px]",
                ].join(" ")}>
                  {item.title}
                </p>
                {/* Score */}
                <span
                  className={["font-light tabular-nums leading-none", isFirst ? "text-[26px]" : "text-[20px]"].join(" ")}
                  style={{ color: isFirst ? "var(--color-gold, #c9913a)" : "var(--color-foreground)" }}
                >
                  {item.overall?.toFixed(1)}
                </span>
              </div>
              {/* Pedestal */}
              <div
                className="border-x border-b border-border/30"
                style={{
                  height: pedH,
                  background: isFirst
                    ? "color-mix(in oklab, var(--color-gold, #c9913a) 10%, transparent)"
                    : "color-mix(in oklab, var(--color-border) 30%, transparent)",
                }}
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Rank badge ───────────────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  const color = rank <= 3 ? MEDAL_CSS[rank - 1] : undefined;
  return (
    <div
      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-medium"
      style={{
        border: `1px solid ${color ?? "var(--color-border)"}`,
        background: color
          ? `color-mix(in oklab, ${color} 14%, transparent)`
          : "color-mix(in oklab, var(--color-border) 40%, transparent)",
        color: color ?? "var(--color-muted-foreground)",
      }}
    >
      {rank}
    </div>
  );
}

// ─── Ranked row ───────────────────────────────────────────────────────────────
function RankedRow({ item, rank, itemRoute, typeLabel }: { item: any; rank: number; itemRoute: string; typeLabel: string }) {
  const params = (typeLabel === "Games" ? { gameId: item.id } : { mediaId: item.id }) as any;
  return (
    <Link
      to={itemRoute} params={params}
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors no-underline"
    >
      <RankBadge rank={rank} />
      {item.cover_url ? (
        <img src={item.cover_url} alt="" className="h-10 w-8 shrink-0 rounded object-cover" />
      ) : (
        <div className="h-10 w-8 shrink-0 rounded bg-muted grid place-items-center">
          <Star className="h-3 w-3 text-muted-foreground/40" />
        </div>
      )}
      <p className="flex-1 truncate text-[13px] font-medium text-foreground m-0">{item.title}</p>
      <span className="shrink-0 text-[20px] font-light tabular-nums text-muted-foreground">
        {item.overall?.toFixed(1)}
      </span>
    </Link>
  );
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-card/90 backdrop-blur-sm px-3 py-2 shadow-xl text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-[18px] font-light tabular-nums" style={{ color: "var(--color-gold, #c9913a)" }}>
          {typeof p.value === "number" ? p.value.toFixed(p.dataKey === "count" ? 0 : 2) : p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ typeLabel, emptyLink }: { typeLabel: string; emptyLink: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/40 bg-card py-24 text-center"
    >
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-xl bg-muted/50 rotate-6" />
        <div className="absolute inset-0 rounded-xl bg-muted/30 -rotate-3" />
        <div className="relative grid h-full place-items-center rounded-xl bg-muted/60 border border-border/40">
          <Trophy className="h-5 w-5 text-muted-foreground/50" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-semibold">No ranked {typeLabel.toLowerCase()} yet</p>
        <p className="text-sm text-muted-foreground max-w-[240px]">
          Rate a few {typeLabel.toLowerCase()} to watch your hall of fame take shape.
        </p>
      </div>
      <Link
        to={emptyLink}
        search={{ category: "all", search: "", sort: "score_desc", favOnly: false } as any}
        className="text-[13px] no-underline"
        style={{ color: "var(--color-gold, #c9913a)" }}
      >
        Start rating →
      </Link>
    </motion.div>
  );
}

// ─── Dashboard view ───────────────────────────────────────────────────────────
function DashboardView({ stats, typeLabel, emptyLink, itemRoute }: {
  stats: any; typeLabel: string; emptyLink: string; itemRoute: string;
}) {
  if (!stats || stats.sorted.length === 0) {
    return <EmptyState typeLabel={typeLabel} emptyLink={emptyLink} />;
  }

  const rest = stats.sorted.slice(3, 8);

  return (
    <div className="space-y-8">

      {/* ── Stat cards ── */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Library, label: `${typeLabel} rated`, value: <Counter value={stats.sorted.length} />, gold: false },
          { icon: Gauge, label: "Average score", value: <Counter value={stats.avg} decimals={2} />, gold: false },
          { icon: TrendingUp, label: "Highest rated", value: <Counter value={stats.top?.overall ?? 0} decimals={1} />, sub: stats.top?.title, gold: true },
          { icon: TrendingDown, label: "Lowest rated", value: <Counter value={stats.bottom?.overall ?? 0} decimals={1} />, sub: stats.bottom?.title, gold: false },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* ── Hall of Fame ── */}
      <section className="space-y-3">
        <SectionLabel>Hall of Fame</SectionLabel>
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
          <Podium items={stats.sorted.slice(0, 3)} itemRoute={itemRoute} typeLabel={typeLabel} />
          {rest.length > 0 && (
            <div className="mt-0 border-t border-border/40 divide-y divide-border/30">
              {rest.map((item: any, i: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                >
                  <RankedRow item={item} rank={i + 4} itemRoute={itemRoute} typeLabel={typeLabel} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category top 3 ── */}
      {stats.catTop3.length > 0 && (
        <section className="space-y-3">
          <SectionLabel>Top 3 by category</SectionLabel>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stats.catTop3.map(({ category, top }: any, ci: number) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + ci * 0.06 }}
                className="overflow-hidden rounded-xl border border-border/50 bg-card"
              >
                {/* Header */}
                <div className="border-b border-border/40 px-4 py-2.5 text-[12px] font-medium text-muted-foreground">
                  {category.name}
                </div>
                {/* Rows */}
                <div className="divide-y divide-border/30">
                  {top.map((g: any, i: number) => {
                    const color = MEDAL_CSS[i];
                    const params = (typeLabel === "Games" ? { gameId: g.id } : { mediaId: g.id }) as any;
                    return (
                      <Link
                        key={g.id} to={itemRoute} params={params}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted/30 transition-colors no-underline"
                      >
                        <div
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-medium"
                          style={{
                            border: `1px solid ${color}`,
                            background: `color-mix(in oklab, ${color} 14%, transparent)`,
                            color,
                          }}
                        >
                          {i + 1}
                        </div>
                        {g.cover_url ? (
                          <img src={g.cover_url} alt="" className="h-9 w-7 shrink-0 rounded object-cover" />
                        ) : (
                          <div className="h-9 w-7 shrink-0 rounded bg-muted grid place-items-center">
                            <Star className="h-2.5 w-2.5 text-muted-foreground/40" />
                          </div>
                        )}
                        <p className="flex-1 truncate text-[12px] font-medium text-foreground m-0">{g.title}</p>
                        <span className="shrink-0 text-[16px] font-light tabular-nums" style={{ color }}>
                          {g.score.toFixed(1)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/60 m-0">
      {children}
    </p>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { value: "games", label: "Games", Icon: Trophy },
  { value: "movies", label: "Movies", Icon: Film },
  { value: "series", label: "Series", Icon: Tv },
] as const;

type TabValue = "games" | "movies" | "series";

// ─── Root ─────────────────────────────────────────────────────────────────────
function Dashboard() {
  const fetchGames = useServerFn(listGames);
  const fetchMedia = useServerFn(listMedia);
  const queryGames = useQuery({ queryKey: ["games"], queryFn: () => fetchGames() });
  const queryMedia = useQuery({ queryKey: ["media"], queryFn: () => fetchMedia() });
  const [tab, setTab] = useState<TabValue>("games");

  const gameStats = useMemo(() => {
    if (!queryGames.data) return null;
    return computeStats(queryGames.data.games, queryGames.data.ratings, queryGames.data.categories, "game_id");
  }, [queryGames.data]);

  const movieStats = useMemo(() => {
    if (!queryMedia.data) return null;
    const movies = queryMedia.data.media.filter((m) => m.media_type === "movie");
    const ratings = queryMedia.data.ratings.filter((r) => movies.some((m) => m.id === r.media_id));
    return computeStats(movies, ratings, queryMedia.data.categories, "media_id");
  }, [queryMedia.data]);

  const seriesStats = useMemo(() => {
    if (!queryMedia.data) return null;
    const series = queryMedia.data.media.filter((m) => m.media_type === "series");
    const ratings = queryMedia.data.ratings.filter((r) => series.some((m) => m.id === r.media_id));
    return computeStats(series, ratings, queryMedia.data.categories, "media_id");
  }, [queryMedia.data]);

  const isLoading = queryGames.isLoading || queryMedia.isLoading;

  const statsMap = { games: gameStats, movies: movieStats, series: seriesStats };
  const configMap = {
    games: { typeLabel: "Games", emptyLink: "/games", itemRoute: "/games/$gameId" },
    movies: { typeLabel: "Movies", emptyLink: "/media", itemRoute: "/media/$mediaId" },
    series: { typeLabel: "Series", emptyLink: "/media", itemRoute: "/media/$mediaId" },
  };

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-6 border-b border-border/40"
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1.5">
          Overview
        </p>
        <h1 className="text-4xl font-bold tracking-tight leading-none">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your entertainment hall of fame.</p>
      </motion.div>

      {/* ── Tab bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="flex gap-1 rounded-xl border border-border/50 bg-muted/30 p-1 w-fit"
      >
        {TABS.map(({ value, label, Icon }) => {
          const active = tab === value;
          return (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={[
                "relative flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {active && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-background border border-border/60 shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="relative h-3.5 w-3.5" />
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Content ── */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <DashboardView
              stats={statsMap[tab]}
              {...configMap[tab]}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted/30 animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
      <div className="rounded-xl bg-muted/20 animate-pulse h-72" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-muted/20 animate-pulse h-52" />
        <div className="rounded-xl bg-muted/20 animate-pulse h-52" />
      </div>
    </div>
  );
}