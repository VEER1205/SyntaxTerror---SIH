import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  LogIn,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/setu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Setu — AICTE approval & compliance portal" },
      {
        name: "description",
        content:
          "Setu is the AI-supported AICTE approval portal: apply once, satisfy AICTE, NBA and NAAC, track scrutiny live, and verify any approved course in seconds.",
      },
      { property: "og:title", content: "Setu — AICTE approval & compliance portal" },
      {
        property: "og:description",
        content:
          "Apply once for AICTE, NBA and NAAC. Live scrutiny tracking, AI evaluator matching and instant public course verification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

const logins = [
  {
    to: "/dashboard",
    icon: ShieldCheck,
    label: "Institution Coordinator",
    hint: "Bhilai Institute of Engineering & Technology",
  },
  {
    to: "/control",
    icon: ScanSearch,
    label: "AICTE Processing Officer",
    hint: "East & South Zone desk",
  },
  {
    to: "/verify",
    icon: GraduationCap,
    label: "Student / Public",
    hint: "No login needed — verify a course",
  },
];

const mandate = [
  {
    icon: FileCheck2,
    tint: "text-indigo bg-indigo-soft",
    title: "Approvals & extensions",
    body: "Grants approval for new technical institutions, new courses, variation in intake and extension of approval every academic cycle.",
  },
  {
    icon: Building2,
    tint: "text-saffron bg-saffron-soft",
    title: "Norms & standards",
    body: "Lays down norms for faculty, infrastructure, laboratories, library and land — the criteria every application is measured against.",
  },
  {
    icon: Sparkles,
    tint: "text-teal bg-teal-soft",
    title: "Quality assurance",
    body: "Works with NBA and NAAC on accreditation, and runs schemes for faculty development, research funding and student scholarships.",
  },
  {
    icon: UserRound,
    tint: "text-plum bg-plum-soft",
    title: "Inspection & evaluation",
    body: "Deputes expert visiting committees to verify claims on the ground, and cross-references records with AISHE, UGC and NIRF.",
  },
];

const stats = [
  { value: "11,400+", label: "Approved institutions" },
  { value: "3.9 M", label: "Annual sanctioned intake" },
  { value: "2026–27", label: "Current approval cycle" },
  { value: "31 Mar", label: "Handbook submission close" },
];

const cycle = [
  { step: "01", label: "Institution applies", tint: "bg-indigo" },
  { step: "02", label: "AI pre-scrutiny", tint: "bg-teal" },
  { step: "03", label: "Infrastructure check", tint: "bg-saffron" },
  { step: "04", label: "Expert visit", tint: "bg-plum" },
  { step: "05", label: "Decision published", tint: "bg-ok" },
];

function LoginMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1.5 rounded-full px-4">
          <LogIn className="size-3.5" />
          Login as
          <ChevronDown className="size-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-[11px] tracking-widest text-muted-foreground uppercase">
          Choose a role
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {logins.map((l) => (
          <DropdownMenuItem
            key={l.to}
            className="cursor-pointer gap-3 py-2.5"
            onSelect={() => navigate({ to: l.to })}
          >
            <l.icon className="size-4 text-primary" />
            <span className="min-w-0">
              <span className="block text-sm">{l.label}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{l.hint}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-[11px] font-medium text-primary-foreground">
            S
          </span>
          <div className="leading-tight">
            <p className="text-sm font-medium tracking-tight">Setu</p>
            <p className="text-[10px] text-muted-foreground">
              All India Council for Technical Education
            </p>
          </div>
          <nav className="ml-8 hidden items-center gap-6 md:flex">
            {["Mandate", "Approval cycle", "Verify a course"].map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(/ /g, "-")}`}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {n}
              </a>
            ))}
          </nav>
          <div className="ml-auto">
            <LoginMenu />
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60rem 24rem at 12% -10%, var(--color-indigo-soft), transparent 60%), radial-gradient(48rem 22rem at 92% 0%, var(--color-saffron-soft), transparent 65%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 py-20">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
                <span className="size-1.5 animate-pulse rounded-full bg-ok" />
                Approval cycle 2026–27 is open
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
                The national desk for{" "}
                <span className="text-indigo">technical education</span> approvals.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                AICTE approves institutions and courses, sets the norms they must meet, and
                verifies them on the ground. Setu is the AI-supported portal that carries that
                work end to end — one compliance record, transparent scrutiny, and public proof
                any student can check in seconds.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <LoginMenu />
                <Button asChild size="sm" variant="outline" className="gap-1.5 rounded-full px-4">
                  <Link to="/verify">
                    Verify a course
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.05 * i }}
                  className="bg-card px-5 py-6"
                >
                  <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mandate */}
        <section id="mandate" className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
            What AICTE does
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            A statutory body under the Ministry of Education, responsible for planning and
            coordinated development of technical education.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {mandate.map((m, i) => (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...spring, delay: 0.04 * i }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className={`grid size-9 place-items-center rounded-xl ${m.tint}`}>
                  <m.icon className="size-4" />
                </span>
                <h3 className="mt-5 text-sm font-medium">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Cycle */}
        <section id="approval-cycle" className="border-y border-border bg-secondary/50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
              How an approval moves
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Five checkpoints, one visible trail.
            </h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {cycle.map((c, i) => (
                <motion.li
                  key={c.step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.05 * i }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className={`size-2 rounded-full ${c.tint}`} />
                    {c.step}
                  </span>
                  <p className="mt-3 text-sm leading-snug">{c.label}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Roles */}
        <section id="verify-a-course" className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase">Sign in</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Three desks, one record.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Use the “Login as” button above, or pick your desk here — this prototype signs you in
            instantly with representative data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {logins.map((l) => (
              <Button key={l.to} asChild variant="outline" className="h-auto gap-2.5 rounded-xl px-4 py-3">
                <Link to={l.to}>
                  <l.icon className="size-4 text-primary" />
                  <span className="text-left">
                    <span className="block text-sm">{l.label}</span>
                    <span className="block text-[11px] font-normal text-muted-foreground">
                      {l.hint}
                    </span>
                  </span>
                  <ArrowRight className="ml-2 size-3.5 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-[11px] text-muted-foreground">
          <span>Setu · prototype with representative data, not an official AICTE service.</span>
          <span>
            Press{" "}
            <kbd className="rounded border border-border px-1 py-0.5 font-sans">⌘K</kbd> inside any
            internal screen to move around.
          </span>
        </div>
      </footer>
    </div>
  );
}
