import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
  plugins: [pluginChecker({ typescript: true })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.tsx",
    coverage: {
      provider: "v8", // or 'v8'
    },
  },
});
