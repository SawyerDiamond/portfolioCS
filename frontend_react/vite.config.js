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
    "process.env.REACT_APP_SANITY_PROJECT_ID": JSON.stringify(
      process.env.REACT_APP_SANITY_PROJECT_ID
    ),
    "process.env.REACT_APP_SANITY_TOKEN": JSON.stringify(
      process.env.REACT_APP_SANITY_TOKEN
    ),
  },
});
