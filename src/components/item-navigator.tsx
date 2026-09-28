import { useEffect, useMemo } from "react";
import { ChevronRight } from "@/lib/icons";

// "user-*" sequences come from another member's library on their profile page
type Kind = "games" | "media" | "user-games" | "user-media";
type NavItem = { id: string; title: string; cover_url: string | null };

const storageKey = (kind: Kind) => `itemSequence:${kind}`;

/** Called by list pages: remember the order the user is browsing in (filters + sort). */
export function rememberSequence(kind: Kind, ids: string[]) {
  try {
    sessionStorage.setItem(storageKey(kind), JSON.stringify(ids));
  } catch { /* storage unavailable */ }
}

function readSequence(kind: Kind): string[] | null {
  try {
    const raw = sessionStorage.getItem(storageKey(kind));
    const ids = raw ? JSON.parse(raw) : null;
    return Array.isArray(ids) ? ids : null;
  } catch {
    return null;
  }
}

/**
 * Previous/next item around `currentId`, following the list order the user came from.
 * Falls back to `fallbackOrder` (e.g. by score) when the item isn't in that list.
 */
export function useItemSequence(kind: Kind, currentId: string, items: NavItem[], fallbackOrder: string[]) {
  return useMemo(() => {
    const byId = new Map(items.map((i) => [i.id, i]));
    const stored = readSequence(kind)?.filter((id) => byId.has(id));
    const ids = stored?.includes(currentId) ? stored : fallbackOrder.filter((id) => byId.has(id));
    const index = ids.indexOf(currentId);
    if (index === -1) return { prev: null, next: null, index: -1, total: ids.length };
    return {
      prev: index > 0 ? byId.get(ids[index - 1])! : null,
      next: index < ids.length - 1 ? byId.get(ids[index + 1])! : null,
      index,
      total: ids.length,
    };
  }, [kind, currentId, items, fallbackOrder]);
}

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) ||
    el.getAttribute("role") === "slider" ||
    !!el.closest("[role=dialog],[role=alertdialog],[role=listbox],[cmdk-root]")
  );
}

export function ItemNavigator({
  prev,
  next,
  index,
  total,
  onNavigate,
}: {
  prev: NavItem | null;
  next: NavItem | null;
  index: number;
  total: number;
  onNavigate: (id: string) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || isTypingTarget(e.target)) return;
      if (e.key === "ArrowLeft" && prev) { e.preventDefault(); onNavigate(prev.id); }
      if (e.key === "ArrowRight" && next) { e.preventDefault(); onNavigate(next.id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onNavigate]);

  if (index === -1 || total < 2) return null;

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-background/95 shadow-md backdrop-blur">
      <NavButton item={prev} direction="prev" onNavigate={onNavigate} />
      <span className="px-2 font-mono text-xs tabular-nums text-muted-foreground select-none">
        {index + 1} / {total}
      </span>
      <NavButton item={next} direction="next" onNavigate={onNavigate} />
    </div>
  );
}

function NavButton({
  item,
  direction,
  onNavigate,
}: {
  item: NavItem | null;
  direction: "prev" | "next";
  onNavigate: (id: string) => void;
}) {
  const label = direction === "prev" ? "Previous" : "Next";
  return (
    <button
      type="button"
      disabled={!item}
      onClick={() => item && onNavigate(item.id)}
      aria-label={item ? `${label}: ${item.title}` : label}
      title={item ? `${item.title}  (${direction === "prev" ? "←" : "→"})` : undefined}
      className="group relative grid h-9 w-9 place-items-center text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-30 first:rounded-l-lg last:rounded-r-lg"
    >
      <ChevronRight className={`h-4 w-4 transition-transform ${direction === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
      {item && (
        <span
          className="pointer-events-none absolute right-0 top-full mt-2 hidden w-44 items-center gap-2 rounded-lg border border-border bg-popover p-1.5 text-left text-popover-foreground shadow-lg group-hover:flex"
        >
          {item.cover_url ? (
            <img src={item.cover_url} alt="" className="h-10 w-7 shrink-0 rounded object-cover" />
          ) : (
            <span className="h-10 w-7 shrink-0 rounded bg-muted" />
          )}
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
            <span className="line-clamp-2 text-xs font-medium">{item.title}</span>
          </span>
        </span>
      )}
    </button>
  );
}
