import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// @ts-ignore - leaflet.heat is a vanilla JS plugin that attaches to L
import "leaflet.heat";

interface HeatmapLayerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function HeatmapLayer({ data }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!data || !data.features || data.features.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const points = data.features.map((feature: any) => {
      const [lon, lat] = feature.geometry.coordinates;
      const intensity = (feature.properties.approval_score || 50) / 100; 
      return [lat, lon, intensity];
    });

    // @ts-expect-error - leaflet.heat adds this dynamically to L
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 12,
      minOpacity: 0.3,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1.0: 'red' }, 
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
}