import { c as createServerRpc } from "./createServerRpc-DV1vET9U.mjs";
import { c as createServerFn } from "./server-CKhcZQ3s.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-C8T2NKNy.mjs";
import { g as getDb } from "./db.server-C0hDN4oC.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/mysql2.mjs";
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
const listUsers_createServerFn_handler = createServerRpc({
  id: "d96fc76850779782acfe0d57c8df91435fcd2dbdbbe157b34f6d9842c0ffc4b6",
  name: "listUsers",
  filename: "src/lib/users.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsers_createServerFn_handler, async () => {
  const db = getDb();
  const [rows] = await db.execute("SELECT id, display_name, created_at FROM users ORDER BY created_at ASC");
  return rows;
});
const getUserDashboard_createServerFn_handler = createServerRpc({
  id: "dbb4d40b1d0bb236fed25653c75834177d398c1580486dd4a4259815e08b6109",
  name: "getUserDashboard",
  filename: "src/lib/users.functions.ts"
}, (opts) => getUserDashboard.__executeServer(opts));
const getUserDashboard = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(getUserDashboard_createServerFn_handler, async ({
  data
}) => {
  const db = getDb();
  const {
    userId
  } = data;
  const [[user], [games], [gameRatings], [gameCats], [gameFavs], [media], [mediaRatings], [mediaCats], [mediaFavs]] = await Promise.all([db.execute("SELECT id, display_name, created_at FROM users WHERE id = ? LIMIT 1", [userId]), db.execute("SELECT * FROM games WHERE user_id = ? ORDER BY created_at DESC", [userId]), db.execute("SELECT * FROM ratings WHERE user_id = ?", [userId]), db.execute("SELECT * FROM categories WHERE user_id = ? ORDER BY sort_order", [userId]), db.execute("SELECT game_id FROM favorites WHERE user_id = ?", [userId]), db.execute("SELECT * FROM media WHERE user_id = ? ORDER BY created_at DESC", [userId]), db.execute("SELECT * FROM media_ratings WHERE user_id = ?", [userId]), db.execute("SELECT * FROM categories_media WHERE user_id = ? ORDER BY sort_order", [userId]), db.execute("SELECT media_id FROM media_favorites WHERE user_id = ?", [userId])]);
  const targetUser = user[0];
  if (!targetUser) throw new Error("User not found");
  return {
    user: targetUser,
    games: {
      games,
      ratings: gameRatings,
      categories: gameCats,
      favoriteIds: gameFavs.map((f) => f.game_id)
    },
    media: {
      media,
      ratings: mediaRatings,
      categories: mediaCats,
      favoriteIds: mediaFavs.map((f) => f.media_id)
    }
  };
});
export {
  getUserDashboard_createServerFn_handler,
  listUsers_createServerFn_handler
};
