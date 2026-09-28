/** Format seconds as m:ss (or h:mm:ss), keeping one decimal when it isn't whole. */
export function formatTimecode(seconds: number | null | undefined): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const tenths = Math.round((seconds - whole) * 10);
  const h = Math.floor(whole / 3600);
  const m = Math.floor((whole % 3600) / 60);
  const s = whole % 60;
  const ss = String(s).padStart(2, "0") + (tenths > 0 && tenths < 10 ? `.${tenths}` : "");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/**
 * Parse "1:23", "1:23.5", "01:02:03", "83" or "83,5" into seconds.
 * Returns null for an empty string, NaN for invalid input.
 */
export function parseTimecode(input: string): number | null {
  const str = input.trim().replace(",", ".");
  if (!str) return null;
  const parts = str.split(":");
  if (parts.length > 3 || parts.some((p) => !/^\d+(\.\d+)?$/.test(p))) return NaN;
  return parts.reduce((acc, p) => acc * 60 + Number(p), 0);
}

/** Parse a user-typed decimal number, accepting a comma as decimal separator. */
export function parseDecimal(input: string): number | null {
  const str = input.trim().replace(",", ".");
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}
