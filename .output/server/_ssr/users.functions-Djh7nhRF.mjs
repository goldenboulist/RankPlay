import { h as createSsrRpc } from "./router-3WV5o_3p.mjs";
import { c as createServerFn } from "./server-B4ncXPsG.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CwhVd4pZ.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d96fc76850779782acfe0d57c8df91435fcd2dbdbbe157b34f6d9842c0ffc4b6"));
const getUserDashboard = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("dbb4d40b1d0bb236fed25653c75834177d398c1580486dd4a4259815e08b6109"));
export {
  getUserDashboard as g,
  listUsers as l
};
