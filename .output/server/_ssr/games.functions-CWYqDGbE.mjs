import { c as createServerRpc } from "./createServerRpc-CyyN1cEP.mjs";
import { c as createServerFn } from "./server-B4ncXPsG.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CwhVd4pZ.mjs";
import { g as getDb } from "./db.server-C0hDN4oC.mjs";
import { G as GAME_STATUSES, T as TIERS } from "./types-B16xxWPT.mjs";
import { promises } from "fs";
import { randomUUID } from "crypto";
import path from "path";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/mysql2.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType, a as arrayType, b as booleanType } from "../_libs/zod.mjs";
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
import "../_libs/isbot.mjs";
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
const AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([".mp3", ".ogg", ".wav", ".flac", ".aac", ".m4a", ".opus", ".weba"]);
const gameInput = objectType({
  title: stringType().trim().min(1).max(200),
  cover_url: stringType().trim().max(2e3).optional().nullable(),
  release_date: stringType().trim().max(20).optional().nullable(),
  music_url: stringType().trim().max(2e3).optional().nullable(),
  music_start: numberType().min(0).max(86400).optional().nullable(),
  notes: stringType().trim().max(5e3).optional().nullable(),
  hours_played: numberType().min(0).max(99999).optional().nullable(),
  genre: stringType().trim().max(80).optional().nullable(),
  platform: stringType().trim().max(80).optional().nullable()
});
const statusInput = enumType(GAME_STATUSES).nullable();
async function assertOwnsGame(db, userId, gameId, categoryId) {
  const [rows] = categoryId ? await db.execute(`SELECT 1 FROM games g JOIN categories c ON c.user_id = g.user_id
          WHERE g.id = ? AND c.id = ? AND g.user_id = ? LIMIT 1`, [gameId, categoryId, userId]) : await db.execute("SELECT 1 FROM games WHERE id = ? AND user_id = ? LIMIT 1", [gameId, userId]);
  if (rows.length === 0) throw new Error("Game not found");
}
const listGames_createServerFn_handler = createServerRpc({
  id: "9d7b510ebdf42c0f0516e59eea3917abbc9cb1a06d3fa3d6a6600f497904a123",
  name: "listGames",
  filename: "src/lib/games.functions.ts"
}, (opts) => listGames.__executeServer(opts));
const listGames = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listGames_createServerFn_handler, async ({
  context
}) => {
  const db = getDb();
  const {
    userId
  } = context;
  const [[games], [ratings], [cats], [favs]] = await Promise.all([db.execute("SELECT * FROM games WHERE user_id = ? ORDER BY created_at DESC", [userId]), db.execute("SELECT * FROM ratings WHERE user_id = ?", [userId]), db.execute("SELECT * FROM categories WHERE user_id = ? ORDER BY sort_order", [userId]), db.execute("SELECT game_id FROM favorites WHERE user_id = ?", [userId])]);
  return {
    games,
    ratings,
    categories: cats,
    favoriteIds: favs.map((f) => f.game_id)
  };
});
const getGame_createServerFn_handler = createServerRpc({
  id: "181cd5f52d3cf1222ce4e65a279423ef0a5a2dec123c8aef4e00842b8623da28",
  name: "getGame",
  filename: "src/lib/games.functions.ts"
}, (opts) => getGame.__executeServer(opts));
const getGame = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(getGame_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const [rows] = await db.execute("SELECT * FROM games WHERE id = ? AND user_id = ? LIMIT 1", [data.id, context.userId]);
  const game = rows[0];
  if (!game) throw new Error("Game not found");
  const [ratingRows] = await db.execute("SELECT * FROM ratings WHERE game_id = ?", [data.id]);
  return {
    game,
    ratings: ratingRows
  };
});
const createGame_createServerFn_handler = createServerRpc({
  id: "de2821df087d1182e3645364df499bad1f5500a726a9662b65f6dde1bf5110ac",
  name: "createGame",
  filename: "src/lib/games.functions.ts"
}, (opts) => createGame.__executeServer(opts));
const createGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => gameInput.extend({
  status: statusInput.optional(),
  steam_appid: numberType().int().positive().optional().nullable()
}).parse(d)).handler(createGame_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const id = randomUUID();
  await db.execute(`INSERT INTO games (id, user_id, title, cover_url, release_date, music_url, music_start, notes, hours_played,
                          genre, platform, status, steam_appid)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, context.userId, data.title, data.cover_url ?? null, data.release_date ?? null, data.music_url ?? null, data.music_url ? data.music_start ?? null : null, data.notes ?? null, data.hours_played ?? null, data.genre || null, data.platform || null, data.status ?? null, data.steam_appid ?? null]);
  const [rows] = await db.execute("SELECT * FROM games WHERE id = ?", [id]);
  return rows[0];
});
const updateGame_createServerFn_handler = createServerRpc({
  id: "bc29c1de32ad5a2936ce69d7a960775f47a7344d918291e671bea6b047bbb1bd",
  name: "updateGame",
  filename: "src/lib/games.functions.ts"
}, (opts) => updateGame.__executeServer(opts));
const updateGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).extend(gameInput.shape).parse(d)).handler(updateGame_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const {
    id,
    ...rest
  } = data;
  await db.execute(`UPDATE games
         SET title = ?, cover_url = ?, release_date = ?,
             music_url = ?, music_start = ?, notes = ?, hours_played = ?,
             genre = ?, platform = ?
       WHERE id = ? AND user_id = ?`, [rest.title, rest.cover_url ?? null, rest.release_date ?? null, rest.music_url ?? null, rest.music_url ? rest.music_start ?? null : null, rest.notes ?? null, rest.hours_played ?? null, rest.genre || null, rest.platform || null, id, context.userId]);
  const [rows] = await db.execute("SELECT * FROM games WHERE id = ? AND user_id = ? LIMIT 1", [id, context.userId]);
  return rows[0];
});
const setGameStatus_createServerFn_handler = createServerRpc({
  id: "eb924e08349fae82c62b72ec4e08eaf1ad5d9019acfb0d2aff089f45e939b885",
  name: "setGameStatus",
  filename: "src/lib/games.functions.ts"
}, (opts) => setGameStatus.__executeServer(opts));
const setGameStatus = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  status: statusInput
}).parse(d)).handler(setGameStatus_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("UPDATE games SET status = ? WHERE id = ? AND user_id = ?", [data.status, data.id, context.userId]);
  return {
    ok: true
  };
});
const saveTierList_createServerFn_handler = createServerRpc({
  id: "8bc5a08eea8d5582a25b07cc30cb4a776db3f60311931ebde1b10aa466522091",
  name: "saveTierList",
  filename: "src/lib/games.functions.ts"
}, (opts) => saveTierList.__executeServer(opts));
const saveTierList = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  placements: arrayType(objectType({
    id: stringType().uuid(),
    tier: enumType(TIERS).nullable(),
    pos: numberType().int().min(0).max(1e5)
  })).max(5e3)
}).parse(d)).handler(saveTierList_createServerFn_handler, async ({
  data,
  context
}) => {
  const conn = await getDb().getConnection();
  try {
    await conn.beginTransaction();
    for (const p of data.placements) {
      await conn.execute("UPDATE games SET tier = ?, tier_pos = ? WHERE id = ? AND user_id = ?", [p.tier, p.tier ? p.pos : null, p.id, context.userId]);
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
  return {
    ok: true
  };
});
const deleteGame_createServerFn_handler = createServerRpc({
  id: "bd3ec07a64008c20bc505e97eb65a557e827e8dbc9790f9b1a5cc815e0b58d73",
  name: "deleteGame",
  filename: "src/lib/games.functions.ts"
}, (opts) => deleteGame.__executeServer(opts));
const deleteGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteGame_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("DELETE FROM games WHERE id = ? AND user_id = ?", [data.id, context.userId]);
  return {
    ok: true
  };
});
const toggleFavorite_createServerFn_handler = createServerRpc({
  id: "8ffaf777d59d2a73558a48396df1da1617b3d0168b695c3f08e28b57270825ee",
  name: "toggleFavorite",
  filename: "src/lib/games.functions.ts"
}, (opts) => toggleFavorite.__executeServer(opts));
const toggleFavorite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  favorite: booleanType()
}).parse(d)).handler(toggleFavorite_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  if (data.favorite) {
    await assertOwnsGame(db, context.userId, data.id);
    await db.execute(`INSERT INTO favorites (user_id, game_id) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE created_at = created_at`, [context.userId, data.id]);
  } else {
    await db.execute("DELETE FROM favorites WHERE game_id = ? AND user_id = ?", [data.id, context.userId]);
  }
  return {
    ok: true
  };
});
const upsertRating_createServerFn_handler = createServerRpc({
  id: "ece5fc2704c9fa6c814a06db899f2accf8d82bb2ea4a8cbeb9d8df22ee35aae7",
  name: "upsertRating",
  filename: "src/lib/games.functions.ts"
}, (opts) => upsertRating.__executeServer(opts));
const upsertRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  game_id: stringType().uuid(),
  category_id: stringType().uuid(),
  score: numberType().min(0).max(10)
}).parse(d)).handler(upsertRating_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await assertOwnsGame(db, context.userId, data.game_id, data.category_id);
  await db.execute(`INSERT INTO ratings (user_id, game_id, category_id, score)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE score = VALUES(score), updated_at = CURRENT_TIMESTAMP`, [context.userId, data.game_id, data.category_id, data.score]);
  const [rows] = await db.execute("SELECT * FROM ratings WHERE game_id = ? AND category_id = ? LIMIT 1", [data.game_id, data.category_id]);
  return rows[0];
});
const deleteRating_createServerFn_handler = createServerRpc({
  id: "20e051ba9943b1d8b02de917b1c44a8814851d9107d0d10658864fead1900b27",
  name: "deleteRating",
  filename: "src/lib/games.functions.ts"
}, (opts) => deleteRating.__executeServer(opts));
const deleteRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  game_id: stringType().uuid(),
  category_id: stringType().uuid()
}).parse(d)).handler(deleteRating_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("DELETE FROM ratings WHERE game_id = ? AND category_id = ? AND user_id = ?", [data.game_id, data.category_id, context.userId]);
  return {
    ok: true
  };
});
const createCategory_createServerFn_handler = createServerRpc({
  id: "7793b906577b2231b2d6e654475b7146823bde20d61dd74ca8355a400967aa44",
  name: "createCategory",
  filename: "src/lib/games.functions.ts"
}, (opts) => createCategory.__executeServer(opts));
const createCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  name: stringType().trim().min(1).max(60),
  icon: stringType().trim().max(60).optional().nullable(),
  coefficient: numberType().min(0).max(100).optional().default(1)
}).parse(d)).handler(createCategory_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const id = randomUUID();
  await db.execute("INSERT INTO categories (id, user_id, name, icon, sort_order, coefficient) VALUES (?, ?, ?, ?, 99, ?)", [id, context.userId, data.name, data.icon ?? null, data.coefficient ?? 1]);
  const [rows] = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0];
});
const updateCategoryCoefficient_createServerFn_handler = createServerRpc({
  id: "bb874cc242b8094e620f9d27992e01f4b0e8099e7531a1c4712624cc74fee138",
  name: "updateCategoryCoefficient",
  filename: "src/lib/games.functions.ts"
}, (opts) => updateCategoryCoefficient.__executeServer(opts));
const updateCategoryCoefficient = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  coefficient: numberType().min(0).max(100)
}).parse(d)).handler(updateCategoryCoefficient_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("UPDATE categories SET coefficient = ? WHERE id = ? AND user_id = ?", [data.coefficient, data.id, context.userId]);
  return {
    ok: true
  };
});
const deleteCategory_createServerFn_handler = createServerRpc({
  id: "d9f9b0e5b434efdb4810e181475e2ab5c7cb62c0d8463f3d59a97602229ce258",
  name: "deleteCategory",
  filename: "src/lib/games.functions.ts"
}, (opts) => deleteCategory.__executeServer(opts));
const deleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteCategory_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("DELETE FROM categories WHERE id = ? AND user_id = ?", [data.id, context.userId]);
  return {
    ok: true
  };
});
const deleteGameMusic_createServerFn_handler = createServerRpc({
  id: "91602915d26ccf75748e615d2898bb39270af1b0884017a6bb49e75cc9ea2f63",
  name: "deleteGameMusic",
  filename: "src/lib/games.functions.ts"
}, (opts) => deleteGameMusic.__executeServer(opts));
const deleteGameMusic = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteGameMusic_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("UPDATE games SET music_url = NULL, music_start = NULL WHERE id = ? AND user_id = ?", [data.id, context.userId]);
  return {
    ok: true
  };
});
const listGameMusicUrls_createServerFn_handler = createServerRpc({
  id: "18f1a31cdf98dc6fc03b45b9b307a7662f5b72a2c240226bd0525f78a60b375e",
  name: "listGameMusicUrls",
  filename: "src/lib/games.functions.ts"
}, (opts) => listGameMusicUrls.__executeServer(opts));
const listGameMusicUrls = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listGameMusicUrls_createServerFn_handler, async ({
  context
}) => {
  const db = getDb();
  const [rows] = await db.execute("SELECT id, title, music_url FROM games WHERE user_id = ? AND music_url IS NOT NULL ORDER BY title", [context.userId]);
  return rows;
});
const listUploads_createServerFn_handler = createServerRpc({
  id: "b5a85681581588be291ed8ea37570ff116e03baa02f1b7367912ab746dc6123e",
  name: "listUploads",
  filename: "src/lib/games.functions.ts"
}, (opts) => listUploads.__executeServer(opts));
const listUploads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUploads_createServerFn_handler, async () => {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    let files = [];
    try {
      files = await promises.readdir(uploadsDir);
    } catch {
      return [];
    }
    const audioFiles = files.filter((f) => AUDIO_EXTENSIONS.has(path.extname(f).toLowerCase())).map((filename) => ({
      filename,
      url: `/uploads/${filename}`,
      label: filename.replace(/^\d+-/, "").replace(/\.[^.]+$/, "").replace(/_/g, " ")
    })).sort((a, b) => a.label.localeCompare(b.label));
    return audioFiles;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to list uploads");
  }
});
export {
  createCategory_createServerFn_handler,
  createGame_createServerFn_handler,
  deleteCategory_createServerFn_handler,
  deleteGameMusic_createServerFn_handler,
  deleteGame_createServerFn_handler,
  deleteRating_createServerFn_handler,
  getGame_createServerFn_handler,
  listGameMusicUrls_createServerFn_handler,
  listGames_createServerFn_handler,
  listUploads_createServerFn_handler,
  saveTierList_createServerFn_handler,
  setGameStatus_createServerFn_handler,
  toggleFavorite_createServerFn_handler,
  updateCategoryCoefficient_createServerFn_handler,
  updateGame_createServerFn_handler,
  upsertRating_createServerFn_handler
};
