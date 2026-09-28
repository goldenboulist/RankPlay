// Lightweight auth client mimicking the Supabase auth interface used across the app.
// The session JWT lives in an httpOnly cookie set by the server; only the
// (non-secret) user profile is kept in localStorage for the UI.

import { logoutFn } from "@/lib/auth.functions";

const USER_KEY = "rp_user";
// Pre-cookie versions stored the JWT here; wipe it so it can't be stolen
const LEGACY_TOKEN_KEY = "rp_token";

export interface AuthUser {
  id: string;
  email: string;
  display_name: string | null;
}

export interface Session {
  user: AuthUser;
}

type AuthEvent = "SIGNED_IN" | "SIGNED_OUT" | "USER_UPDATED";
type AuthChangeCallback = (event: AuthEvent) => void;

// Simple in-memory event bus for auth state changes
const _listeners = new Set<AuthChangeCallback>();
function _emit(event: AuthEvent) {
  _listeners.forEach((cb) => cb(event));
}

function getStoredSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    if (localStorage.getItem(LEGACY_TOKEN_KEY) !== null) {
      // Old localStorage session: no cookie exists yet, so force a fresh sign-in
      clearSession();
      return null;
    }
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;
    return { user: JSON.parse(user) as AuthUser };
  } catch {
    return null;
  }
}

function storeSession(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// The object the rest of the app calls as `supabase.auth.*`
export const supabase = {
  auth: {
    getSession(): { data: { session: Session | null } } {
      return { data: { session: getStoredSession() } };
    },

    async getUser(): Promise<{
      data: { user: AuthUser | null };
      error: null;
    }> {
      const session = getStoredSession();
      return { data: { user: session?.user ?? null }, error: null };
    },

    /** Subscribe to auth state changes (SIGNED_IN, SIGNED_OUT, USER_UPDATED) */
    onAuthStateChange(callback: AuthChangeCallback): {
      data: { subscription: { unsubscribe: () => void } };
    } {
      _listeners.add(callback);
      return {
        data: {
          subscription: {
            unsubscribe() {
              _listeners.delete(callback);
            },
          },
        },
      };
    },

    /** Call after a successful loginFn / registerFn response */
    _setSession(user: AuthUser) {
      storeSession(user);
      _emit("SIGNED_IN");
    },

    async signOut() {
      // Clear the httpOnly cookie server-side; still sign out locally if that fails
      await logoutFn().catch(() => {});
      clearSession();
      _emit("SIGNED_OUT");
      window.location.href = "/auth";
    },

    /** Drop the local profile after the server rejected the session cookie. */
    _expire() {
      if (!getStoredSession()) return;
      clearSession();
      _emit("SIGNED_OUT");
      window.location.href = "/auth";
    },
  },
};
