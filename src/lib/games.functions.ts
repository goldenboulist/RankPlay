import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getDb } from "@/lib/db.server";
import { GAME_STATUSES, TIERS, type DbGame, type DbCategory, type DbRating, type DbFavorite, type DbMusicEntry } from "@/integrations/supabase/types";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import path from "path";

import { UPLOADS_DIR, AUDIO_EXTENSIONS } from "@/lib/uploads.server";
const gameInput = z.object({
  title: z.string().trim().min(1).max(200),
  cover_url: z.string().trim().max(2000).optional().nullable(),
  release_date: z.string().trim().max(20).optional().nullable(),
  music_url: z.string().trim().max(2000).optional().nullable(),
  music_start: z.number().min(0).max(86400).optional().nullable(),
  notes: z.string().trim().max(5000).optional().nullable(),
  hours_played: z.number().min(0).max(99999).optional().nullable(),
  genre: z.string().trim().max(80).optional().nullable(),
  platform: z.string().trim().max(80).optional().nullable(),
});

const statusInput = z.enum(GAME_STATUSES).nullable();

// Ratings/favorites reference rows by id; make sure they're the caller's own.
// Without this, anyone could overwrite another user's score (ids are visible on profiles).
async function assertOwnsGame(db: ReturnType<typeof getDb>, userId: string, gameId: string, categoryId?: string) {
  const [rows] = categoryId
    ? await db.execute(
        `SELECT 1 FROM games g JOIN categories c ON c.user_id = g.user_id
          WHERE g.id = ? AND c.id = ? AND g.user_id = ? LIMIT 1`,
        [gameId, categoryId, userId]
      )
    : await db.execute("SELECT 1 FROM games WHERE id = ? AND user_id = ? LIMIT 1", [gameId, userId]);
  if ((rows as unknown[]).length === 0) throw new Error("Game not found");
}

// ── List games ────────────────────────────────────────────────────────────────
export const listGames = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = getDb();
    const { userId } = context;

    const [[games], [ratings], [cats], [favs]] = await Promise.all([
      db.execute<DbGame[]>(
        "SELECT * FROM games WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
      ),
      db.execute<DbRating[]>(
        "SELECT * FROM ratings WHERE user_id = ?",
        [userId]
      ),
      db.execute<DbCategory[]>(
        "SELECT * FROM categories WHERE user_id = ? ORDER BY sort_order",
        [userId]
      ),
      db.execute<DbFavorite[]>(
        "SELECT game_id FROM favorites WHERE user_id = ?",
        [userId]
      ),
    ]);

    return {
      games: games as DbGame[],
      ratings: ratings as DbRating[],
      categories: cats as DbCategory[],
      favoriteIds: (favs as DbFavorite[]).map((f) => f.game_id),
    };
  });

// ── Get single game ───────────────────────────────────────────────────────────
export const getGame = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();

    const [rows] = await db.execute<DbGame[]>(
      "SELECT * FROM games WHERE id = ? AND user_id = ? LIMIT 1",
      [data.id, context.userId]
    );
    const game = (rows as DbGame[])[0];
    if (!game) throw new Error("Game not found");

    const [ratingRows] = await db.execute<DbRating[]>(
      "SELECT * FROM ratings WHERE game_id = ?",
      [data.id]
    );

    return { game, ratings: ratingRows as DbRating[] };
  });

