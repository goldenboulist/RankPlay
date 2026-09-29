import { GAME_STATUSES, type GameStatus } from "@/integrations/supabase/types";

export { GAME_STATUSES };

export const STATUS_LABELS: Record<GameStatus, string> = {
  backlog: "To play",
  playing: "Playing",
  completed: "Completed",
  dropped: "Dropped",
};

// Badge colours, readable on top of cover art
export const STATUS_STYLES: Record<GameStatus, string> = {
  backlog: "bg-sky-500/85 text-white",
  playing: "bg-amber-500/90 text-black",
  completed: "bg-emerald-500/90 text-black",
  dropped: "bg-zinc-500/90 text-white",
};

export const PLATFORM_SUGGESTIONS = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X|S",
  "Xbox One",
  "Nintendo Switch 2",
  "Nintendo Switch",
  "Mobile",
];

/** Genres are stored as "Action, RPG" — Steam's format. */
export function splitGenres(genre: string | null | undefined): string[] {
  return (genre ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);
}
