import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useTheme, f as Check } from "./router-cdSR3IL0.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const THEMES = [
  { key: "light", label: "Light", swatch: "oklch(0.97 0.01 250)", mode: "light" },
  { key: "sky", label: "Sky", swatch: "oklch(0.58 0.18 230)", mode: "light" },
  { key: "blush", label: "Blush", swatch: "oklch(0.62 0.20 10)", mode: "light" },
  { key: "lavender", label: "Lavender", swatch: "oklch(0.60 0.20 300)", mode: "light" },
  { key: "mint", label: "Mint", swatch: "oklch(0.58 0.16 160)", mode: "light" },
  { key: "citrus", label: "Citrus", swatch: "oklch(0.68 0.18 50)", mode: "light" },
  { key: "pearl", label: "Pearl", swatch: "oklch(0.62 0.13 80)", mode: "light" },
  { key: "dark", label: "Dark", swatch: "oklch(0.18 0.02 260)", mode: "dark" },
  { key: "red", label: "Crimson", swatch: "oklch(0.55 0.22 25)", mode: "dark" },
  { key: "blue", label: "Ocean", swatch: "oklch(0.55 0.20 240)", mode: "dark" },
  { key: "purple", label: "Royal", swatch: "oklch(0.55 0.24 300)", mode: "dark" },
  { key: "cyberpunk", label: "Cyberpunk", swatch: "oklch(0.70 0.28 330)", mode: "dark" },
  { key: "neon", label: "Neon", swatch: "oklch(0.80 0.28 140)", mode: "dark" },
  { key: "retro", label: "Retro", swatch: "oklch(0.70 0.18 60)", mode: "dark" },
  { key: "emerald", label: "Emerald", swatch: "oklch(0.75 0.20 160)", mode: "dark" },
  { key: "sunset", label: "Sunset", swatch: "oklch(0.75 0.22 35)", mode: "dark" },
  { key: "ocean", label: "Deep Ocean", swatch: "oklch(0.72 0.18 220)", mode: "dark" },
  { key: "dracula", label: "Dracula", swatch: "oklch(0.78 0.22 310)", mode: "dark" },
  { key: "luxury", label: "Luxury", swatch: "oklch(0.82 0.15 90)", mode: "dark" }
];
function SunIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", d: "M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" })
  ] });
}
function MoonIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" }) });
}
function SettingsPage() {
  const {
    theme,
    setTheme
  } = useTheme();
  const groups = [{
    mode: "light",
    label: "Light",
    hint: "Bright, clean, daylight-friendly",
    icon: SunIcon
  }, {
    mode: "dark",
    label: "Dark",
    hint: "Low-glare, focused, easy on the eyes",
    icon: MoonIcon
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1.5", children: "Preferences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight leading-none", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Personalize your experience." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Theme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Pick a vibe. Your choice is remembered on this device." })
      ] }),
      groups.map((group, gi) => {
        const themesInGroup = THEMES.filter((t) => t.mode === group.mode);
        const Icon = group.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border/50 bg-muted/40 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-semibold tracking-tight", children: group.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground/70", children: group.hint })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[11px] tabular-nums text-muted-foreground/50", children: themesInGroup.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-border/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2.5 sm:grid-cols-4 md:grid-cols-8", children: themesInGroup.map((t, i) => {
            const active = t.key === theme;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
              opacity: 0,
              y: 8
            }, animate: {
              opacity: 1,
              y: 0
            }, transition: {
              delay: (gi * themesInGroup.length + i) * 0.04,
              duration: 0.25
            }, whileHover: {
              scale: 1.02
            }, whileTap: {
              scale: 0.97
            }, onClick: () => setTheme(t.key), className: ["relative overflow-hidden rounded-xl border text-left transition-colors", active ? "border-primary/60 bg-primary/8 shadow-sm shadow-primary/10" : "border-border/50 bg-card hover:bg-muted/40"].join(" "), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-full rounded-t-xl", style: {
                background: `linear-gradient(135deg, ${t.swatch}, color-mix(in oklab, ${t.swatch} 35%, transparent))`
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 px-3 py-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-medium leading-none", children: t.label }),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
                  scale: 0
                }, animate: {
                  scale: 1
                }, transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }, className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5" }) })
              ] })
            ] }, t.key);
          }) })
        ] }, group.mode);
      })
    ] })
  ] });
}
export {
  SettingsPage as component
};
