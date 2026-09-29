import { h as createSsrRpc } from "./router-B00edaQI.mjs";
import { c as createServerFn } from "./server-BzaL-fNz.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D7PVwcUc.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
const searchSteamGames = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  term: stringType().trim().min(2).max(100)
}).parse(d)).handler(createSsrRpc("969f68eeb3547cf5c669da7205fa6f8ccd8f9cb4c1a685d2a5d67c357f579e50"));
const getSteamGameDetails = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  appId: numberType().int().positive()
}).parse(d)).handler(createSsrRpc("45a7f173108d54030b62aeab83bd688ac51b504d3d37cd28ee37779fd2e0fbcb"));
export {
  getSteamGameDetails as g,
  searchSteamGames as s
};
