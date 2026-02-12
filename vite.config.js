import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/portfolioCS/",
  plugins: [react()],
  esbuild: {
    loader: "jsx",
  },
});
