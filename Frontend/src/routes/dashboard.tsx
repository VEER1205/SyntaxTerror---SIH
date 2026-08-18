import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { DashboardShell } from "@/components/setu/dashboard-shell";
import { ProtectedRoute } from "@/components/setu/protected-route";
import { fetchFromAPI } from "@/lib/api";

// ── NOTE: No top-level Leaflet/react-leaflet imports here!
// Leaflet accesses `window` at module init time which crashes SSR.
// All Leaflet code is loaded dynamically inside useEffect (client-only).

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Institution Dashboard — Saarthi" },
      {
        name: "description",
        content: "AICTE regional institution heatmap and approval overview for institution coordinators.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["institut"]}>
      <DashboardShell persona="coordinator">
        <DashboardMap />
      </DashboardShell>
    </ProtectedRoute>
  );
}

function DashboardMap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  // Fetch heatmap data from backend
  useEffect(() => {
    fetchFromAPI("/public/heatmap?state=Maharashtra")
      .then((data) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch map data:", err);
        setFetchError("Could not load heatmap data. Please ensure the backend is running.");
        setLoading(false);
      });
  }, []);

  // Dynamically load Leaflet only on the client (SSR-safe)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("leaflet").then(async ({ default: L }: any) => {
      if (cancelled || !containerRef.current) return;

      // Fix default marker icons in Vite
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [19.1075, 72.8374],
        zoom: 11,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add markers when both map and data are ready
  useEffect(() => {
    if (!mapRef.current || !geoData?.features) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("leaflet").then(({ default: L }: any) => {
      if (!mapRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geoData.features.forEach((feature: any) => {
        const [lon, lat] = feature.geometry.coordinates;
        const score = feature.properties?.approval_score ?? 0;
        const color = score > 75 ? "#087F5B" : "#C68A24";

        const icon = L.divIcon({
          className: "custom-map-marker",
          html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,.35);"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([lat, lon], { icon })
          .bindPopup(`
            <div style="font-family:sans-serif;padding:4px">
              <strong style="font-size:13px">${feature.properties.name || "Unknown Institute"}</strong>
              <p style="font-size:11px;color:#666;margin:4px 0">ID: ${feature.properties.institute_id}</p>
              <div style="display:flex;justify-content:space-between;background:#f4f4f4;padding:6px;border-radius:6px">
                <span style="font-size:11px;font-weight:600">Approval Score</span>
                <span style="font-size:11px;font-weight:700;color:${color}">${score}%</span>
              </div>
            </div>
          `)
          .addTo(mapRef.current);
      });
    });
  }, [geoData]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          AICTE Regional Audit Heatmap
        </h2>
        {loading && (
          <span className="text-sm text-muted-foreground animate-pulse">Fetching latest data…</span>
        )}
      </div>

      {fetchError && (
        <div className="rounded-xl border border-risk/30 bg-risk-soft px-4 py-3 text-xs text-risk-foreground">
          {fetchError}
        </div>
      )}

      {/* Leaflet CSS loaded inline to avoid SSR issues */}
      <style>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
      `}</style>

      <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-border">
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </div>
  );
}