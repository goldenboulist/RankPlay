import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listUsers } from "./users.functions-BaE2fANh.mjs";
import { T as Trophy, U as Users, k as CalendarDays, m as ChevronRight } from "./router-cdSR3IL0.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
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
import "./auth-middleware-C8T2NKNy.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function getInitials(user) {
  if (user.display_name) {
    return user.display_name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }
  return "?";
}
const AVATAR_GRADIENTS = ["from-violet-500 to-purple-600", "from-blue-500 to-cyan-600", "from-emerald-500 to-teal-600", "from-orange-500 to-amber-600", "from-pink-500 to-rose-600", "from-indigo-500 to-blue-600", "from-fuchsia-500 to-pink-600", "from-sky-500 to-indigo-600"];
function avatarGradient(id) {
  let hash = 0;
  for (const c of id) hash = hash * 31 + c.charCodeAt(0) & 4294967295;
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}
function UserCard({
  user,
  index
}) {
  const initials = getInitials(user);
  const gradient = avatarGradient(user.id);
  const name = user.display_name || "Player";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 16
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    delay: index * 0.055,
    duration: 0.35
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/users/$userId", params: {
    userId: user.id
  }, className: "group flex items-center gap-4 rounded-xl border border-border/50 bg-card px-5 py-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5 no-underline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${gradient} shadow-lg ring-2 ring-white/10`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] font-semibold text-white", children: initials }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Joined ",
          formatDate(user.created_at)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" })
  ] }) });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/40 bg-card py-24 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl bg-muted/50 rotate-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl bg-muted/30 -rotate-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid h-full place-items-center rounded-xl bg-muted/60 border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-muted-foreground/50" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "No users found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[240px]", children: "There are no registered users yet." })
    ] })
  ] });
}
function Skeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
    length: 5
  }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-border/40 bg-card px-5 py-4 animate-pulse", style: {
    animationDelay: `${i * 60}ms`
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 shrink-0 rounded-full bg-muted/50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/3 rounded bg-muted/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded bg-muted/30" })
    ] })
  ] }, i)) });
}
function UsersPage() {
  const fetchUsers = useServerFn(listUsers);
  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers()
  });
  const users = query.data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "pb-6 border-b border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1.5", children: "Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight leading-none", children: "Users" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Browse all registered members and explore their rankings." })
    ] }),
    !query.isLoading && users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.05
    }, className: "flex items-center gap-2 rounded-xl border border-border/50 bg-card px-5 py-3 w-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-[var(--color-gold,#c9913a)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-gold,#c9913a)] font-bold", children: users.length }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          users.length === 1 ? "member" : "members",
          " registered"
        ] })
      ] })
    ] }),
    query.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, {}) : users.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: users.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserCard, { user, index: i }, user.id)) })
  ] });
}
export {
  UsersPage as component
};
