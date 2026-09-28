import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Public Steam store endpoints — no API key required
const STORE = "https://store.steampowered.com/api";
const CDN = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps";

export type SteamSearchResult = {
  appId: number;
  name: string;
  thumb: string;
};

export type SteamGameDetails = {
  title: string;
  cover_url: string | null;
  release_date: string | null;
};

// ── Search the Steam catalog ──────────────────────────────────────────────────
export const searchSteamGames = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { term: string }) =>
    z.object({ term: z.string().trim().min(2).max(100) }).parse(d)
  )
  .handler(async ({ data }): Promise<SteamSearchResult[]> => {
    const url = `${STORE}/storesearch/?term=${encodeURIComponent(data.term)}&l=english&cc=US`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Steam search failed");
    const json = (await res.json()) as {
      items?: { id: number; name: string; tiny_image: string; type: string }[];
    };
    return (json.items ?? [])
      .filter((i) => i.type === "app")
      .map((i) => ({ appId: i.id, name: i.name, thumb: i.tiny_image }));
  });

// ── Fetch title / cover / release date for one Steam app ──────────────────────
export const getSteamGameDetails = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { appId: number }) =>
    z.object({ appId: z.number().int().positive() }).parse(d)
  )
  .handler(async ({ data }): Promise<SteamGameDetails> => {
    const res = await fetch(`${STORE}/appdetails?appids=${data.appId}&l=english`);
    if (!res.ok) throw new Error("Steam details failed");
    const json = (await res.json()) as Record<
      string,
      {
        success: boolean;
        data?: { name: string; header_image?: string; release_date?: { date?: string } };
      }
    >;
    const app = json[String(data.appId)];
    if (!app?.success || !app.data) throw new Error("Game not found on Steam");

    // Portrait cover matches the 3:4 cards; not every app has one, so fall back to the header
    const portrait = `${CDN}/${data.appId}/library_600x900_2x.jpg`;
    const hasPortrait = await fetch(portrait, { method: "HEAD" })
      .then((r) => r.ok)
      .catch(() => false);

    return {
      title: app.data.name,
      cover_url: hasPortrait ? portrait : app.data.header_image ?? null,
      release_date: toIsoDate(app.data.release_date?.date),
    };
  });

// Steam dates look like "29 May, 2025" or "May 29, 2025"; "Coming soon" / "Q1 2026" yield null
function toIsoDate(raw: string | undefined): string | null {
  if (!raw) return null;
  const d = new Date(raw.replace(",", ""));
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
