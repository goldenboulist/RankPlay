import { createHash } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Movie & series lookup for the "Add title" form.
// Without any key: TVmaze for series (with posters) + Wikidata for movies
// (open data — title and date, but rarely a poster since most are copyrighted).
// If TMDB_API_KEY is set (free account, https://www.themoviedb.org/settings/api),
// TMDB is used instead: it has French titles and posters for both.
// TMDB_API_KEY accepts either the v3 "API Key" or the v4 "Read Access Token".

export type CatalogMedia = {
  id: string;
  title: string;
  media_type: "movie" | "series";
  release_date: string | null;
  cover_url: string | null;
  thumb: string | null;
};

const LIMIT = 10;
// Wikimedia asks API clients to identify themselves
const USER_AGENT = "RankPlay/1.0 (personal rating board)";

export const searchMediaCatalog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { term: string }) =>
    z.object({ term: z.string().trim().min(2).max(100) }).parse(d),
  )
  .handler(async ({ data }): Promise<CatalogMedia[]> => {
    const key = process.env.TMDB_API_KEY;
    if (key) return searchTmdb(data.term, key);

    // One source failing shouldn't hide the other's results
    const [movies, series] = await Promise.allSettled([
      searchWikidataMovies(data.term),
      searchTvmaze(data.term),
    ]);
    if (movies.status === "rejected" && series.status === "rejected") {
      throw new Error("Movie & series search is unavailable right now");
    }
    const ok = (r: PromiseSettledResult<CatalogMedia[]>) =>
      r.status === "fulfilled" ? r.value : [];
    return interleave(ok(movies), ok(series)).slice(0, LIMIT);
  });

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}

// ── TMDB (optional key) ───────────────────────────────────────────────────────

const TMDB = "https://api.themoviedb.org/3";
const TMDB_POSTER = "https://image.tmdb.org/t/p/w500";
const TMDB_THUMB = "https://image.tmdb.org/t/p/w92";

async function searchTmdb(term: string, key: string): Promise<CatalogMedia[]> {
  // v4 tokens are long JWTs sent as a bearer; v3 keys go in the query string
  const isToken = key.length > 40;
  const url =
    `${TMDB}/search/multi?query=${encodeURIComponent(term)}&language=fr-FR&include_adult=false` +
    (isToken ? "" : `&api_key=${key}`);
  const res = await fetch(
    url,
    isToken ? { headers: { Authorization: `Bearer ${key}` } } : undefined,
  );
  if (!res.ok) throw new Error("TMDB search failed");

  const json = (await res.json()) as {
    results?: {
      id: number;
      media_type: string;
      title?: string;
      name?: string;
      release_date?: string;
      first_air_date?: string;
      poster_path?: string | null;
    }[];
  };

  return (json.results ?? [])
    .filter((r) => r.media_type === "movie" || r.media_type === "tv")
    .slice(0, LIMIT)
    .map((r) => ({
      id: `tmdb-${r.media_type}-${r.id}`,
      title: (r.title ?? r.name ?? "").slice(0, 200),
      media_type: r.media_type === "tv" ? ("series" as const) : ("movie" as const),
      release_date: (r.release_date || r.first_air_date) ?? null,
      cover_url: r.poster_path ? TMDB_POSTER + r.poster_path : null,
      thumb: r.poster_path ? TMDB_THUMB + r.poster_path : null,
    }));
}

// ── TVmaze: series, no key (https://www.tvmaze.com/api) ───────────────────────

