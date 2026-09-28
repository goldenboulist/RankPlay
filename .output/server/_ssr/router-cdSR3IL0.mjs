import { b as QueryClient, c as MutationCache, d as QueryCache } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, T as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CKhcZQ3s.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "./index.mjs";
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
const icon = (paths) => function SvgIcon({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": "true",
      ...props,
      dangerouslySetInnerHTML: { __html: paths }
    }
  );
};
const ArrowLeft = icon('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>');
const Plus = icon('<path d="M5 12h14"/><path d="M12 5v14"/>');
const Trash2 = icon('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>');
const X = icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const Play = icon('<polygon points="6 3 20 12 6 21 6 3"/>');
const Pause = icon('<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>');
const Volume2 = icon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>');
const VolumeX = icon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>');
const Music2 = icon('<circle cx="8" cy="18" r="4"/><path d="M12 18V2l7 4"/>');
const Heart = icon('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>');
const Search = icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
const Planet = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "48", height: "48", viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", className, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.7952 36.3236C16.5649 38.6197 20.1214 40 24.0003 40C32.8368 40 40.0003 32.8366 40.0003 24C40.0003 22.8619 39.8815 21.7516 39.6555 20.6807M13.7952 36.3236C10.2551 33.3888 8.00028 28.9577 8.00028 24C8.00028 15.1634 15.1637 8 24.0003 8C31.6987 8 38.1273 13.4371 39.6555 20.6807M13.7952 36.3236C17.7063 35.4295 22.3591 33.5656 27.052 30.8562C32.5127 27.7035 36.9545 24.025 39.6555 20.6807M13.7952 36.3236C8.93687 37.4342 5.22319 37.0486 3.9993 34.9288C2.73867 32.7453 4.39262 29.1939 7.99999 25.418M39.6555 20.6807C42.1592 17.5808 43.1671 14.7681 42.1044 12.9275C41.0268 11.061 38.0191 10.5388 33.9993 11.1986", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) });
const Star = icon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>');
const LayoutDashboard = icon('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>');
const LogOut = icon('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>');
const Settings = icon('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>');
const Library = icon('<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>');
const Trophy = icon('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>');
const Check = icon('<path d="M20 6 9 17l-5-5"/>');
const Sparkles = icon('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>');
const ChartPie = icon('<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>');
const Loader2 = icon('<path d="M21 12a9 9 0 1 1-6.219-8.56"/>');
const Eye = icon('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>');
const EyeOff = icon('<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>');
const SlidersHorizontal = icon('<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>');
const LayoutGrid = icon('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>');
const Sword = icon('<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/>');
const Shield = icon('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>');
const Zap = icon('<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>');
const Flame = icon('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>');
const Target = icon('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>');
const Skull = icon('<path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/>');
const Ghost = icon('<path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>');
const Crown = icon('<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>');
const Gem = icon('<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>');
const Droplet = icon('<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>');
const Moon = icon('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>');
const Sun = icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>');
const Cloud = icon('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>');
const Snowflake = icon('<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>');
const Music = icon('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>');
const Book = icon('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/>');
const Map = icon('<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.764v15"/>');
const Compass = icon('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>');
const Crosshair = icon('<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>');
const Anchor = icon('<path d="M12 22V12"/><path d="M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M17 12H7"/><path d="M7.5 16.5A5 5 0 0 0 17 12"/><path d="M16.5 7.5A5 5 0 0 0 7 12"/>');
const Film = icon('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>');
const Tv = icon('<rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/>');
const ChevronDown = icon('<path d="m6 9 6 6 6-6"/>');
const ChevronUp = icon('<path d="m18 15-6-6-6 6"/>');
const Users = icon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>');
const UserCircle = icon('<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>');
const ChevronRight = icon('<path d="m9 18 6-6-6-6"/>');
const CalendarDays = icon('<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>');
const STORAGE_KEY$1 = "rankplay-cookie-notice";
function CookieBanner() {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY$1);
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);
  function dismiss() {
    localStorage.setItem(STORAGE_KEY$1, "1");
    setVisible(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      role: "dialog",
      "aria-label": "Information sur les cookies",
      "aria-live": "polite",
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 24 },
      transition: { duration: 0.35, ease: "easeOut" },
      className: "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card/90 px-5 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-xl select-none", "aria-hidden": "true", children: "🍪" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Cookies — uniquement ce qui est nécessaire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
              "Ce site utilise ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "uniquement des cookies d'authentification" }),
              ", indispensables au fonctionnement du service (maintien de votre session). Aucun cookie publicitaire ni de tracking tiers n'est utilisé.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/politique-confidentialite",
                  className: "text-primary hover:underline",
                  children: "En savoir plus"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: dismiss,
              "aria-label": "Fermer le bandeau cookies",
              id: "cookie-banner-close",
              className: "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: dismiss,
            id: "cookie-banner-accept",
            className: "rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
            children: "Compris"
          }
        ) })
      ] })
    }
  ) });
}
const appCss = "/assets/styles-Cyxk2QHo.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const ThemeContext = reactExports.createContext(null);
const STORAGE_KEY = "vg-theme";
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) || "red";
    setThemeState(saved);
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme !== "light");
  }, [theme]);
  const setTheme = (t) => {
    setThemeState(t);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, t);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, setTheme }, children });
}
function useTheme() {
  const ctx = reactExports.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside provider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      theme: theme === "light" ? "light" : "dark",
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap" },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$f.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    Promise.resolve().then(() => client).then(({ supabase: supabase2 }) => {
      if (cancelled) return;
      const { data: sub } = supabase2.auth.onAuthStateChange((event) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
        router2.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      });
      window.__vgAuthSub = sub.subscription;
    });
    return () => {
      cancelled = true;
      const sub = window.__vgAuthSub;
      sub?.unsubscribe();
    };
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CookieBanner, {})
  ] }) });
}
const $$splitComponentImporter$e = () => import("./reset-password-BTU5dmpx.mjs");
const Route$e = createFileRoute("/reset-password")({
  beforeLoad: () => {
    throw redirect({
      to: "/auth"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./politique-confidentialite-BoinhDAU.mjs");
const Route$d = createFileRoute("/politique-confidentialite")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Politique de confidentialité — RankPlay"
    }, {
      name: "description",
      content: "Politique de confidentialité et de protection des données personnelles de RankPlay, conformément au RGPD et à la loi Informatique et Libertés."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./mentions-legales-BSLUKoAF.mjs");
const Route$c = createFileRoute("/mentions-legales")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Mentions légales — RankPlay"
    }, {
      name: "description",
      content: "Mentions légales du site RankPlay conformément à la LCEN (loi n°2004-575 du 21 juin 2004)."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./auth--wU-ppVc.mjs");
const Route$b = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Sign in"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const registerFn = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  email: stringType().trim().toLowerCase().email().max(255),
  password: stringType().min(8).max(200),
  display_name: stringType().trim().max(100).optional()
}).parse(d)).handler(createSsrRpc("34c6d52668704398adcb57dc8f4c6f46d89204dc6879ff6ae7a0b1788461f47b"));
const loginFn = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  email: stringType().trim().toLowerCase().email().max(255),
  password: stringType().min(1).max(200)
}).parse(d)).handler(createSsrRpc("6d4b29dcb4b664e5b9e190280c200c64479ce35a61ed4a534b0d4706e66654ba"));
const logoutFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("f97313454005e76f4abe19e1bad6e1a69821f9b7a7187053b1e91f040449315f"));
const USER_KEY = "rp_user";
const LEGACY_TOKEN_KEY = "rp_token";
const _listeners = /* @__PURE__ */ new Set();
function _emit(event) {
  _listeners.forEach((cb) => cb(event));
}
function getStoredSession() {
  if (typeof window === "undefined") return null;
  try {
    if (localStorage.getItem(LEGACY_TOKEN_KEY) !== null) {
      clearSession();
      return null;
    }
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;
    return { user: JSON.parse(user) };
  } catch {
    return null;
  }
}
function storeSession(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
const supabase = {
  auth: {
    getSession() {
      return { data: { session: getStoredSession() } };
    },
    async getUser() {
      const session = getStoredSession();
      return { data: { user: session?.user ?? null }, error: null };
    },
    /** Subscribe to auth state changes (SIGNED_IN, SIGNED_OUT, USER_UPDATED) */
    onAuthStateChange(callback) {
      _listeners.add(callback);
      return {
        data: {
          subscription: {
            unsubscribe() {
              _listeners.delete(callback);
            }
          }
        }
      };
    },
    /** Call after a successful loginFn / registerFn response */
    _setSession(user) {
      storeSession(user);
      _emit("SIGNED_IN");
    },
    async signOut() {
      await logoutFn().catch(() => {
      });
      clearSession();
      _emit("SIGNED_OUT");
      window.location.href = "/auth";
    },
    /** Drop the local profile after the server rejected the session cookie. */
    _expire() {
      if (!getStoredSession()) return;
      clearSession();
      _emit("SIGNED_OUT");
      window.location.href = "/auth";
    }
  }
};
const client = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  supabase
}, Symbol.toStringTag, { value: "Module" }));
const $$splitComponentImporter$a = () => import("./route-DYJ2fjaU.mjs");
const Route$a = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-DF4Y1CKQ.mjs");
const Route$9 = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "RankPlay"
    }, {
      name: "description",
      content: "Personal rating board for games, movies and series. Score titles across multiple categories and visualize your taste."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./settings-CRTYRjtd.mjs");
const Route$8 = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [{
      title: "Settings"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./dashboard-DIs1s5by.mjs");
const Route$7 = createFileRoute("/_authenticated/dashboard")({
  // Optional so plain links to /dashboard stay valid; kept in the URL so "back" restores it
  validateSearch: (s) => ({
    tab: s.tab === "movies" || s.tab === "series" ? s.tab : void 0
  }),
  head: () => ({
    meta: [{
      title: "Dashboard"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./users.index-B17g_Wx6.mjs");
const Route$6 = createFileRoute("/_authenticated/users/")({
  head: () => ({
    meta: [{
      title: "Users"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./media.index-ag9MMS3G.mjs");
const Route$5 = createFileRoute("/_authenticated/media/")({
  validateSearch: (s) => ({
    type: typeof s.type === "string" ? s.type : "all",
    category: typeof s.category === "string" ? s.category : "all",
    search: typeof s.search === "string" ? s.search : "",
    sort: typeof s.sort === "string" ? s.sort : "score_desc",
    favOnly: s.favOnly === true || s.favOnly === "true"
  }),
  head: () => ({
    meta: [{
      title: "Movies & Series"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./games.index-CLXvDK8-.mjs");
const Route$4 = createFileRoute("/_authenticated/games/")({
  validateSearch: (s) => ({
    category: typeof s.category === "string" ? s.category : "all",
    search: typeof s.search === "string" ? s.search : "",
    sort: typeof s.sort === "string" ? s.sort : "score_desc",
    favOnly: s.favOnly === true || s.favOnly === "true"
  }),
  head: () => ({
    meta: [{
      title: "Games"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./users._userId-DcQvlkkY.mjs");
const Route$3 = createFileRoute("/_authenticated/users/$userId")({
  // All optional so plain links to a profile don't have to spell out the filters
  validateSearch: (s) => ({
    tab: s.tab === "media" ? "media" : void 0,
    type: s.type === "movie" || s.type === "series" ? s.type : void 0,
    category: typeof s.category === "string" ? s.category : void 0,
    search: typeof s.search === "string" ? s.search : void 0,
    sort: typeof s.sort === "string" ? s.sort : void 0,
    favOnly: s.favOnly === true || s.favOnly === "true" || void 0
  }),
  head: () => ({
    meta: [{
      title: "User Profile"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./media._mediaId-OHjrMT_2.mjs");
const Route$2 = createFileRoute("/_authenticated/media/$mediaId")({
  head: () => ({
    meta: [{
      title: "Media"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./games._gameId-CnVApo1f.mjs");
const Route$1 = createFileRoute("/_authenticated/games/$gameId")({
  head: () => ({
    meta: [{
      title: "Game"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./users._userId_._kind._itemId-u32tF0vG.mjs");
const Route = createFileRoute("/_authenticated/users/$userId_/$kind/$itemId")({
  beforeLoad: ({
    params
  }) => {
    if (params.kind !== "games" && params.kind !== "media") throw notFound();
  },
  head: () => ({
    meta: [{
      title: "Member rating"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResetPasswordRoute = Route$e.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$f
});
const PolitiqueConfidentialiteRoute = Route$d.update({
  id: "/politique-confidentialite",
  path: "/politique-confidentialite",
  getParentRoute: () => Route$f
});
const MentionsLegalesRoute = Route$c.update({
  id: "/mentions-legales",
  path: "/mentions-legales",
  getParentRoute: () => Route$f
});
const AuthRoute = Route$b.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$f
});
const AuthenticatedRouteRoute = Route$a.update({
  id: "/_authenticated",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const AuthenticatedSettingsRoute = Route$8.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$7.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedUsersIndexRoute = Route$6.update({
  id: "/users/",
  path: "/users/",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedMediaIndexRoute = Route$5.update({
  id: "/media/",
  path: "/media/",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedGamesIndexRoute = Route$4.update({
  id: "/games/",
  path: "/games/",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedUsersUserIdRoute = Route$3.update({
  id: "/users/$userId",
  path: "/users/$userId",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedMediaMediaIdRoute = Route$2.update({
  id: "/media/$mediaId",
  path: "/media/$mediaId",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedGamesGameIdRoute = Route$1.update({
  id: "/games/$gameId",
  path: "/games/$gameId",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedUsersUserIdKindItemIdRoute = Route.update({
  id: "/users/$userId_/$kind/$itemId",
  path: "/users/$userId/$kind/$itemId",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedDashboardRoute,
  AuthenticatedSettingsRoute,
  AuthenticatedGamesGameIdRoute,
  AuthenticatedMediaMediaIdRoute,
  AuthenticatedUsersUserIdRoute,
  AuthenticatedGamesIndexRoute,
  AuthenticatedMediaIndexRoute,
  AuthenticatedUsersIndexRoute,
  AuthenticatedUsersUserIdKindItemIdRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  MentionsLegalesRoute,
  PolitiqueConfidentialiteRoute,
  ResetPasswordRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
function onError(error) {
  if (error instanceof Error && error.message.startsWith("Unauthorized")) {
    supabase.auth._expire();
  }
}
const getRouter = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError })
  });
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Snowflake as $,
  ArrowLeft as A,
  ChevronUp as B,
  ChartPie as C,
  Route$1 as D,
  EyeOff as E,
  Film as F,
  ChevronDown as G,
  Heart as H,
  Pause as I,
  Play as J,
  Route as K,
  Loader2 as L,
  Music2 as M,
  Volume2 as N,
  Anchor as O,
  Planet as P,
  Crosshair as Q,
  Route$7 as R,
  Settings as S,
  Trophy as T,
  Users as U,
  VolumeX as V,
  Compass as W,
  X,
  Map as Y,
  Book as Z,
  Music as _,
  Eye as a,
  Cloud as a0,
  Sun as a1,
  Moon as a2,
  Droplet as a3,
  Gem as a4,
  Ghost as a5,
  Skull as a6,
  Target as a7,
  Flame as a8,
  Zap as a9,
  Shield as aa,
  Sword as ab,
  router as ac,
  LogOut as b,
  LayoutDashboard as c,
  Library as d,
  Sparkles as e,
  Check as f,
  Tv as g,
  Plus as h,
  Crown as i,
  Star as j,
  CalendarDays as k,
  loginFn as l,
  ChevronRight as m,
  Route$5 as n,
  LayoutGrid as o,
  Search as p,
  SlidersHorizontal as q,
  registerFn as r,
  supabase as s,
  Trash2 as t,
  useTheme as u,
  createSsrRpc as v,
  Route$4 as w,
  Route$3 as x,
  UserCircle as y,
  Route$2 as z
};
