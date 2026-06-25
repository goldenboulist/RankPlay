import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy, ChartPie, Planet } from "@/lib/icons";
import { AnimatedDots } from "@/components/AnimatedDots";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "RankPlay" },
      { name: "description", content: "Personal rating board for games, movies and series. Score titles across multiple categories and visualize your taste." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="dark relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatedDots />
      {/* 60% background layer — single subtle gradient, no competing orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <header className="mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/20 ring-1 ring-white/10 transition-all group-hover:shadow-accent/30">
            {/* Custom Abstract SVG: Merges Play Button, Stars, and Ranking Bars */}
            <Planet className="h-7 w-7 text-white drop-shadow-sm transition-transform group-hover:scale-110" />
          </div>

          <span className="font-bold tracking-tight text-xl">
            Rank<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Play</span>
          </span>
        </div>
        <Link to="/auth">
          <Button variant="ghost" size="sm">Sign in</Button>
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-xl"
        >
          Games <span className="text-primary">·</span> Movies <span className="text-primary">·</span> Series
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Rate. Rank.{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Relive.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Build your personal Hall of Fame for everything you play and watch. Score
          games, movies and series across Story, Visuals, Sound and Enjoyment —
          and let the dashboard surface your taste.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/auth">
            <Button size="lg" className="px-10">Get started</Button>
          </Link>
        </motion.div>

        {/* Feature cards — 30% surface layer */}
        <div className="mt-28 grid gap-5 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Multi-criteria ratings", text: "Score games, movies and series 0–10 across default and custom categories." },
            { icon: Trophy, title: "Top rankings", text: "Animated podium, top 5 leaderboard, evolving ranks — per medium or all together." },
            { icon: ChartPie, title: "Visualize your taste", text: "Radar, histogram, genre and trend charts across everything you've rated." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="rounded-xl border border-border bg-card/60 p-6 text-left backdrop-blur-xl"
            >
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}