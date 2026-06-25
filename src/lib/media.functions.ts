import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getDb } from "@/lib/db.server";
import type { DbMedia, DbMediaRating, DbMediaFavorite, DbMediaCategory } from "@/integrations/supabase/types";

// Re-export listUploads so media pages can import it from one place
export { listUploads } from "@/lib/games.functions";

const mediaInput = z.object({
  title: z.string().trim().min(1).max(200),
  media_type: z.enum(["movie", "series"]).default("movie"),
  cover_url: z.string().trim().max(2000).optional().nullable(),
  release_date: z.string().trim().max(20).optional().nullable(),
  music_url: z.string().trim().max(2000).optional().nullable(),
  notes: z.string().trim().max(5000).optional().nullable(),
});

// ── List media ─────────────────────────────────────────────────────────────────
export const listMedia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = getDb();
    const { userId } = context;

    const [[media], [ratings], [cats], [favs]] = await Promise.all([
      db.execute<DbMedia[]>(
        "SELECT * FROM media WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
      ),
      db.execute<DbMediaRating[]>(
        "SELECT * FROM media_ratings WHERE user_id = ?",
        [userId]
      ),
      db.execute<DbMediaCategory[]>(
        "SELECT * FROM categories_media WHERE user_id = ? ORDER BY sort_order",
        [userId]
      ),
      db.execute<DbMediaFavorite[]>(
        "SELECT media_id FROM media_favorites WHERE user_id = ?",
        [userId]
      ),
    ]);

    return {
      media: media as DbMedia[],
      ratings: ratings as DbMediaRating[],
      categories: cats as DbMediaCategory[],
      favoriteIds: (favs as DbMediaFavorite[]).map((f) => f.media_id),
    };
  });

// ── Get single media ───────────────────────────────────────────────────────────
export const getMedia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const db = getDb();

    const [rows] = await db.execute<DbMedia[]>(
      "SELECT * FROM media WHERE id = ? AND user_id = ? LIMIT 1",
      [data.id, context.userId]
    );
    const item = (rows as DbMedia[])[0];
    if (!item) throw new Error("Media not found");

    const [ratingRows] = await db.execute<DbMediaRating[]>(
      "SELECT * FROM media_ratings WHERE media_id = ?",
      [data.id]
    );

    return { media: item, ratings: ratingRows as DbMediaRating[] };
  });

// ── Create media ───────────────────────────────────────────────────────────────
export const createMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) => mediaInput.parse(d))
  .handler(async ({ data, context }) => {
    const db = getDb();

    await db.execute(
      `INSERT INTO media (user_id, title, media_type, cover_url, release_date, music_url, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        context.userId,
        data.title,
        data.media_type,
        data.cover_url ?? null,
        data.release_date ?? null,
        data.music_url ?? null,
        data.notes ?? null,
      ]
    );

    const [rows] = await db.execute<DbMedia[]>(
      "SELECT * FROM media WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [context.userId]
    );
    return (rows as DbMedia[])[0];
  });

// ── Update media ───────────────────────────────────────────────────────────────
export const updateMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z.object({ id: z.string().uuid() }).extend(mediaInput.shape).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    const { id, ...rest } = data;

    await db.execute(
      `UPDATE media
         SET title = ?, media_type = ?, cover_url = ?, release_date = ?,
             music_url = ?, notes = ?
       WHERE id = ? AND user_id = ?`,
      [
        rest.title,
        rest.media_type,
        rest.cover_url ?? null,
        rest.release_date ?? null,
        rest.music_url ?? null,
        rest.notes ?? null,
        id,
        context.userId,
      ]
    );

    const [rows] = await db.execute<DbMedia[]>(
      "SELECT * FROM media WHERE id = ? LIMIT 1",
      [id]
    );
    return (rows as DbMedia[])[0];
  });

// ── Delete media ───────────────────────────────────────────────────────────────
export const deleteMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "DELETE FROM media WHERE id = ? AND user_id = ?",
      [data.id, context.userId]
    );
    return { ok: true };
  });

// ── Toggle media favorite ──────────────────────────────────────────────────────
export const toggleMediaFavorite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string; favorite: boolean }) =>
    z.object({ id: z.string().uuid(), favorite: z.boolean() }).parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();

    if (data.favorite) {
      await db.execute(
        `INSERT INTO media_favorites (user_id, media_id) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE created_at = created_at`,
        [context.userId, data.id]
      );
    } else {
      await db.execute(
        "DELETE FROM media_favorites WHERE media_id = ? AND user_id = ?",
        [data.id, context.userId]
      );
    }
    return { ok: true };
  });

// ── Upsert media rating ────────────────────────────────────────────────────────
export const upsertMediaRating = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z
      .object({
        media_id: z.string().uuid(),
        category_id: z.string().uuid(),
        score: z.number().min(0).max(10),
      })
      .parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();

    await db.execute(
      `INSERT INTO media_ratings (user_id, media_id, category_id, score)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE score = VALUES(score), updated_at = CURRENT_TIMESTAMP`,
      [context.userId, data.media_id, data.category_id, data.score]
    );

    const [rows] = await db.execute<DbMediaRating[]>(
      "SELECT * FROM media_ratings WHERE media_id = ? AND category_id = ? LIMIT 1",
      [data.media_id, data.category_id]
    );
    return (rows as DbMediaRating[])[0];
  });

// ── Delete media rating ────────────────────────────────────────────────────────
export const deleteMediaRating = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { media_id: string; category_id: string }) =>
    z
      .object({ media_id: z.string().uuid(), category_id: z.string().uuid() })
      .parse(d)
  )
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "DELETE FROM media_ratings WHERE media_id = ? AND category_id = ? AND user_id = ?",
      [data.media_id, data.category_id, context.userId]
    );
    return { ok: true };
  });

// ── Create media category ──────────────────────────────────────────────────────
export const createMediaCategory = createServerFn({ method: "POST" })
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

    await db.execute(
      "INSERT INTO categories_media (user_id, name, icon, sort_order, coefficient) VALUES (?, ?, ?, 99, ?)",
      [context.userId, data.name, data.icon ?? null, data.coefficient ?? 1]
    );

    const [rows] = await db.execute<DbMediaCategory[]>(
      "SELECT * FROM categories_media WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [context.userId]
    );
    return (rows as DbMediaCategory[])[0];
  });

// ── Update media category coefficient ─────────────────────────────────────────
export const updateMediaCategoryCoefficient = createServerFn({ method: "POST" })
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
      "UPDATE categories_media SET coefficient = ? WHERE id = ? AND user_id = ?",
      [data.coefficient, data.id, context.userId]
    );
    return { ok: true };
  });

// ── Delete media category ──────────────────────────────────────────────────────
export const deleteMediaCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "DELETE FROM categories_media WHERE id = ? AND user_id = ?",
      [data.id, context.userId]
    );
    return { ok: true };
  });

// ── Delete media music ─────────────────────────────────────────────────────────
export const deleteMediaMusic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const db = getDb();
    await db.execute(
      "UPDATE media SET music_url = NULL WHERE id = ? AND user_id = ?",
      [data.id, context.userId]
    );
    return { ok: true };
  });
