export type AppRole = "institution" | "officer" | "student";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: AppRole;
}

export const demoAccounts: UserAccount[] = [
  {
    id: "inst-01",
    name: "Institute Coordinator",
    email: "coordinator@institute.edu",
    username: "institution",
    password: "institution123",
    role: "institution",
  },
  {
    id: "officer-01",
    name: "AICTE Processing Officer",
    email: "officer@aicte.gov.in",
    username: "officer",
    password: "officer123",
    role: "officer",
  },
  {
    id: "student-01",
    name: "Student / Public User",
    email: "student@public.in",
    username: "student",
    password: "student123",
    role: "student",
  },
];

const STORAGE_KEY = "setu_user_session";

export function login(
  username: string,
  password: string
): UserAccount | null {
  const account = demoAccounts.find(
    (acc) =>
      acc.username === username &&
      acc.password === password
  );

  if (!account) {
    return null;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(account)
    );
  }

  return account;
}

export function getSession(): UserAccount | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as UserAccount;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "/login";
  }
}
