import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";
import { decisionSplit, spring, workflow, type WorkflowStage } from "@/lib/setu-data";

const dot: Record<WorkflowStage["state"], string> = {
  done: "bg-ok",
  current: "bg-primary ring-4 ring-primary/15",
  todo: "bg-border",
};

/** The full approval pipeline, from registration to decision — clickable. */
export function WorkflowMap() {
  const currentIndex = workflow.findIndex((s) => s.state === "current");
  const [active, setActive] = useState(workflow[currentIndex === -1 ? 0 : currentIndex]!.id);
  const stage = workflow.find((s) => s.id === active)!;
  const progress = (workflow.filter((s) => s.state === "done").length / workflow.length) * 100;

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium">Approval workflow</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Twelve stages. You are at stage {currentIndex + 1}.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}% complete</span>
      </div>

      <div className="relative mt-6 h-px w-full bg-border">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ...spring, damping: 34 }}
        />
      </div>

      <ol className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {workflow.map((s, i) => (
          <li key={s.id} className="shrink-0">
            <button
              onClick={() => setActive(s.id)}
              className={`flex min-w-44 flex-col items-start gap-2 rounded-xl px-4 py-3 text-left transition-colors ${
                active === s.id ? "bg-accent" : "hover:bg-accent/50"
              }`}
            >
              <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className={`size-2 rounded-full ${dot[s.state]}`} />
                Stage {i + 1}
              </span>
              <span className="text-sm leading-snug">{s.label}</span>
              <span className="text-[11px] text-muted-foreground">{s.meta}</span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={spring}
          className="mt-4 rounded-xl border border-border bg-card p-5"
        >
          <p className="flex items-center gap-2 text-sm">
            {stage.state === "done" && <Check className="size-3.5 text-ok-foreground" />}
            {stage.label}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          Where applications like yours land
        </p>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full">
          {decisionSplit.map((d) => (
            <motion.span
              key={d.label}
              initial={{ width: 0 }}
              animate={{ width: `${d.value}%` }}
              transition={{ ...spring, damping: 34 }}
              className={
                d.tone === "ok" ? "bg-ok" : d.tone === "warn" ? "bg-warn" : "bg-risk"
              }
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
          {decisionSplit.map((d) => (
            <span key={d.label} className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span
                className={`size-1.5 rounded-full ${
                  d.tone === "ok" ? "bg-ok" : d.tone === "warn" ? "bg-warn" : "bg-risk"
                }`}
              />
              {d.label} · {d.value}%
            </span>
          ))}
        </div>
        <p className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
          Corrections return with plain-language reasons
          <ChevronRight className="size-3" />
        </p>
      </div>
    </section>
  );
}
