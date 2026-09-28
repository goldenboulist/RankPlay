import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { O as Outlet, d as useNavigate, L as Link, e as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { s as supabase, P as Planet, b as LogOut, c as LayoutDashboard, d as Library, F as Film, U as Users, S as Settings } from "./router-cdSR3IL0.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { A as AnimatedDots } from "./AnimatedDots-C86O3KHg.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/games", label: "Games", icon: Library },
    { to: "/media", label: "Media", icon: Film },
    { to: "/users", label: "Users", icon: Users },
    { to: "/settings", label: "Settings", icon: Settings }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-0.5", "aria-label": "Main navigation", children: items.map(({ to, label, icon: Icon }) => {
    const active = pathname.startsWith(to);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        "aria-current": active ? "page" : void 0,
        className: `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
        ]
      },
      to
    );
  }) });
}
function AppShell({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground transition-colors isolate", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedDots, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 items-center justify-between gap-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/20 ring-1 ring-white/10 transition-all group-hover:shadow-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Planet, { className: "h-6 w-6 text-white drop-shadow-sm transition-transform group-hover:scale-110" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden font-bold tracking-tight sm:inline", children: [
          "Rank",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent", children: "Play" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-xs text-muted-foreground md:inline", children: email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: signOut, title: "Sign out", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto -max-w7xl px-4 py-6", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/30 mt-8 py-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/50", children: [
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
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
export {
  SplitComponent as component
};
