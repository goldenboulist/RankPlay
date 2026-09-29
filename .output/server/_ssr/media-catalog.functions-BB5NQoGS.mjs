import { c as createServerRpc } from "./createServerRpc-CyyN1cEP.mjs";
import { createHash } from "node:crypto";
import { c as createServerFn } from "./server-B4ncXPsG.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CwhVd4pZ.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "node:util";
import "node:buffer";
const LIMIT = 10;
const USER_AGENT = "RankPlay/1.0 (personal rating board)";
const searchMediaCatalog_createServerFn_handler = createServerRpc({
  id: "baa617b40361aa9a76121289b6a9317efb3397412b741f36c3acfd4e57f4dfc3",
  name: "searchMediaCatalog",
  filename: "src/lib/media-catalog.functions.ts"
}, (opts) => searchMediaCatalog.__executeServer(opts));
const searchMediaCatalog = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  term: stringType().trim().min(2).max(100)
}).parse(d)).handler(searchMediaCatalog_createServerFn_handler, async ({
  data
}) => {
  const key = process.env.TMDB_API_KEY;
  if (key) return searchTmdb(data.term, key);
  const [movies, series] = await Promise.allSettled([searchWikidataMovies(data.term), searchTvmaze(data.term)]);
  if (movies.status === "rejected" && series.status === "rejected") {
    throw new Error("Movie & series search is unavailable right now");
  }
  const ok = (r) => r.status === "fulfilled" ? r.value : [];
  return interleave(ok(movies), ok(series)).slice(0, LIMIT);
});
function interleave(a, b) {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}
const TMDB = "https://api.themoviedb.org/3";
const TMDB_POSTER = "https://image.tmdb.org/t/p/w500";
const TMDB_THUMB = "https://image.tmdb.org/t/p/w92";
async function searchTmdb(term, key) {
  const isToken = key.length > 40;
  const url = `${TMDB}/search/multi?query=${encodeURIComponent(term)}&language=fr-FR&include_adult=false` + (isToken ? "" : `&api_key=${key}`);
  const res = await fetch(url, isToken ? {
    headers: {
      Authorization: `Bearer ${key}`
    }
  } : void 0);
  if (!res.ok) throw new Error("TMDB search failed");
  const json = await res.json();
  return (json.results ?? []).filter((r) => r.media_type === "movie" || r.media_type === "tv").slice(0, LIMIT).map((r) => ({
    id: `tmdb-${r.media_type}-${r.id}`,
    title: (r.title ?? r.name ?? "").slice(0, 200),
    media_type: r.media_type === "tv" ? "series" : "movie",
    release_date: (r.release_date || r.first_air_date) ?? null,
    cover_url: r.poster_path ? TMDB_POSTER + r.poster_path : null,
    thumb: r.poster_path ? TMDB_THUMB + r.poster_path : null
  }));
}
async function searchTvmaze(term) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("TVmaze search failed");
  const json = await res.json();
  return json.slice(0, LIMIT).map(({
    show
  }) => ({
    id: `tvmaze-${show.id}`,
    title: show.name.slice(0, 200),
    media_type: "series",
    release_date: show.premiered,
    cover_url: show.image?.original ?? null,
    thumb: show.image?.medium ?? null
  }));
}
const WIKIDATA = "https://www.wikidata.org/w/api.php";
const FILM_CLASSES = /* @__PURE__ */ new Set([
  "Q11424",
  // film
  "Q24869",
  // feature film
  "Q202866",
  // animated film
  "Q29168811",
  // animated feature film
  "Q20650540",
  // anime film
  "Q506240",
  // television film
  "Q226730",
  // silent film
  "Q93204"
  // documentary film
]);
const NOT_FILM_CLASSES = /* @__PURE__ */ new Set([
  "Q7889",
  // video game
  "Q5398426",
  // television series
  "Q1259759",
  // miniseries
  "Q63952888",
  // anime television series
  "Q117467246",
  // animated television series
  "Q21191270",
  // television series episode
  "Q3464665"
  // television season
]);
async function wikidata(params) {
  const qs = new URLSearchParams({
    format: "json",
    ...params
  });
  const res = await fetch(`${WIKIDATA}?${qs}`, {
    headers: {
      "User-Agent": USER_AGENT
    }
  });
  if (!res.ok) throw new Error("Wikidata search failed");
  return await res.json();
}
async function searchWikidataMovies(term) {
  const search = await wikidata({
    action: "wbsearchentities",
    search: term,
    language: "fr",
    uselang: "fr",
    type: "item",
    limit: "20"
  });
  const ids = (search.search ?? []).map((r) => r.id);
  if (ids.length === 0) return [];
  const details = await wikidata({
    action: "wbgetentities",
    ids: ids.join("|"),
    props: "labels|claims",
    languages: "fr|en"
  });
  const results = [];
  for (const id of ids) {
    const entity = details.entities[id];
    const claims = entity?.claims ?? {};
    const classes = (claims.P31 ?? []).map((c) => c.mainsnak.datavalue?.value?.id ?? "");
    const isFilm = classes.some((c) => FILM_CLASSES.has(c)) || !classes.some((c) => NOT_FILM_CLASSES.has(c)) && !!claims.P57?.length && !!claims.P577?.length;
    const isAdult = (claims.P136 ?? []).some((c) => c.mainsnak.datavalue?.value?.id === "Q185529");
    const title = entity?.labels?.fr?.value ?? entity?.labels?.en?.value;
    if (!isFilm || isAdult || !title) continue;
    const file = (claims.P3383 ?? []).map((c) => c.mainsnak.datavalue?.value).find((v) => typeof v === "string");
    results.push({
      id: `wikidata-${id}`,
      title: title.slice(0, 200),
      media_type: "movie",
      release_date: earliestDate(claims.P577 ?? []),
      cover_url: file ? commonsThumb(file, 500) : null,
      thumb: file ? commonsThumb(file, 92) : null
    });
    if (results.length === LIMIT) break;
  }
  return results;
}
function earliestDate(claims) {
  const dates = claims.map((c) => c.mainsnak.datavalue?.value).map((v) => {
    const [, y, m, d] = v?.time?.match(/^\+?(\d{4})-(\d{2})-(\d{2})/) ?? [];
    if (!y || !v?.precision) return null;
    return {
      exact: v.precision >= 11,
      date: `${y}-${m === "00" ? "01" : m}-${v.precision >= 11 ? d : "01"}`
    };
  }).filter((v) => !!v).sort((a, b) => Number(b.exact) - Number(a.exact) || a.date.localeCompare(b.date));
  return dates[0]?.date ?? null;
}
function commonsThumb(file, width) {
  const name = file.replace(/ /g, "_");
  const md5 = createHash("md5").update(name).digest("hex");
  const path = `${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(name)}`;
  const suffix = /\.svg$/i.test(name) ? ".png" : "";
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${width}px-${encodeURIComponent(name)}${suffix}`;
}
export {
  searchMediaCatalog_createServerFn_handler
};
