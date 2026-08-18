import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Building2, GraduationCap, LogIn, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoAccounts, login, getHomeRoute, type UserRole } from "@/lib/auth";
import { clearAuthCache } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign In — Saarthi" }],
  }),
  component: LoginPage,
});

// Map backend role values to display info
const roleMeta: Record<
  UserRole,
  { title: string; description: string; icon: typeof Building2; demoUsername: string; demoPassword: string }
> = {
  institut: {
    title: "Institution Coordinator",
    description: "Manage applications, compliance documents and AI pre-scrutiny.",
    icon: Building2,
    demoUsername: "demo_institution",
    demoPassword: "institution123",
  },
  AicteOfficer: {
    title: "AICTE Processing Officer",
    description: "Review applications, evaluator matching and control desk analytics.",
    icon: ShieldCheck,
    demoUsername: "demo_officer",
    demoPassword: "officer123",
  },
  student: {
    title: "Student / Public",
    description: "Access public approval records and institution map.",
    icon: GraduationCap,
    demoUsername: "demo_student",
    demoPassword: "student123",
  },
};

const roleOrder: UserRole[] = ["institut", "AicteOfficer", "student"];

function LoginPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<UserRole>("institut");
  const [identifier, setIdentifier] = useState("demo_institution");
  const [password, setPassword] = useState("institution123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chooseRole = (role: UserRole) => {
    setSelected(role);
    setIdentifier(roleMeta[role].demoUsername);
    setPassword(roleMeta[role].demoPassword);
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { session } = await login(identifier, password);
      clearAuthCache(); // Force re-fetch of session on next protected page
      void navigate({ to: getHomeRoute(session.role) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 lg:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-[.9fr_1.1fr]">
          {/* LEFT: Institutional Emerald Panel */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-white lg:flex">
            {/* Subtle Node Pattern Overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white/90 transition-opacity hover:opacity-100"
              >
                <ArrowLeft className="size-4" />
                Back to Saarthi Portal
              </Link>
            </div>

            <div className="relative z-10 my-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <CheckCircle2 className="size-3.5" />
                AI-Supported Approval System
              </span>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                One portal for transparent technical education approvals.
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Access role-specific compliance tools while keeping national approval records visible and verifiable.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Single compliance record across AICTE, NBA & NAAC",
                  "Automated OCR & Vision AI document pre-scrutiny",
                  "Smart evaluator matching with distance optimization",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs text-white/90">
                    <span className="grid size-4 place-items-center rounded-full bg-white/20 text-[10px] font-bold">
                      ✓
                    </span>
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-white/15 pt-6 text-[11px] text-white/70">
              Saarthi · All India Council for Technical Education
            </div>
          </section>

          {/* RIGHT: Login & Role Selection */}
          <section className="p-8 sm:p-10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground lg:hidden"
            >
              <ArrowLeft className="size-3.5" /> Back to Saarthi
            </Link>

            <div className="mt-4 lg:mt-0">
              <span className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                Secure Access
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                Sign in to Saarthi
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Select your workspace desk to view role-specific workflows.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="mt-6 grid gap-2.5">
              {roleOrder.map((role) => {
                const meta = roleMeta[role];
                const Icon = meta.icon;
                const isSelected = selected === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => chooseRole(role)}
                    className={`flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary-light/60 shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-primary-subtle/50"
                    }`}
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${
                        isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-foreground">{meta.title}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {meta.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Login Form */}
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Username or Email
                </label>
                <input
                  id="login-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-risk/30 bg-risk-soft px-3.5 py-2 text-xs font-medium text-risk-foreground">
                  {error}
                </p>
              )}

              <Button
                id="login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogIn className="size-4" />
                )}
                {isLoading ? "Signing in…" : "Sign In to Workspace"}
              </Button>
            </form>

            {/* Demo Credentials Box */}
            <div className="mt-6 rounded-2xl border border-border bg-primary-subtle/40 p-4">
              <p className="text-xs font-semibold text-foreground">Demo Credentials (offline fallback)</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Use these when the backend is unreachable. Real users log in with their MongoDB credentials.
              </p>
              <div className="mt-2.5 grid gap-1 text-[11px] text-muted-foreground">
                {demoAccounts.map((a) => (
                  <div key={a.userName} className="flex items-center justify-between">
                    <span className="font-medium text-foreground capitalize">{a.role}:</span>
                    <code className="font-mono text-[10px] text-primary">
                      {a.userName} / {a.password}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
