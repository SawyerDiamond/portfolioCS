import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  base: "./",
  plugins: [react()],
  esbuild: {
    loader: "jsx",
  },
  define: {
    "import.meta.env.VITE_SANITY_PROJECT_ID": JSON.stringify("295d7tee"),
    "import.meta.env.VITE_SANITY_TOKEN": JSON.stringify(
      process.env.VITE_SANITY_TOKEN
    ),
  },
});
