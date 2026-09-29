// Turns raw errors ("Failed to fetch", "NetworkError…", HTTP statuses) into
// messages that say what the user was doing and why it failed.

const NETWORK_PATTERNS = [/failed to fetch/i, /networkerror/i, /load failed/i, /network request failed/i];

const STATUS_REASONS: Record<number, string> = {
  401: "your session has expired, please sign in again",
  403: "you're not allowed to do this",
  404: "it no longer exists on the server",
  408: "the server took too long to respond",
  413: "the file is too large",
  415: "this file type isn't supported",
  429: "too many requests, try again in a moment",
  500: "the server ran into an error",
  502: "the server is unreachable right now",
  503: "the server is temporarily unavailable",
  504: "the server took too long to respond",
};

function reasonFromStatus(status: number): string {
  return STATUS_REASONS[status] ?? (status >= 500 ? "the server ran into an error" : `the request was rejected (${status})`);
}

/** Human-readable cause of an error, without the "what were we doing" part. */
export function errorReason(e: unknown): string {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return "you appear to be offline";
  }
  const message = e instanceof Error ? e.message.trim() : typeof e === "string" ? e.trim() : "";
  if (!message) return "an unexpected error occurred";
  if (NETWORK_PATTERNS.some((p) => p.test(message))) {
    return "the server couldn't be reached, check your connection";
  }
  // h3 wraps unhandled server throws in a bare "HTTPError"
  if (/^HTTPError$/i.test(message)) return "the server ran into an error";
  if (message.startsWith("Unauthorized")) return STATUS_REASONS[401];
  return message;
}

/** "Couldn't <action>: <reason>" — use in every error toast. */
export function describeError(action: string, e: unknown): string {
  const reason = errorReason(e);
  return `Couldn't ${action}: ${reason.charAt(0).toLowerCase()}${reason.slice(1)}`;
}

/** Error carrying the reason extracted from a failed fetch() Response. */
export async function responseError(res: Response): Promise<Error> {
  const type = res.headers.get("content-type") ?? "";
  let body = "";
  try {
    body = (await res.text()).trim();
  } catch {
    /* ignore */
  }
  // Plain-text bodies from our own handlers are already meaningful; proxy
  // error pages (HTML) are not, so fall back to the status.
  const usable = body && !type.includes("html") && body.length < 200 && !body.startsWith("<");
  return new Error(usable ? body : reasonFromStatus(res.status));
}

/** Explains why an <audio> element failed to load its source. */
export async function describeAudioError(audio: HTMLAudioElement, url: string): Promise<string> {
  const code = audio.error?.code;
  if (code === MediaError.MEDIA_ERR_ABORTED) return "Playback was interrupted";
  if (code === MediaError.MEDIA_ERR_DECODE) return "Couldn't play this track: the file seems corrupted";
  // Network/unsupported errors: ask the server what's actually going on
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.status === 404) return "Couldn't play this track: the audio file was not found on the server";
    if (!res.ok) return `Couldn't play this track: ${reasonFromStatus(res.status)}`;
  } catch (e) {
    // Cross-origin links often block HEAD: only report real connectivity loss
    if (!url.startsWith("/")) {
      return "Couldn't play this track: the external link can't be loaded (it may be down or block playback)";
    }
    return describeError("load this track", e);
  }
  if (code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
    return "Couldn't play this track: the format isn't supported by your browser";
  }
  return "Couldn't play this track: the connection was lost while loading it";
}
