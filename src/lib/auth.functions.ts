import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import bcrypt from "bcryptjs";
import { getRequestIP } from "@tanstack/react-start/server";
import { getDb } from "./db.server";
import { startSession, endSession } from "./session.server";
import { assertNotLimited, hit, reset } from "./rate-limit.server";

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

const MINUTE = 60_000;
// Failed logins: per IP (spraying many accounts) and per email (one account from many IPs)
const LOGIN_IP_LIMIT = 20;
const LOGIN_EMAIL_LIMIT = 8;
const LOGIN_WINDOW = 15 * MINUTE;
const REGISTER_IP_LIMIT = 5;
const REGISTER_WINDOW = 60 * MINUTE;

function clientIp(): string {
  // Behind Hostinger's proxy the socket address is the proxy itself
  return getRequestIP({ xForwardedFor: true }) ?? "unknown";
}

// Stored format: "scrypt$<salt>$<hash>"
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt}$${hash.toString("hex")}`;
}

function safeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  return ba.length === bb.length && ba.length > 0 && timingSafeEqual(ba, bb);
}

/**
 * Accepts every format the app has used over time:
 * - "scrypt$salt$hash" (current)
 * - "$2a$/$2b$…" bcrypt (first accounts)
 * - "salt:hash" sha256 (short-lived intermediate format)
 */
async function verifyPassword(password: string, stored: string | null | undefined): Promise<boolean> {
  if (!stored) return false;
  if (stored.startsWith("scrypt$")) {
    const [, salt, hash] = stored.split("$");
    if (!salt || !hash) return false;
    const attempt = await scryptAsync(password, salt, 64);
    return safeEqualHex(hash, attempt.toString("hex"));
  }
  if (/^\$2[aby]\$/.test(stored)) {
    return bcrypt.compare(password, stored);
  }
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const attempt = createHash("sha256").update(salt + password).digest("hex");
  return safeEqualHex(hash, attempt);
}

// ── Register ──────────────────────────────────────────────────────────────────
export const registerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z
      .object({
        email: z.string().trim().toLowerCase().email().max(255),
        password: z.string().min(8).max(200),
        display_name: z.string().trim().max(100).optional(),
      })
      .parse(d)
  )
  .handler(async ({ data }) => {
    const ipKey = `register:ip:${clientIp()}`;
    assertNotLimited(ipKey, REGISTER_IP_LIMIT);
    hit(ipKey, REGISTER_WINDOW);

    try {
      const db = getDb();
      const passwordHash = await hashPassword(data.password);
      // Check duplicate email
      const [existing] = await db.execute(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [data.email]
      );
      if ((existing as unknown[]).length > 0) {
        throw new Error("An account with this email already exists.");
      }

      const displayName = data.display_name || data.email.split("@")[0];

      await db.execute(
        "INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)",
        [data.email, passwordHash, displayName]
      );

      const [rows] = await db.execute(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [data.email]
      );
      const userId = (rows as { id: string }[])[0].id;

      await startSession(userId);
      return {
        user: { id: userId, email: data.email, display_name: displayName },
      };
    } catch (e) {
      // Never log `data`: it holds the plaintext password
      console.error("[register] failed:", e instanceof Error ? e.message : e);
      throw e;
    }
  });

// ── Login ─────────────────────────────────────────────────────────────────────
export const loginFn = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z
      .object({
        email: z.string().trim().toLowerCase().email().max(255),
        password: z.string().min(1).max(200),
      })
      .parse(d)
  )
  .handler(async ({ data }) => {
    const ipKey = `login:ip:${clientIp()}`;
    const emailKey = `login:email:${data.email}`;
    assertNotLimited(ipKey, LOGIN_IP_LIMIT);
    assertNotLimited(emailKey, LOGIN_EMAIL_LIMIT);

    const db = getDb();

    const [rows] = await db.execute(
      "SELECT id, email, password_hash, display_name FROM users WHERE email = ? LIMIT 1",
      [data.email]
    );
    const user = (
      rows as {
        id: string;
        email: string;
        password_hash: string;
        display_name: string | null;
      }[]
    )[0];

    // Hash even for unknown emails so response time doesn't reveal which accounts exist
    const valid = user
      ? await verifyPassword(data.password, user.password_hash)
      : await scryptAsync(data.password, "0".repeat(32), 64).then(() => false);
    if (!user || !valid) {
      hit(ipKey, LOGIN_WINDOW);
      hit(emailKey, LOGIN_WINDOW);
      throw new Error("Invalid email or password.");
    }
    reset(emailKey);

    // Upgrade legacy hashes to the current format
    if (!user.password_hash.startsWith("scrypt$")) {
      await db.execute("UPDATE users SET password_hash = ? WHERE id = ?", [
        await hashPassword(data.password),
        user.id,
      ]);
    }

    await startSession(user.id);
    return {
      user: { id: user.id, email: user.email, display_name: user.display_name },
    };
  });

// ── Logout ────────────────────────────────────────────────────────────────────
export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  endSession();
  return { ok: true };
});
