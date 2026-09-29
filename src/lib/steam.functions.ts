import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { fetchSteamDetails } from "@/lib/steam.server";

// Public Steam store endpoints — no API key required
const STORE = "https://store.steampowered.com/api";

export type SteamSearchResult = {
  appId: number;
  name: string;
  thumb: string;
};

// ── Search the Steam catalog ──────────────────────────────────────────────────
export const searchSteamGames = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { term: string }) =>
    z.object({ term: z.string().trim().min(2).max(100) }).parse(d),
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

// ── Fetch title / cover / release date / genre for one Steam app ──────────────
export const getSteamGameDetails = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { appId: number }) =>
    z.object({ appId: z.number().int().positive() }).parse(d),
  )
  .handler(async ({ data }) => {
    const details = await fetchSteamDetails(data.appId);
    if (!details) throw new Error("Game not found on Steam");
    return details;
  });
