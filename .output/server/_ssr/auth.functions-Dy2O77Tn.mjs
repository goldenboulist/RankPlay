import { c as createServerRpc } from "./createServerRpc-DV1vET9U.mjs";
import { c as createServerFn } from "./server-CKhcZQ3s.mjs";
import { scrypt, randomBytes, createHash, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { b as bcrypt } from "../_libs/bcryptjs.mjs";
import { g as getDb } from "./db.server-C0hDN4oC.mjs";
import { s as startSession, e as endSession, b as getRequestIP } from "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/mysql2.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "node:async_hooks";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "fs";
import "path";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/jose.mjs";
import "node:crypto";
import "node:util";
import "node:buffer";
import "events";
import "process";
import "net";
import "tls";
import "timers";
import "zlib";
import "url";
import "../_libs/sql-escaper.mjs";
import "buffer";
import "../_libs/lru.min.mjs";
import "../_libs/long.mjs";
import "../_libs/iconv-lite.mjs";
import "string_decoder";
import "../_libs/safer-buffer.mjs";
import "../_libs/generate-function.mjs";
import "../_libs/is-property.mjs";
import "../_libs/aws-ssl-profiles.mjs";
import "../_libs/named-placeholders.mjs";
const buckets = /* @__PURE__ */ new Map();
function sweep(now) {
  if (buckets.size < 1e4) return;
  for (const [key, b] of buckets) if (b.resetAt <= now) buckets.delete(key);
}
function assertNotLimited(key, limit) {
  const b = buckets.get(key);
  if (b && b.resetAt > Date.now() && b.count >= limit) {
    const minutes = Math.ceil((b.resetAt - Date.now()) / 6e4);
    throw new Error(`Too many attempts. Try again in ${minutes} min.`);
  }
}
function hit(key, windowMs) {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) buckets.set(key, { count: 1, resetAt: now + windowMs });
  else b.count++;
}
function reset(key) {
  buckets.delete(key);
}
const scryptAsync = promisify(scrypt);
const MINUTE = 6e4;
const LOGIN_IP_LIMIT = 20;
const LOGIN_EMAIL_LIMIT = 8;
const LOGIN_WINDOW = 15 * MINUTE;
const REGISTER_IP_LIMIT = 5;
const REGISTER_WINDOW = 60 * MINUTE;
function clientIp() {
  return getRequestIP({
    xForwardedFor: true
  }) ?? "unknown";
}
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt}$${hash.toString("hex")}`;
}
function safeEqualHex(a, b) {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  return ba.length === bb.length && ba.length > 0 && timingSafeEqual(ba, bb);
}
async function verifyPassword(password, stored) {
  if (!stored) return false;
  if (stored.startsWith("scrypt$")) {
    const [, salt2, hash2] = stored.split("$");
    if (!salt2 || !hash2) return false;
    const attempt2 = await scryptAsync(password, salt2, 64);
    return safeEqualHex(hash2, attempt2.toString("hex"));
  }
  if (/^\$2[aby]\$/.test(stored)) {
    return bcrypt.compare(password, stored);
  }
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const attempt = createHash("sha256").update(salt + password).digest("hex");
  return safeEqualHex(hash, attempt);
}
const registerFn_createServerFn_handler = createServerRpc({
  id: "34c6d52668704398adcb57dc8f4c6f46d89204dc6879ff6ae7a0b1788461f47b",
  name: "registerFn",
  filename: "src/lib/auth.functions.ts"
}, (opts) => registerFn.__executeServer(opts));
const registerFn = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  email: stringType().trim().toLowerCase().email().max(255),
  password: stringType().min(8).max(200),
  display_name: stringType().trim().max(100).optional()
}).parse(d)).handler(registerFn_createServerFn_handler, async ({
  data
}) => {
  const ipKey = `register:ip:${clientIp()}`;
  assertNotLimited(ipKey, REGISTER_IP_LIMIT);
  hit(ipKey, REGISTER_WINDOW);
  try {
    const db = getDb();
    const passwordHash = await hashPassword(data.password);
    const [existing] = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [data.email]);
    if (existing.length > 0) {
      throw new Error("An account with this email already exists.");
    }
    const displayName = data.display_name || data.email.split("@")[0];
    await db.execute("INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)", [data.email, passwordHash, displayName]);
    const [rows] = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [data.email]);
    const userId = rows[0].id;
    await startSession(userId);
    return {
      user: {
        id: userId,
        email: data.email,
        display_name: displayName
      }
    };
  } catch (e) {
    console.error("[register] failed:", e instanceof Error ? e.message : e);
    throw e;
  }
});
const loginFn_createServerFn_handler = createServerRpc({
  id: "6d4b29dcb4b664e5b9e190280c200c64479ce35a61ed4a534b0d4706e66654ba",
  name: "loginFn",
  filename: "src/lib/auth.functions.ts"
}, (opts) => loginFn.__executeServer(opts));
const loginFn = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  email: stringType().trim().toLowerCase().email().max(255),
  password: stringType().min(1).max(200)
}).parse(d)).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const ipKey = `login:ip:${clientIp()}`;
  const emailKey = `login:email:${data.email}`;
  assertNotLimited(ipKey, LOGIN_IP_LIMIT);
  assertNotLimited(emailKey, LOGIN_EMAIL_LIMIT);
  const db = getDb();
  const [rows] = await db.execute("SELECT id, email, password_hash, display_name FROM users WHERE email = ? LIMIT 1", [data.email]);
  const user = rows[0];
  const valid = user ? await verifyPassword(data.password, user.password_hash) : await scryptAsync(data.password, "0".repeat(32), 64).then(() => false);
  if (!user || !valid) {
    hit(ipKey, LOGIN_WINDOW);
    hit(emailKey, LOGIN_WINDOW);
    throw new Error("Invalid email or password.");
  }
  reset(emailKey);
  if (!user.password_hash.startsWith("scrypt$")) {
    await db.execute("UPDATE users SET password_hash = ? WHERE id = ?", [await hashPassword(data.password), user.id]);
  }
  await startSession(user.id);
  return {
    user: {
      id: user.id,
      email: user.email,
      display_name: user.display_name
    }
  };
});
const logoutFn_createServerFn_handler = createServerRpc({
  id: "f97313454005e76f4abe19e1bad6e1a69821f9b7a7187053b1e91f040449315f",
  name: "logoutFn",
  filename: "src/lib/auth.functions.ts"
}, (opts) => logoutFn.__executeServer(opts));
const logoutFn = createServerFn({
  method: "POST"
}).handler(logoutFn_createServerFn_handler, async () => {
  endSession();
  return {
    ok: true
  };
});
export {
  loginFn_createServerFn_handler,
  logoutFn_createServerFn_handler,
  registerFn_createServerFn_handler
};
