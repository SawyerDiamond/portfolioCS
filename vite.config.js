import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  esbuild: {
    loader: "jsx",
  },
  resolve: {
    alias: {
      // shadcn-installed components (the @shaders registry) import via "@/…";
      // keep this in sync with the paths entry in jsconfig.json.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
