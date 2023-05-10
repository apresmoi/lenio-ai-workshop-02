import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "service-worker/index.ts"),
      name: "ServiceWorker",
      fileName: "service-worker",
      formats: ["es"],
    },
    rollupOptions: {},
  },
  mode: "production",
});
