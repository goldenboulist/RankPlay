import { c as createServerRpc } from "./createServerRpc-B8NwWaxT.mjs";
import { c as createServerFn } from "./server-BzaL-fNz.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D7PVwcUc.mjs";
import { g as getDb } from "./db.server-C0hDN4oC.mjs";
import { randomUUID } from "crypto";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/mysql2.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType, b as booleanType } from "../_libs/zod.mjs";
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
const mediaInput = objectType({
  title: stringType().trim().min(1).max(200),
  media_type: enumType(["movie", "series"]).default("movie"),
  cover_url: stringType().trim().max(2e3).optional().nullable(),
  release_date: stringType().trim().max(20).optional().nullable(),
  music_url: stringType().trim().max(2e3).optional().nullable(),
  music_start: numberType().min(0).max(86400).optional().nullable(),
  notes: stringType().trim().max(5e3).optional().nullable()
});
async function assertOwnsMedia(db, userId, mediaId, categoryId) {
  const [rows] = categoryId ? await db.execute(`SELECT 1 FROM media m JOIN categories_media c ON c.user_id = m.user_id
          WHERE m.id = ? AND c.id = ? AND m.user_id = ? LIMIT 1`, [mediaId, categoryId, userId]) : await db.execute("SELECT 1 FROM media WHERE id = ? AND user_id = ? LIMIT 1", [mediaId, userId]);
  if (rows.length === 0) throw new Error("Media not found");
}
const listMedia_createServerFn_handler = createServerRpc({
  id: "3f2c393969bb6742c4169e29e2312769eec13343b7b20b0a255cbcfcc89b1685",
  name: "listMedia",
  filename: "src/lib/media.functions.ts"
}, (opts) => listMedia.__executeServer(opts));
const listMedia = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listMedia_createServerFn_handler, async ({
  context
}) => {
  const db = getDb();
  const {
    userId
  } = context;
  const [[media], [ratings], [cats], [favs]] = await Promise.all([db.execute("SELECT * FROM media WHERE user_id = ? ORDER BY created_at DESC", [userId]), db.execute("SELECT * FROM media_ratings WHERE user_id = ?", [userId]), db.execute("SELECT * FROM categories_media WHERE user_id = ? ORDER BY sort_order", [userId]), db.execute("SELECT media_id FROM media_favorites WHERE user_id = ?", [userId])]);
  return {
    media,
    ratings,
    categories: cats,
    favoriteIds: favs.map((f) => f.media_id)
  };
});
const getMedia_createServerFn_handler = createServerRpc({
  id: "6cb79ff0f80a4717ab0acce5b34eed38d34bdc5fb97bf2cb59e77ae2c8ddd6bb",
  name: "getMedia",
  filename: "src/lib/media.functions.ts"
}, (opts) => getMedia.__executeServer(opts));
const getMedia = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(getMedia_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const [rows] = await db.execute("SELECT * FROM media WHERE id = ? AND user_id = ? LIMIT 1", [data.id, context.userId]);
  const item = rows[0];
  if (!item) throw new Error("Media not found");
  const [ratingRows] = await db.execute("SELECT * FROM media_ratings WHERE media_id = ?", [data.id]);
  return {
    media: item,
    ratings: ratingRows
  };
});
const createMedia_createServerFn_handler = createServerRpc({
  id: "183f54b6144779e7cec014e8cf344ba262cef790f54b90b2bbb64b1c55290b10",
  name: "createMedia",
  filename: "src/lib/media.functions.ts"
}, (opts) => createMedia.__executeServer(opts));
const createMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => mediaInput.parse(d)).handler(createMedia_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const id = randomUUID();
  await db.execute(`INSERT INTO media (id, user_id, title, media_type, cover_url, release_date, music_url, music_start, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, context.userId, data.title, data.media_type, data.cover_url ?? null, data.release_date ?? null, data.music_url ?? null, data.music_url ? data.music_start ?? null : null, data.notes ?? null]);
  const [rows] = await db.execute("SELECT * FROM media WHERE id = ?", [id]);
  return rows[0];
});
const updateMedia_createServerFn_handler = createServerRpc({
  id: "20dfdf2f89012ba917aeef4a41e967630bda786f85926651d064f397934b37c1",
  name: "updateMedia",
  filename: "src/lib/media.functions.ts"
}, (opts) => updateMedia.__executeServer(opts));
const updateMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).extend(mediaInput.shape).parse(d)).handler(updateMedia_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const {
    id,
    ...rest
  } = data;
  await db.execute(`UPDATE media
         SET title = ?, media_type = ?, cover_url = ?, release_date = ?,
             music_url = ?, music_start = ?, notes = ?
       WHERE id = ? AND user_id = ?`, [rest.title, rest.media_type, rest.cover_url ?? null, rest.release_date ?? null, rest.music_url ?? null, rest.music_url ? rest.music_start ?? null : null, rest.notes ?? null, id, context.userId]);
  const [rows] = await db.execute("SELECT * FROM media WHERE id = ? AND user_id = ? LIMIT 1", [id, context.userId]);
  return rows[0];
});
const deleteMedia_createServerFn_handler = createServerRpc({
  id: "c539ff66020599c21bafc91dac11ef89f959891a8ae2384c7232bfd68bcd31a6",
  name: "deleteMedia",
  filename: "src/lib/media.functions.ts"
}, (opts) => deleteMedia.__executeServer(opts));
const deleteMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteMedia_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("DELETE FROM media WHERE id = ? AND user_id = ?", [data.id, context.userId]);
  return {
    ok: true
  };
});
const toggleMediaFavorite_createServerFn_handler = createServerRpc({
  id: "16d4647e51ff3b567293c7f849859d6b93d101e08351f847b7cf7ee98e35e925",
  name: "toggleMediaFavorite",
  filename: "src/lib/media.functions.ts"
}, (opts) => toggleMediaFavorite.__executeServer(opts));
const toggleMediaFavorite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  favorite: booleanType()
}).parse(d)).handler(toggleMediaFavorite_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  if (data.favorite) {
    await assertOwnsMedia(db, context.userId, data.id);
    await db.execute(`INSERT INTO media_favorites (user_id, media_id) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE created_at = created_at`, [context.userId, data.id]);
  } else {
    await db.execute("DELETE FROM media_favorites WHERE media_id = ? AND user_id = ?", [data.id, context.userId]);
  }
  return {
    ok: true
  };
});
const upsertMediaRating_createServerFn_handler = createServerRpc({
  id: "6e0ba553e736b1a40c9bae4c3734f9f374f6d670be81f2b7b2d5e533e2f1d4f9",
  name: "upsertMediaRating",
  filename: "src/lib/media.functions.ts"
}, (opts) => upsertMediaRating.__executeServer(opts));
const upsertMediaRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  media_id: stringType().uuid(),
  category_id: stringType().uuid(),
  score: numberType().min(0).max(10)
}).parse(d)).handler(upsertMediaRating_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await assertOwnsMedia(db, context.userId, data.media_id, data.category_id);
  await db.execute(`INSERT INTO media_ratings (user_id, media_id, category_id, score)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE score = VALUES(score), updated_at = CURRENT_TIMESTAMP`, [context.userId, data.media_id, data.category_id, data.score]);
  const [rows] = await db.execute("SELECT * FROM media_ratings WHERE media_id = ? AND category_id = ? LIMIT 1", [data.media_id, data.category_id]);
  return rows[0];
});
const deleteMediaRating_createServerFn_handler = createServerRpc({
  id: "71b31169655b65e6458b3f21d00470c09c6b06ef85e73f82be8d8e188723f917",
  name: "deleteMediaRating",
  filename: "src/lib/media.functions.ts"
}, (opts) => deleteMediaRating.__executeServer(opts));
const deleteMediaRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  media_id: stringType().uuid(),
  category_id: stringType().uuid()
}).parse(d)).handler(deleteMediaRating_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("DELETE FROM media_ratings WHERE media_id = ? AND category_id = ? AND user_id = ?", [data.media_id, data.category_id, context.userId]);
  return {
    ok: true
  };
});
const createMediaCategory_createServerFn_handler = createServerRpc({
  id: "65b9ca4be1a1c535c77591e28672c96b0913d958a0315f7bb73065e0a8970c8e",
  name: "createMediaCategory",
  filename: "src/lib/media.functions.ts"
}, (opts) => createMediaCategory.__executeServer(opts));
const createMediaCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  name: stringType().trim().min(1).max(60),
  icon: stringType().trim().max(60).optional().nullable(),
  coefficient: numberType().min(0).max(100).optional().default(1)
}).parse(d)).handler(createMediaCategory_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  const id = randomUUID();
  await db.execute("INSERT INTO categories_media (id, user_id, name, icon, sort_order, coefficient) VALUES (?, ?, ?, ?, 99, ?)", [id, context.userId, data.name, data.icon ?? null, data.coefficient ?? 1]);
  const [rows] = await db.execute("SELECT * FROM categories_media WHERE id = ?", [id]);
  return rows[0];
});
const updateMediaCategoryCoefficient_createServerFn_handler = createServerRpc({
  id: "378f328a963156bc1e1f9ec5d61b047840e3c246f13dab38b672987e61546311",
  name: "updateMediaCategoryCoefficient",
  filename: "src/lib/media.functions.ts"
}, (opts) => updateMediaCategoryCoefficient.__executeServer(opts));
const updateMediaCategoryCoefficient = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  coefficient: numberType().min(0).max(100)
}).parse(d)).handler(updateMediaCategoryCoefficient_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("UPDATE categories_media SET coefficient = ? WHERE id = ? AND user_id = ?", [data.coefficient, data.id, context.userId]);
  return {
    ok: true
  };
});
const deleteMediaCategory_createServerFn_handler = createServerRpc({
  id: "3c9a91190c842b8300ae5bb0b5eb2f5c930a0cd87562a3934089a7b49cbc4fc7",
  name: "deleteMediaCategory",
  filename: "src/lib/media.functions.ts"
}, (opts) => deleteMediaCategory.__executeServer(opts));
const deleteMediaCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteMediaCategory_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("DELETE FROM categories_media WHERE id = ? AND user_id = ?", [data.id, context.userId]);
  return {
    ok: true
  };
});
const deleteMediaMusic_createServerFn_handler = createServerRpc({
  id: "6ef5979342ffe44d34c6502da6cc8ea24bf0745732c444dbaca4ca64722f8dd9",
  name: "deleteMediaMusic",
  filename: "src/lib/media.functions.ts"
}, (opts) => deleteMediaMusic.__executeServer(opts));
const deleteMediaMusic = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteMediaMusic_createServerFn_handler, async ({
  data,
  context
}) => {
  const db = getDb();
  await db.execute("UPDATE media SET music_url = NULL, music_start = NULL WHERE id = ? AND user_id = ?", [data.id, context.userId]);
  return {
    ok: true
  };
});
export {
  createMediaCategory_createServerFn_handler,
  createMedia_createServerFn_handler,
  deleteMediaCategory_createServerFn_handler,
  deleteMediaMusic_createServerFn_handler,
  deleteMediaRating_createServerFn_handler,
  deleteMedia_createServerFn_handler,
  getMedia_createServerFn_handler,
  listMedia_createServerFn_handler,
  toggleMediaFavorite_createServerFn_handler,
  updateMediaCategoryCoefficient_createServerFn_handler,
  updateMedia_createServerFn_handler,
  upsertMediaRating_createServerFn_handler
};
