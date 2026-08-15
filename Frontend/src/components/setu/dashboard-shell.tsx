import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  GraduationCap,
  LayoutDashboard,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UserRound,
  Map,
  LogOut,
} from "lucide-react";
import { CommandMenu } from "@/components/setu/command-menu";
import { spring } from "@/lib/setu-data";
import { getSession, logout } from "@/lib/auth";

export type Persona = "coordinator" | "officer";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const NAV: Record<Persona, NavItem[]> = {
  coordinator: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/vault", label: "Compliance Vault", icon: ShieldCheck },
    { to: "/scrutiny", label: "AI Pre-Scrutiny", icon: Sparkles },
    { to: "/verify", label: "Public record", icon: GraduationCap },
    { to: "/map", label: "Institution map", icon: Map },
  ],
  officer: [
    { to: "/control", label: "Overview", icon: LayoutDashboard },
    { to: "/evaluators", label: "Evaluator Matching", icon: UserRound },
    { to: "/scrutiny", label: "Application Scrutiny", icon: ScanSearch },
    { to: "/verify", label: "Public record", icon: GraduationCap },
    { to: "/map", label: "Institution map", icon: Map },
  ],
};

const WHO: Record<Persona, { name: string; org: string; line: string }> = {
  coordinator: {
    name: "Ananya",
    org: "Bhilai Institute of Engineering & Technology",
    line: "Let's take a look at where your application stands.",
  },
  officer: {
    name: "Officer Rao",
    org: "AICTE · East & South Zone desk",
    line: "Here's what needs your judgement today.",
  },
};

export function DashboardShell({
  persona,
  children,
}: {
  persona: Persona;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);

  useEffect(() => {
    const current = getSession();
    setSession(current);
    if (!current || (persona === "coordinator" && current.role !== "institution") || (persona === "officer" && current.role !== "officer")) {
      void navigate({ to: "/login" });
    }
  }, [navigate, persona]);

  const nav = NAV[persona];
  const who = session ? { name: session.name, org: session.organization, line: persona === "coordinator" ? "Let's take a look at where your application stands." : "Here's what needs your judgement today." } : WHO[persona];

  if (!session) return null;

  return (
    <div className="min-h-screen lg:flex">
      {/* Rail */}
      <aside className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur lg:h-screen lg:w-60 lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2 px-5 py-4 lg:py-6">
          <span className="grid size-6 place-items-center rounded-md bg-primary/10 text-[10px] font-medium text-primary">
            S
          </span>
          <Link to="/" className="text-sm font-medium tracking-tight">
            Setu
          </Link>
          <span className="ml-auto text-[10px] tracking-widest text-muted-foreground uppercase lg:hidden">
            {persona}
          </span>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:mt-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors lg:text-sm ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={`nav-${persona}`}
                    transition={spring}
                    className="absolute inset-0 rounded-lg bg-accent"
                  />
                )}
                <item.icon className="relative size-4" />
                <span className="relative whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden px-5 lg:absolute lg:bottom-6 lg:block">
          <p className="text-xs text-muted-foreground">{who.name}</p>
          <p className="mt-1 max-w-40 text-[11px] leading-relaxed text-muted-foreground/70">
            {who.org}
          </p>
          <button
            onClick={() => { logout(); void navigate({ to: "/login" }); }}
            className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground"
          >
            <LogOut className="size-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-end justify-between gap-4 px-6 pt-8 pb-2 lg:px-10 lg:pt-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className="text-sm text-muted-foreground"
            >
              Welcome back, {who.name}.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.05 }}
              className="mt-1.5 text-2xl font-semibold tracking-tight"
            >
              {who.line}
            </motion.h1>
          </div>
          <CommandMenu />
        </header>

        <main className="px-6 pt-6 pb-24 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
