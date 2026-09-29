// Hostinger LiteSpeed workaround — stdin fd conflict
process.on("uncaughtException", (err: NodeJS.ErrnoException) => {
  if (err.code === "EEXIST" && err.stack?.includes("stdin")) return;
  console.error(err);
  process.exit(1);
});

import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { promises as fs } from "fs";
import path from "path";
import { readSessionFromRequest } from "./lib/session.server";
import { UPLOADS_DIR, AUDIO_EXTENSIONS } from "./lib/uploads.server";

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;

// Uploads are served from our own origin, so anything but audio (e.g. .html/.svg)
// would be stored XSS. Also restricted to signed-in users on our own pages.
async function handleUpload(request: Request): Promise<Response> {
  try {
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite !== null && fetchSite !== "same-origin") {
      return new Response("Forbidden", { status: 403 });
    }
    if (!(await readSessionFromRequest(request))) {
      return new Response("Unauthorized", { status: 401 });
    }
    // Reject oversized bodies before buffering them
    if (Number(request.headers.get("content-length") ?? 0) > MAX_UPLOAD_BYTES + 64 * 1024) {
      return new Response("File too large", { status: 413 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return new Response("No file provided", { status: 400 });
    if (file.size > MAX_UPLOAD_BYTES) return new Response("File too large", { status: 413 });

    const ext = path.extname(file.name).toLowerCase();
    if (!AUDIO_EXTENSIONS.has(ext) || (file.type && !file.type.startsWith("audio/"))) {
      return new Response("Only audio files are allowed", { status: 415 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9-]/g, "_").slice(0, 150);
    const filename = `${Date.now()}-${base}${ext}`;
    const filepath = path.join(UPLOADS_DIR, filename);

    await fs.mkdir(path.dirname(filepath), { recursive: true });
    await fs.writeFile(filepath, buffer);

    return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response("Upload failed", { status: 500 });
  }
}

const AUDIO_CONTENT_TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
  ".flac": "audio/flac",
  ".aac": "audio/aac",
  ".m4a": "audio/mp4",
  ".opus": "audio/ogg",
  ".weba": "audio/webm",
};

// Nitro only serves the public/ files that existed at build time (its static
// manifest is baked into the bundle), so files uploaded at runtime would 404.
// Serve them straight from the upload directory instead.
async function serveUpload(request: Request, pathname: string): Promise<Response> {
  let filename: string;
  try {
    filename = decodeURIComponent(pathname.slice("/uploads/".length));
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const ext = path.extname(filename).toLowerCase();
  if (filename !== path.basename(filename) || !AUDIO_EXTENSIONS.has(ext)) {
    return new Response("Not found", { status: 404 });
  }

  const filepath = path.join(UPLOADS_DIR, filename);
  let size: number;
  try {
    const stat = await fs.stat(filepath);
    if (!stat.isFile()) return new Response("Not found", { status: 404 });
    size = stat.size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const headers: Record<string, string> = {
    "content-type": AUDIO_CONTENT_TYPES[ext] ?? "application/octet-stream",
    "accept-ranges": "bytes",
    "cache-control": "public, max-age=31536000, immutable",
    "x-content-type-options": "nosniff",
  };

  // Range support is required for seeking (music_start) in audio players
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  let start = 0;
  let end = size - 1;
  if (range && (range[1] || range[2])) {
    if (range[1]) {
      start = Number(range[1]);
      if (range[2]) end = Math.min(Number(range[2]), size - 1);
    } else {
      start = Math.max(size - Number(range[2]), 0);
    }
    if (start > end || start >= size) {
      return new Response(null, { status: 416, headers: { "content-range": `bytes */${size}` } });
    }
  }
  const partial = range !== null && (range[1] !== "" || range[2] !== "");
  const length = end - start + 1;
  headers["content-length"] = String(length);
  if (partial) headers["content-range"] = `bytes ${start}-${end}/${size}`;

  if (request.method === "HEAD") {
    return new Response(null, { status: partial ? 206 : 200, headers });
  }

  const handle = await fs.open(filepath, "r");
  const buffer = Buffer.alloc(length);
  try {
    await handle.read(buffer, 0, length, start);
  } finally {
    await handle.close();
  }
  return new Response(buffer, { status: partial ? 206 : 200, headers });
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
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
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // Handle file uploads before TanStack Start routing (createAPIFileRoute
    // is not discovered in dev mode).
    const url = new URL(request.url);
    if (url.pathname === "/api/upload" && request.method === "POST") {
      return handleUpload(request);
    }
    if (url.pathname.startsWith("/uploads/") && (request.method === "GET" || request.method === "HEAD")) {
      return serveUpload(request, url.pathname);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
