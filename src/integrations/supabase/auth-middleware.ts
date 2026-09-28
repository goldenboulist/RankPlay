import { createMiddleware } from "@tanstack/react-start";
import { readSession } from "@/lib/session.server";

export const requireSupabaseAuth = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const userId = await readSession();
  if (!userId) throw new Error("Unauthorized: Invalid or expired session");
  return next({ context: { userId } });
});
