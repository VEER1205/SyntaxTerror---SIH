import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, Clock, MapPin, UserCheck, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { MetricRow, StatTile, TonePill, AiRecommendationCard } from "@/components/setu/primitives";
import {
  appRisk,
  applications,
  bottleneckAdvice,
  bottlenecks,
  evaluatorsByApp,
  officerStats,
  spring,
} from "@/lib/setu-data";
import { ProtectedRoute } from "@/components/setu/protected-route";

export const Route = createFileRoute("/evaluators")({
  head: () => ({
    meta: [
      { title: "Evaluator Matching — Setu" },
      {
        name: "description",
        content:
          "Smart evaluator matching: rank visiting committee members by domain match, travel radius, workload and availability.",
      },
    ],
  }),
  component: EvaluatorsPage,
});

function EvaluatorsPage() {
  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);
  const [assignedMap, setAssignedMap] = useState<Record<string, string>>({});

  const activeApp = applications.find((a) => a.id === selectedAppId) || applications[0];
  const evaluators = evaluatorsByApp[selectedAppId] || [];

  const handleAssign = (evaluatorId: string) => {
    setAssignedMap((prev) => ({
      ...prev,
      [selectedAppId]: evaluatorId,
    }));
  };

  return (
    <ProtectedRoute allowedRoles={["AicteOfficer"]}>
      <TooltipProvider delayDuration={150}>
        <DashboardShell persona="officer">
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  Smart Evaluator Allocation Algorithm
                </span>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Expert Visiting Committee Matching
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Optimization by domain match, travel radius (km), current evaluation workload, and availability.
                </p>
              </div>
            </div>
          </div>

          {/* AI Bottleneck Advice Card */}
          <AiRecommendationCard
            title="Recommended Inspection Allocation"
            description={bottleneckAdvice}
            rationale="Assigning top-ranked evaluators within 50km reduces travel expenditure and cuts inspection lag."
            actionText="Apply Recommendation"
            onAction={() => {}}
          />

          <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
            {/* Sidebar: Applications Selector */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Pending Applications ({applications.length})
                </h3>
                <Filter className="size-3.5 text-muted-subtle" />
              </div>

              <div className="mt-3 space-y-2">
                {applications.map((app) => {
                  const isSelected = app.id === selectedAppId;
                  const isAssigned = !!assignedMap[app.id];
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary-light/60 shadow-sm"
                          : "border-border bg-card hover:border-primary/30 hover:bg-primary-subtle/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-foreground">
                          {app.id}
                        </span>
                        {isAssigned ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-ok-foreground">
                            <Check className="size-3" /> Assigned
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-warn">
                            {app.daysLeft}d left
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-xs font-semibold text-foreground">
                        {app.institution}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-subtle">{app.specialization}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Area: Evaluator Ranking List */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Target: {activeApp.institution}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {activeApp.specialization} · {activeApp.region} · Application ID: {activeApp.id}
                    </p>
                  </div>
                  <TonePill tone={assignedMap[activeApp.id] ? "ok" : "warn"}>
                    {assignedMap[activeApp.id] ? "Evaluator Assigned" : "Needs Evaluator Assignment"}
                  </TonePill>
                </div>

                <div className="mt-6 space-y-4">
                  {evaluators.map((e, idx) => {
                    const isSelectedEvaluator = assignedMap[activeApp.id] === e.id;
                    return (
                      <div
                        key={e.id}
                        className={`group rounded-2xl border p-5 transition-all ${
                          isSelectedEvaluator
                            ? "border-primary bg-primary-light/40 shadow-sm"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-sm font-extrabold text-white">
                              #{idx + 1}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-foreground">{e.name}</h4>
                                <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[10px] font-bold text-primary">
                                  {e.match}% Match
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {e.affiliation}
                              </p>

                              <div className="mt-2.5 flex flex-wrap gap-4 text-xs text-muted-subtle">
                                <span className="flex items-center gap-1">
                                  <MapPin className="size-3.5 text-primary" /> {e.distanceKm} km radius
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="size-3.5 text-primary" /> Avail: {e.available}
                                </span>
                                <span className="flex items-center gap-1">
                                  Workload: <strong className="text-foreground">{e.workload} active</strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            className={`gap-2 rounded-xl text-xs font-semibold ${
                              isSelectedEvaluator
                                ? "bg-ok text-white hover:bg-ok"
                                : "bg-primary text-white hover:bg-primary-dark"
                            }`}
                            onClick={() => handleAssign(e.id)}
                          >
                            {isSelectedEvaluator ? (
                              <>
                                <Check className="size-4 stroke-[3]" /> Assigned
                              </>
                            ) : (
                              <>
                                <UserCheck className="size-4" /> Assign Evaluator
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        </DashboardShell>
      </TooltipProvider>
    </ProtectedRoute>
  );
}
