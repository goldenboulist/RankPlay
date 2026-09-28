import { v as createSsrRpc } from "./router-cdSR3IL0.mjs";
import { c as createServerFn } from "./server-CKhcZQ3s.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-C8T2NKNy.mjs";
import { o as objectType, b as booleanType, s as stringType, n as numberType } from "../_libs/zod.mjs";
const gameInput = objectType({
  title: stringType().trim().min(1).max(200),
  cover_url: stringType().trim().max(2e3).optional().nullable(),
  release_date: stringType().trim().max(20).optional().nullable(),
  music_url: stringType().trim().max(2e3).optional().nullable(),
  music_start: numberType().min(0).max(86400).optional().nullable(),
  notes: stringType().trim().max(5e3).optional().nullable(),
  hours_played: numberType().min(0).max(99999).optional().nullable()
});
const listGames = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("9d7b510ebdf42c0f0516e59eea3917abbc9cb1a06d3fa3d6a6600f497904a123"));
const getGame = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("181cd5f52d3cf1222ce4e65a279423ef0a5a2dec123c8aef4e00842b8623da28"));
const createGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => gameInput.parse(d)).handler(createSsrRpc("de2821df087d1182e3645364df499bad1f5500a726a9662b65f6dde1bf5110ac"));
const updateGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).extend(gameInput.shape).parse(d)).handler(createSsrRpc("bc29c1de32ad5a2936ce69d7a960775f47a7344d918291e671bea6b047bbb1bd"));
const deleteGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("bd3ec07a64008c20bc505e97eb65a557e827e8dbc9790f9b1a5cc815e0b58d73"));
const toggleFavorite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  favorite: booleanType()
}).parse(d)).handler(createSsrRpc("8ffaf777d59d2a73558a48396df1da1617b3d0168b695c3f08e28b57270825ee"));
const upsertRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  game_id: stringType().uuid(),
  category_id: stringType().uuid(),
  score: numberType().min(0).max(10)
}).parse(d)).handler(createSsrRpc("ece5fc2704c9fa6c814a06db899f2accf8d82bb2ea4a8cbeb9d8df22ee35aae7"));
const deleteRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  game_id: stringType().uuid(),
  category_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("20e051ba9943b1d8b02de917b1c44a8814851d9107d0d10658864fead1900b27"));
const createCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  name: stringType().trim().min(1).max(60),
  icon: stringType().trim().max(60).optional().nullable(),
  coefficient: numberType().min(0).max(100).optional().default(1)
}).parse(d)).handler(createSsrRpc("7793b906577b2231b2d6e654475b7146823bde20d61dd74ca8355a400967aa44"));
const updateCategoryCoefficient = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  coefficient: numberType().min(0).max(100)
}).parse(d)).handler(createSsrRpc("bb874cc242b8094e620f9d27992e01f4b0e8099e7531a1c4712624cc74fee138"));
const deleteCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("d9f9b0e5b434efdb4810e181475e2ab5c7cb62c0d8463f3d59a97602229ce258"));
const deleteGameMusic = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("91602915d26ccf75748e615d2898bb39270af1b0884017a6bb49e75cc9ea2f63"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("18f1a31cdf98dc6fc03b45b9b307a7662f5b72a2c240226bd0525f78a60b375e"));
const listUploads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("b5a85681581588be291ed8ea37570ff116e03baa02f1b7367912ab746dc6123e"));
export {
  createCategory as a,
  upsertRating as b,
  createGame as c,
  deleteGame as d,
  deleteRating as e,
  deleteCategory as f,
  getGame as g,
  updateCategoryCoefficient as h,
  deleteGameMusic as i,
  listUploads as j,
  listGames as l,
  toggleFavorite as t,
  updateGame as u
};
