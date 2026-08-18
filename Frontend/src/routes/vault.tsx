import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  UploadCloud,
  FileCheck,
  AlertTriangle,
  Sparkles,
  Download,
  Eye,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { MetricRow, TonePill } from "@/components/setu/primitives";
import { goldenRecord, type Tone } from "@/lib/setu-data";
import { ProtectedRoute } from "@/components/setu/protected-route";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Compliance Vault — Saarthi" },
      {
        name: "description",
        content:
          "Upload land documents, occupancy certificates, AICTE approved land use certificates, and faculty declarations once for all regulatory bodies.",
      },
    ],
  }),
  component: VaultPage,
});

type DocStatus = "verified" | "ocr_passed" | "needs_update";

type DocItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  updated: string;
  status: DocStatus;
  ocrConfidence: string;
};

const initialDocs: DocItem[] = [
  {
    id: "doc-1",
    name: "AICTE Land Use Certificate (Signed).pdf",
    category: "Land & Infrastructure",
    size: "4.2 MB",
    updated: "12 Feb 2026",
    status: "verified",
    ocrConfidence: "99 font match",
  },
  {
    id: "doc-2",
    name: "Building Occupancy Safety Proof 2026.pdf",
    category: "Safety & Compliance",
    size: "8.1 MB",
    updated: "10 Feb 2026",
    status: "verified",
    ocrConfidence: "100% seal match",
  },
  {
    id: "doc-3",
    name: "Faculty Master Declaration Cycle 2026-27.pdf",
    category: "Faculty & Staff",
    size: "2.4 MB",
    updated: "04 Feb 2026",
    status: "needs_update",
    ocrConfidence: "Signature missing on P.4",
  },
  {
    id: "doc-4",
    name: "Computer Center Hardware & Bandwidth Audit.pdf",
    category: "Labs & Equipment",
    size: "5.7 MB",
    updated: "28 Jan 2026",
    status: "ocr_passed",
    ocrConfidence: "98% spec match",
  },
];

function VaultPage() {
  const [docs, setDocs] = useState<DocItem[]>(initialDocs);

  const handleSimulatedUpload = () => {
    toast.success("Simulating OCR document processing & hash generation...");
    setTimeout(() => {
      const newDoc: DocItem = {
        id: `doc-${Date.now()}`,
        name: "Uploaded_Institutional_Proof.pdf",
        category: "General Compliance",
        size: "3.5 MB",
        updated: "Just now",
        status: "verified",
        ocrConfidence: "100% OCR verified",
      };
      setDocs((prev) => [newDoc, ...prev]);
      toast.success("Document verified! Added to Golden Record.");
    }, 1200);
  };

  return (
    <ProtectedRoute allowedRoles={["institut"]}>
      <DashboardShell persona="coordinator">
      <div className="space-y-8">
        {/* Header Summary */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                  <Lock className="size-3.5" /> Golden Record Master Vault
                </span>
                <span className="rounded-full bg-primary-subtle px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                  AICTE ● ─── ● NBA ● ─── ● NAAC
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Institutional Golden Record Vault
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                One verified document vault for AICTE, NBA, and NAAC accreditation submissions.
              </p>
            </div>

            <Button
              onClick={handleSimulatedUpload}
              className="gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark"
            >
              <UploadCloud className="size-4" />
              Upload New Document
            </Button>
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onClick={handleSimulatedUpload}
          className="group cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-primary-subtle/30 p-8 text-center transition-all hover:border-primary hover:bg-primary-subtle/60"
        >
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary text-white shadow-sm transition-transform group-hover:scale-105">
            <UploadCloud className="size-6" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-foreground">
            Drop your compliance documents here or click to browse
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Supports PDF, DWG, and PNG files up to 25MB · Instant AI OCR & digital signature validation
          </p>
        </div>

        {/* Golden Record Data Table & Side Panel */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Master Documents Table */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Uploaded Compliance Documents ({docs.length})
              </h3>
              <span className="text-xs text-muted-subtle">Auto-hashed SHA-256</span>
            </div>

            <div className="mt-4 divide-y divide-border overflow-x-auto">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-light text-primary font-bold text-xs">
                      PDF
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-foreground">{doc.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {doc.category} · {doc.size} · Updated {doc.updated}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <TonePill
                      tone={
                        doc.status === "verified"
                          ? "ok"
                          : doc.status === "ocr_passed"
                            ? "neutral"
                            : "warn"
                      }
                    >
                      {doc.ocrConfidence}
                    </TonePill>
                    <button
                      onClick={() => toast.info(`Viewing preview of ${doc.name}`)}
                      className="grid size-8 place-items-center rounded-lg border border-border p-1 text-muted-foreground hover:bg-muted"
                    >
                      <Eye className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Deficiency Translator Side Panel */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <Sparkles className="size-4 text-primary" />
              <h3 className="text-sm font-bold tracking-tight text-foreground">
                Golden Record Parameters
              </h3>
            </div>

            <div className="mt-4 space-y-2">
              {goldenRecord.map((g) => (
                <MetricRow key={g.label} label={g.label} value={g.value} tone={g.tone} />
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-primary-subtle p-4 border border-primary/20">
              <p className="text-xs font-bold text-primary">AI Deficiency Translator</p>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                "Faculty declaration requires a physical seal on Page 4 to satisfy AICTE Chapter 2 checklist."
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
    </ProtectedRoute>
  );
}
