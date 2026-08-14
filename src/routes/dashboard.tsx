import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { WorkflowMap } from "@/components/setu/workflow-map";
import { ScoreRing, StatTile, TonePill } from "@/components/setu/primitives";
import {
  activity,
  coordinatorStats,
  readiness,
  readinessTrend,
  spring,
} from "@/lib/setu-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Coordinator Dashboard — Setu" },
      {
        name: "description",
        content:
          "A single view of your AICTE application: readiness score, open findings, the twelve-stage approval workflow and recent AI activity.",
      },
      { property: "og:title", content: "Coordinator Dashboard — Setu" },
      {
        property: "og:description",
        content: "See exactly where your approval stands and what to fix next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CoordinatorDashboard,
});

function CoordinatorDashboard() {
  return (
    <DashboardShell persona="coordinator">
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {coordinatorStats.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} delta={s.delta} tone={s.tone} />
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <h2 className="text-sm font-medium">Readiness trend</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Score rose as findings were closed. {readiness.note}
                </p>
              </div>
              <ScoreRing score={readiness.score} />
            </div>

            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={readinessTrend} margin={{ left: -24, right: 4, top: 4 }}>
                  <defs>
                    <linearGradient id="setuScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <RTooltip
                    cursor={{ stroke: "var(--color-border)" }}
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fill="url(#setuScore)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {readiness.metrics.map((m) => (
                <TonePill key={m.label} tone="neutral">
                  {m.label} · {m.value}%
                </TonePill>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <WorkflowMap />
          </div>
        </section>

        <aside>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="rounded-xl border border-border bg-card p-5"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> Next best action
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              Upload the signed faculty declaration. The pre-audit reruns automatically and should
              lift readiness to ~94%.
            </p>
            <Link
              to="/vault"
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-primary transition-opacity hover:opacity-80"
            >
              Open Compliance Vault <ArrowUpRight className="size-3.5" />
            </Link>
          </motion.div>

          <p className="mt-10 text-xs tracking-widest text-muted-foreground uppercase">Activity</p>
          <ul className="mt-5">
            {activity.map((a, i) => (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.04 * i }}
                className="flex gap-3 border-b border-border py-3.5 last:border-0"
              >
                <span
                  className={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                    a.tone === "ok"
                      ? "bg-ok"
                      : a.tone === "warn"
                        ? "bg-warn"
                        : a.tone === "risk"
                          ? "bg-risk"
                          : "bg-border"
                  }`}
                />
                <div>
                  <p className="text-sm leading-snug">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </aside>
      </div>
    </DashboardShell>
  );
}
