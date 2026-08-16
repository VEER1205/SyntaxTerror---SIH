export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Institute" | "Evaluator";
}

export const demoAccounts: UserAccount[] = [
  {
    id: "admin-01",
    name: "AICTE Admin",
    email: "admin@aicte.gov.in",
    role: "Admin",
  },
  {
    id: "inst-01",
    name: "Institute Coordinator",
    email: "coordinator@institute.edu",
    role: "Institute",
  },
  {
    id: "eval-01",
    name: "Scrutiny Evaluator",
    email: "evaluator@aicte.gov.in",
    role: "Evaluator",
  },
];

const STORAGE_KEY = "setu_user_session";

export async function login(email: string, role?: string): Promise<UserAccount> {
  const account = demoAccounts.find((acc) => acc.email === email) || {
    id: `user-${Date.now()}`,
    name: email.split("@")[0] || "User",
    email,
    role: (role as UserAccount["role"]) || "Institute",
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  }

  return account;
}

export function getSession(): UserAccount | null {
  if (typeof window === "undefined") {
    // Adding the || null fallback satisfies strict TypeScript checks
    return demoAccounts[0] || null; 
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return demoAccounts[0] || null;
  }

  try {
    return (JSON.parse(stored) as UserAccount) || demoAccounts[0] || null;
  } catch {
    return demoAccounts[0] || null;
  }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "/login";
  }
}