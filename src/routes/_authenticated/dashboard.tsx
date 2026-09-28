import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { listGames } from "@/lib/games.functions";
import { listMedia } from "@/lib/media.functions";
import { withOverall } from "@/lib/scoring";
import { CATEGORY_ICONS, CategoryIconName } from "@/lib/category-icons";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Film, Tv, Crown, Plus } from "@/lib/icons";

// ─── Route ────────────────────────────────────────────────────────────────────
type TabValue = "games" | "movies" | "series";

export const Route = createFileRoute("/_authenticated/dashboard")({
  // Optional so plain links to /dashboard stay valid; kept in the URL so "back" restores it
  validateSearch: (s: Record<string, unknown>): { tab?: TabValue } => ({
    tab: s.tab === "movies" || s.tab === "series" ? s.tab : undefined,
  }),
  head: () => ({ meta: [{ title: "Dashboard" }] }),
  component: Dashboard,
});

// ─── Medal colors (theme tokens) ──────────────────────────────────────────────
const MEDAL_CSS = [
  "var(--color-gold, #c9913a)",
  "var(--color-silver, #9ca3af)",
  "var(--color-bronze, #a16207)",
] as const;

const TABS = [
  { value: "games", label: "Games", singular: "game", Icon: Trophy },
  { value: "movies", label: "Movies", singular: "movie", Icon: Film },
  { value: "series", label: "Series", singular: "series", Icon: Tv },
] as const;

type TabConfig = (typeof TABS)[number];

// ─── Data ─────────────────────────────────────────────────────────────────────
type Item = { id: string; title: string; cover_url: string | null };
type RankedItem = Item & { overall: number };
type Category = { id: string; name: string; icon: string | null; coefficient?: number | string };
type Rating = { category_id: string; score: number | string } & Record<string, any>;

function computeStats(items: Item[], ratings: Rating[], categories: Category[], idKey: "game_id" | "media_id") {
  const ranked = withOverall(items, ratings as any, categories, idKey)
    .filter((g): g is typeof g & { overall: number } => g.overall !== null)
    .sort((a, b) => b.overall - a.overall) as RankedItem[];
  const unrated = items.filter((it) => !ranked.some((r) => r.id === it.id));
  const avg = ranked.length ? ranked.reduce((a, b) => a + b.overall, 0) / ranked.length : 0;

  // Histogram of overall scores, one bucket per point (9–10 includes 10)
  const buckets = Array.from({ length: 10 }, (_, i) => ({ from: i, label: `${i}–${i + 1}`, count: 0 }));
  ranked.forEach((g) => { buckets[Math.min(9, Math.floor(g.overall))].count++; });

  // Per category: average score + leaders
  const byCategory = categories
    .map((cat) => {
      const scored = ratings
        .filter((r) => r.category_id === cat.id)
        .flatMap((r) => {
          const item = items.find((x) => x.id === r[idKey]);
          return item ? [{ ...item, score: Number(r.score) }] : [];
        })
        .sort((a, b) => b.score - a.score);
      const avg = scored.length ? scored.reduce((a, b) => a + b.score, 0) / scored.length : 0;
      return { category: cat, avg, count: scored.length, leaders: scored.slice(0, 3) };
    })
    .filter((c) => c.count > 0);

  return { ranked, unrated, avg, buckets, byCategory };
}

type Stats = ReturnType<typeof computeStats>;

// ─── Small pieces ─────────────────────────────────────────────────────────────
function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) { setV(value); return; }
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
  }, [value, reduce]);
  return <>{v.toFixed(decimals)}</>;
}

function Cover({ item, className }: { item: Item; className: string }) {
  return item.cover_url ? (
    <img src={item.cover_url} alt="" loading="lazy" className={`${className} object-cover`} />
  ) : (
    <div className={`${className} grid place-items-center bg-muted`}>
      <Star className="h-1/3 w-1/3 text-muted-foreground/40" />
    </div>
  );
}

