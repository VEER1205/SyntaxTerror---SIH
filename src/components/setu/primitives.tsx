import { motion } from "motion/react";
import type { ReactNode } from "react";
import { spring, type Tone } from "@/lib/setu-data";

const toneText: Record<Tone, string> = {
  ok: "text-ok-foreground",
  warn: "text-warn-foreground",
  risk: "text-risk-foreground",
  neutral: "text-muted-foreground",
};

const toneSoft: Record<Tone, string> = {
  ok: "bg-ok-soft text-ok-foreground",
  warn: "bg-warn-soft text-warn-foreground",
  risk: "bg-risk-soft text-risk-foreground",
  neutral: "bg-muted text-muted-foreground",
};

export function TonePill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ${toneSoft[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  delta,
  tone = "neutral",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: Tone;
}) {
  return (
    <div className="bg-card px-6 py-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-medium tracking-tight">{value}</p>
      {delta && <p className={`mt-1.5 text-[11px] ${toneText[tone]}`}>{delta}</p>}
    </div>
  );
}

/** Calm progress ring — a thin arc, no gradient, no fill. */
export function ScoreRing({ score }: { score: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 104 104" className="size-full -rotate-90">
        <circle cx="52" cy="52" r={r} fill="none" strokeWidth="3" className="stroke-muted" />
        <motion.circle
          cx="52"
          cy="52"
          r={r}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (score / 100) * c }}
          transition={{ ...spring, damping: 34 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-xl font-medium tracking-tight">{score}</span>
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
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm ${tone === "neutral" ? "" : toneText[tone]}`}>{value}</span>
    </div>
  );
}
