import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as formatTimecode, S as Slider } from "./slider-BEs5bBs7.mjs";
import { C as ConfirmDialog } from "./confirm-dialog-CGd4zKgK.mjs";
import { I as Pause, J as Play, B as ChevronUp, G as ChevronDown, V as VolumeX, N as Volume2, t as Trash2 } from "./router-cdSR3IL0.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
const RestartIcon = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": "true", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 3v5h5" })
] });
function MusicPlayer({
  url,
  start,
  title,
  onRemove,
  removeDescription
}) {
  const ref = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [minimized, setMinimized] = reactExports.useState(false);
  const [duration, setDuration] = reactExports.useState(0);
  const [position, setPosition] = reactExports.useState(start ?? 0);
  const [scrubbing, setScrubbing] = reactExports.useState(null);
  const [volume, setVolume] = reactExports.useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("music-volume") : null;
    return saved !== null ? Number(saved) : 0.7;
  });
  const [muted, setMuted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);
  reactExports.useEffect(() => () => ref.current?.pause(), []);
  const play = () => ref.current?.play().catch(() => toast.error("Could not play audio"));
  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) a.pause();
    else play();
  };
  const restart = () => {
    const a = ref.current;
    if (!a) return;
    a.currentTime = start ?? 0;
    if (!playing) play();
  };
  const shown = scrubbing ?? position;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { y: 60, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 180, damping: 22 },
      className: `fixed bottom-5 left-5 z-50 overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-2xl backdrop-blur-2xl transition-all ${minimized ? "w-auto" : "w-80"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "audio",
          {
            ref,
            src: url,
            preload: "auto",
            onLoadedMetadata: (e) => {
              const a = e.currentTarget;
              setDuration(a.duration || 0);
              if (start) a.currentTime = start;
              a.volume = volume;
              a.muted = muted;
              a.play().catch(() => {
              });
            },
            onTimeUpdate: (e) => setPosition(e.currentTarget.currentTime),
            onPlay: () => setPlaying(true),
            onPause: () => setPlaying(false),
            onEnded: () => setPlaying(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" }),
        minimized ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: toggle,
              className: "h-8 w-8 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-md hover:scale-105 active:scale-95 transition-transform",
              "aria-label": playing ? "Pause" : "Play",
              children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 translate-x-0.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-xs font-semibold", children: title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setMinimized(false),
              title: "Expand",
              className: "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ml-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: toggle,
                className: "h-11 w-11 shrink-0 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform",
                "aria-label": playing ? "Pause" : "Play",
                children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 translate-x-0.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-semibold", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex h-3 items-end gap-[3px]", children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: "w-[3px] rounded-full bg-primary/70",
                  animate: playing ? { height: ["30%", "100%", "50%", "80%", "30%"] } : { height: "20%" },
                  transition: playing ? { duration: 0.6 + i * 0.07, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.1 } : {},
                  style: { display: "block" }
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: restart,
                  title: start ? `Restart from ${formatTimecode(start)}` : "Restart",
                  className: "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RestartIcon, { className: "h-3.5 w-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setMinimized(true),
                  title: "Minimize",
                  className: "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setMuted((m) => !m),
                  title: muted ? "Unmute" : "Mute",
                  className: "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                  children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-3.5 w-3.5" })
                }
              ),
              onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConfirmDialog,
                {
                  trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      title: "Remove music",
                      className: "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  title: "Remove music",
                  description: removeDescription ?? "",
                  confirmLabel: "Remove",
                  onConfirm: () => {
                    ref.current?.pause();
                    onRemove();
                  }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
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
                    if (ref.current) ref.current.currentTime = v[0];
                    setPosition(v[0]);
                    setScrubbing(null);
                  }
                }
              ),
              start != null && duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  title: `Timecode ${formatTimecode(start)}`,
                  className: "pointer-events-none absolute -top-1.5 h-1.5 w-0.5 -translate-x-1/2 rounded-full bg-primary",
                  style: { left: `${start / duration * 100}%` }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-mono text-[10px] tabular-nums text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTimecode(shown) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: duration > 0 ? formatTimecode(duration) : "--:--" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-3 w-3 shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Slider,
              {
                value: [volume * 100],
                min: 0,
                max: 100,
                step: 1,
                onValueChange: (v) => {
                  const val = v[0] / 100;
                  setVolume(val);
                  localStorage.setItem("music-volume", String(val));
                }
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  MusicPlayer as M
};
