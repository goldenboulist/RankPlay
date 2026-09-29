import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, b as Close, a as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { X } from "../_libs/lucide-react.mjs";
import { a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as describeError } from "./error-message-BA287X-o.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { w as Search, L as Loader2 } from "./router-B00edaQI.mjs";
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function CatalogSearch({
  label,
  placeholder,
  queryKey,
  search,
  getKey,
  renderItem,
  onPick
}) {
  const [term, setTerm] = reactExports.useState("");
  const [debounced, setDebounced] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebounced(term.trim()), 300);
    return () => clearTimeout(t);
  }, [term]);
  const results = useQuery({
    queryKey: [queryKey, debounced],
    queryFn: () => search(debounced),
    enabled: debounced.length >= 2,
    staleTime: 5 * 6e4,
    retry: false
  });
  const pick = useMutation({
    mutationFn: async (item) => onPick(item),
    onSuccess: () => {
      setTerm("");
      setOpen(false);
    },
    onError: (e) => toast.error(describeError("load the details of this result", e))
  });
  const items = results.data ?? [];
  const showList = open && debounced.length >= 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: term,
          onChange: (e) => {
            setTerm(e.target.value);
            setOpen(true);
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (items[0]) pick.mutate(items[0]);
            }
          },
          placeholder,
          className: "pl-9 pr-9",
          autoFocus: true
        }
      ),
      (results.isFetching || pick.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-muted-foreground" })
    ] }),
    showList && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto rounded-md border border-border/50 bg-muted/20", children: results.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-3 py-2 text-xs text-muted-foreground", children: [
      results.error instanceof Error ? results.error.message : "Search unavailable",
      " ",
      "— fill the fields manually."
    ] }) : items.length === 0 ? !results.isFetching && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-2 text-xs text-muted-foreground", children: "No results — fill the fields manually." }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: pick.isPending,
        onClick: () => pick.mutate(item),
        className: "flex w-full items-center gap-3 px-2 py-1.5 text-left text-sm hover:bg-muted/60 disabled:opacity-50",
        children: renderItem(item)
      },
      getKey(item)
    )) })
  ] });
}
export {
  CatalogSearch as C,
  Dialog as D,
  DialogTrigger as a,
  DialogContent as b,
  DialogHeader as c,
  DialogTitle as d,
  DialogFooter as e
};
