import { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  FileText,
  Activity,
} from "lucide-react";
import { spring } from "@/lib/setu-data";
import { SaarthiLogoMark } from "@/components/setu/saarthi-logo";

type NodeItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Building2;
  status: "verified" | "active" | "pending";
  tag: string;
};

const leftNodes: NodeItem[] = [
  {
    id: "institution",
    title: "Institution",
    subtitle: "Bhilai Inst. of Engg",
    icon: Building2,
    status: "verified",
    tag: "AISHE Verified",
  },
  {
    id: "compliance",
    title: "Compliance Vault",
    subtitle: "Golden Record Master",
    icon: ShieldCheck,
    status: "verified",
    tag: "14 Docs Verified",
  },
  {
    id: "scrutiny",
    title: "AI Pre-Scrutiny",
    subtitle: "OCR & Vision Audit",
    icon: Sparkles,
    status: "active",
    tag: "94% Confidence",
  },
];

const rightNodes: NodeItem[] = [
  {
    id: "review",
    title: "Expert Review",
    subtitle: "Visiting Committee",
    icon: Users,
    status: "active",
    tag: "Matched 92%",
  },
  {
    id: "approval",
    title: "AICTE Approval",
    subtitle: "Statutory Decision",
    icon: CheckCircle2,
    status: "pending",
    tag: "Cycle 2026–27",
  },
  {
    id: "public",
    title: "Public Record",
    subtitle: "Instant Verification",
    icon: FileText,
    status: "verified",
    tag: "Public Proof",
  },
];

export function SaarthiApprovalNetwork() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full rounded-3xl border border-primary/20 bg-card p-5 shadow-sm overflow-hidden bg-setu-grid">
      {/* Background radial gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(8, 127, 91, 0.15), transparent 70%)",
        }}
      />

      {/* Header Banner */}
      <div className="relative z-10 flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-extrabold tracking-wider text-primary uppercase">
            SAARTHI APPROVAL NETWORK VISUALIZER
          </span>
        </div>
        <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-[10px] font-semibold text-primary">
          Tri-Regulatory Ecosystem
        </span>
      </div>

      {/* Main 3-Column Neat Grid Composition */}
      <div className="relative z-10 my-4 grid grid-cols-12 items-center gap-3 py-2">
        {/* SVG Connector Overlay Lines */}
        <svg className="pointer-events-none absolute inset-0 size-full">
          <line
            x1="32%"
            y1="20%"
            x2="50%"
            y2="50%"
            stroke="#087F5B"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            className="animate-flow-line"
          />
          <line
            x1="32%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="#087F5B"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            className="animate-flow-line"
          />
          <line
            x1="32%"
            y1="80%"
            x2="50%"
            y2="50%"
            stroke="#087F5B"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            className="animate-flow-line"
          />

          <line
            x1="50%"
            y1="50%"
            x2="68%"
            y2="20%"
            stroke="#087F5B"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            className="animate-flow-line"
          />
          <line
            x1="50%"
            y1="50%"
            x2="68%"
            y2="50%"
            stroke="#087F5B"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            className="animate-flow-line"
          />
          <line
            x1="50%"
            y1="50%"
            x2="68%"
            y2="80%"
            stroke="#087F5B"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            className="animate-flow-line"
          />
        </svg>

        {/* LEFT COLUMN: 3 Stacked Nodes */}
        <div className="col-span-4 space-y-3">
          {leftNodes.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative rounded-2xl border p-3 transition-all ${
                  isHovered
                    ? "border-primary bg-primary-light/80 shadow-md scale-[1.02]"
                    : "border-border bg-card shadow-sm hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-xl transition-colors ${
                      node.status === "verified"
                        ? "bg-primary text-white"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-foreground">{node.title}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{node.subtitle}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-1.5 text-[9px] font-semibold text-primary">
                  <span>{node.tag}</span>
                  <span className="size-1.5 rounded-full bg-primary" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER COLUMN: Central Saarthi Engine Hub Node */}
        <div className="col-span-4 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ ...spring, repeat: Infinity, repeatType: "reverse", duration: 3.5 }}
            className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-primary bg-primary p-4 shadow-lg text-white"
          >
            <SaarthiLogoMark className="size-10 stroke-white text-white" />
            <span className="mt-2 text-xs font-extrabold tracking-tight">Saarthi Engine</span>
            <span className="text-[10px] font-medium text-white/80">Central Hub</span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3 Stacked Nodes */}
        <div className="col-span-4 space-y-3">
          {rightNodes.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative rounded-2xl border p-3 transition-all ${
                  isHovered
                    ? "border-primary bg-primary-light/80 shadow-md scale-[1.02]"
                    : "border-border bg-card shadow-sm hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-xl transition-colors ${
                      node.status === "verified"
                        ? "bg-primary text-white"
                        : node.status === "active"
                          ? "bg-primary-light text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-foreground">{node.title}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{node.subtitle}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-1.5 text-[9px] font-semibold text-primary">
                  <span>{node.tag}</span>
                  <span className="size-1.5 rounded-full bg-primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="relative z-10 flex items-center justify-between rounded-xl border border-primary/20 bg-primary-subtle p-2.5 text-xs">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Activity className="size-3.5 text-primary" />
          <span className="text-[11px]">Real-time Data Flow across AICTE, NBA & NAAC</span>
        </div>
        <span className="text-[10px] font-bold text-primary">Immutable Audit Trail</span>
      </div>
    </div>
  );
}
