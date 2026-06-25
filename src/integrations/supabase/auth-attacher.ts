import { createMiddleware } from "@tanstack/react-start";

const TOKEN_KEY = "rp_token";

export const attachSupabaseAuth = createMiddleware({
  type: "function",
}).client(async ({ next }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  return next({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
});
