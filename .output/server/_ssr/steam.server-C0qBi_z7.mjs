const STORE = "https://store.steampowered.com/api";
const STEAM_CDN = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps";
const steamPortrait = (appId) => `${STEAM_CDN}/${appId}/library_600x900_2x.jpg`;
const steamHeader = (appId) => `${STEAM_CDN}/${appId}/header.jpg`;
async function fetchSteamDetails(appId) {
  const res = await fetch(`${STORE}/appdetails?appids=${appId}&l=english`);
  if (!res.ok) throw new Error("Steam details failed");
  const json = await res.json();
  const app = json[String(appId)];
  if (!app?.success || !app.data) return null;
  const portrait = steamPortrait(appId);
  const hasPortrait = await fetch(portrait, { method: "HEAD" }).then((r) => r.ok).catch(() => false);
  const genre = (app.data.genres ?? []).map((g) => g.description).join(", ");
  return {
    steam_appid: appId,
    title: app.data.name,
    cover_url: hasPortrait ? portrait : app.data.header_image ?? null,
    release_date: toIsoDate(app.data.release_date?.date),
    genre: genre ? genre.slice(0, 80) : null
  };
}
function normalizeTitle(title) {
  return title.toLowerCase().normalize("NFKD").replace(/[™®©]/g, "").replace(/[^a-z0-9]+/g, "");
}
const EDITION_SUFFIX = /\s*[:\-–]?\s*(the\s+)?(definitive|complete|game of the year|goty|enhanced|remastered|legacy|classic|deluxe|ultimate|gold|special|anniversary|director'?s cut|reloaded)(\s+edition)?\s*$/i;
function baseTitle(title) {
  let t = title.replace(/[™®©]/g, "").replace(/\([^)]*\)/g, " ").trim();
  for (let prev = ""; prev !== t; ) {
    prev = t;
    t = t.replace(EDITION_SUFFIX, "").replace(/\s+edition$/i, "").trim();
  }
  return normalizeTitle(t);
}
function toIsoDate(raw) {
  if (!raw) return null;
  const d = new Date(raw.replace(",", ""));
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export {
  steamPortrait as a,
  baseTitle as b,
  fetchSteamDetails as f,
  steamHeader as s
};
