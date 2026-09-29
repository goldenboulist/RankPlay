import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getDb } from "@/lib/db.server";
import { computeOverall } from "@/lib/scoring";
import { baseTitle, steamPortrait, steamHeader } from "@/lib/steam.server";
import { splitGenres } from "@/lib/game-meta";
import type {
  DbCategory,
  DbGame,
  DbRating,
} from "@/integrations/supabase/types";

// Recommendations come from Steam user tags (via SteamSpy, no key needed):
// 1. build a taste profile from the tags of your best-rated / most-played games,
// 2. pull every Steam game carrying your most characteristic tags,
// 3. rank them by tag overlap × review quality, minus what you already have,
// 4. re-check the best ones against their own top tags and genre — players
//    troll-tag some games ("NEKOPARA: Open World, Zombies"), genres can't be trolled.

const STEAMSPY = "https://steamspy.com/api.php";
const STORE = "https://store.steampowered.com/api";

// Tags that say nothing about taste, or match so many games (> ~10k) that
// downloading their list isn't worth it
const GENERIC_TAGS = new Set([
  "Action",
  "Adventure",
  "Indie",
  "Casual",
  "Simulation",
  "Strategy",
  "RPG",
  "Singleplayer",
  "Multiplayer",
  "Atmospheric",
  "3D",
  "2D",
  "Free to Play",
  "Early Access",
  "Colorful",
  "Story Rich",
  "Exploration",
  "Fantasy",
  "Great Soundtrack",
  "Funny",
  "Cute",
  "Family Friendly",
  "Violent",
  "Gore",
  "Nudity",
  "Sexual Content",
  "Mature",
  "Controller",
  "Relaxing",
  "Pixel Graphics",
  "Puzzle",
  "Anime",
  "Female Protagonist",
  "Beautiful",
  "Classic",
  "Masterpiece",
  "Replay Value",
  "Addictive",
  "Moddable",
  "Realistic",
  "Stylized",
  "Cartoony",
  "Hand-drawn",
  "Fast-Paced",
  "Co-op",
  "Online Co-Op",
  "PvP",
  "First-Person",
  "Third Person",
  "Sandbox",
  "Shooter",
  "Physics",
  "Arcade",
  "Retro",
  "Minimalist",
]);

// Genres that don't describe what a game plays like
const WEAK_GENRES = new Set([
  "Indie",
  "Casual",
  "Free To Play",
  "Free to Play",
  "Early Access",
  "Massively Multiplayer",
]);
// Non-game apps that show up through troll tags
const SOFTWARE_GENRES = new Set([
  "Utilities",
  "Animation & Modeling",
  "Design & Illustration",
  "Photo Editing",
  "Video Production",
  "Audio Production",
  "Software Training",
  "Web Publishing",
  "Game Development",
]);

const SEED_COUNT = 12;
const VERIFY_COUNT = 60;
const CANDIDATE_TOP_TAGS = 15;
const PROFILE_TAGS = 6;
const TAGS_PER_GAME = 12;
const MIN_REVIEWS = 500;
const MIN_POSITIVE_RATIO = 0.75;

export type Recommendation = {
  appId: number;
  name: string;
  cover: string;
  fallbackCover: string;
  positiveRatio: number;
  reviews: number;
  matchedTags: string[];
  because: string[];
};

type TagEntry = {
  appid: number;
  name: string;
  positive: number;
  negative: number;
};

// Tag lists are a few MB each and change slowly: keep them for a day
const tagListCache = new Map<string, { at: number; games: TagEntry[] }>();
const DAY = 24 * 60 * 60 * 1000;

async function getTagList(tag: string): Promise<TagEntry[]> {
  const hit = tagListCache.get(tag);
  if (hit && Date.now() - hit.at < DAY) return hit.games;
  const res = await fetch(
    `${STEAMSPY}?request=tag&tag=${encodeURIComponent(tag)}`,
  );
  if (!res.ok) throw new Error("SteamSpy unavailable");
  const json = (await res.json()) as Record<string, TagEntry>;
  // Keep only what ranking needs so the cache stays small
  const games = Object.values(json).map(
    ({ appid, name, positive, negative }) => ({
      appid,
      name,
      positive,
      negative,
    }),
  );
  tagListCache.set(tag, { at: Date.now(), games });
  return games;
}

type AppInfo = { tags: string[]; genres: string[] };
const appInfoCache = new Map<number, { at: number; info: AppInfo }>();

