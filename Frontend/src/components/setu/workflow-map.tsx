import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronRight, Info } from "lucide-react";
import { decisionSplit, spring, workflow, type WorkflowStage } from "@/lib/setu-data";

const dotState: Record<WorkflowStage["state"], string> = {
  done: "bg-primary text-white",
  current: "bg-primary text-white ring-4 ring-primary/20",
  todo: "bg-muted text-muted-subtle border border-border",
};

/** The 12-stage approval pipeline visualization — interactive & clickable. */
export function WorkflowMap() {
  const currentIndex = workflow.findIndex((s) => s.state === "current");
  const [active, setActive] = useState(workflow[currentIndex === -1 ? 0 : currentIndex]!.id);
  const stage = workflow.find((s) => s.id === active)!;
  const progress = (workflow.filter((s) => s.state === "done").length / workflow.length) * 100;

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            End-to-End Approval Workflow
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            12 Checkpoint Pipeline · Currently at Stage {currentIndex + 1}:{" "}
            <span className="font-semibold text-primary">{workflow[currentIndex]?.label}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ...spring, damping: 34 }}
            />
          </div>
          <span className="text-xs font-bold text-primary">{Math.round(progress)}% Complete</span>
        </div>
      </div>

      <ol className="mt-6 flex gap-2.5 overflow-x-auto pb-3">
        {workflow.map((s, i) => {
          const isSelected = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <button
                onClick={() => setActive(s.id)}
                className={`flex min-w-48 flex-col items-start gap-2 rounded-xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary-light/60 shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:bg-primary-subtle/50"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                    Stage {i + 1}
                  </span>
                  <span
                    className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${
                      dotState[s.state]
                    }`}
                  >
                    {s.state === "done" ? <Check className="size-3 stroke-[3]" /> : i + 1}
                  </span>
                </div>
                <span className="text-xs font-semibold leading-snug text-foreground line-clamp-1">
                  {s.label}
                </span>
                <span className="text-[11px] text-muted-subtle">{s.meta}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={spring}
          className="mt-4 rounded-xl border border-border bg-primary-subtle/40 p-4"
        >
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                stage.state === "done"
                  ? "bg-ok-soft text-ok-foreground"
                  : stage.state === "current"
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {stage.state === "done" && <Check className="size-3" />}
              {stage.state === "done"
                ? "Completed"
                : stage.state === "current"
                  ? "In Progress"
                  : "Pending Stage"}
            </span>
            <h4 className="text-sm font-semibold text-foreground">{stage.label}</h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
        </motion.div>
      </AnimatePresence>

      {/* Decision Outcomes breakdown */}
      <div className="mt-6 border-t border-border pt-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Historical Decision Distribution (Similar Applications)
          </p>
          <span className="flex items-center gap-1 text-[11px] text-muted-subtle">
            <Info className="size-3" /> Updated daily
          </span>
        </div>
        <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-muted">
          {decisionSplit.map((d) => (
            <motion.span
              key={d.label}
              initial={{ width: 0 }}
              animate={{ width: `${d.value}%` }}
              transition={{ ...spring, damping: 34 }}
              className={
                d.tone === "ok" ? "bg-primary" : d.tone === "warn" ? "bg-warn" : "bg-risk"
              }
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
          {decisionSplit.map((d) => (
            <span key={d.label} className="flex items-center gap-2 text-xs font-medium text-foreground">
              <span
                className={`size-2 rounded-full ${
                  d.tone === "ok" ? "bg-primary" : d.tone === "warn" ? "bg-warn" : "bg-risk"
                }`}
              />
              {d.label}: <strong className="font-bold">{d.value}%</strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
