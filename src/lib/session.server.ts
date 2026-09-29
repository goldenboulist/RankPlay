import { SignJWT, jwtVerify } from "jose";
import {
  getCookie,
  setCookie,
  deleteCookie,
} from "@tanstack/react-start/server";

// The session JWT lives in an httpOnly cookie so page scripts (and any XSS) can't read it.
export const SESSION_COOKIE = "rp_session";
const SESSION_DAYS = 7;

let secret: Uint8Array | undefined;

// Fail loudly instead of silently signing with a guessable default
function getSecret(): Uint8Array {
  if (!secret) {
    const raw = process.env.JWT_SECRET;
    if (!raw || raw.length < 32) {
      throw new Error("JWT_SECRET is missing or shorter than 32 characters");
    }
    secret = new TextEncoder().encode(raw);
  }
  return secret;
}

export async function startSession(userId: string): Promise<void> {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());

  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function endSession(): void {
  deleteCookie(SESSION_COOKIE, { path: "/" });
}

/** Returns the user id of the current request's session, or null. */
export async function readSession(): Promise<string | null> {
  return verifySessionToken(getCookie(SESSION_COOKIE));
}

/** For raw handlers outside TanStack's request context (see src/server.ts). */
export function readSessionFromRequest(
  request: Request,
): Promise<string | null> {
  const token = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  return verifySessionToken(token);
}

async function verifySessionToken(
  token: string | undefined,
): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
