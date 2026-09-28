// In-memory fixed-window limiter. Good enough for a single Node process;
// counters reset on restart, which only ever loosens the limit.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweep(now: number) {
  if (buckets.size < 10_000) return;
  for (const [key, b] of buckets) if (b.resetAt <= now) buckets.delete(key);
}

/** Throws once `key` has been hit `limit` times in its current window. */
export function assertNotLimited(key: string, limit: number): void {
  const b = buckets.get(key);
  if (b && b.resetAt > Date.now() && b.count >= limit) {
    const minutes = Math.ceil((b.resetAt - Date.now()) / 60_000);
    throw new Error(`Too many attempts. Try again in ${minutes} min.`);
  }
}

export function hit(key: string, windowMs: number): void {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) buckets.set(key, { count: 1, resetAt: now + windowMs });
  else b.count++;
}

export function reset(key: string): void {
  buckets.delete(key);
}
