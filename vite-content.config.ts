import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "content/index.ts"),
      name: "ContentScript",
      fileName: "content",
      formats: ["es"],
    },
    rollupOptions: {},
  },
  mode: "production",
});
