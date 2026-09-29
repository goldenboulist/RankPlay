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
export {
  computeOverall as c,
  withOverall as w
};
