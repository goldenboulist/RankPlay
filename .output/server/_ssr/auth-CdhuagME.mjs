import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase, P as Planet, E as EyeOff, a as Eye, L as Loader2, r as registerFn, l as loginFn } from "./router-3WV5o_3p.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { A as AnimatedDots } from "./AnimatedDots-C86O3KHg.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "./server-B4ncXPsG.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 28 : -28,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction > 0 ? -28 : 28,
    opacity: 0
  })
};
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [direction, setDirection] = reactExports.useState(0);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const {
      data
    } = supabase.auth.getSession();
    if (data.session) navigate({
      to: "/dashboard",
      replace: true
    });
  }, [navigate]);
  function handleModeChange(value) {
    const next = value;
    setDirection(next === "signup" ? 1 : -1);
    setMode(next);
  }
  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const result = await registerFn({
          data: {
            email,
            password,
            display_name: displayName || void 0
          }
        });
        supabase.auth._setSession(result.user);
      } else {
        const result = await loginFn({
          data: {
            email,
            password
          }
        });
        supabase.auth._setSession(result.user);
      }
      navigate({
        to: "/dashboard",
        replace: true
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dark relative isolate min-h-screen overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedDots, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 -z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 40
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.6,
      ease: "easeOut"
    }, className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card p-8 shadow-2xl shadow-black/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/20 ring-1 ring-white/10 transition-all group-hover:shadow-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Planet, { className: "h-7 w-7 text-primary-foreground drop-shadow-sm transition-transform group-hover:scale-110" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight", children: [
              "Rank",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent", children: "Play" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your personal video game ranking board" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: mode, onValueChange: handleModeChange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", children: "Sign in" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", children: "Create account" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { custom: direction, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", layout: true, transition: {
              x: {
                duration: 0.22,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.18
              },
              layout: {
                duration: 0.25,
                ease: "easeInOut"
              }
            }, className: "space-y-4", children: [
              mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Display name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "displayName", value: displayName, onChange: (e) => setDisplayName(e.target.value), placeholder: "Player One" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email", required: true, autoComplete: "email" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", required: true, minLength: mode === "signup" ? 8 : void 0, autoComplete: mode === "signin" ? "current-password" : "new-password", className: "pr-10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
                ] })
              ] })
            ] }, mode) }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
              opacity: 0,
              y: -4
            }, animate: {
              opacity: 1,
              y: 0
            }, className: "mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: loading, className: "mt-4 w-full", children: [
              loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
              mode === "signin" ? "Sign in" : "Create account"
            ] }),
            mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-center text-[11px] leading-relaxed text-muted-foreground/70", children: [
              "En créant un compte, vous acceptez notre",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/politique-confidentialite", className: "underline hover:text-muted-foreground transition-colors", children: "Politique de confidentialité" }),
              ". Vos données (email, nom d’affichage) sont utilisées uniquement pour faire fonctionner le service."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "← Back home" }) })
    ] }) })
  ] });
}
export {
  AuthPage as component
};
