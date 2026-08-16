import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AlertTriangle, ArrowUpRight, ShieldCheck, Activity, Users, Clock } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { StatTile, TonePill, AiRecommendationCard } from "@/components/setu/primitives";
import {
  appRisk,
  applications,
  bottleneckAdvice,
  bottlenecks,
  officerStats,
  processingTrend,
  spring,
  stageLoad,
} from "@/lib/setu-data";

export const Route = createFileRoute("/control")({
  head: () => ({
    meta: [
      { title: "Officer Control Desk — Setu" },
      {
        name: "description",
        content:
          "Regional desk analytics, AI risk scores, processing turnaround trends and stage capacity triage.",
      },
    ],
  }),
  component: ControlDeskPage,
});

function ControlDeskPage() {
  return (
    <DashboardShell persona="officer">
      <div className="space-y-8">
        {/* Header Overview Banner */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" />
                Regional Processing Desk · East & South Zone
              </span>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Officer Triage & Intelligence Control
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                AI-driven risk scoring and workload distribution across 1,248 regional application records.
              </p>
            </div>

            <Link
              to="/evaluators"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark"
            >
              <Users className="size-4" />
              Smart Evaluator Matching
            </Link>
          </div>
        </div>

        {/* Officer Stats KPI Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label={officerStats[0].label}
            value={officerStats[0].value}
            delta={officerStats[0].delta}
            tone={officerStats[0].tone}
            icon={Activity}
          />
          <StatTile
            label={officerStats[1].label}
            value={officerStats[1].value}
            delta={officerStats[1].delta}
            tone={officerStats[1].tone}
            icon={AlertTriangle}
          />
          <StatTile
            label={officerStats[2].label}
            value={officerStats[2].value}
            delta={officerStats[2].delta}
            tone={officerStats[2].tone}
            icon={AlertTriangle}
          />
          <StatTile
            label={officerStats[3].label}
            value={officerStats[3].value}
            delta={officerStats[3].delta}
            tone={officerStats[3].tone}
            icon={Clock}
          />
        </div>

        {/* AI Bottleneck Recommendation Card */}
        <AiRecommendationCard
          title="Infrastructure Inspection Capacity Bottleneck"
          description={bottleneckAdvice}
          rationale="AI predictive model forecasts a 4-day reduction in approval cycle delays upon reallocating 4 evaluators."
          actionText="Open Evaluator Matching"
          onAction={() => {}}
        />

        {/* Charts Grid: Processing Duration & Stage Load */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Processing Turnaround Line Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="border-b border-border pb-4">
              <h3 className="text-base font-bold text-foreground">
                Average Processing Time (Days)
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Monthly turnaround trend reduction over current cycle
              </p>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processingTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E6E3" />
                  <XAxis dataKey="month" stroke="#89918D" fontSize={11} tickLine={false} />
                  <YAxis stroke="#89918D" fontSize={11} tickLine={false} domain={[10, 25]} />
                  <RTooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E2E6E3",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="days"
                    stroke="#087F5B"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#087F5B" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stage Load Distribution Bar Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="border-b border-border pb-4">
              <h3 className="text-base font-bold text-foreground">
                Application Stage Load Distribution
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Active applications queued per stage
              </p>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageLoad} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E6E3" />
                  <XAxis dataKey="stage" stroke="#89918D" fontSize={11} tickLine={false} />
                  <YAxis stroke="#89918D" fontSize={11} tickLine={false} />
                  <RTooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E2E6E3",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="#087F5B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Application Risk & Compliance Triage Table */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Application Risk & Compliance Triage
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                High-priority records requiring officer evaluation
              </p>
            </div>
            <span className="text-xs font-semibold text-primary">
              Showing {applications.length} priority applications
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 font-semibold">Application ID</th>
                  <th className="pb-3 font-semibold">Institution</th>
                  <th className="pb-3 font-semibold">Specialization</th>
                  <th className="pb-3 font-semibold">Region</th>
                  <th className="pb-3 font-semibold">Risk Rating</th>
                  <th className="pb-3 font-semibold">Compliance</th>
                  <th className="pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {applications.map((app) => {
                  const riskData = appRisk[app.id] || { risk: 25, compliance: 85 };
                  const isHighRisk = riskData.risk > 50;
                  return (
                    <tr key={app.id} className="transition-colors hover:bg-primary-subtle/40">
                      <td className="py-3.5 font-mono font-bold text-foreground">{app.id}</td>
                      <td className="py-3.5 font-medium text-foreground">{app.institution}</td>
                      <td className="py-3.5 text-muted-foreground">{app.specialization}</td>
                      <td className="py-3.5 text-muted-foreground">{app.region}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isHighRisk
                              ? "bg-risk-soft text-risk-foreground"
                              : "bg-ok-soft text-ok-foreground"
                          }`}
                        >
                          {riskData.risk}% {isHighRisk ? "High Risk" : "Low Risk"}
                        </span>
                      </td>
                      <td className="py-3.5 font-semibold text-foreground">
                        {riskData.compliance}%
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          to="/evaluators"
                          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                        >
                          Assign Evaluators <ArrowUpRight className="size-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
