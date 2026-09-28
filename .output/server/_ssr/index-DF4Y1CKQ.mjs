import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { P as Planet, e as Sparkles, T as Trophy, C as ChartPie } from "./router-cdSR3IL0.mjs";
import { A as AnimatedDots } from "./AnimatedDots-C86O3KHg.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark relative isolate min-h-screen overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedDots, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 -z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto flex items-center justify-between px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 group cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/20 ring-1 ring-white/10 transition-all group-hover:shadow-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Planet, { className: "h-7 w-7 text-white drop-shadow-sm transition-transform group-hover:scale-110" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold tracking-tight text-xl", children: [
          "Rank",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent", children: "Play" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "Sign in" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5
      }, className: "mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-xl", children: [
        "Games ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "·" }),
        " Movies ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "·" }),
        " Series"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "text-5xl font-extrabold tracking-tight md:text-7xl", children: [
        "Rate. Rank.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "Relive." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6,
        delay: 0.1
      }, className: "mx-auto mt-6 max-w-xl text-lg text-muted-foreground", children: "Build your personal Hall of Fame for everything you play and watch. Score games, movies and series across Story, Visuals, Sound and Enjoyment — and let the dashboard surface your taste." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6,
        delay: 0.2
      }, className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "px-10", children: "Get started" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-28 grid gap-5 md:grid-cols-3", children: [{
        icon: Sparkles,
        title: "Multi-criteria ratings",
        text: "Score games, movies and series 0–10 across default and custom categories."
      }, {
        icon: Trophy,
        title: "Top rankings",
        text: "Animated podium, top 5 leaderboard, evolving ranks — per medium or all together."
      }, {
        icon: ChartPie,
        title: "Visualize your taste",
        text: "Radar, histogram, genre and trend charts across everything you've rated."
      }].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1
      }, className: "rounded-xl border border-border bg-card/60 p-6 text-left backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 grid h-9 w-9 place-items-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: f.text })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/30 py-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " RankPlay"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mentions-legales", className: "hover:text-muted-foreground transition-colors", children: "Mentions légales" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politique-confidentialite", className: "hover:text-muted-foreground transition-colors", children: "Politique de confidentialité" })
    ] }) })
  ] });
}
export {
  Landing as component
};
