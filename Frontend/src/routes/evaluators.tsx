import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { MetricRow, StatTile, TonePill } from "@/components/setu/primitives";
import {
  appRisk,
  applications,
  bottleneckAdvice,
  bottlenecks,
  evaluatorsByApp,
  officerStats,
  spring,
} from "@/lib/setu-data";

export const Route = createFileRoute("/evaluators")({
  head: () => ({
    meta: [
      { title: "Evaluator Matching — Setu" },
      {
        name: "description",
        content:
          "AI-assisted evaluator allocation for AICTE processing officers: specialization match, travel radius, workload and availability in one ranked view.",
      },
      { property: "og:title", content: "Evaluator Matching Radar" },
      {
        property: "og:description",
        content: "Assign the right evaluator to each pending application in a single click.",
      },
    ],
  }),
  component: EvaluatorsPage,
});

function EvaluatorsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [assigned, setAssigned] = useState<Record<string, string>>({});
  const [autoRef, setAutoRef] = useState(true);

  const pending = 14 - Object.keys(assigned).length;
  const list = selected ? (evaluatorsByApp[selected] ?? []) : [];

  return (
    <TooltipProvider delayDuration={150}>
      <DashboardShell persona="officer">
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-medium tracking-tight">Evaluator Matching</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                  Auto cross-reference: {autoRef ? "ON" : "OFF"}
                  <Switch checked={autoRef} onCheckedChange={setAutoRef} />
                </label>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                Checks every submission against AISHE, UGC and NIRF records automatically.
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="mt-2 flex items-baseline gap-1.5 text-sm text-muted-foreground">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={pending}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={spring}
                className="inline-block font-medium text-foreground"
              >
                {pending}
              </motion.span>
            </AnimatePresence>
            applications awaiting assignment.
          </p>

          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {officerStats.map((s2) => (
              <StatTile
                key={s2.label}
                label={s2.label}
                value={s2.value}
                delta={s2.delta}
                tone={s2.tone}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
            <ul className="space-y-px overflow-hidden rounded-xl border border-border bg-border">
              {applications.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => setSelected(a.id)}
                    className={`flex w-full flex-wrap items-center justify-between gap-4 bg-card px-6 py-5 text-left transition-colors hover:bg-accent ${
                      selected === a.id ? "bg-accent" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm">{a.institution}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {a.specialization} · {a.region} · {a.id}
                      </p>
                      {autoRef && a.discrepancy && (
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-warn-soft px-2.5 py-1 text-[11px] text-warn-foreground">
                          <AlertTriangle className="size-3" />
                          {a.discrepancy}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <TonePill
                        tone={
                          (appRisk[a.id]?.risk ?? 0) > 60
                            ? "risk"
                            : (appRisk[a.id]?.risk ?? 0) > 25
                              ? "warn"
                              : "ok"
                        }
                      >
                        {appRisk[a.id]?.risk}% AI risk
                      </TonePill>
                      <TonePill tone="neutral">{appRisk[a.id]?.compliance}% compliance</TonePill>
                      {assigned[a.id] ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-2.5 py-1 text-[11px] text-ok-foreground">
                          <Check className="size-3" /> {assigned[a.id]}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                          <Clock className="size-3" /> {a.daysLeft} days left
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <aside>
              <AnimatePresence mode="wait">
                {!selected ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    Select an application to see ranked evaluators.
                  </motion.p>
                ) : (
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={spring}
                  >
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                      Ranked evaluators · {selected}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {list.map((e) => {
                        const isAssigned = assigned[selected] === e.name;
                        return (
                          <motion.li
                            layout
                            transition={spring}
                            key={e.id}
                            className={`rounded-xl border p-5 ${
                              isAssigned ? "border-ok bg-ok-soft/40" : "border-border bg-card"
                            }`}
                          >
                            <div className="flex items-baseline justify-between gap-3">
                              <p className="text-sm">{e.name}</p>
                              <span className="text-xs text-muted-foreground">{e.match}%</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{e.affiliation}</p>
                            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${e.match}%` }}
                                transition={spring}
                                className="h-full rounded-full bg-primary"
                              />
                            </div>
                            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3" /> {e.distanceKm} km
                              </span>
                              <span>{e.workload} active assignments</span>
                              <span>Free from {e.available}</span>
                            </p>
                            <div className="mt-4">
                              {isAssigned ? (
                                <motion.span
                                  initial={{ scale: 0.9, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={spring}
                                  className="inline-flex items-center gap-1.5 text-xs text-ok-foreground"
                                >
                                  <Check className="size-3.5" /> Assigned
                                </motion.span>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled={Boolean(assigned[selected])}
                                  onClick={() =>
                                    setAssigned((s) => ({ ...s, [selected]: e.name }))
                                  }
                                >
                                  Match
                                </Button>
                              )}
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12">
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  Bottleneck forecast
                </p>
                <div className="mt-5">
                  {bottlenecks.map((b) => (
                    <MetricRow key={b.label} label={b.label} value={b.value} tone={b.tone} />
                  ))}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  {bottleneckAdvice}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </DashboardShell>
    </TooltipProvider>
  );
}