// ── Create game ───────────────────────────────────────────────────────────────
export const createGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    gameInput
      .extend({
        status: statusInput.optional(),
        steam_appid: z.number().int().positive().optional().nullable(),
      })
      .parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    const id = randomUUID();

    await db.execute(
      `INSERT INTO games (id, user_id, title, cover_url, release_date, music_url, music_start, notes, hours_played,
                          genre, platform, status, steam_appid)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        context.userId,
        data.title,
        data.cover_url ?? null,
        data.release_date ?? null,
        data.music_url ?? null,
        data.music_url ? data.music_start ?? null : null,
        data.notes ?? null,
        data.hours_played ?? null,
        data.genre || null,
        data.platform || null,
        data.status ?? null,
        data.steam_appid ?? null,
      ]
    );

    // MySQL doesn't return the inserted row; read it back by the id generated above
    // (not "latest created_at", which only has 1-second precision)
    const [rows] = await db.execute<DbGame[]>("SELECT * FROM games WHERE id = ?", [id]);
    return (rows as DbGame[])[0];
  });

// ── Update game ───────────────────────────────────────────────────────────────
export const updateGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z.object({ id: z.string().uuid() }).extend(gameInput.shape).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    const { id, ...rest } = data;

    await db.execute(
      `UPDATE games
         SET title = ?, cover_url = ?, release_date = ?,
             music_url = ?, music_start = ?, notes = ?, hours_played = ?,
             genre = ?, platform = ?
       WHERE id = ? AND user_id = ?`,
      [
        rest.title,
        rest.cover_url ?? null,
        rest.release_date ?? null,
        rest.music_url ?? null,
        rest.music_url ? rest.music_start ?? null : null,
        rest.notes ?? null,
        rest.hours_played ?? null,
        rest.genre || null,
        rest.platform || null,
        id,
        context.userId,
      ]
    );

    const [rows] = await db.execute<DbGame[]>(
      "SELECT * FROM games WHERE id = ? AND user_id = ? LIMIT 1",
      [id, context.userId]
    );
    return (rows as DbGame[])[0];
  });

// ── Set play status ───────────────────────────────────────────────────────────
export const setGameStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z.object({ id: z.string().uuid(), status: statusInput }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "UPDATE games SET status = ? WHERE id = ? AND user_id = ?",
      [data.status, data.id, context.userId]
    );
    return { ok: true };
  });

// ── Save tier list ────────────────────────────────────────────────────────────
// Receives the full board; games absent from `placements` keep their tier.
export const saveTierList = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z
      .object({
        placements: z
          .array(
            z.object({
              id: z.string().uuid(),
              tier: z.enum(TIERS).nullable(),
              pos: z.number().int().min(0).max(100000),
            })
          )
          .max(5000),
      })
      .parse(d)
  )
  .handler(async ({ data, context }) => {
    const conn = await getDb().getConnection();
    try {
      await conn.beginTransaction();
      for (const p of data.placements) {
        await conn.execute(
          "UPDATE games SET tier = ?, tier_pos = ? WHERE id = ? AND user_id = ?",
          [p.tier, p.tier ? p.pos : null, p.id, context.userId]
        );
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
    return { ok: true };
  });

// ── Delete game ───────────────────────────────────────────────────────────────
export const deleteGame = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "DELETE FROM games WHERE id = ? AND user_id = ?",
      [data.id, context.userId]
    );
    return { ok: true };
  });

// ── Toggle favorite ───────────────────────────────────────────────────────────
export const toggleFavorite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string; favorite: boolean }) =>
    z.object({ id: z.string().uuid(), favorite: z.boolean() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();

    if (data.favorite) {
      await assertOwnsGame(db, context.userId, data.id);
      await db.execute(
        `INSERT INTO favorites (user_id, game_id) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE created_at = created_at`,
        [context.userId, data.id]
      );
    } else {
      await db.execute(
        "DELETE FROM favorites WHERE game_id = ? AND user_id = ?",
        [data.id, context.userId]
      );
    }
    return { ok: true };
  });

// ── Upsert rating ─────────────────────────────────────────────────────────────
export const upsertRating = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z
      .object({
        game_id: z.string().uuid(),
        category_id: z.string().uuid(),
        score: z.number().min(0).max(10),
      })
      .parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await assertOwnsGame(db, context.userId, data.game_id, data.category_id);

    await db.execute(
      `INSERT INTO ratings (user_id, game_id, category_id, score)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE score = VALUES(score), updated_at = CURRENT_TIMESTAMP`,
      [context.userId, data.game_id, data.category_id, data.score]
    );

    const [rows] = await db.execute<DbRating[]>(
      "SELECT * FROM ratings WHERE game_id = ? AND category_id = ? LIMIT 1",
      [data.game_id, data.category_id]
    );
    return (rows as DbRating[])[0];
  });

// ── Delete rating ─────────────────────────────────────────────────────────────
export const deleteRating = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { game_id: string; category_id: string }) =>
    z
      .object({ game_id: z.string().uuid(), category_id: z.string().uuid() })
      .parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "DELETE FROM ratings WHERE game_id = ? AND category_id = ? AND user_id = ?",
      [data.game_id, data.category_id, context.userId]
    );
    return { ok: true };
  });

// ── Create category ───────────────────────────────────────────────────────────
export const createCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { name: string; icon?: string | null; coefficient?: number }) =>
    z.object({
      name: z.string().trim().min(1).max(60),
      icon: z.string().trim().max(60).optional().nullable(),
      coefficient: z.number().min(0).max(100).optional().default(1),
    }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    const id = randomUUID();

    await db.execute(
      "INSERT INTO categories (id, user_id, name, icon, sort_order, coefficient) VALUES (?, ?, ?, ?, 99, ?)",
      [id, context.userId, data.name, data.icon ?? null, data.coefficient ?? 1]
    );

    const [rows] = await db.execute<DbCategory[]>("SELECT * FROM categories WHERE id = ?", [id]);
    return (rows as DbCategory[])[0];
  });

// ── Update category coefficient ───────────────────────────────────────────────
export const updateCategoryCoefficient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string; coefficient: number }) =>
    z.object({
      id: z.string().uuid(),
      coefficient: z.number().min(0).max(100),
    }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "UPDATE categories SET coefficient = ? WHERE id = ? AND user_id = ?",
      [data.coefficient, data.id, context.userId]
    );
    return { ok: true };
  });

// ── Delete category ───────────────────────────────────────────────────────────
export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "DELETE FROM categories WHERE id = ? AND user_id = ?",
      [data.id, context.userId]
    );
    return { ok: true };
  });

// ── Delete game music ──────────────────────────────────────────────────────
export const deleteGameMusic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "UPDATE games SET music_url = NULL, music_start = NULL WHERE id = ? AND user_id = ?",
      [data.id, context.userId]
    );
    return { ok: true };
  });

// ── List game music URLs ────────────────────────────────────────────────────
export const listGameMusicUrls = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = getDb();
    const [rows] = await db.execute<DbMusicEntry[]>(
      "SELECT id, title, music_url FROM games WHERE user_id = ? AND music_url IS NOT NULL ORDER BY title",
      [context.userId]
    );
    return (rows as DbMusicEntry[]);
  });

// ── List uploaded files ───────────────────────────────────────────────────────
export const listUploads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    try {
      const uploadsDir = UPLOADS_DIR;
      let files: string[] = [];
      try {
        files = await fs.readdir(uploadsDir);
      } catch {
        return [];
      }

      const audioFiles = files
        .filter((f) => AUDIO_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .map((filename) => ({
          filename,
          url: `/uploads/${filename}`,
          label: filename
            .replace(/^\d+-/, "")
            .replace(/\.[^.]+$/, "")
            .replace(/_/g, " "),
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      return audioFiles;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to list uploads");
    }
  });