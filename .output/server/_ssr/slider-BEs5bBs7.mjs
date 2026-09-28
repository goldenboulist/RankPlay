import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slider$1, a as SliderTrack, b as SliderRange, c as SliderThumb } from "../_libs/radix-ui__react-slider.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
function formatTimecode(seconds) {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const tenths = Math.round((seconds - whole) * 10);
  const h = Math.floor(whole / 3600);
  const m = Math.floor(whole % 3600 / 60);
  const s = whole % 60;
  const ss = String(s).padStart(2, "0") + (tenths > 0 && tenths < 10 ? `.${tenths}` : "");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}
function parseTimecode(input) {
  const str = input.trim().replace(",", ".");
  if (!str) return null;
  const parts = str.split(":");
  if (parts.length > 3 || parts.some((p) => !/^\d+(\.\d+)?$/.test(p))) return NaN;
  return parts.reduce((acc, p) => acc * 60 + Number(p), 0);
}
function parseDecimal(input) {
  const str = input.trim().replace(",", ".");
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}
const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Slider$1,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SliderTrack, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderRange, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Slider$1.displayName;
export {
  Slider as S,
  parseTimecode as a,
  formatTimecode as f,
  parseDecimal as p
};
