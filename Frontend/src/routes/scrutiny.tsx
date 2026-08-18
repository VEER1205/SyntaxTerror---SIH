import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, Info, ScanLine, AlertTriangle, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
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
import { MetricRow, ScoreRing, TonePill, NodeFlowConnector } from "@/components/setu/primitives";
import {
  findings,
  journey,
  readiness,
  spring,
  trackingEvents,
  visionMetrics,
  type Finding,
} from "@/lib/setu-data";
import { ProtectedRoute } from "@/components/setu/protected-route";

export const Route = createFileRoute("/scrutiny")({
  head: () => ({
    meta: [
      { title: "AI Pre-Scrutiny — Setu" },
      {
        name: "description",
        content:
          "Catch document mismatches, missing declarations, and infrastructure variances before official submission.",
      },
    ],
  }),
  component: ScrutinyPage,
});

function ScrutinyPage() {
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);

  return (
    <ProtectedRoute allowedRoles={["institut", "AicteOfficer"]}>
      <DashboardShell persona="coordinator">
      <div className="space-y-8">
        {/* Header Audit Summary */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" />
                AI Pre-Scrutiny Engine · Active
              </span>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Automated Audit & Compliance Check
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                12 automated compliance checks completed · 3 findings identified (1 blocking requirement)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark"
                onClick={() => toast.success("Re-running AI Pre-Scrutiny audit across all documents...")}
              >
                <ScanLine className="size-4" />
                Re-Run Audit
              </Button>
            </div>
          </div>

          {/* Connected Pipeline Visual */}
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-[11px] font-bold tracking-wider text-muted-subtle uppercase mb-2">
              AI Audit Flow Pipeline
            </p>
            <NodeFlowConnector
              steps={["Documents Uploaded", "OCR Extraction", "Cross-Reference Check", "3 Findings Raised", "Action Recommended"]}
              currentStepIndex={3}
            />
          </div>
        </div>

        {/* Audit Findings List */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Identified Findings ({findings.length})
          </h3>

          <div className="grid gap-4">
            {findings.map((f) => {
              const isBlocking = f.tone === "risk";
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`group rounded-2xl border p-6 shadow-sm transition-all ${
                    isBlocking
                      ? "border-risk/30 bg-risk-soft/40 hover:border-risk"
                      : "border-warn/30 bg-warn-soft/40 hover:border-warn"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl font-bold ${
                          isBlocking ? "bg-risk text-white" : "bg-warn text-white"
                        }`}
                      >
                        {isBlocking ? <ShieldAlert className="size-5" /> : <AlertTriangle className="size-5" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <TonePill tone={f.tone}>
                            {isBlocking ? "Blocking Issue" : "Needs Review"}
                          </TonePill>
                          <span className="text-xs font-medium text-muted-subtle">
                            AI Confidence: <strong className="font-semibold text-foreground">{f.confidence}</strong>
                          </span>
                        </div>
                        <h4 className="mt-2 text-base font-bold text-foreground">{f.title}</h4>
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">{f.detail}</p>
                        <p className="mt-2.5 text-xs text-muted-subtle border-l-2 border-primary/30 pl-3">
                          {f.why}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 rounded-xl border-border bg-card text-xs font-semibold hover:border-primary/40 hover:bg-primary-subtle"
                      onClick={() => setSelectedFinding(f)}
                    >
                      Inspect Finding
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Vision AI Inspection & Readiness Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Computer Vision Inspection */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Vision AI Inspection Metrics</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Automated computer vision analysis on uploaded lab & building photographs
                </p>
              </div>
              <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                89% Vision Confidence
              </span>
            </div>

            <div className="mt-4 divide-y divide-border">
              {visionMetrics.map((vm) => (
                <MetricRow key={vm.label} label={vm.label} value={vm.value} tone={vm.tone} />
              ))}
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="border-b border-border pb-4">
              <h3 className="text-base font-bold text-foreground">Scrutiny Stage Timeline</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Document verification trail
              </p>
            </div>

            <div className="mt-4 space-y-4">
              {trackingEvents.map((evt, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-6 place-items-center rounded-full text-[10px] font-bold ${
                        evt.state === "done"
                          ? "bg-primary text-white"
                          : evt.state === "current"
                            ? "bg-primary text-white ring-4 ring-primary/20"
                            : "bg-muted text-muted-subtle"
                      }`}
                    >
                      {evt.state === "done" ? <Check className="size-3.5 stroke-[3]" /> : i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{evt.title}</p>
                      <p className="text-[11px] text-muted-subtle">{evt.meta}</p>
                    </div>
                  </div>
                  <TonePill tone={evt.state === "done" ? "ok" : evt.state === "current" ? "warn" : "neutral"}>
                    {evt.state.toUpperCase()}
                  </TonePill>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Dialog for Inspecting Finding */}
        <Dialog open={!!selectedFinding} onOpenChange={() => setSelectedFinding(null)}>
          <DialogContent className="max-w-lg rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-foreground">
                {selectedFinding?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Detailed AI reasoning and recommended resolution steps
              </DialogDescription>
            </DialogHeader>

            {selectedFinding && (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-primary-subtle p-4">
                  <p className="text-xs font-semibold text-primary">Discrepancy Details:</p>
                  <p className="mt-1 text-xs text-foreground">{selectedFinding.detail}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground">Audit Explanation:</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{selectedFinding.why}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-subtle">
                    Confidence: <strong className="text-foreground">{selectedFinding.confidence}</strong>
                  </span>
                  <Button
                    size="sm"
                    className="gap-2 rounded-xl bg-primary text-xs font-semibold text-white hover:bg-primary-dark"
                    onClick={() => {
                      toast.success("Navigating to Compliance Vault to re-upload document");
                      setSelectedFinding(null);
                    }}
                  >
                    Resolve in Compliance Vault
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
    </ProtectedRoute>
  );
}
