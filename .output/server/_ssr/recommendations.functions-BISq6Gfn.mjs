import { c as createServerRpc } from "./createServerRpc-CyyN1cEP.mjs";
import { c as createServerFn } from "./server-B4ncXPsG.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CwhVd4pZ.mjs";
import { g as getDb } from "./db.server-C0hDN4oC.mjs";
import { c as computeOverall } from "./scoring-DaYUboHb.mjs";
import { b as baseTitle, s as steamHeader, a as steamPortrait } from "./steam.server-C0qBi_z7.mjs";
import { s as splitGenres } from "./game-meta-6uk4yxsb.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/mysql2.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "node:async_hooks";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "fs";
import "path";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/jose.mjs";
import "node:crypto";
import "node:util";
import "node:buffer";
import "events";
import "process";
import "net";
import "tls";
import "timers";
import "zlib";
import "url";
import "../_libs/sql-escaper.mjs";
import "buffer";
import "../_libs/lru.min.mjs";
import "../_libs/long.mjs";
import "../_libs/iconv-lite.mjs";
import "string_decoder";
import "../_libs/safer-buffer.mjs";
import "../_libs/generate-function.mjs";
import "../_libs/is-property.mjs";
import "../_libs/aws-ssl-profiles.mjs";
import "../_libs/named-placeholders.mjs";
const STEAMSPY = "https://steamspy.com/api.php";
const STORE = "https://store.steampowered.com/api";
const GENERIC_TAGS = /* @__PURE__ */ new Set(["Action", "Adventure", "Indie", "Casual", "Simulation", "Strategy", "RPG", "Singleplayer", "Multiplayer", "Atmospheric", "3D", "2D", "Free to Play", "Early Access", "Colorful", "Story Rich", "Exploration", "Fantasy", "Great Soundtrack", "Funny", "Cute", "Family Friendly", "Violent", "Gore", "Nudity", "Sexual Content", "Mature", "Controller", "Relaxing", "Pixel Graphics", "Puzzle", "Anime", "Female Protagonist", "Beautiful", "Classic", "Masterpiece", "Replay Value", "Addictive", "Moddable", "Realistic", "Stylized", "Cartoony", "Hand-drawn", "Fast-Paced", "Co-op", "Online Co-Op", "PvP", "First-Person", "Third Person", "Sandbox", "Shooter", "Physics", "Arcade", "Retro", "Minimalist"]);
const WEAK_GENRES = /* @__PURE__ */ new Set(["Indie", "Casual", "Free To Play", "Free to Play", "Early Access", "Massively Multiplayer"]);
const SOFTWARE_GENRES = /* @__PURE__ */ new Set(["Utilities", "Animation & Modeling", "Design & Illustration", "Photo Editing", "Video Production", "Audio Production", "Software Training", "Web Publishing", "Game Development"]);
const SEED_COUNT = 12;
const VERIFY_COUNT = 60;
const CANDIDATE_TOP_TAGS = 15;
const PROFILE_TAGS = 6;
const TAGS_PER_GAME = 12;
const MIN_REVIEWS = 500;
const MIN_POSITIVE_RATIO = 0.75;
const tagListCache = /* @__PURE__ */ new Map();
const DAY = 24 * 60 * 60 * 1e3;
async function getTagList(tag) {
  const hit = tagListCache.get(tag);
  if (hit && Date.now() - hit.at < DAY) return hit.games;
  const res = await fetch(`${STEAMSPY}?request=tag&tag=${encodeURIComponent(tag)}`);
  if (!res.ok) throw new Error("SteamSpy unavailable");
  const json = await res.json();
  const games = Object.values(json).map(({
    appid,
    name,
    positive,
    negative
  }) => ({
    appid,
    name,
    positive,
    negative
  }));
  tagListCache.set(tag, {
    at: Date.now(),
    games
  });
  return games;
}
const appInfoCache = /* @__PURE__ */ new Map();
async function getAppInfo(appId) {
  const hit = appInfoCache.get(appId);
  if (hit && Date.now() - hit.at < 7 * DAY) return hit.info;
  const res = await fetch(`${STEAMSPY}?request=appdetails&appid=${appId}`);
  if (!res.ok) return {
    tags: [],
    genres: []
  };
  const json = await res.json();
  const tags = json.tags && !Array.isArray(json.tags) ? Object.entries(json.tags).sort((a, b) => b[1] - a[1]).map(([t]) => t) : [];
  const info = {
    tags,
    genres: splitGenres(json.genre)
  };
  appInfoCache.set(appId, {
    at: Date.now(),
    info
  });
  return info;
}
async function inBatches(items, size, fn) {
  for (let i = 0; i < items.length; i += size) await Promise.all(items.slice(i, i + size).map(fn));
}
async function findSteamAppId(title) {
  const res = await fetch(`${STORE}/storesearch/?term=${encodeURIComponent(title)}&l=english&cc=US`);
  if (!res.ok) return null;
  const json = await res.json();
  const key = baseTitle(title);
  const match = (json.items ?? []).find((i) => baseTitle(i.name) === key);
  return match?.id ?? null;
}
const getRecommendations_createServerFn_handler = createServerRpc({
  id: "cc8ece31eba14c95ac1289a8eae31f48cdbd31002a0acd4ff8de6c15a0aae461",
  name: "getRecommendations",
  filename: "src/lib/recommendations.functions.ts"
}, (opts) => getRecommendations.__executeServer(opts));
const getRecommendations = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getRecommendations_createServerFn_handler, async ({
  context
}) => {
  const db = getDb();
  const [[gameRows], [ratingRows], [catRows]] = await Promise.all([db.execute("SELECT * FROM games WHERE user_id = ?", [context.userId]), db.execute("SELECT * FROM ratings WHERE user_id = ?", [context.userId]), db.execute("SELECT * FROM categories WHERE user_id = ?", [context.userId])]);
  const games = gameRows;
  const ratings = ratingRows;
  const categories = catRows;
  const scored = games.filter((g) => g.status !== "backlog" && g.status !== "dropped").map((g) => {
    const overall = computeOverall(g.id, ratings, categories);
    const hours = Number(g.hours_played ?? 0);
    const weight = overall !== null ? Math.max(0, overall - 5) : Math.min(2, Math.log10(1 + hours));
    return {
      game: g,
      weight
    };
  }).filter((s) => s.weight > 0).sort((a, b) => b.weight - a.weight).slice(0, SEED_COUNT);
  if (scored.length === 0) {
    return {
      recommendations: [],
      basedOn: [],
      tags: []
    };
  }
  const seeds = [];
  const likedGenres = /* @__PURE__ */ new Set();
  await inBatches(scored, 4, async ({
    game,
    weight
  }) => {
    let appId = game.steam_appid;
    if (!appId) {
      appId = await findSteamAppId(game.title);
      if (appId) await db.execute("UPDATE games SET steam_appid = ? WHERE id = ?", [appId, game.id]);
    }
    let tags = game.steam_tags ? game.steam_tags.split(",") : [];
    let genres = splitGenres(game.genre);
    if (appId && (tags.length === 0 || genres.length === 0)) {
      const info = await getAppInfo(appId);
      if (tags.length === 0 && info.tags.length) {
        tags = info.tags.slice(0, TAGS_PER_GAME);
        await db.execute("UPDATE games SET steam_tags = ? WHERE id = ?", [tags.join(",").slice(0, 500), game.id]);
      }
      if (genres.length === 0 && info.genres.length) {
        genres = info.genres;
        await db.execute("UPDATE games SET genre = ? WHERE id = ? AND genre IS NULL", [genres.join(", ").slice(0, 80), game.id]);
      }
    }
    genres.filter((g) => !WEAK_GENRES.has(g)).forEach((g) => likedGenres.add(g));
    if (tags.length) seeds.push({
      title: game.title,
      weight,
      tags
    });
  });
  seeds.sort((a, b) => b.weight - a.weight);
  const profile = /* @__PURE__ */ new Map();
  for (const s of seeds) {
    s.tags.forEach((tag, i) => {
      if (GENERIC_TAGS.has(tag)) return;
      const rankWeight = (TAGS_PER_GAME - i) / TAGS_PER_GAME;
      profile.set(tag, (profile.get(tag) ?? 0) + s.weight * rankWeight);
    });
  }
  const topTags = [...profile.entries()].sort((a, b) => b[1] - a[1]).slice(0, PROFILE_TAGS).map(([t]) => t);
  const owned = new Set(games.map((g) => g.steam_appid).filter(Boolean));
  const ownedTitles = new Set(games.map((g) => baseTitle(g.title)));
  const candidates = /* @__PURE__ */ new Map();
  for (const tag of topTags) {
    const list = await getTagList(tag).catch(() => []);
    if (list.length === 0) continue;
    const idf = Math.log(1 + 5e4 / list.length);
    const w = (profile.get(tag) ?? 0) * idf;
    for (const entry of list) {
      const c = candidates.get(entry.appid);
      if (c) {
        c.score += w;
        c.tags.push(tag);
      } else {
        candidates.set(entry.appid, {
          entry,
          score: w,
          tags: [tag]
        });
      }
    }
  }
  const seen = /* @__PURE__ */ new Set();
  const shortlist = [...candidates.values()].filter(({
    entry
  }) => {
    const reviews = entry.positive + entry.negative;
    return reviews >= MIN_REVIEWS && entry.positive / reviews >= MIN_POSITIVE_RATIO && !owned.has(entry.appid) && !ownedTitles.has(baseTitle(entry.name));
  }).map((c) => {
    const reviews = c.entry.positive + c.entry.negative;
    const ratio = c.entry.positive / reviews;
    return {
      ...c,
      reviews,
      ratio,
      quality: ratio ** 2 * Math.log10(reviews)
    };
  }).sort((a, b) => b.score * b.quality - a.score * a.quality).filter((c) => {
    const key = baseTitle(c.entry.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, VERIFY_COUNT);
  const infos = /* @__PURE__ */ new Map();
  await inBatches(shortlist, 6, async (c) => {
    infos.set(c.entry.appid, await getAppInfo(c.entry.appid).catch(() => ({
      tags: [],
      genres: []
    })));
  });
  const recommendations = shortlist.flatMap((c) => {
    const info = infos.get(c.entry.appid);
    if (!info || info.tags.length === 0) return [];
    if (info.genres.some((g) => SOFTWARE_GENRES.has(g))) return [];
    if (likedGenres.size > 0 && !info.genres.some((g) => likedGenres.has(g))) return [];
    const top = info.tags.slice(0, CANDIDATE_TOP_TAGS);
    const tags = topTags.filter((t) => top.includes(t));
    if (tags.length === 0) return [];
    const score = tags.reduce((sum, t) => sum + (profile.get(t) ?? 0) * (1 - top.indexOf(t) / CANDIDATE_TOP_TAGS), 0);
    return [{
      ...c,
      tags,
      rank: score * c.quality
    }];
  }).sort((a, b) => b.rank - a.rank).slice(0, 24).map((c) => ({
    appId: c.entry.appid,
    name: c.entry.name,
    cover: steamPortrait(c.entry.appid),
    fallbackCover: steamHeader(c.entry.appid),
    positiveRatio: Math.round(c.ratio * 100),
    reviews: c.reviews,
    matchedTags: c.tags,
    // The seeds sharing the most of this game's matched tags
    because: seeds.map((s) => ({
      title: s.title,
      n: s.tags.filter((t) => c.tags.includes(t)).length
    })).filter((s) => s.n > 0).sort((a, b) => b.n - a.n).slice(0, 2).map((s) => s.title)
  }));
  return {
    recommendations,
    basedOn: seeds.map((s) => s.title),
    tags: topTags
  };
});
export {
  getRecommendations_createServerFn_handler
};
