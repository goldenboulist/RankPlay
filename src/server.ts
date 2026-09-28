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

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
const AUDIO_EXTENSIONS = new Set([".mp3", ".ogg", ".wav", ".flac", ".aac", ".m4a", ".opus", ".weba"]);

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
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

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
    // is not discovered by @lovable.dev/vite-tanstack-config in dev mode).
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
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