/** Link to the item's detail page (games and media live on different routes). */
function ItemLink({ tab, id, className, title, children }: {
  tab: TabValue; id: string; className?: string; title?: string; children: ReactNode;
}) {
  return tab === "games" ? (
    <Link to="/games/$gameId" params={{ gameId: id }} className={className} title={title}>{children}</Link>
  ) : (
    <Link to="/media/$mediaId" params={{ mediaId: id }} className={className} title={title}>{children}</Link>
  );
}

/** Link to the library, sorted by score (and filtered to the tab's media type). */
function LibraryLink({ tab, className, children }: { tab: TabValue; className?: string; children: ReactNode }) {
  const base = { category: "all", search: "", sort: "score_desc", favOnly: false };
  return tab === "games" ? (
    <Link to="/games" search={base} className={className}>{children}</Link>
  ) : (
    <Link to="/media" search={{ ...base, type: tab === "movies" ? "movie" : "series" }} className={className}>
      {children}
    </Link>
  );
}

function Panel({ title, aside, children, className = "" }: {
  title: string; aside?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border/50 bg-card/80 ${className}`}>
      <header className="flex items-baseline justify-between gap-3 px-5 pt-4 pb-3">
        <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
        {aside}
      </header>
      {children}
    </section>
  );
}

function formatScore(n: number) {
  return n.toFixed(1);
}

// ─── Champion banner ──────────────────────────────────────────────────────────
function Champion({ stats, tab, config }: { stats: Stats; tab: TabValue; config: TabConfig }) {
  const reduce = useReducedMotion();
  const champ = stats.ranked[0];

  const facts = [
    { value: <Counter value={stats.ranked.length} />, label: "rated" },
    { value: <Counter value={stats.avg} decimals={1} />, label: "average score" },
    { value: <Counter value={stats.unrated.length} />, label: "not rated yet" },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--color-gold,#c9913a)]/25 bg-card">
      {/* Same backdrop treatment as the detail pages */}
      {champ.cover_url && (
        <div
          aria-hidden
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${champ.cover_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px) saturate(1.4)",
            opacity: 0.35,
          }}
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/40" />

      <div className="relative flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-end md:justify-between">
        <ItemLink tab={tab} id={champ.id} className="group flex min-w-0 items-end gap-5 no-underline">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="relative shrink-0"
          >
            <Cover
              item={champ}
              className="w-24 sm:w-32 aspect-[3/4] rounded-xl shadow-2xl ring-2 ring-[var(--color-gold,#c9913a)]/60 transition-transform duration-300 group-hover:-translate-y-1"
            />
            <span
              className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full shadow-lg"
              style={{ background: MEDAL_CSS[0] }}
            >
              <Crown className="h-4.5 w-4.5 text-black/75" />
            </span>
          </motion.div>

          <div className="min-w-0 pb-1">
            <p className="text-sm text-muted-foreground">Your #1 {config.singular}</p>
            <h2 className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight leading-tight line-clamp-2 group-hover:underline decoration-[var(--color-gold,#c9913a)]/50 underline-offset-4">
              {champ.title}
            </h2>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-light tabular-nums leading-none text-[var(--color-gold,#c9913a)]">
                <Counter value={champ.overall} decimals={1} />
              </span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </p>
          </div>
        </ItemLink>

        <dl className="grid grid-cols-3 gap-x-6 gap-y-1 md:shrink-0 md:gap-x-8">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse">
              <dt className="text-xs text-muted-foreground">{f.label}</dt>
              <dd className="text-2xl sm:text-3xl font-light tabular-nums leading-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ─── Top 10 ranking ───────────────────────────────────────────────────────────
function Ranking({ stats, tab, config }: { stats: Stats; tab: TabValue; config: TabConfig }) {
  const rows = stats.ranked.slice(1, 10);
  const last = stats.ranked.length > 10 ? stats.ranked[stats.ranked.length - 1] : null;

  return (
    <Panel
      title="Top 10"
      aside={
        <LibraryLink tab={tab} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Full ranking
        </LibraryLink>
      }
    >
      {rows.length === 0 ? (
        <p className="px-5 pb-5 text-sm text-muted-foreground">
          Rate another {config.singular} to start a ranking.
        </p>
      ) : (
        <ol className="pb-2" start={2}>
          {rows.map((item, i) => (
            <RankRow key={item.id} item={item} rank={i + 2} tab={tab} />
          ))}
        </ol>
      )}
      {last && (
        <div className="border-t border-border/40 px-2 py-2">
          <p className="px-3 pt-1 text-xs text-muted-foreground">Last place</p>
          <ol start={stats.ranked.length}>
            <RankRow item={last} rank={stats.ranked.length} tab={tab} />
          </ol>
        </div>
      )}
    </Panel>
  );
}

function RankRow({ item, rank, tab }: { item: RankedItem; rank: number; tab: TabValue }) {
  const medal = rank <= 3 ? MEDAL_CSS[rank - 1] : undefined;
  return (
    <li>
      <ItemLink
        tab={tab}
        id={item.id}
        className="mx-2 grid grid-cols-[1.75rem_2rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-3 py-1.5 no-underline transition-colors hover:bg-muted/40"
      >
        <span
          className="text-right text-sm font-semibold tabular-nums"
          style={{ color: medal ?? "var(--color-muted-foreground)" }}
        >
          {rank}
        </span>
        <Cover item={item} className="h-10 w-8 rounded" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground">{item.title}</span>
          {/* Score bar: length = score out of 10 */}
          <span className="mt-1.5 block h-1 rounded-full bg-muted">
            <span
              className="block h-full rounded-full"
              style={{ width: `${item.overall * 10}%`, background: medal ?? "var(--color-primary)" }}
            />
          </span>
        </span>
        <span className="w-9 text-right text-lg font-light tabular-nums text-foreground">
          {formatScore(item.overall)}
        </span>
      </ItemLink>
    </li>
  );
}

// ─── Score distribution ───────────────────────────────────────────────────────
function Distribution({ stats, config }: { stats: Stats; config: TabConfig }) {
  const peak = stats.buckets.reduce((a, b) => (b.count > a.count ? b : a));
  const plural = config.value === "series" ? "series" : `${config.singular}s`;

  return (
    <Panel title={`Most of your ${plural} score between ${peak.from} and ${peak.from + 1}`}>
      <div className="h-44 px-3 pb-3" role="img" aria-label={`Score distribution: ${stats.buckets.map((b) => `${b.label}: ${b.count}`).join(", ")}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.buckets} margin={{ top: 8, right: 4, bottom: 0, left: -28 }} barCategoryGap={2}>
            <XAxis
              dataKey="from"
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)" }}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const b = payload[0].payload as Stats["buckets"][number];
                return (
                  <div className="rounded-lg border border-border/60 bg-popover px-3 py-2 text-xs shadow-xl">
                    <span className="font-semibold tabular-nums">{b.count}</span>{" "}
                    <span className="text-muted-foreground">scored {b.label}</span>
                  </div>
                );
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive={false}>
              {stats.buckets.map((b) => (
                <Cell key={b.from} fill="var(--color-primary)" fillOpacity={b.from === peak.from ? 1 : 0.55} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

// ─── Category averages ────────────────────────────────────────────────────────
function CategoryAverages({ stats }: { stats: Stats }) {
  const rows = [...stats.byCategory].sort((a, b) => b.avg - a.avg);
  if (rows.length === 0) return null;
  return (
    <Panel title="Average by category">
      <ul className="space-y-2.5 px-5 pb-5">
        {rows.map(({ category, avg, count }) => {
          const Icon = category.icon ? CATEGORY_ICONS[category.icon as CategoryIconName] : null;
          return (
            <li
              key={category.id}
              className="grid grid-cols-[minmax(0,8rem)_1fr_2.25rem] items-center gap-3"
              title={`${category.name}: ${formatScore(avg)} average over ${count} rating${count > 1 ? "s" : ""}`}
            >
              <span className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                <span className="truncate">{category.name}</span>
              </span>
              <span className="h-2 rounded-full bg-muted">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${avg * 10}%` }} />
              </span>
              <span className="text-right text-sm tabular-nums">{formatScore(avg)}</span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

// ─── Best in each category ────────────────────────────────────────────────────
function CategoryLeaders({ stats, tab }: { stats: Stats; tab: TabValue }) {
  if (stats.byCategory.length === 0) return null;
  return (
    <Panel title="Best in each category">
      <ul className="divide-y divide-border/40 border-t border-border/40">
        {stats.byCategory.map(({ category, leaders }) => {
          const Icon = category.icon ? CATEGORY_ICONS[category.icon as CategoryIconName] : null;
          const [first, ...runnersUp] = leaders;
          return (
            <li
              key={category.id}
              className="grid grid-cols-1 gap-2 px-5 py-3 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
            >
              <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                {Icon && <Icon className="h-4 w-4 shrink-0 text-primary" />}
                <span className="truncate">{category.name}</span>
              </span>

              <ItemLink tab={tab} id={first.id} className="group flex min-w-0 items-center gap-3 no-underline">
                <Cover item={first} className="h-11 w-8 shrink-0 rounded" />
                <span className="truncate text-sm text-foreground group-hover:underline underline-offset-4">
                  {first.title}
                </span>
                <span className="ml-auto shrink-0 text-lg font-light tabular-nums sm:ml-0" style={{ color: MEDAL_CSS[0] }}>
                  {formatScore(first.score)}
                </span>
              </ItemLink>

              {runnersUp.length > 0 && (
                <span className="flex items-center gap-2">
                  {runnersUp.map((r, i) => (
                    <ItemLink
                      key={r.id}
                      tab={tab}
                      id={r.id}
                      title={`${i + 2}. ${r.title}: ${formatScore(r.score)}`}
                      className="flex items-center gap-1.5 rounded-md py-0.5 pl-0.5 pr-2 no-underline transition-colors hover:bg-muted/50"
                    >
                      <Cover item={r} className="h-8 w-6 rounded-sm" />
                      <span className="text-xs tabular-nums" style={{ color: MEDAL_CSS[i + 1] }}>
                        {formatScore(r.score)}
                      </span>
                    </ItemLink>
                  ))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

// ─── Waiting for a rating ─────────────────────────────────────────────────────
function Unrated({ stats, tab, config }: { stats: Stats; tab: TabValue; config: TabConfig }) {
  const shown = stats.unrated.slice(0, 12);
  if (shown.length === 0) return null;
  const more = stats.unrated.length - shown.length;
  const plural = config.value === "series" ? "series" : `${config.singular}s`;
  return (
    <Panel
      title={`${stats.unrated.length} ${stats.unrated.length === 1 ? config.singular : plural} waiting for a rating`}
      aside={more > 0 && (
        <LibraryLink tab={tab} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          {more} more in your library
        </LibraryLink>
      )}
    >
      <ul className="grid grid-cols-4 gap-3 px-5 pb-5 sm:grid-cols-6 lg:grid-cols-12">
        {shown.map((item) => (
          <li key={item.id}>
            <ItemLink tab={tab} id={item.id} title={`Rate ${item.title}`} className="group block no-underline">
              <Cover
                item={item}
                className="aspect-[3/4] w-full rounded-lg opacity-70 ring-1 ring-border/50 transition-all group-hover:opacity-100 group-hover:ring-primary"
              />
              <span className="mt-1 block truncate text-[11px] text-muted-foreground group-hover:text-foreground">
                {item.title}
              </span>
            </ItemLink>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ stats, tab, config }: { stats: Stats | null; tab: TabValue; config: TabConfig }) {
  const plural = config.value === "series" ? "series" : `${config.singular}s`;
  const hasItems = !!stats && stats.unrated.length > 0;
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border/60 px-6 py-16 text-center">
        <config.Icon className="h-8 w-8 text-muted-foreground/50" />
        <div className="space-y-1">
          <p className="font-semibold">No rated {plural} yet</p>
          <p className="mx-auto max-w-xs text-sm text-muted-foreground">
            {hasItems
              ? `Rate one of your ${plural} below and it will show up here.`
              : `Add a ${config.singular} to your library, then rate it to build your ranking.`}
          </p>
        </div>
        {!hasItems && (
          <Button asChild size="sm" className="gap-2">
            <LibraryLink tab={tab}>
              <Plus className="h-4 w-4" /> Add a {config.singular}
            </LibraryLink>
          </Button>
        )}
      </div>
      {stats && <Unrated stats={stats} tab={tab} config={config} />}
    </div>
  );
}

// ─── Tab view ─────────────────────────────────────────────────────────────────
function DashboardView({ stats, tab }: { stats: Stats | null; tab: TabValue }) {
  const config = TABS.find((t) => t.value === tab)!;
  if (!stats || stats.ranked.length === 0) return <EmptyState stats={stats} tab={tab} config={config} />;

  return (
    <div className="space-y-4">
      <Champion stats={stats} tab={tab} config={config} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Ranking stats={stats} tab={tab} config={config} />
        <div className="space-y-4">
          <Distribution stats={stats} config={config} />
          <CategoryAverages stats={stats} />
        </div>
      </div>
      <CategoryLeaders stats={stats} tab={tab} />
      <Unrated stats={stats} tab={tab} config={config} />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function Dashboard() {
  const fetchGames = useServerFn(listGames);
  const fetchMedia = useServerFn(listMedia);
  const queryGames = useQuery({ queryKey: ["games"], queryFn: () => fetchGames() });
  const queryMedia = useQuery({ queryKey: ["media"], queryFn: () => fetchMedia() });

  const { tab = "games" } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setTab = (t: TabValue) =>
    navigate({ search: { tab: t === "games" ? undefined : t }, replace: true });

  const gameStats = useMemo(() => {
    if (!queryGames.data) return null;
    return computeStats(queryGames.data.games, queryGames.data.ratings, queryGames.data.categories, "game_id");
  }, [queryGames.data]);

  const mediaStats = useMemo(() => {
    if (!queryMedia.data) return null;
    const { media, ratings, categories } = queryMedia.data;
    const forType = (t: "movie" | "series") => {
      const items = media.filter((m) => m.media_type === t);
      const ids = new Set(items.map((m) => m.id));
      return computeStats(items, ratings.filter((r) => ids.has(r.media_id)), categories, "media_id");
    };
    return { movies: forType("movie"), series: forType("series") };
  }, [queryMedia.data]);

  const statsMap = { games: gameStats, movies: mediaStats?.movies ?? null, series: mediaStats?.series ?? null };
  const isLoading = queryGames.isLoading || queryMedia.isLoading;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div role="tablist" aria-label="Library" className="flex gap-1 rounded-xl border border-border/50 bg-muted/30 p-1">
          {TABS.map(({ value, label, Icon }) => {
            const active = tab === value;
            const count = statsMap[value]?.ranked.length;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(value)}
                className={[
                  "relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
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
                {count != null && (
                  <span className="relative text-xs tabular-nums text-muted-foreground">{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <DashboardView stats={statsMap[tab]} tab={tab} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-48 rounded-2xl bg-muted/30 animate-pulse" />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="h-[30rem] rounded-2xl bg-muted/20 animate-pulse" />
        <div className="space-y-4">
          <div className="h-56 rounded-2xl bg-muted/20 animate-pulse" />
          <div className="h-56 rounded-2xl bg-muted/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
