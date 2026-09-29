import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as STATUS_LABELS, P as PLATFORM_SUGGESTIONS } from "./game-meta-6uk4yxsb.mjs";
import { G as GAME_STATUSES } from "./types-B16xxWPT.mjs";
function GenrePlatformFields({
  genre,
  platform,
  onChange,
  compact = false
}) {
  const listId = reactExports.useId();
  const labelClass = compact ? "text-xs text-muted-foreground" : "text-sm";
  const inputClass = compact ? "h-8 text-sm" : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: labelClass, children: "Genre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: genre,
          onChange: (e) => onChange({ genre: e.target.value }),
          placeholder: "Action, RPG",
          maxLength: 80,
          className: inputClass
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: labelClass, children: "Platform" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: platform,
          onChange: (e) => onChange({ platform: e.target.value }),
          placeholder: "PC",
          list: listId,
          maxLength: 80,
          className: inputClass
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: listId, children: PLATFORM_SUGGESTIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p }, p)) })
    ] })
  ] });
}
function StatusPicker({
  value,
  onChange,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-wrap gap-1.5",
      role: "radiogroup",
      "aria-label": "Play status",
      children: GAME_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": value === s,
          disabled,
          onClick: () => onChange(value === s ? null : s),
          className: `rounded-lg border px-2.5 py-1 text-xs font-medium transition-all disabled:opacity-50 ${value === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
          children: STATUS_LABELS[s]
        },
        s
      ))
    }
  );
}
export {
  GenrePlatformFields as G,
  StatusPicker as S
};
