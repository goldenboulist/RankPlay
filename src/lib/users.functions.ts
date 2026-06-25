import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getDb } from "@/lib/db.server";
import type {
  DbUser,
  DbGame,
  DbCategory,
  DbRating,
  DbMedia,
  DbMediaCategory,
  DbMediaRating,
} from "@/integrations/supabase/types";

// ── List all users ─────────────────────────────────────────────────────────────
export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const db = getDb();
    const [rows] = await db.execute<DbUser[]>(
      "SELECT id, email, display_name, created_at FROM users ORDER BY created_at ASC"
    );
    return rows as DbUser[];
  });

// ── Get a user's dashboard data (cross-user, read-only) ───────────────────────
export const getUserDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((d: { userId: string }) =>
    z.object({ userId: z.string().uuid() }).parse(d)
  )
  .handler(async ({ data }) => {
    const db = getDb();
    const { userId } = data;

    const [[user], [games], [gameRatings], [gameCats], [media], [mediaRatings], [mediaCats]] =
      await Promise.all([
        db.execute<DbUser[]>(
          "SELECT id, email, display_name, created_at FROM users WHERE id = ? LIMIT 1",
          [userId]
        ),
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
      ]);

    const targetUser = (user as DbUser[])[0];
    if (!targetUser) throw new Error("User not found");

    return {
      user: targetUser,
      games: {
        games: games as DbGame[],
        ratings: gameRatings as DbRating[],
        categories: gameCats as DbCategory[],
      },
      media: {
        media: media as DbMedia[],
        ratings: mediaRatings as DbMediaRating[],
        categories: mediaCats as DbMediaCategory[],
      },
    };
  });
