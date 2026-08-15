import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Building2, GraduationCap, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoAccounts, login, type AppRole } from "@/lib/auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

const roleMeta: Record<AppRole, { title: string; description: string; icon: typeof Building2; username: string; password: string }> = {
  institution: { title: "Institution Coordinator", description: "Manage applications, compliance documents and AI pre-scrutiny.", icon: Building2, username: "institution", password: "institution123" },
  officer: { title: "AICTE Processing Officer", description: "Review applications, evaluator matching and control desk analytics.", icon: ShieldCheck, username: "officer", password: "officer123" },
  student: { title: "Student / Public", description: "Access public approval records and institution map.", icon: GraduationCap, username: "student", password: "student123" },
};

function LoginPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<AppRole>("institution");
  const [username, setUsername] = useState("institution");
  const [password, setPassword] = useState("institution123");
  const [error, setError] = useState("");

  const chooseRole = (role: AppRole) => {
    setSelected(role);
    setUsername(roleMeta[role].username);
    setPassword(roleMeta[role].password);
    setError("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const session = login(username, password);
    if (!session) {
      setError("Invalid demo credentials. Use the credentials shown below.");
      return;
    }
    if (session.role === "institution") void navigate({ to: "/dashboard" });
    else if (session.role === "officer") void navigate({ to: "/control" });
    else void navigate({ to: "/map" });
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-[.85fr_1.15fr]">
          <section className="hidden bg-primary p-10 text-primary-foreground lg:block">
            <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-90"><ArrowLeft className="size-4" /> Setu</Link>
            <div className="mt-28">
              <span className="inline-flex rounded-full bg-primary-foreground/10 px-3 py-1 text-xs">AI-supported approval portal</span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight">One portal for transparent technical education approvals.</h1>
              <p className="mt-5 text-sm leading-7 text-primary-foreground/75">Access role-specific workflows while keeping the public approval record visible to everyone.</p>
            </div>
          </section>

          <section className="p-7 sm:p-10">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground lg:hidden"><ArrowLeft className="size-3.5" /> Setu</Link>
            <div className="mt-6 lg:mt-0">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Secure access</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Login to Setu</h2>
              <p className="mt-2 text-sm text-muted-foreground">Choose the workspace you want to access.</p>
            </div>

            <div className="mt-7 grid gap-2">
              {(Object.keys(roleMeta) as AppRole[]).map((role) => {
                const meta = roleMeta[role];
                const Icon = meta.icon;
                return <button key={role} type="button" onClick={() => chooseRole(role)} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${selected === role ? "border-primary bg-accent" : "border-border hover:bg-accent/50"}`}>
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span>
                  <span><span className="block text-sm font-medium">{meta.title}</span><span className="block text-xs text-muted-foreground">{meta.description}</span></span>
                </button>;
              })}
            </div>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label className="block"><span className="text-xs font-medium">Username</span><input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" /></label>
              <label className="block"><span className="text-xs font-medium">Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" /></label>
              {error && <p className="rounded-lg bg-risk-soft px-3 py-2 text-xs text-risk-foreground">{error}</p>}
              <Button type="submit" className="w-full gap-2"><LogIn className="size-4" /> Login</Button>
            </form>

            <div className="mt-6 rounded-xl bg-muted/60 p-4">
              <p className="text-xs font-medium">Demo credentials</p>
              <div className="mt-3 space-y-2 text-[11px] text-muted-foreground">
                {demoAccounts.map((a) => <p key={a.username}><strong className="text-foreground">{a.role}:</strong> {a.username} / {a.password}</p>)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
