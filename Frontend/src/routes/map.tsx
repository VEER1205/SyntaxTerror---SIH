import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Filter, MapPin, Search, ShieldCheck, XCircle } from "lucide-react";
import { colleges, type College } from "@/lib/setu-data";
import "leaflet/dist/leaflet.css";

export const Route = createFileRoute("/map")({ component: InstitutionMapPage });

type LeafletMap = any;

function LeafletView({ institutions, selected, onSelect }: { institutions: College[]; selected: College | null; onSelect: (college: College) => void }) {
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
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
      mapRef.current = map;
      setReady(true);
    });
    return () => {
      cancelled = true;
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    import("leaflet").then(({ default: L }) => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = institutions.map((college) => {
        const color = college.status === "approved" ? "#16845c" : "#ad7a00";
        const icon = L.divIcon({ className: "setu-map-marker", html: `<div style="width:28px;height:28px;border-radius:50%;border:3px solid white;background:${color};box-shadow:0 3px 12px rgba(0,0,0,.25);display:grid;place-items:center;color:white;font-size:12px;font-weight:700">${college.status === "approved" ? "✓" : "!"}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] });
        const marker = L.marker([college.lat, college.lng], { icon }).addTo(map);
        marker.bindPopup(`<strong>${college.name}</strong><br>${college.course}<br>${college.city}, ${college.state}<br><b>AI readiness:</b> ${college.score}%<br><b>Status:</b> ${college.status === "approved" ? "Approved" : "Conditional"}`);
        marker.on("click", () => onSelect(college));
        return marker;
      });
    });
  }, [institutions, onSelect, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (map && selected) {
      map.flyTo([selected.lat, selected.lng], 11, { duration: 0.7 });
    }
  }, [selected]);

  return <div ref={containerRef} className="h-full w-full" aria-label="Interactive institution approval map" />;
}

function InstitutionMapPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All states");
  const [status, setStatus] = useState("All statuses");
  const [selected, setSelected] = useState<College | null>(null);
  const states = useMemo(() => ["All states", ...Array.from(new Set(colleges.map((c) => c.state))).sort()], []);
  const filtered = colleges.filter((c) => {
    const matchesQuery = `${c.name} ${c.city} ${c.course}`.toLowerCase().includes(query.toLowerCase());
    const matchesState = state === "All states" || c.state === state;
    const matchesStatus = status === "All statuses" || (status === "Approved" ? c.status === "approved" : c.status === "conditional");
    return matchesQuery && matchesState && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="size-4" /> Setu</Link>
          <div className="text-right"><p className="text-sm font-medium">Institution Approval Map</p><p className="text-xs text-muted-foreground">Public view · approval records and AI readiness scores</p></div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs tracking-widest text-muted-foreground uppercase">NATIONAL APPROVAL RECORD</p><h1 className="mt-2 text-2xl font-semibold tracking-tight">Explore approved institutions</h1><p className="mt-1 text-sm text-muted-foreground">Select an institution to view its approval status, course and readiness score.</p></div>
          <Link to="/verify" className="text-xs text-primary hover:underline">Open public course verification →</Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-[20rem_1fr]">
          <section className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 rounded-lg border border-input px-3 py-2"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search institution..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></div>
            <div className="mt-3 grid gap-2"><label className="text-xs text-muted-foreground">State<select value={state} onChange={(e) => setState(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-2.5 py-2 text-xs">{states.map((s) => <option key={s}>{s}</option>)}</select></label><label className="text-xs text-muted-foreground">Approval status<select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-2.5 py-2 text-xs"><option>All statuses</option><option>Approved</option><option>Conditional</option></select></label></div>
            <div className="mt-5 flex items-center justify-between"><span className="text-xs text-muted-foreground">{filtered.length} institutions</span><Filter className="size-3.5 text-muted-foreground" /></div>
            <div className="mt-3 max-h-[540px] space-y-2 overflow-auto pr-1">{filtered.map((college) => <button key={college.id} onClick={() => setSelected(college)} className={`w-full rounded-xl border p-3 text-left transition-colors ${selected?.id === college.id ? "border-primary bg-accent" : "border-border hover:bg-accent/50"}`}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium">{college.name}</p><p className="mt-1 text-xs text-muted-foreground">{college.city}, {college.state}</p></div><span className={`text-xs font-medium ${college.status === "approved" ? "text-ok-foreground" : "text-warn-foreground"}`}>{college.score}%</span></div><p className="mt-2 text-[11px] text-muted-foreground">{college.course} · {college.approvalYear}</p></button>)}</div>
          </section>
          <section className="overflow-hidden rounded-2xl border border-border bg-card"><div className="h-[610px]"><LeafletView institutions={filtered} selected={selected} onSelect={setSelected} /></div><div className="flex flex-wrap items-center gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-ok" /> Approved</span><span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-warn" /> Conditional</span><span className="ml-auto">Prototype records · not an official AICTE database</span></div></section>
        </div>
        {selected && <section className="mt-5 rounded-2xl border border-border bg-card p-6"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs tracking-widest text-muted-foreground uppercase">SELECTED INSTITUTION</p><h2 className="mt-2 text-xl font-semibold">{selected.name}</h2><p className="mt-1 text-sm text-muted-foreground">{selected.course} · Intake {selected.intake} · {selected.city}, {selected.state}</p></div><button onClick={() => setSelected(null)} className="rounded-lg border border-border p-2 text-muted-foreground"><XCircle className="size-4" /></button></div><div className="mt-5 grid gap-3 sm:grid-cols-4"><div className="rounded-xl bg-muted/50 p-4"><span className="text-xs text-muted-foreground">Approval</span><strong className="mt-1 flex items-center gap-1.5 text-sm">{selected.status === "approved" ? <CheckCircle2 className="size-4 text-ok-foreground" /> : <ShieldCheck className="size-4 text-warn-foreground" />}{selected.status === "approved" ? "Approved" : "Conditional"}</strong></div><div className="rounded-xl bg-muted/50 p-4"><span className="text-xs text-muted-foreground">AI readiness score</span><strong className="mt-1 block text-xl">{selected.score}%</strong></div><div className="rounded-xl bg-muted/50 p-4"><span className="text-xs text-muted-foreground">Approval cycle</span><strong className="mt-1 block text-sm">{selected.approvalYear}</strong></div><div className="rounded-xl bg-muted/50 p-4"><span className="text-xs text-muted-foreground">Coordinates</span><strong className="mt-1 flex items-center gap-1 text-sm"><MapPin className="size-4 text-primary" /> {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</strong></div></div></section>}
      </div>
    </main>
  );
}