/** Tags sorted by votes + developer-set genres, cached for a week. */
async function getAppInfo(appId: number): Promise<AppInfo> {
  const hit = appInfoCache.get(appId);
  if (hit && Date.now() - hit.at < 7 * DAY) return hit.info;
  const res = await fetch(`${STEAMSPY}?request=appdetails&appid=${appId}`);
  if (!res.ok) return { tags: [], genres: [] };
  const json = (await res.json()) as {
    tags?: Record<string, number> | unknown[];
    genre?: string;
  };
  const tags =
    json.tags && !Array.isArray(json.tags)
      ? Object.entries(json.tags)
          .sort((a, b) => b[1] - a[1])
          .map(([t]) => t)
      : [];
  const info = { tags, genres: splitGenres(json.genre) };
  appInfoCache.set(appId, { at: Date.now(), info });
  return info;
}

async function inBatches<T>(
  items: T[],
  size: number,
  fn: (item: T) => Promise<void>,
) {
  for (let i = 0; i < items.length; i += size)
    await Promise.all(items.slice(i, i + size).map(fn));
}

/** Steam app for a title typed by hand; tolerant of editions ("GTA V" ↔ "GTA V Legacy"). */
async function findSteamAppId(title: string): Promise<number | null> {
  const res = await fetch(
    `${STORE}/storesearch/?term=${encodeURIComponent(title)}&l=english&cc=US`,
  );
  if (!res.ok) return null;
  const json = (await res.json()) as { items?: { id: number; name: string }[] };
  const key = baseTitle(title);
  const match = (json.items ?? []).find((i) => baseTitle(i.name) === key);
  return match?.id ?? null;
}

