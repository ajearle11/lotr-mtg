import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
  plugins: [pluginChecker({ typescript: true })],
});
