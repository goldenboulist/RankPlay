// Server-only DB access (bypasses per-user auth).
// Use only in trusted server-side operations.
export { getDb as supabaseAdmin } from "@/lib/db.server";
