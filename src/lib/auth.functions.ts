import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getDb } from "./db.server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret"
);
const JWT_EXPIRY = "7d";

async function signToken(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

// ── Register ──────────────────────────────────────────────────────────────────
export const registerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
        display_name: z.string().optional(),
      })
      .parse(d)
  )
  .handler(async ({ data }) => {
    console.log("[register] data reçu:", JSON.stringify(data));
    const db = getDb();

    // Check duplicate email
    const [existing] = await db.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [data.email]
    );
    if ((existing as unknown[]).length > 0) {
      throw new Error("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
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

    const token = await signToken(userId);
    return {
      token,
      user: { id: userId, email: data.email, display_name: displayName },
    };
  });

// ── Login ─────────────────────────────────────────────────────────────────────
export const loginFn = createServerFn({ method: "POST" })
  .validator((d: unknown) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(1),
      })
      .parse(d)
  )
  .handler(async ({ data }) => {
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

    if (!user) throw new Error("Invalid email or password.");

    const valid = await bcrypt.compare(data.password, user.password_hash);
    if (!valid) throw new Error("Invalid email or password.");

    const token = await signToken(user.id);
    return {
      token,
      user: { id: user.id, email: user.email, display_name: user.display_name },
    };
  });
