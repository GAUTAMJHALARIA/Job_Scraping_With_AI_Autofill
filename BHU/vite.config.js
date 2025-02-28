import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Backend server URL
        changeOrigin: true,
        secure: false, // Set to true if backend uses HTTPS
      },
    },
    hmr: {
      overlay: false, // Disable error overlay to avoid infinite reload loops
    },
  },
  build: {
    minify: false, // Prevent minification to make debugging easier
    sourcemap: true, // Enable source maps for debugging
  },
  plugins: [react(), crx({ manifest })],
});













// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { crx } from "@crxjs/vite-plugin";
// import manifest from "./public/manifest.json";

// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:3000", // Backend server URL
//         changeOrigin: true,
//         secure: false, // Allow HTTP (if backend isn't using HTTPS)
//       },
//     },
//   },
//   plugins: [react(), crx({ manifest })],
// });
