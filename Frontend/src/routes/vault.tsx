import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, CircleDot, PanelRightClose, PanelRightOpen, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { goldenRecord, spring } from "@/lib/setu-data";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Compliance Vault — Setu" },
      {
        name: "description",
        content:
          "One institutional record that satisfies AICTE, NBA and NAAC — with AI document categorisation and plain-language deficiency explanations.",
      },
      { property: "og:title", content: "Compliance Vault — one record, three regulators" },
      {
        property: "og:description",
        content: "Upload once and let AICTE, NBA and NAAC read the same verified record.",
      },
    ],
  }),
  component: VaultPage,
});

type Verdict = { body: "AICTE" | "NBA" | "NAAC"; ok: boolean; line: string };

const verdicts: Verdict[] = [
  { body: "AICTE", ok: true, line: "Faculty List — matched" },
  { body: "NBA", ok: true, line: "Faculty List — matched" },
  {
    body: "NAAC",
    ok: false,
    line: "Lab Certificate — expires in 12 days, needs renewal",
  },
];

function VaultPage() {
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle");
  const [panelOpen, setPanelOpen] = useState(true);
  const [resolved, setResolved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = () => {
    setPhase("analyzing");
    setTimeout(() => setPhase("done"), 1500);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <DashboardShell persona="coordinator">
        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-medium tracking-tight">Compliance Vault</h2>
              <p className="mt-1 text-sm text-muted-foreground">One record. AICTE, NBA, NAAC.</p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex cursor-default items-center gap-2 rounded-full bg-ok-soft px-3 py-1.5 text-xs text-ok-foreground">
                  <span className="size-1.5 rounded-full bg-ok" />
                  Access: Active
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Earlier, credentials locked after submission. Now you can respond to queries
                anytime.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <section>


              <button
                onClick={() => inputRef.current?.click()}
                className="mt-10 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 transition-colors hover:border-primary/50 hover:bg-accent/40"
              >
                <UploadCloud className="size-6 text-muted-foreground" />
                <span className="mt-4 text-sm">Drop a document, or click to upload</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  PDF, DOCX or scanned image
                </span>
              </button>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFile}
                aria-label="Upload compliance document"
              />

              <div className="mt-8 min-h-16">
                <AnimatePresence mode="wait">
                  {phase === "analyzing" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <p className="text-xs text-muted-foreground">Analysing document…</p>
                      <div className="h-8 w-full max-w-sm rounded-lg bg-muted shimmer" />
                    </motion.div>
                  )}
                  {phase === "done" && (
                    <motion.div key="done" className="flex flex-wrap gap-2">
                      {verdicts.map((v, i) => (
                        <motion.span
                          key={v.body}
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ ...spring, delay: i * 0.14 }}
                          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs ${
                            v.ok ? "bg-ok-soft text-ok-foreground" : "bg-warn-soft text-warn-foreground"
                          }`}
                        >
                          {v.ok ? (
                            <Check className="size-3.5" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-warn" />
                          )}
                          <span className="font-medium">{v.body}</span>
                          <span className="opacity-80">{v.line}</span>
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-14">
                <h2 className="text-sm font-medium">Golden Record</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  The single source every regulator reads from.
                </p>
                <ul className="mt-6">
                  {goldenRecord.map((row) => (
                    <li
                      key={row.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-4 last:border-0"
                    >
                      <div>
                        <p className="text-sm">{row.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Last updated {row.updated}
                        </p>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="text-sm text-muted-foreground">{row.value}</span>
                        <span className="text-[11px] text-muted-foreground">
                          Used by: AICTE, NBA, NAAC
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <aside className="lg:pt-2">
              <button
                onClick={() => setPanelOpen((v) => !v)}
                className="flex w-full items-center justify-between text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Deficiency Translator
                {panelOpen ? (
                  <PanelRightClose className="size-4" />
                ) : (
                  <PanelRightOpen className="size-4" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {panelOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={spring}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 rounded-xl border border-border bg-card p-5">
                      <span className="inline-flex items-center gap-2 text-xs text-warn-foreground">
                        <CircleDot className="size-3.5" />
                        Needs attention
                      </span>
                      <p className="mt-4 text-sm leading-relaxed">
                        Your fire safety certificate expired March 2025 — AICTE requires this
                        renewed before submission.
                      </p>
                      <div className="mt-6">
                        <AnimatePresence mode="wait" initial={false}>
                          {resolved ? (
                            <motion.span
                              key="resolved"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={spring}
                              className="inline-flex items-center gap-2 rounded-full bg-ok-soft px-3 py-1.5 text-xs text-ok-foreground"
                            >
                              <Check className="size-3.5" /> Marked as resolved
                            </motion.span>
                          ) : (
                            <motion.div key="btn" exit={{ opacity: 0 }}>
                              <Button variant="outline" size="sm" onClick={() => setResolved(true)}>
                                Mark as resolved
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </div>
      </DashboardShell>
    </TooltipProvider>
  );
}
