import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { k as listUploads } from "./games.functions-DGuPoniN.mjs";
import { f as formatTimecode, S as Slider, a as parseTimecode } from "./slider-BEs5bBs7.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { d as describeError, r as responseError, a as describeAudioError } from "./error-message-BA287X-o.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { M as Music2, O as ChevronDown, g as Check, L as Loader2, j as Plus, X, Q as Pause, V as Play } from "./router-z7_BG863.mjs";
import { S as Search } from "../_libs/lucide-react.mjs";
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
function useUploadedTracks() {
  const getUploads = useServerFn(listUploads);
  return useQuery({
    queryKey: ["uploaded-tracks"],
    queryFn: () => getUploads(),
    staleTime: 3e4
  });
}
function trackLabel(url, tracks = []) {
  const known = tracks.find((t) => t.url === url);
  if (known) return known.label;
  const last = url.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? url;
  let name = last;
  try {
    name = decodeURIComponent(last);
  } catch {
  }
  return name.replace(/^\d+-/, "").replace(/\.[^.]+$/, "").replace(/_/g, " ") || url;
}
function MusicPicker({
  value,
  onChange
}) {
  const qc = useQueryClient();
  const tracksQuery = useUploadedTracks();
  const tracks = tracksQuery.data ?? [];
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const select = (url) => {
    onChange({ url, start: url === value.url ? value.start : null });
    setOpen(false);
    setSearch("");
  };
  const upload = async (file) => {
    setUploading(true);
    const toastId = toast.loading(`Uploading “${file.name}”…`);
    try {
      if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error(`the file is ${(file.size / 1024 / 1024).toFixed(1)} MB, the limit is 30 MB`);
      }
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw await responseError(res);
      const data = await res.json();
      await qc.invalidateQueries({ queryKey: ["uploaded-tracks"] });
      select(data.url);
      toast.success("Uploaded!", { id: toastId });
    } catch (e) {
      toast.error(describeError(`upload “${file.name}”`, e), { id: toastId });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  const searchLooksLikeUrl = /^(https?:\/\/|\/)\S+$/.test(search.trim());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, modal: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: cn(
              "flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-input bg-transparent px-3 text-left text-sm shadow-xs transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              !value.url && "text-muted-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Music2,
                {
                  className: cn(
                    "h-3.5 w-3.5 shrink-0",
                    value.url ? "text-primary" : "opacity-60"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: value.url ? trackLabel(value.url, tracks) : "Choose a track…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 shrink-0 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          PopoverContent,
          {
            className: "w-[var(--radix-popover-trigger-width)] min-w-72 p-0",
            align: "start",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CommandInput,
                  {
                    value: search,
                    onValueChange: setSearch,
                    placeholder: "Search or paste a URL…"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { className: "max-h-64", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { className: "py-4 text-center text-xs text-muted-foreground", children: tracksQuery.isLoading ? "Loading tracks…" : tracksQuery.isError ? describeError("load the uploaded tracks", tracksQuery.error) : searchLooksLikeUrl ? "Press the button below to use this link" : "No track found" }),
                  tracks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: `Uploaded tracks · ${tracks.length}`, children: tracks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    CommandItem,
                    {
                      value: t.label,
                      onSelect: () => select(t.url),
                      className: "gap-2 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3.5 w-3.5 shrink-0 text-primary/70" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", title: t.label, children: t.label }),
                        t.url === value.url && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 shrink-0 text-primary" })
                      ]
                    },
                    t.url
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 border-t border-border p-1.5", children: [
                searchLooksLikeUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => select(search.trim()),
                    className: "flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs hover:bg-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                        "Use link “",
                        search.trim(),
                        "”"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    disabled: uploading,
                    onClick: () => fileRef.current?.click(),
                    className: "flex items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs hover:bg-accent disabled:opacity-50",
                    children: [
                      uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                      "Upload an audio file…"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileRef,
                    type: "file",
                    accept: "audio/*",
                    className: "hidden",
                    onChange: (e) => {
                      const f = e.target.files?.[0];
                      if (f) upload(f);
                    }
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      value.url && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange({ url: "", start: null }),
          "aria-label": "Remove music",
          title: "Remove music",
          className: "grid h-9 w-9 shrink-0 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
        }
      )
    ] }),
    value.url && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TimecodeEditor,
      {
        url: value.url,
        start: value.start,
        onStartChange: (start) => onChange({ url: value.url, start })
      },
      value.url
    )
  ] });
}
function TimecodeEditor({
  url,
  start,
  onStartChange
}) {
  const ref = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [duration, setDuration] = reactExports.useState(0);
  const [position, setPosition] = reactExports.useState(start ?? 0);
  const [scrubbing, setScrubbing] = reactExports.useState(null);
  const [draft, setDraft] = reactExports.useState(start ? formatTimecode(start) : "");
  reactExports.useEffect(() => {
    setDraft(start ? formatTimecode(start) : "");
  }, [start]);
  reactExports.useEffect(() => () => ref.current?.pause(), []);
  const seek = (t) => {
    const a = ref.current;
    if (a) a.currentTime = t;
    setPosition(t);
  };
  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      return;
    }
    if (a.currentTime === 0 && start) a.currentTime = start;
    a.play().catch((e) => {
      if (!a.error) toast.error(describeError("play the preview", e));
    });
  };
  const commitDraft = () => {
    if (draft === (start ? formatTimecode(start) : "")) return;
    const parsed = parseTimecode(draft);
    if (parsed === null) {
      onStartChange(null);
      return;
    }
    if (Number.isNaN(parsed) || duration > 0 && parsed >= duration) {
      toast.error("Invalid timecode — use m:ss, e.g. 1:23");
      setDraft(start ? formatTimecode(start) : "");
      return;
    }
    onStartChange(parsed || null);
    seek(parsed);
  };
  const shown = scrubbing ?? position;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-muted/30 p-2.5 space-y-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "audio",
      {
        ref,
        src: url,
        preload: "metadata",
        onError: (e) => {
          describeAudioError(e.currentTarget, url).then((msg) => toast.error(msg, { id: `audio-error:${url}` }));
        },
        onLoadedMetadata: (e) => {
          setDuration(e.currentTarget.duration || 0);
          if (start) e.currentTarget.currentTime = start;
        },
        onTimeUpdate: (e) => setPosition(e.currentTarget.currentTime),
        onPlay: () => setPlaying(true),
        onPause: () => setPlaying(false),
        onEnded: () => setPlaying(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: toggle,
          "aria-label": playing ? "Pause preview" : "Play preview",
          className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95",
          children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 translate-x-px" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            value: [shown],
            min: 0,
            max: duration || 1,
            step: 0.1,
            disabled: !duration,
            onValueChange: (v) => setScrubbing(v[0]),
            onValueCommit: (v) => {
              seek(v[0]);
              setScrubbing(null);
            }
          }
        ),
        start != null && duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            title: `Starts at ${formatTimecode(start)}`,
            className: "pointer-events-none absolute -top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-primary",
            style: { left: `${start / duration * 100}%` }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground", children: [
        formatTimecode(shown),
        duration > 0 && ` / ${formatTimecode(duration)}`
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Start at" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: draft,
          onChange: (e) => setDraft(e.target.value),
          onBlur: commitDraft,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitDraft();
            }
          },
          placeholder: "0:00",
          inputMode: "decimal",
          "aria-label": "Start timecode",
          className: "h-7 w-16 rounded-md border border-input bg-background px-2 text-center font-mono text-xs"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onStartChange(Math.round(position * 10) / 10 || null),
          className: "h-7 flex-1 truncate rounded-md border border-border bg-background px-2 text-xs hover:bg-accent",
          title: "Use the current preview position as start",
          children: [
            "Set to ",
            formatTimecode(position)
          ]
        }
      ),
      start != null && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onStartChange(null),
          "aria-label": "Reset start timecode",
          className: "grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
        }
      )
    ] })
  ] });
}
export {
  MusicPicker as M
};
