import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, Info, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { MetricRow, ScoreRing, TonePill } from "@/components/setu/primitives";
import {
  findings,
  journey,
  readiness,
  spring,
  trackingEvents,
  visionMetrics,
  type Finding,
} from "@/lib/setu-data";

export const Route = createFileRoute("/scrutiny")({
  head: () => ({
    meta: [
      { title: "AI Pre-Scrutiny — Setu" },
      {
        name: "description",
        content:
          "Explainable readiness scoring for an AICTE application: document completeness, data consistency, vision-assisted infrastructure checks and a live approval journey.",
      },
      { property: "og:title", content: "AI Pre-Scrutiny — Setu" },
      {
        property: "og:description",
        content: "See exactly why each item was flagged before the application reaches an officer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ScrutinyPage,
});

function ScrutinyPage() {
  const [open, setOpen] = useState<Finding | null>(null);
  const [resolved, setResolved] = useState<string[]>([]);

  return (
    <DashboardShell persona="coordinator">
      <div>
        <h2 className="text-lg font-medium tracking-tight">AI Pre-Scrutiny</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Application APL-2026-00421 · Computer Engineering · Intake 60
        </p>

        {/* Journey */}
        <section className="mt-12">
          <h2 className="text-sm font-medium">Application journey</h2>
          <ol className="mt-6 flex flex-wrap items-start gap-y-6">
            {journey.map((s, i) => (
              <li key={s.label} className="flex min-w-40 flex-1 items-start gap-3">
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center">
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] ${
                        s.state === "done"
                          ? "bg-ok-soft text-ok-foreground"
                          : s.state === "current"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s.state === "done" ? <Check className="size-3" /> : i + 1}
                    </span>
                    {i < journey.length - 1 && (
                      <span
                        className={`ml-2 h-px flex-1 ${
                          s.state === "done" ? "bg-ok/40" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                  <p className="mt-3 text-xs">{s.label}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{s.meta}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-[22rem_1fr]">
          {/* Readiness */}
          <section>
            <h2 className="text-sm font-medium">Readiness</h2>
            <div className="mt-6 flex items-center gap-6">
              <ScoreRing score={readiness.score} />
              <div>
                <p className="text-sm">{readiness.verdict}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {readiness.note}
                </p>
              </div>
            </div>
            <div className="mt-8">
              {readiness.metrics.map((m) => (
                <div key={m.label} className="border-b border-border py-3.5 last:border-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <span className="text-sm">{m.value}%</span>
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={spring}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Findings */}
          <section>
            <h2 className="text-sm font-medium">Findings</h2>
            <ul className="mt-6 space-y-3">
              {findings.map((f) => {
                const done = resolved.includes(f.id);
                return (
                  <motion.li
                    layout
                    transition={spring}
                    key={f.id}
                    className={`rounded-xl border p-5 ${
                      done ? "border-ok bg-ok-soft/40" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm">{f.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{f.detail}</p>
                      </div>
                      <TonePill tone={done ? "ok" : f.tone}>
                        {done ? "Resolved" : f.tone === "risk" ? "Action needed" : "Review"}
                      </TonePill>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setOpen(f)}>
                        <Info className="size-3.5" /> Why flagged?
                      </Button>
                      <AnimatePresence mode="wait" initial={false}>
                        {done ? (
                          <motion.span
                            key="done"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={spring}
                            className="inline-flex items-center gap-1.5 px-2 text-xs text-ok-foreground"
                          >
                            <Check className="size-3.5" /> Marked resolved
                          </motion.span>
                        ) : (
                          <Button
                            key="action"
                            size="sm"
                            variant="outline"
                            onClick={() => setResolved((r) => [...r, f.id])}
                          >
                            Mark as resolved
                          </Button>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-xl border border-border bg-card p-5">
              <p className="text-sm">Recommendation</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Resolve the missing declaration and verify the faculty mismatch before formal
                scrutiny. Setu assists; an authorised officer makes the final decision.
              </p>
              <Button
                size="sm"
                className="mt-5"
                onClick={() => toast("Marked ready for officer review.")}
              >
                Mark ready for review
              </Button>
            </div>
          </section>
        </div>

        {/* Vision */}
        <section className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium">Infrastructure vision check</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Uploaded laboratory photograph, measured automatically.
            </p>
            <div className="mt-6 grid aspect-[16/9] place-items-center rounded-2xl border border-dashed border-border bg-muted/40">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ScanLine className="size-4" />
                Computer lab · vision overlay (simulated)
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium">Vision analysis</h2>
            <div className="mt-6">
              {visionMetrics.map((m) => (
                <MetricRow key={m.label} label={m.label} value={m.value} tone={m.tone} />
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Visual evidence suggests the submitted area and equipment count need evaluator
              verification. Physical verification always stays with the evaluator.
            </p>
          </div>
        </section>

        {/* Tracking */}
        <section className="mt-16">
          <h2 className="text-sm font-medium">Tracking</h2>
          <ol className="mt-6 border-l border-border pl-6">
            {trackingEvents.map((e) => (
              <li key={e.title} className="relative pb-7 last:pb-0">
                <span
                  className={`absolute -left-[1.655rem] top-1.5 size-2 rounded-full ${
                    e.state === "done"
                      ? "bg-ok"
                      : e.state === "current"
                        ? "bg-primary ring-4 ring-primary/15"
                        : "bg-border"
                  }`}
                />
                <p className="text-sm">{e.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{e.meta}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Dialog open={Boolean(open)} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Why did Setu flag this?</DialogTitle>
            <DialogDescription>{open?.title}</DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">{open?.why}</p>
          <div className="mt-2 rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
            Confidence {open?.confidence} · Recommended action: verify the source record before
            formal scrutiny.
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
