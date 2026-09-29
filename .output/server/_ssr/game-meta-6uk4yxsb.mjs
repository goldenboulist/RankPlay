const STATUS_LABELS = {
  backlog: "To play",
  playing: "Playing",
  completed: "Completed",
  dropped: "Dropped"
};
const STATUS_STYLES = {
  backlog: "bg-sky-500/85 text-white",
  playing: "bg-amber-500/90 text-black",
  completed: "bg-emerald-500/90 text-black",
  dropped: "bg-zinc-500/90 text-white"
};
const PLATFORM_SUGGESTIONS = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X|S",
  "Xbox One",
  "Nintendo Switch 2",
  "Nintendo Switch",
  "Mobile"
];
function splitGenres(genre) {
  return (genre ?? "").split(",").map((g) => g.trim()).filter(Boolean);
}
export {
  PLATFORM_SUGGESTIONS as P,
  STATUS_LABELS as S,
  STATUS_STYLES as a,
  splitGenres as s
};