export const getRecommendations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = getDb();
    const [[gameRows], [ratingRows], [catRows]] = await Promise.all([
      db.execute("SELECT * FROM games WHERE user_id = ?", [context.userId]),
      db.execute("SELECT * FROM ratings WHERE user_id = ?", [context.userId]),
      db.execute("SELECT * FROM categories WHERE user_id = ?", [
        context.userId,
      ]),
    ]);
    const games = gameRows as DbGame[];
    const ratings = ratingRows as DbRating[];
    const categories = catRows as DbCategory[];

    // ── 1. Seeds: best-rated games, then most-played ones as a fallback ──
    const scored = games
      .filter((g) => g.status !== "backlog" && g.status !== "dropped")
      .map((g) => {
        const overall = computeOverall(g.id, ratings, categories);
        const hours = Number(g.hours_played ?? 0);
        // A 10/10 weighs 5, a 6/10 weighs 1; unrated games count by playtime
        const weight =
          overall !== null
            ? Math.max(0, overall - 5)
            : Math.min(2, Math.log10(1 + hours));
        return { game: g, weight };
      })
      .filter((s) => s.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, SEED_COUNT);

    if (scored.length === 0) {
      return {
        recommendations: [] as Recommendation[],
        basedOn: [] as string[],
        tags: [] as string[],
      };
    }

    // ── 2. Make sure each seed has a Steam app id and its tags (cached in the row) ──
    const seeds: { title: string; weight: number; tags: string[] }[] = [];
    const likedGenres = new Set<string>();
    await inBatches(scored, 4, async ({ game, weight }) => {
      let appId = game.steam_appid;
      if (!appId) {
        appId = await findSteamAppId(game.title);
        if (appId)
          await db.execute("UPDATE games SET steam_appid = ? WHERE id = ?", [
            appId,
            game.id,
          ]);
      }

      let tags = game.steam_tags ? game.steam_tags.split(",") : [];
      let genres = splitGenres(game.genre);
      if (appId && (tags.length === 0 || genres.length === 0)) {
        const info = await getAppInfo(appId);
        if (tags.length === 0 && info.tags.length) {
          tags = info.tags.slice(0, TAGS_PER_GAME);
          await db.execute("UPDATE games SET steam_tags = ? WHERE id = ?", [
            tags.join(",").slice(0, 500),
            game.id,
          ]);
        }
        // Back-fill the genre filter on the library page while we're at it
        if (genres.length === 0 && info.genres.length) {
          genres = info.genres;
          await db.execute(
            "UPDATE games SET genre = ? WHERE id = ? AND genre IS NULL",
            [genres.join(", ").slice(0, 80), game.id],
          );
        }
      }
      genres
        .filter((g) => !WEAK_GENRES.has(g))
        .forEach((g) => likedGenres.add(g));
      if (tags.length) seeds.push({ title: game.title, weight, tags });
    });
    seeds.sort((a, b) => b.weight - a.weight);

    // ── 3. Taste profile: tag weight = Σ seed weight × tag rank within that game ──
    const profile = new Map<string, number>();
    for (const s of seeds) {
      s.tags.forEach((tag, i) => {
        if (GENERIC_TAGS.has(tag)) return;
        const rankWeight = (TAGS_PER_GAME - i) / TAGS_PER_GAME;
        profile.set(tag, (profile.get(tag) ?? 0) + s.weight * rankWeight);
      });
    }
    const topTags = [...profile.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, PROFILE_TAGS)
      .map(([t]) => t);

    // ── 4. Candidates from each tag list, rarer tags count more (IDF) ──
    const owned = new Set(games.map((g) => g.steam_appid).filter(Boolean));
    // Base titles, so owning "Mafia II: Definitive Edition" also excludes "Mafia II (Classic)"
    const ownedTitles = new Set(games.map((g) => baseTitle(g.title)));
    const candidates = new Map<
      number,
      { entry: TagEntry; score: number; tags: string[] }
    >();

    for (const tag of topTags) {
      const list = await getTagList(tag).catch(() => [] as TagEntry[]);
      if (list.length === 0) continue;
      const idf = Math.log(1 + 50_000 / list.length);
      const w = (profile.get(tag) ?? 0) * idf;
      for (const entry of list) {
        const c = candidates.get(entry.appid);
        if (c) {
          c.score += w;
          c.tags.push(tag);
        } else {
          candidates.set(entry.appid, { entry, score: w, tags: [tag] });
        }
      }
    }

    // ── 5. First pass: tag overlap × review quality × (log) popularity ──
    const seen = new Set<string>();
    const shortlist = [...candidates.values()]
      .filter(({ entry }) => {
        const reviews = entry.positive + entry.negative;
        return (
          reviews >= MIN_REVIEWS &&
          entry.positive / reviews >= MIN_POSITIVE_RATIO &&
          !owned.has(entry.appid) &&
          !ownedTitles.has(baseTitle(entry.name))
        );
      })
      .map((c) => {
        const reviews = c.entry.positive + c.entry.negative;
        const ratio = c.entry.positive / reviews;
        return {
          ...c,
          reviews,
          ratio,
          quality: ratio ** 2 * Math.log10(reviews),
        };
      })
      .sort((a, b) => b.score * b.quality - a.score * a.quality)
      // One entry per game, not one per edition
      .filter((c) => {
        const key = baseTitle(c.entry.name);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, VERIFY_COUNT);

    // ── 6. Verify against each candidate's own top tags and genres ──
    const infos = new Map<number, AppInfo>();
    await inBatches(shortlist, 6, async (c) => {
      infos.set(
        c.entry.appid,
        await getAppInfo(c.entry.appid).catch(() => ({ tags: [], genres: [] })),
      );
    });

    const recommendations: Recommendation[] = shortlist
      .flatMap((c) => {
        const info = infos.get(c.entry.appid);
        if (!info || info.tags.length === 0) return [];
        if (info.genres.some((g) => SOFTWARE_GENRES.has(g))) return [];
        if (
          likedGenres.size > 0 &&
          !info.genres.some((g) => likedGenres.has(g))
        )
          return [];

        // A profile tag only counts if it's one of the game's defining tags
        const top = info.tags.slice(0, CANDIDATE_TOP_TAGS);
        const tags = topTags.filter((t) => top.includes(t));
        if (tags.length === 0) return [];
        const score = tags.reduce(
          (sum, t) =>
            sum +
            (profile.get(t) ?? 0) * (1 - top.indexOf(t) / CANDIDATE_TOP_TAGS),
          0,
        );
        return [{ ...c, tags, rank: score * c.quality }];
      })
      .sort((a, b) => b.rank - a.rank)
      .slice(0, 24)
      .map((c) => ({
        appId: c.entry.appid,
        name: c.entry.name,
        cover: steamPortrait(c.entry.appid),
        fallbackCover: steamHeader(c.entry.appid),
        positiveRatio: Math.round(c.ratio * 100),
        reviews: c.reviews,
        matchedTags: c.tags,
        // The seeds sharing the most of this game's matched tags
        because: seeds
          .map((s) => ({
            title: s.title,
            n: s.tags.filter((t) => c.tags.includes(t)).length,
          }))
          .filter((s) => s.n > 0)
          .sort((a, b) => b.n - a.n)
          .slice(0, 2)
          .map((s) => s.title),
      }));

    return {
      recommendations,
      basedOn: seeds.map((s) => s.title),
      tags: topTags,
    };
  });
