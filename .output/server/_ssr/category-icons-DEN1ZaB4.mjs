import { O as Anchor, Q as Crosshair, W as Compass, Y as Map, Z as Book, _ as Music, $ as Snowflake, a0 as Cloud, a1 as Sun, a2 as Moon, a3 as Droplet, a4 as Gem, e as Sparkles, i as Crown, a5 as Ghost, a6 as Skull, T as Trophy, a7 as Target, a8 as Flame, a9 as Zap, j as Star, H as Heart, aa as Shield, ab as Sword } from "./router-cdSR3IL0.mjs";
function computeOverall(itemId, ratings, categories = [], idKey = "game_id") {
  const r = ratings.filter((x) => x[idKey] === itemId);
  if (r.length === 0) return null;
  let weightedSum = 0;
  let totalWeight = 0;
  for (const rating of r) {
    const cat = categories.find((c) => c.id === rating.category_id);
    const coeff = Number(cat?.coefficient ?? 1);
    weightedSum += Number(rating.score) * coeff;
    totalWeight += coeff;
  }
  if (totalWeight === 0) return null;
  return Math.round(weightedSum / totalWeight * 10) / 10;
}
function withOverall(items, ratings, categories = [], idKey = "game_id") {
  return items.map((g) => ({
    ...g,
    overall: computeOverall(g.id, ratings, categories, idKey)
  }));
}
const CATEGORY_ICONS = {
  Sword,
  Shield,
  Heart,
  Star,
  Zap,
  Flame,
  Target,
  Trophy,
  Skull,
  Ghost,
  Crown,
  Sparkles,
  Gem,
  Droplet,
  Moon,
  Sun,
  Cloud,
  Snowflake,
  Music,
  Book,
  Map,
  Compass,
  Crosshair,
  Anchor
};
export {
  CATEGORY_ICONS as C,
  computeOverall as c,
  withOverall as w
};
