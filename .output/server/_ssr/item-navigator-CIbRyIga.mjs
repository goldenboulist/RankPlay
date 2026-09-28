import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { m as ChevronRight } from "./router-cdSR3IL0.mjs";
const storageKey = (kind) => `itemSequence:${kind}`;
function rememberSequence(kind, ids) {
  try {
    sessionStorage.setItem(storageKey(kind), JSON.stringify(ids));
  } catch {
  }
}
function readSequence(kind) {
  try {
    const raw = sessionStorage.getItem(storageKey(kind));
    const ids = raw ? JSON.parse(raw) : null;
    return Array.isArray(ids) ? ids : null;
  } catch {
    return null;
  }
}
function useItemSequence(kind, currentId, items, fallbackOrder) {
  return reactExports.useMemo(() => {
    const byId = new Map(items.map((i) => [i.id, i]));
    const stored = readSequence(kind)?.filter((id) => byId.has(id));
    const ids = stored?.includes(currentId) ? stored : fallbackOrder.filter((id) => byId.has(id));
    const index = ids.indexOf(currentId);
    if (index === -1) return { prev: null, next: null, index: -1, total: ids.length };
    return {
      prev: index > 0 ? byId.get(ids[index - 1]) : null,
      next: index < ids.length - 1 ? byId.get(ids[index + 1]) : null,
      index,
      total: ids.length
    };
  }, [kind, currentId, items, fallbackOrder]);
}
function isTypingTarget(el) {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.getAttribute("role") === "slider" || !!el.closest("[role=dialog],[role=alertdialog],[role=listbox],[cmdk-root]");
}
function ItemNavigator({
  prev,
  next,
  index,
  total,
  onNavigate
}) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || isTypingTarget(e.target)) return;
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        onNavigate(prev.id);
      }
      if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        onNavigate(next.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onNavigate]);
  if (index === -1 || total < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-lg border border-border bg-background/95 shadow-md backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavButton, { item: prev, direction: "prev", onNavigate }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 font-mono text-xs tabular-nums text-muted-foreground select-none", children: [
      index + 1,
      " / ",
      total
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavButton, { item: next, direction: "next", onNavigate })
  ] });
}
function NavButton({
  item,
  direction,
  onNavigate
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      disabled: !item,
      onClick: () => item && onNavigate(item.id),
      "aria-label": item ? `${label}: ${item.title}` : label,
      title: item ? `${item.title}  (${direction === "prev" ? "←" : "→"})` : void 0,
      className: "group relative grid h-9 w-9 place-items-center text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-30 first:rounded-l-lg last:rounded-r-lg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `h-4 w-4 transition-transform ${direction === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}` }),
        item && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "pointer-events-none absolute right-0 top-full mt-2 hidden w-44 items-center gap-2 rounded-lg border border-border bg-popover p-1.5 text-left text-popover-foreground shadow-lg group-hover:flex",
            children: [
              item.cover_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.cover_url, alt: "", className: "h-10 w-7 shrink-0 rounded object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-7 shrink-0 rounded bg-muted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 text-xs font-medium", children: item.title })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  ItemNavigator as I,
  rememberSequence as r,
  useItemSequence as u
};
