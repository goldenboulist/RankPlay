import type { DbGame, DbRating, DbMediaRating } from "@/integrations/supabase/types";

export type Game = DbGame;
export type Rating = DbRating | DbMediaRating;

/**
 * Weighted overall score using each category's coefficient.
 * Formula: Σ(score × coeff) / Σ(coeff)
 * MySQL returns DECIMAL columns as strings — always coerce to Number.
 */
export function computeOverall(
  itemId: string,
  ratings: Rating[],
  categories: { id: string; coefficient?: number | string }[] = [],
  idKey: "game_id" | "media_id" = "game_id"
): number | null {
  const r = ratings.filter((x) => (x as any)[idKey] === itemId);
  if (r.length === 0) return null;

  let weightedSum = 0;
  let totalWeight = 0;

  for (const rating of r) {
    const cat = categories.find((c) => c.id === rating.category_id);
    const coeff = Number(cat?.coefficient ?? 1); // force number — MySQL sends strings
    weightedSum += Number(rating.score) * coeff;
    totalWeight += coeff;
  }

  if (totalWeight === 0) return null;
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

export function withOverall<T extends { id: string }>(
  items: T[],
  ratings: Rating[],
  categories: { id: string; coefficient?: number | string }[] = [],
  idKey: "game_id" | "media_id" = "game_id"
) {
  return items.map((g) => ({
    ...g,
    overall: computeOverall(g.id, ratings, categories, idKey),
  }));
}