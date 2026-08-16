import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import HeatmapLayer from "./HeatmapLayer";
import { fetchFromAPI } from "@/lib/api"; 
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet marker icons not showing up in React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function DashboardMap() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI("/api/v1/public/dashboard/heatmap?state=Maharashtra")
      .then((data) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch map data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full h-full p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          AICTE Regional Audit Heatmap
        </h2>
        {loading && <span className="text-sm text-muted-foreground animate-pulse">Fetching latest data...</span>}
      </div>

      <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-border">
        <MapContainer
          center={[19.1075, 72.8374]} // Centered on Mumbai
          zoom={11}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Render the Heatmap */}
          {geoData && <HeatmapLayer data={geoData} />}

          {/* Render Clickable Pins for every college */}
          {geoData?.features.map((feature: any, index: number) => {
            const [lon, lat] = feature.geometry.coordinates;
            return (
              <Marker key={index} position={[lat, lon]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-sm mb-1">{feature.properties.name || "Unknown Institute"}</h3>
                    <p className="text-xs text-muted-foreground mb-2">ID: {feature.properties.institute_id}</p>
                    <div className="flex justify-between items-center bg-muted p-2 rounded">
                      <span className="text-xs font-semibold">Approval Score</span>
                      <span className={`text-xs font-bold ${feature.properties.approval_score > 75 ? 'text-ok-foreground' : 'text-risk-foreground'}`}>
                        {feature.properties.approval_score}%
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}