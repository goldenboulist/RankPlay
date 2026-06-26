import { createMiddleware } from "@tanstack/react-start";

const TOKEN_KEY = "rp_token";

export const attachSupabaseAuth = createMiddleware({
  type: "function",
}).client(async ({ next }) => {
  // Ce bloc ne tourne que côté client, localStorage est sûr ici
  const token = localStorage.getItem(TOKEN_KEY);
  return next({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
});
