// Lightweight auth client that stores the JWT in localStorage.
// Mimics the Supabase auth interface used across the app.

const TOKEN_KEY = "rp_token";
const USER_KEY = "rp_user";

export interface AuthUser {
  id: string;
  email: string;
  display_name: string | null;
}

export interface Session {
  access_token: string;
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
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    if (!token || !user) return null;
    return { access_token: token, user: JSON.parse(user) as AuthUser };
  } catch {
    return null;
  }
}

function storeSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
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
    _setSession(token: string, user: AuthUser) {
      storeSession(token, user);
      _emit("SIGNED_IN");
    },

    signOut() {
      clearSession();
      _emit("SIGNED_OUT");
      window.location.href = "/auth";
    },
  },
};
