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

export async function login(email: string, role?: string): Promise<UserAccount> {
  const account = demoAccounts.find((acc) => acc.email === email) || {
    id: `user-${Date.now()}`,
    name: email.split("@")[0],
    email,
    role: (role as UserAccount["role"]) || "Institute",
  };

  return account;
}