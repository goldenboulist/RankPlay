import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret"
);

export const requireSupabaseAuth = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getRequest();

  if (!request?.headers) {
    throw new Error("Unauthorized: No request headers available");
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No bearer token provided");
  }

  const token = authHeader.slice(7);

  let userId: string;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.sub) throw new Error("No subject in token");
    userId = payload.sub;
  } catch {
    throw new Error("Unauthorized: Invalid or expired token");
  }

  return next({ context: { userId } });
});
