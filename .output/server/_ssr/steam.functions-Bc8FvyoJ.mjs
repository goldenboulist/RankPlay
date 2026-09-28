import { c as createServerRpc } from "./createServerRpc-DV1vET9U.mjs";
import { c as createServerFn } from "./server-CKhcZQ3s.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-C8T2NKNy.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
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
const STORE = "https://store.steampowered.com/api";
const CDN = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps";
const searchSteamGames_createServerFn_handler = createServerRpc({
  id: "969f68eeb3547cf5c669da7205fa6f8ccd8f9cb4c1a685d2a5d67c357f579e50",
  name: "searchSteamGames",
  filename: "src/lib/steam.functions.ts"
}, (opts) => searchSteamGames.__executeServer(opts));
const searchSteamGames = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  term: stringType().trim().min(2).max(100)
}).parse(d)).handler(searchSteamGames_createServerFn_handler, async ({
  data
}) => {
  const url = `${STORE}/storesearch/?term=${encodeURIComponent(data.term)}&l=english&cc=US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Steam search failed");
  const json = await res.json();
  return (json.items ?? []).filter((i) => i.type === "app").map((i) => ({
    appId: i.id,
    name: i.name,
    thumb: i.tiny_image
  }));
});
const getSteamGameDetails_createServerFn_handler = createServerRpc({
  id: "45a7f173108d54030b62aeab83bd688ac51b504d3d37cd28ee37779fd2e0fbcb",
  name: "getSteamGameDetails",
  filename: "src/lib/steam.functions.ts"
}, (opts) => getSteamGameDetails.__executeServer(opts));
const getSteamGameDetails = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  appId: numberType().int().positive()
}).parse(d)).handler(getSteamGameDetails_createServerFn_handler, async ({
  data
}) => {
  const res = await fetch(`${STORE}/appdetails?appids=${data.appId}&l=english`);
  if (!res.ok) throw new Error("Steam details failed");
  const json = await res.json();
  const app = json[String(data.appId)];
  if (!app?.success || !app.data) throw new Error("Game not found on Steam");
  const portrait = `${CDN}/${data.appId}/library_600x900_2x.jpg`;
  const hasPortrait = await fetch(portrait, {
    method: "HEAD"
  }).then((r) => r.ok).catch(() => false);
  return {
    title: app.data.name,
    cover_url: hasPortrait ? portrait : app.data.header_image ?? null,
    release_date: toIsoDate(app.data.release_date?.date)
  };
});
function toIsoDate(raw) {
  if (!raw) return null;
  const d = new Date(raw.replace(",", ""));
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export {
  getSteamGameDetails_createServerFn_handler,
  searchSteamGames_createServerFn_handler
};
