import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
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
import { MetricRow, StatTile, TonePill } from "@/components/setu/primitives";
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
          "AICTE officer overview: pipeline load by stage, processing-time trend, AI-flagged applications and bottleneck forecasting.",
      },
      { property: "og:title", content: "Officer Control Desk — Setu" },
      {
        property: "og:description",
        content: "See the whole approval pipeline at a glance and act where it matters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OfficerDashboard,
});

const axisTick = { fontSize: 11, fill: "var(--color-muted-foreground)" };
const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

function OfficerDashboard() {
  return (
    <DashboardShell persona="officer">
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {officerStats.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} delta={s.delta} tone={s.tone} />
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="space-y-10">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-medium">Pipeline load by stage</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Applications currently sitting at each stage of the workflow.
            </p>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageLoad} margin={{ left: -20, right: 4, top: 4 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={axisTick} />
                  <YAxis tickLine={false} axisLine={false} tick={axisTick} />
                  <RTooltip cursor={{ fill: "var(--color-accent)" }} contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={38} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-medium">Average processing time</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Days per application since AI pre-audit went live.
            </p>
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processingTrend} margin={{ left: -20, right: 4, top: 4 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axisTick} />
                  <YAxis tickLine={false} axisLine={false} tick={axisTick} domain={[10, 24]} />
                  <RTooltip cursor={{ stroke: "var(--color-border)" }} contentStyle={tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="days"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ r: 2.5, strokeWidth: 0, fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-sm font-medium">Needs your judgement</h2>
              <Link
                to="/evaluators"
                className="inline-flex items-center gap-1.5 text-xs text-primary transition-opacity hover:opacity-80"
              >
                Open evaluator matching <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
            <ul className="mt-5 space-y-px overflow-hidden rounded-xl border border-border bg-border">
              {applications.map((a, i) => (
                <motion.li
                  key={a.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.04 * i }}
                  className="flex flex-wrap items-center justify-between gap-4 bg-card px-6 py-5"
                >
                  <div>
                    <p className="text-sm">{a.institution}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {a.specialization} · {a.region} · {a.id}
                    </p>
                    {a.discrepancy && (
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-warn-soft px-2.5 py-1 text-[11px] text-warn-foreground">
                        <AlertTriangle className="size-3" /> {a.discrepancy}
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
                    <TonePill tone="neutral">{a.daysLeft} days left</TonePill>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <aside>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            Bottleneck forecast
          </p>
          <div className="mt-5">
            {bottlenecks.map((b) => (
              <MetricRow key={b.label} label={b.label} value={b.value} tone={b.tone} />
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{bottleneckAdvice}</p>
        </aside>
      </div>
    </DashboardShell>
  );
}
