import { useState, useEffect } from "react";
import { getSession, type UserSession } from "@/lib/auth";

interface AuthState {
  user: UserSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Module-level cache so we only hit /Auth/me ONCE per page load, not on every component mount
let cachedPromise: Promise<UserSession | null> | null = null;
let cachedResult: UserSession | null | undefined = undefined; // undefined = not yet resolved

function resolveSession(): Promise<UserSession | null> {
  if (!cachedPromise) {
    cachedPromise = getSession().then((s) => {
      cachedResult = s;
      return s;
    }).catch(() => {
      cachedResult = null;
      return null;
    });
  }
  return cachedPromise;
}

/**
 * Clears the module-level auth cache (call after login/logout so next useAuth() re-fetches)
 */
export function clearAuthCache() {
  cachedPromise = null;
  cachedResult = undefined;
}

/**
 * React hook that resolves the current auth session.
 * Uses a module-level cache so /Auth/me is only called once per browser session.
 * Falls back to demo localStorage session if backend is unreachable.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>(() => {
    // If we already have a cached result, use it immediately (no spinner)
    if (cachedResult !== undefined) {
      return {
        user: cachedResult,
        isLoading: false,
        isAuthenticated: cachedResult !== null,
      };
    }
    return { user: null, isLoading: true, isAuthenticated: false };
  });

  useEffect(() => {
    // If we already resolved, no-op
    if (cachedResult !== undefined) {
      setState({
        user: cachedResult,
        isLoading: false,
        isAuthenticated: cachedResult !== null,
      });
      return;
    }

    let cancelled = false;
    resolveSession().then((session) => {
      if (!cancelled) {
        setState({
          user: session,
          isLoading: false,
          isAuthenticated: session !== null,
        });
      }
    });

    return () => { cancelled = true; };
  }, []);

  return state;
}
