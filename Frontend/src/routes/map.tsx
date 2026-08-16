import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Filter, MapPin, Search, ShieldCheck, XCircle } from "lucide-react";
import { colleges, type College } from "@/lib/setu-data";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { getSession } from "@/lib/auth";
import "leaflet/dist/leaflet.css";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Institution Approval Map — Saarthi" },
      {
        name: "description",
        content: "Interactive GIS map of AICTE approved technical institutions across India.",
      },
    ],
  }),
  component: InstitutionMapPage,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletMap = any;

function LeafletView({
  institutions,
  selected,
  onSelect,
}: {
  institutions: College[];
  selected: College | null;
  onSelect: (college: College) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap>(null);
  const markersRef = useRef<LeafletMap[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap;
    import("leaflet").then(({ default: L }) => {
      if (cancelled || !containerRef.current) return;
      map = L.map(containerRef.current, { center: [22.5, 79], zoom: 5, minZoom: 4, maxZoom: 14 });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      mapRef.current = map;
      setReady(true);
    });
    return () => {
      cancelled = true;
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    import("leaflet").then(({ default: L }) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      institutions.forEach((college) => {
        const isApproved = college.status === "approved";
        const color = isApproved ? "#087F5B" : "#C68A24";
        const icon = L.divIcon({
          className: "custom-map-marker",
          html: `<div style="background-color:${color};width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker([college.lat, college.lng], { icon }).addTo(mapRef.current);
        marker.on("click", () => onSelect(college));
        markersRef.current.push(marker);
      });

      if (selected && mapRef.current) {
        mapRef.current.setView([selected.lat, selected.lng], 8, { animate: true });
      }
    });
  }, [ready, institutions, selected, onSelect]);

  return <div ref={containerRef} className="size-full" />;
}

function InstitutionMapPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All states");
  const [status, setStatus] = useState("All statuses");
  const [selected, setSelected] = useState<College | null>(null);

  // Get the current user session so we know which sidebar to show
  const session = getSession();
  const persona = session?.role === "Institute" ? "coordinator" : "officer";

  const states = useMemo(
    () => ["All states", ...Array.from(new Set(colleges.map((c) => c.state))).sort()],
    []
  );

  const filtered = colleges.filter((c) => {
    const matchesQuery = `${c.name} ${c.city} ${c.course}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesState = state === "All states" || c.state === state;
    const matchesStatus =
      status === "All statuses" ||
      (status === "Approved" ? c.status === "approved" : c.status === "conditional");
    return matchesQuery && matchesState && matchesStatus;
  });

  return (
    <DashboardShell persona={persona}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              National GIS Registry
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Explore Approved Technical Institutions
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Click an institution pin to inspect AI readiness score, course details, and accreditation records.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
          {/* Controls Sidebar */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2">
              <Search className="size-4 text-muted-subtle" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search institution..."
                className="w-full bg-transparent text-xs outline-none"
              />
            </div>

            <div className="grid gap-3">
              <label className="text-xs font-semibold text-foreground">
                Filter by State
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none"
                >
                  {states.map((s, index) => (
                    <option key={s || `state-${index}`}>{s}</option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-semibold text-foreground">
                Approval Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none"
                >
                  <option>All statuses</option>
                  <option>Approved</option>
                  <option>Conditional</option>
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs font-medium text-muted-foreground">
                {filtered.length} Institutions Found
              </span>
              <Filter className="size-3.5 text-muted-subtle" />
            </div>

            <div className="max-h-[460px] space-y-2 overflow-y-auto pr-1">
              {filtered.map((college, index) => {
                const isSelected = selected?.id === college.id;
                return (
                  <button
                    key={college.id || `college-${index}`}
                    onClick={() => setSelected(college)}
                    className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary-light/60 shadow-sm"
                        : "border-border bg-card hover:border-primary/30 hover:bg-primary-subtle/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-foreground">{college.name}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {college.city}, {college.state}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          college.status === "approved"
                            ? "text-ok-foreground"
                            : "text-warn-foreground"
                        }`}
                      >
                        {college.score}%
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-medium text-primary line-clamp-1">
                      {college.course} · {college.approvalYear}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Map Container */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="h-[600px] w-full">
              <LeafletView institutions={filtered} selected={selected} onSelect={setSelected} />
            </div>
          </section>
        </div>

        {/* Selected Institution Drawer / Detail Panel */}
        {selected && (
          <section className="mt-6 rounded-2xl border border-primary/20 bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                  Selected Institution Record
                </span>
                <h2 className="mt-1 text-xl font-bold text-foreground">{selected.name}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {selected.course} · Intake {selected.intake} · {selected.city}, {selected.state}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                <span className="text-xs font-semibold text-muted-foreground">Approval Status</span>
                <strong className="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-foreground">
                  {selected.status === "approved" ? (
                    <CheckCircle2 className="size-4 text-ok-foreground stroke-[3]" />
                  ) : (
                    <ShieldCheck className="size-4 text-warn-foreground" />
                  )}
                  {selected.status === "approved" ? "Approved" : "Conditional"}
                </strong>
              </div>

              <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                <span className="text-xs font-semibold text-muted-foreground">AI Readiness Score</span>
                <strong className="mt-1.5 block text-2xl font-extrabold text-primary">
                  {selected.score}%
                </strong>
              </div>

              <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                <span className="text-xs font-semibold text-muted-foreground">Approval Cycle</span>
                <strong className="mt-1.5 block text-sm font-bold text-foreground">
                  {selected.approvalYear}
                </strong>
              </div>

              <div className="rounded-xl border border-border bg-primary-subtle/30 p-4">
                <span className="text-xs font-semibold text-muted-foreground">GIS Coordinates</span>
                <strong className="mt-1.5 flex items-center gap-1 text-xs font-mono font-bold text-foreground">
                  <MapPin className="size-3.5 text-primary" /> {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
                </strong>
              </div>
            </div>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}