import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GAME_STATUSES,
  STATUS_LABELS,
  PLATFORM_SUGGESTIONS,
} from "@/lib/game-meta";
import type { GameStatus } from "@/integrations/supabase/types";

export function GenrePlatformFields({
  genre,
  platform,
  onChange,
  compact = false,
}: {
  genre: string;
  platform: string;
  onChange: (patch: { genre?: string; platform?: string }) => void;
  compact?: boolean;
}) {
  const listId = useId();
  const labelClass = compact ? "text-xs text-muted-foreground" : "text-sm";
  const inputClass = compact ? "h-8 text-sm" : undefined;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label className={labelClass}>Genre</Label>
        <Input
          value={genre}
          onChange={(e) => onChange({ genre: e.target.value })}
          placeholder="Action, RPG"
          maxLength={80}
          className={inputClass}
        />
      </div>
      <div className="space-y-1.5">
        <Label className={labelClass}>Platform</Label>
        <Input
          value={platform}
          onChange={(e) => onChange({ platform: e.target.value })}
          placeholder="PC"
          list={listId}
          maxLength={80}
          className={inputClass}
        />
        <datalist id={listId}>
          {PLATFORM_SUGGESTIONS.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

/** Segmented status control; clicking the active status clears it. */
export function StatusPicker({
  value,
  onChange,
  disabled,
}: {
  value: GameStatus | null;
  onChange: (status: GameStatus | null) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="radiogroup"
      aria-label="Play status"
    >
      {GAME_STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={value === s}
          disabled={disabled}
          onClick={() => onChange(value === s ? null : s)}
          className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all disabled:opacity-50 ${
            value === s
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
        >
          {STATUS_LABELS[s]}
        </button>
      ))}
    </div>
  );
}
