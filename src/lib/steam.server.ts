// Server-only Steam helpers shared by the search and recommendation functions.

const STORE = "https://store.steampowered.com/api";
export const STEAM_CDN =
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps";

export type SteamGameDetails = {
  steam_appid: number;
  title: string;
  cover_url: string | null;
  release_date: string | null;
  genre: string | null;
};

export const steamPortrait = (appId: number) =>
  `${STEAM_CDN}/${appId}/library_600x900_2x.jpg`;
export const steamHeader = (appId: number) =>
  `${STEAM_CDN}/${appId}/header.jpg`;

export async function fetchSteamDetails(
  appId: number,
): Promise<SteamGameDetails | null> {
  const res = await fetch(`${STORE}/appdetails?appids=${appId}&l=english`);
  if (!res.ok) throw new Error("Steam details failed");
  const json = (await res.json()) as Record<
    string,
    {
      success: boolean;
      data?: {
        name: string;
        header_image?: string;
        release_date?: { date?: string };
        genres?: { description: string }[];
      };
    }
  >;
  const app = json[String(appId)];
  if (!app?.success || !app.data) return null;

  // Portrait cover matches the 3:4 cards; not every app has one, so fall back to the header
  const portrait = steamPortrait(appId);
  const hasPortrait = await fetch(portrait, { method: "HEAD" })
    .then((r) => r.ok)
    .catch(() => false);

  const genre = (app.data.genres ?? []).map((g) => g.description).join(", ");

  return {
    steam_appid: appId,
    title: app.data.name,
    cover_url: hasPortrait ? portrait : (app.data.header_image ?? null),
    release_date: toIsoDate(app.data.release_date?.date),
    genre: genre ? genre.slice(0, 80) : null,
  };
}

/** Loose key for matching "ELDEN RING" with "Elden Ring™" etc. */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[™®©]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

const EDITION_SUFFIX =
  /\s*[:\-–]?\s*(the\s+)?(definitive|complete|game of the year|goty|enhanced|remastered|legacy|classic|deluxe|ultimate|gold|special|anniversary|director'?s cut|reloaded)(\s+edition)?\s*$/i;

/**
 * Title with edition noise removed, so "Mafia II: Definitive Edition", "Mafia II (Classic)"
 * and "Grand Theft Auto IV: The Complete Edition" compare equal to the base game.
 */
export function baseTitle(title: string): string {
  let t = title
    .replace(/[™®©]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .trim();
  for (let prev = ""; prev !== t; ) {
    prev = t;
    t = t
      .replace(EDITION_SUFFIX, "")
      .replace(/\s+edition$/i, "")
      .trim();
  }
  return normalizeTitle(t);
}

// Steam dates look like "29 May, 2025" or "May 29, 2025"; "Coming soon" / "Q1 2026" yield null
function toIsoDate(raw: string | undefined): string | null {
  if (!raw) return null;
  const d = new Date(raw.replace(",", ""));
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
