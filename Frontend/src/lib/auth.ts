import { fetchFromAPI, API_BASE_URL } from "./api";

// ─── Types ──────────────────────────────────────────────────────────────────

export type UserRole = "AicteOfficer" | "institut" | "student";

export interface UserSession {
  userName: string;
  role: UserRole;
}

// ─── Demo fallback accounts ──────────────────────────────────────────────────
export const demoAccounts = [
  { userName: "demo_officer",     role: "AicteOfficer" as UserRole, password: "officer123" },
  { userName: "demo_institution", role: "institut"     as UserRole, password: "institution123" },
  { userName: "demo_student",     role: "student"      as UserRole, password: "student123" },
];

const DEMO_SESSION_KEY = "setu_demo_session";

// ─── Login ───────────────────────────────────────────────────────────────────

export async function login(
  identifier: string,
  password: string
): Promise<{ session: UserSession; isDemo: boolean }> {
  // Try real backend first
  try {
    await fetchFromAPI("/Auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });
    // Login succeeded — cookie is set. Fetch the role from /Auth/me
    const session = await fetchFromAPI("/Auth/me");
    clearDemoSession();
    return { session: session as UserSession, isDemo: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // Real auth failure (wrong credentials) — surface to UI
    if (
      message.toLowerCase().includes("incorrect") ||
      message.toLowerCase().includes("unauthorized") ||
      message.toLowerCase().includes("not found") ||
      message.toLowerCase().includes("bad request")
    ) {
      throw err;
    }

    // Network / backend unreachable → demo mode
    console.warn("Backend unreachable, falling back to demo mode:", message);
  }

  // Demo mode fallback
  const demo = demoAccounts.find(
    (a) => a.userName === identifier && a.password === password
  );

  if (!demo) {
    throw new Error(
      "Incorrect credentials. (Backend offline — use demo credentials shown below.)"
    );
  }

  const session: UserSession = { userName: demo.userName, role: demo.role };
  saveDemoSession(session);
  return { session, isDemo: true };
}

// ─── Get current session ─────────────────────────────────────────────────────

/**
 * Returns the current authenticated session.
 * Uses a 3-second timeout so pages don't hang when the backend is unreachable.
 * Falls back to the demo localStorage session.
 */
export async function getSession(): Promise<UserSession | null> {
  if (typeof window === "undefined") return null; // SSR guard

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const data = await fetch(`${API_BASE_URL}/Auth/me`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (data.ok) {
      const json = await data.json();
      return json as UserSession;
    }
    // 401 = not logged in → check demo session
    return getDemoSession();
  } catch {
    // Backend down / request timed out → fall back to demo session
    return getDemoSession();
  }
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  try {
    await fetchFromAPI("/Auth/logout", { method: "POST" });
  } catch {
    // Best-effort
  }
  clearDemoSession();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

// ─── Role helpers ─────────────────────────────────────────────────────────────

export function getHomeRoute(role: UserRole): string {
  switch (role) {
    case "AicteOfficer": return "/control";
    case "institut":     return "/dashboard";
    case "student":      return "/verify";
  }
}

export function isAllowed(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}

// ─── Demo session helpers ────────────────────────────────────────────────────

function saveDemoSession(session: UserSession) {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  }
}

function getDemoSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(DEMO_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

function clearDemoSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_SESSION_KEY);
  }
}