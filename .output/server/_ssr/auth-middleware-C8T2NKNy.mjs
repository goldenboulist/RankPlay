import { a as createMiddleware } from "./server-CKhcZQ3s.mjs";
import { c as readSession } from "./index.mjs";
const requireSupabaseAuth = createMiddleware({
  type: "function"
}).server(async ({ next }) => {
  const userId = await readSession();
  if (!userId) throw new Error("Unauthorized: Invalid or expired session");
  return next({ context: { userId } });
});
export {
  requireSupabaseAuth as r
};