async function searchTvmaze(term: string): Promise<CatalogMedia[]> {
  const res = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(term)}`,
  );
  if (!res.ok) throw new Error("TVmaze search failed");
  const json = (await res.json()) as {
    show: {
      id: number;
      name: string;
      premiered: string | null;
      image: { medium: string; original: string } | null;
    };
  }[];

  return json.slice(0, LIMIT).map(({ show }) => ({
    id: `tvmaze-${show.id}`,
    title: show.name.slice(0, 200),
    media_type: "series" as const,
    release_date: show.premiered,
    cover_url: show.image?.original ?? null,
    thumb: show.image?.medium ?? null,
  }));
}

// ── Wikidata: movies, no key (https://www.wikidata.org/w/api.php) ─────────────

const WIKIDATA = "https://www.wikidata.org/w/api.php";

// "instance of" values accepted as a movie
const FILM_CLASSES = new Set([
  "Q11424", // film
  "Q24869", // feature film
  "Q202866", // animated film
  "Q29168811", // animated feature film
  "Q20650540", // anime film
  "Q506240", // television film
  "Q226730", // silent film
  "Q93204", // documentary film
]);
// Things with a director and a release date that are still not movies
const NOT_FILM_CLASSES = new Set([
  "Q7889", // video game
  "Q5398426", // television series
  "Q1259759", // miniseries
  "Q63952888", // anime television series
  "Q117467246", // animated television series
  "Q21191270", // television series episode
  "Q3464665", // television season
]);

type WikidataClaim = {
  mainsnak: { datavalue?: { value: unknown } };
};

async function wikidata<T>(params: Record<string, string>): Promise<T> {
  const qs = new URLSearchParams({ format: "json", ...params });
  const res = await fetch(`${WIKIDATA}?${qs}`, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) throw new Error("Wikidata search failed");
  return (await res.json()) as T;
}

async function searchWikidataMovies(term: string): Promise<CatalogMedia[]> {
  const search = await wikidata<{ search?: { id: string }[] }>({
    action: "wbsearchentities",
    search: term,
    language: "fr",
    uselang: "fr",
    type: "item",
    limit: "20",
  });
  const ids = (search.search ?? []).map((r) => r.id);
  if (ids.length === 0) return [];

  const details = await wikidata<{
    entities: Record<
      string,
      {
        labels?: Record<string, { value: string }>;
        claims?: Record<string, WikidataClaim[]>;
      }
    >;
  }>({
    action: "wbgetentities",
    ids: ids.join("|"),
    props: "labels|claims",
    languages: "fr|en",
  });

  const results: CatalogMedia[] = [];
  for (const id of ids) {
    const entity = details.entities[id];
    const claims = entity?.claims ?? {};
    const classes = (claims.P31 ?? []).map(
      (c) => (c.mainsnak.datavalue?.value as { id?: string })?.id ?? "",
    );
    // Film subclasses are numerous (anime film, musical film…): fall back to
    // "has a director (P57) and a release date (P577)" for the ones not listed
    const isFilm =
      classes.some((c) => FILM_CLASSES.has(c)) ||
      (!classes.some((c) => NOT_FILM_CLASSES.has(c)) &&
        !!claims.P57?.length &&
        !!claims.P577?.length);
    // Same as TMDB's include_adult=false: skip the pornographic film genre (Q185529)
    const isAdult = (claims.P136 ?? []).some(
      (c) => (c.mainsnak.datavalue?.value as { id?: string })?.id === "Q185529",
    );
    const title = entity?.labels?.fr?.value ?? entity?.labels?.en?.value;
    if (!isFilm || isAdult || !title) continue;

    // P3383 = film poster; the generic image (P18) is usually a set photo or a logo
    const file = (claims.P3383 ?? [])
      .map((c) => c.mainsnak.datavalue?.value)
      .find((v): v is string => typeof v === "string");

    results.push({
      id: `wikidata-${id}`,
      title: title.slice(0, 200),
      media_type: "movie",
      release_date: earliestDate(claims.P577 ?? []),
      cover_url: file ? commonsThumb(file, 500) : null,
      thumb: file ? commonsThumb(file, 92) : null,
    });
    if (results.length === LIMIT) break;
  }
  return results;
}

/**
 * P577 (publication date) has one value per country; keep the first release,
 * preferring exact days over year-only values (which would read as 1 January).
 */
function earliestDate(claims: WikidataClaim[]): string | null {
  const dates = claims
    .map((c) => c.mainsnak.datavalue?.value as { time?: string; precision?: number } | undefined)
    .map((v) => {
      const [, y, m, d] = v?.time?.match(/^\+?(\d{4})-(\d{2})-(\d{2})/) ?? [];
      if (!y || !v?.precision) return null;
      // Year (9) or month (10) precision stores the unknown parts as 00
      return {
        exact: v.precision >= 11,
        date: `${y}-${m === "00" ? "01" : m}-${v.precision >= 11 ? d : "01"}`,
      };
    })
    .filter((v): v is { exact: boolean; date: string } => !!v)
    .sort((a, b) => Number(b.exact) - Number(a.exact) || a.date.localeCompare(b.date));
  return dates[0]?.date ?? null;
}

/** Direct upload.wikimedia.org thumbnail URL (CORS-enabled, no redirect). */
function commonsThumb(file: string, width: number): string {
  const name = file.replace(/ /g, "_");
  const md5 = createHash("md5").update(name).digest("hex");
  const path = `${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(name)}`;
  // SVGs are thumbnailed as PNGs
  const suffix = /\.svg$/i.test(name) ? ".png" : "";
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${width}px-${encodeURIComponent(name)}${suffix}`;
}
