import { promises } from "fs";
import path from "path";
import { AsyncLocalStorage } from "node:async_hooks";
import { g as getRequestIP$1, H as H3Event, t as toResponse, d as deleteCookie$1, s as setCookie$1, p as parseCookies } from "../_libs/h3-v2.mjs";
import { S as SignJWT, j as jwtVerify } from "../_libs/jose.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "node:crypto";
import "node:util";
import "node:buffer";
let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var GLOBAL_EVENT_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:event-storage");
var globalObj = globalThis;
if (!globalObj[GLOBAL_EVENT_STORAGE_KEY]) globalObj[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
  return typeof value.then === "function";
}
function getSetCookieValues(headers) {
  const headersWithSetCookie = headers;
  if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
  const value = headers.get("set-cookie");
  return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
  if (response.ok) return;
  const eventSetCookies = getSetCookieValues(event.res.headers);
  if (eventSetCookies.length === 0) return;
  const responseSetCookies = getSetCookieValues(response.headers);
  response.headers.delete("set-cookie");
  for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
  for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
  if (isPromiseLike(value)) return value.then((resolved) => {
    if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
    return resolved;
  });
  if (value instanceof Response) mergeEventResponseHeaders(value, event);
  return value;
}
function requestHandler(handler) {
  return (request, requestOpts) => {
    let h3Event;
    try {
      h3Event = new H3Event(request);
    } catch (error) {
      if (error instanceof URIError) return new Response(null, {
        status: 400,
        statusText: "Bad Request"
      });
      throw error;
    }
    return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return event.h3Event;
}
function getRequestIP(opts) {
  return getRequestIP$1(getH3Event(), opts);
}
function getCookies() {
  const cookies = parseCookies(getH3Event());
  const definedCookies = /* @__PURE__ */ Object.create(null);
  for (const [name, value] of Object.entries(cookies)) if (value !== void 0) definedCookies[name] = value;
  return definedCookies;
}
function getCookie(name) {
  return getCookies()[name];
}
function setCookie(name, value, options) {
  setCookie$1(getH3Event(), name, value, options);
}
function deleteCookie(name, options) {
  deleteCookie$1(getH3Event(), name, options);
}
function getResponse() {
  return getH3Event().res;
}
const SESSION_COOKIE = "rp_session";
const SESSION_DAYS = 7;
let secret;
function getSecret() {
  if (!secret) {
    const raw = process.env.JWT_SECRET;
    if (!raw || raw.length < 32) {
      throw new Error("JWT_SECRET is missing or shorter than 32 characters");
    }
    secret = new TextEncoder().encode(raw);
  }
  return secret;
}
async function startSession(userId) {
  const token = await new SignJWT({ sub: userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(`${SESSION_DAYS}d`).sign(getSecret());
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60
  });
}
function endSession() {
  deleteCookie(SESSION_COOKIE, { path: "/" });
}
async function readSession() {
  return verifySessionToken(getCookie(SESSION_COOKIE));
}
function readSessionFromRequest(request) {
  const token = (request.headers.get("cookie") ?? "").split(";").map((c) => c.trim()).find((c) => c.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  return verifySessionToken(token);
}
async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    return payload.sub ?? null;
  } catch {
    return null;
  }
}
process.on("uncaughtException", (err) => {
  if (err.code === "EEXIST" && err.stack?.includes("stdin")) return;
  console.error(err);
  process.exit(1);
});
const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
const AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([".mp3", ".ogg", ".wav", ".flac", ".aac", ".m4a", ".opus", ".weba"]);
async function handleUpload(request) {
  try {
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite !== null && fetchSite !== "same-origin") {
      return new Response("Forbidden", { status: 403 });
    }
    if (!await readSessionFromRequest(request)) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (Number(request.headers.get("content-length") ?? 0) > MAX_UPLOAD_BYTES + 64 * 1024) {
      return new Response("File too large", { status: 413 });
    }
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return new Response("No file provided", { status: 400 });
    if (file.size > MAX_UPLOAD_BYTES) return new Response("File too large", { status: 413 });
    const ext = path.extname(file.name).toLowerCase();
    if (!AUDIO_EXTENSIONS.has(ext) || file.type && !file.type.startsWith("audio/")) {
      return new Response("Only audio files are allowed", { status: 415 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const base = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9-]/g, "_").slice(0, 150);
    const filename = `${Date.now()}-${base}${ext}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    await promises.mkdir(path.dirname(filepath), { recursive: true });
    await promises.writeFile(filepath, buffer);
    return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    console.error(e);
    return new Response("Upload failed", { status: 500 });
  }
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-CKhcZQ3s.mjs").then((n) => n.s).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
const server = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/upload" && request.method === "POST") {
      return handleUpload(request);
    }
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }
  }
};
export {
  renderErrorPage as a,
  getRequestIP as b,
  readSession as c,
  server as default,
  endSession as e,
  getResponse as g,
  requestHandler as r,
  startSession as s
};
