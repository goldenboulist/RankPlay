import path from "path";

// Single source of truth for where uploads are written, listed and served from.
// Resolved from the process cwd (not from the bundle), so it survives rebuilds
// of .output/. Override with UPLOADS_DIR to keep uploads outside the deployed app.
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(process.cwd(), "public", "uploads");

export const AUDIO_EXTENSIONS = new Set([".mp3", ".ogg", ".wav", ".flac", ".aac", ".m4a", ".opus", ".weba"]);
