import { h as createSsrRpc } from "./router-B00edaQI.mjs";
import { c as createServerFn } from "./server-BzaL-fNz.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D7PVwcUc.mjs";
import { o as objectType, b as booleanType, s as stringType, n as numberType, e as enumType } from "../_libs/zod.mjs";
const mediaInput = objectType({
  title: stringType().trim().min(1).max(200),
  media_type: enumType(["movie", "series"]).default("movie"),
  cover_url: stringType().trim().max(2e3).optional().nullable(),
  release_date: stringType().trim().max(20).optional().nullable(),
  music_url: stringType().trim().max(2e3).optional().nullable(),
  music_start: numberType().min(0).max(86400).optional().nullable(),
  notes: stringType().trim().max(5e3).optional().nullable()
});
const listMedia = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("3f2c393969bb6742c4169e29e2312769eec13343b7b20b0a255cbcfcc89b1685"));
const getMedia = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6cb79ff0f80a4717ab0acce5b34eed38d34bdc5fb97bf2cb59e77ae2c8ddd6bb"));
const createMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => mediaInput.parse(d)).handler(createSsrRpc("183f54b6144779e7cec014e8cf344ba262cef790f54b90b2bbb64b1c55290b10"));
const updateMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).extend(mediaInput.shape).parse(d)).handler(createSsrRpc("20dfdf2f89012ba917aeef4a41e967630bda786f85926651d064f397934b37c1"));
const deleteMedia = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("c539ff66020599c21bafc91dac11ef89f959891a8ae2384c7232bfd68bcd31a6"));
const toggleMediaFavorite = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  favorite: booleanType()
}).parse(d)).handler(createSsrRpc("16d4647e51ff3b567293c7f849859d6b93d101e08351f847b7cf7ee98e35e925"));
const upsertMediaRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  media_id: stringType().uuid(),
  category_id: stringType().uuid(),
  score: numberType().min(0).max(10)
}).parse(d)).handler(createSsrRpc("6e0ba553e736b1a40c9bae4c3734f9f374f6d670be81f2b7b2d5e533e2f1d4f9"));
const deleteMediaRating = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  media_id: stringType().uuid(),
  category_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("71b31169655b65e6458b3f21d00470c09c6b06ef85e73f82be8d8e188723f917"));
const createMediaCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  name: stringType().trim().min(1).max(60),
  icon: stringType().trim().max(60).optional().nullable(),
  coefficient: numberType().min(0).max(100).optional().default(1)
}).parse(d)).handler(createSsrRpc("65b9ca4be1a1c535c77591e28672c96b0913d958a0315f7bb73065e0a8970c8e"));
const updateMediaCategoryCoefficient = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid(),
  coefficient: numberType().min(0).max(100)
}).parse(d)).handler(createSsrRpc("378f328a963156bc1e1f9ec5d61b047840e3c246f13dab38b672987e61546311"));
const deleteMediaCategory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("3c9a91190c842b8300ae5bb0b5eb2f5c930a0cd87562a3934089a7b49cbc4fc7"));
const deleteMediaMusic = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6ef5979342ffe44d34c6502da6cc8ea24bf0745732c444dbaca4ca64722f8dd9"));
export {
  createMediaCategory as a,
  upsertMediaRating as b,
  createMedia as c,
  deleteMedia as d,
  deleteMediaRating as e,
  deleteMediaCategory as f,
  getMedia as g,
  updateMediaCategoryCoefficient as h,
  deleteMediaMusic as i,
  listMedia as l,
  toggleMediaFavorite as t,
  updateMedia as u
};
