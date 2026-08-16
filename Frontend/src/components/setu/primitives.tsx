import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { spring, type Tone } from "@/lib/setu-data";

const toneText: Record<Tone, string> = {
  ok: "text-ok-foreground",
  warn: "text-warn-foreground",
  risk: "text-risk-foreground",
  neutral: "text-muted-foreground",
};

const toneSoft: Record<Tone, string> = {
  ok: "bg-ok-soft text-ok-foreground border-ok/20",
  warn: "bg-warn-soft text-warn-foreground border-warn/20",
  risk: "bg-risk-soft text-risk-foreground border-risk/20",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function TonePill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${toneSoft[tone]}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          tone === "ok"
            ? "bg-primary"
            : tone === "warn"
              ? "bg-warn"
              : tone === "risk"
                ? "bg-risk"
                : "bg-muted-subtle"
        }`}
      />
      {children}
    </span>
  );
}

/** Connected Node Flow Component (● ─── ● ─── ●) */
export function NodeFlowConnector({
  steps,
  currentStepIndex = 0,
}: {
  steps: string[];
  currentStepIndex?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
      {steps.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isCurrent = idx === currentStepIndex;
        return (
          <div key={step} className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span
                className={`grid size-5 place-items-center rounded-full text-[10px] font-bold transition-all ${
                  isDone
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-muted text-muted-subtle border border-border"
                }`}
              >
                {isDone ? "✓" : idx + 1}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isCurrent
                    ? "text-primary"
                    : isDone
                      ? "text-foreground"
                      : "text-muted-subtle"
                }`}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="h-0.5 w-8 rounded-full bg-border">
                <div
                  className={`h-full transition-all ${
                    idx < currentStepIndex ? "bg-primary w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StatTile({
  label,
  value,
  delta,
  tone = "neutral",
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: Tone;
  icon?: LucideIcon;
}) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        {Icon && (
          <span className="grid size-8 place-items-center rounded-xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
      {delta && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${toneSoft[tone]}`}
          >
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}

/** Reusable AI Next Best Action recommendation card with connected node pipeline badge */
export function AiRecommendationCard({
  title,
  description,
  rationale,
  actionText,
  onAction,
}: {
  title: string;
  description: string;
  rationale?: string;
  actionText?: string;
  onAction?: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-subtle via-card to-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-sm">
            <Sparkles className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider text-primary uppercase">
                ✦ AI Next Best Action
              </span>
              <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                Node: Compliance → Scrutiny
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
            {rationale && (
              <p className="mt-2.5 text-xs text-muted-subtle border-l-2 border-primary/40 pl-3 italic">
                "{rationale}"
              </p>
            )}
          </div>
        </div>
        {actionText && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98]"
          >
            {actionText}
            <ArrowUpRight className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/** Calm progress ring — emerald arc */
export function ScoreRing({ score }: { score: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 104 104" className="size-full -rotate-90">
        <circle cx="52" cy="52" r={r} fill="none" strokeWidth="6" className="stroke-muted/40" />
        <motion.circle
          cx="52"
          cy="52"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (score / 100) * c }}
          transition={{ ...spring, damping: 34 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <span className="block text-2xl font-bold tracking-tight text-foreground">{score}%</span>
          <span className="block text-[10px] font-medium text-muted-foreground uppercase">
            Score
          </span>
        </div>
      </div>
    </div>
  );
}

export function MetricRow({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: Tone;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium ${tone === "neutral" ? "text-foreground" : toneText[tone]}`}
      >
        {value}
      </span>
    </div>
  );
}
