import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ssr: {
    // Leaflet and react-leaflet access `window` at module init time.
    // Marking them noExternal makes Vite bundle them (with tree-shaking)
    // instead of calling require() in SSR, which prevents the crash.
    // Our code also uses dynamic import("leaflet") inside useEffect,
    // so these modules are NEVER actually executed during SSR.
    noExternal: ["leaflet", "react-leaflet", "leaflet.heat"],
  },
});