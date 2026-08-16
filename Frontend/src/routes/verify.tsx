import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Search,
  Building2,
  Calendar,
  Award,
} from "lucide-react";
import { colleges, goldenRecord, type College } from "@/lib/setu-data";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Public Course Verification — Saarthi" },
      {
        name: "description",
        content:
          "Public verification tool: search any technical course in India and see its approval record, sanctioned intake and compliance history.",
      },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const [selectedCollege, setSelectedCollege] = useState<College>(colleges[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-foreground">
            <ArrowLeft className="size-4 text-primary" /> Back to Saarthi Portal
          </Link>
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">Public Approval Verification</p>
            <p className="text-xs text-muted-foreground">AICTE Public Records & Course Authenticity</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            Instant Public Proof
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Verify Course Approval & Compliance
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Search any AICTE approved course, sanctioned intake capacity, and historical accreditation record.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="mb-10 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3">
            <Search className="size-5 text-primary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Institution name, course (e.g. B.Tech Computer Engg), or city..."
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-subtle"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
          {/* Institutions List */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase pb-2 border-b border-border">
              Approved Institutions ({filteredColleges.length})
            </h3>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredColleges.map((c) => {
                const isSelected = c.id === selectedCollege.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCollege(c)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary-light/60 shadow-sm"
                        : "border-border bg-card hover:border-primary/30 hover:bg-primary-subtle/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground truncate">{c.name}</span>
                      <span
                        className={`text-[10px] font-bold ${
                          c.status === "approved" ? "text-ok-foreground" : "text-warn-foreground"
                        }`}
                      >
                        {c.score}% Score
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{c.city}, {c.state}</p>
                    <p className="mt-1.5 text-xs font-medium text-primary line-clamp-1">{c.course}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Record Certificate Detail */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/20 bg-card p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-3 py-1 text-xs font-bold text-ok-foreground">
                      <CheckCircle2 className="size-4 stroke-[3]" /> Verified AICTE Record
                    </span>
                    <span className="text-xs font-medium text-muted-subtle">
                      Cycle: {selectedCollege.approvalYear}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                    {selectedCollege.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedCollege.city}, {selectedCollege.state} · Established {selectedCollege.since}
                  </p>
                </div>

                <div className="rounded-2xl bg-primary-light p-4 text-center">
                  <span className="block text-3xl font-extrabold text-primary">{selectedCollege.score}%</span>
                  <span className="block text-[10px] font-bold text-primary uppercase">Readiness Rating</span>
                </div>
              </div>

              {/* Course & Accreditation Details Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <GraduationCap className="size-4 text-primary" /> Approved Program
                  </span>
                  <p className="mt-2 text-sm font-bold text-foreground">{selectedCollege.course}</p>
                </div>

                <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Calendar className="size-4 text-primary" /> Sanctioned Intake
                  </span>
                  <p className="mt-2 text-sm font-bold text-foreground">{selectedCollege.intake}</p>
                </div>

                <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Award className="size-4 text-primary" /> Accreditations
                  </span>
                  <p className="mt-2 text-sm font-bold text-foreground">{selectedCollege.accreditation}</p>
                </div>
              </div>

              {/* Golden Compliance Record Subtable */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-foreground">Golden Record Verification History</h3>
                <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-background p-4">
                  {goldenRecord.slice(0, 4).map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-semibold text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
