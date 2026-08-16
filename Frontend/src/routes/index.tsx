import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  GraduationCap,
  LogIn,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UserRound,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/setu-data";
import { SaarthiApprovalNetwork } from "@/components/setu/network-visual";
import { SaarthiBrandHeader } from "@/components/setu/saarthi-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saarthi — AICTE Technical Education Approval Portal" },
      {
        name: "description",
        content:
          "Saarthi is the AI-supported AICTE approval portal: apply once, satisfy AICTE, NBA and NAAC, track scrutiny live, and verify any approved course in seconds.",
      },
      { property: "og:title", content: "Saarthi — AICTE Technical Education Approval Portal" },
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
    tint: "bg-primary-light text-primary",
    title: "Approvals & Extensions",
    body: "Grants approval for new technical institutions, new courses, variation in intake and extension of approval every academic cycle.",
  },
  {
    icon: Building2,
    tint: "bg-warn-soft text-warn",
    title: "Norms & Standards",
    body: "Lays down norms for faculty, infrastructure, laboratories, library and land — the criteria every application is measured against.",
  },
  {
    icon: Sparkles,
    tint: "bg-primary-light text-primary-dark",
    title: "Quality Assurance",
    body: "Works with NBA and NAAC on accreditation, and runs schemes for faculty development, research funding and student scholarships.",
  },
  {
    icon: UserRound,
    tint: "bg-muted text-muted-foreground",
    title: "Inspection & Evaluation",
    body: "Deputes expert visiting committees to verify claims on the ground, and cross-references records with AISHE, UGC and NIRF.",
  },
];

const stats = [
  { value: "11,400+", label: "Approved Institutions" },
  { value: "3.9 M", label: "Annual Sanctioned Intake" },
  { value: "2026–27", label: "Current Approval Cycle" },
  { value: "31 Mar", label: "Handbook Submission Close" },
];

const cycle = [
  { step: "01", label: "Institution Applies", tint: "bg-primary" },
  { step: "02", label: "AI Pre-Scrutiny", tint: "bg-primary-dark" },
  { step: "03", label: "Infrastructure Check", tint: "bg-warn" },
  { step: "04", label: "Expert Visit", tint: "bg-muted-subtle" },
  { step: "05", label: "Decision Published", tint: "bg-primary" },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/">
            <SaarthiBrandHeader iconSize="size-10" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {["Mandate", "Approval Cycle", "Verify a Course"].map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(/ /g, "-")}`}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {n}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark"
              onClick={() => navigate({ to: "/login" })}
            >
              <LogIn className="size-4" />
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION: Left Message + Right Saarthi Approval Network Visual Composition */}
        <section className="relative overflow-hidden border-b border-border bg-setu-nodes py-16 lg:py-24">
          {/* Faint gradient mesh behind hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(40rem 20rem at 15% 10%, rgba(8, 127, 91, 0.08), transparent 60%), radial-gradient(40rem 20rem at 85% 20%, rgba(198, 138, 36, 0.06), transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* LEFT SIDE: Message & CTAs */}
              <div className="lg:col-span-6">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1 text-xs font-semibold text-primary">
                    <span className="size-2 animate-pulse rounded-full bg-primary" />
                    Approval Cycle 2026–27 Open
                  </span>

                  <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08]">
                    The Connected National Desk for{" "}
                    <span className="text-primary">Technical Education</span> Approvals.
                  </h1>

                  <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Saarthi connects institutions, compliance vaults, AI pre-scrutiny, and expert visiting committees — one verified record satisfying AICTE, NBA, and NAAC.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      size="lg"
                      className="gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
                      onClick={() => navigate({ to: "/login" })}
                    >
                      Access Workspace
                      <ArrowRight className="size-4" />
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="gap-2 rounded-xl border-border bg-card px-6 text-sm font-semibold hover:border-primary/40 hover:bg-primary-subtle"
                    >
                      <Link to="/map">
                        Explore Institution Map
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="gap-2 rounded-xl border-border bg-card px-6 text-sm font-semibold hover:border-primary/40 hover:bg-primary-subtle"
                    >
                      <Link to="/verify">Verify Course Record</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDE: Saarthi Approval Network Visual Component */}
              <div className="lg:col-span-6">
                <SaarthiApprovalNetwork />
              </div>
            </div>

            {/* Connected KPI Stats Grid */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.05 * i }}
                  className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-xs text-muted-subtle mb-2">
                    <span className="font-mono text-[10px] uppercase">Node 0{i + 1}</span>
                    <span className="size-1.5 rounded-full bg-primary" />
                  </div>
                  <p className="text-3xl font-extrabold tracking-tight text-primary">{s.value}</p>
                  <p className="mt-1.5 text-xs font-semibold text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mandate Section on Secondary Surface (#F1F6F3) */}
        <section id="mandate" className="bg-surface-secondary py-24 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Regulatory Ecosystem
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                AICTE Statutory Mandate & Objectives
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Planning and coordinated development of technical education across India under the Ministry of Education.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mandate.map((m, i) => (
                <motion.article
                  key={m.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.04 * i }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <span className={`grid size-10 place-items-center rounded-xl font-bold ${m.tint}`}>
                    <m.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-foreground group-hover:text-primary">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Cycle Section */}
        <section id="approval-cycle" className="border-b border-border bg-card py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Workflow Transparency
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Five Connected Checkpoints. One Visible Trail.
              </h2>
            </div>

            <ol className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {cycle.map((c, i) => (
                <motion.li
                  key={c.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.05 * i }}
                  className="rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/40"
                >
                  <span className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${c.tint}`} />
                      Stage {c.step}
                    </span>
                    <CheckCircle2 className="size-4 text-primary" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-foreground">{c.label}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Role Desks Section */}
        <section id="verify-a-course" className="mx-auto max-w-7xl px-6 py-24">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            Workspace Desks
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Role-Based Access Desks
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select your desk to view prototype workflows and live data.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {logins.map((l) => (
              <Button
                key={l.to}
                asChild
                variant="outline"
                className="h-auto flex-col items-start gap-3 rounded-2xl border-border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-md"
              >
                <Link to={l.to}>
                  <div className="flex w-full items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary-light text-primary">
                      <l.icon className="size-5" />
                    </span>
                    <ArrowRight className="size-4 text-muted-subtle" />
                  </div>
                  <div>
                    <span className="block text-base font-bold text-foreground">{l.label}</span>
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">
                      {l.hint}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-muted-foreground">
          <span>Saarthi — AICTE Technical Education Approval Portal</span>
          <span>
            Press <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd> to open Command Menu
          </span>
        </div>
      </footer>
    </div>
  );
}
