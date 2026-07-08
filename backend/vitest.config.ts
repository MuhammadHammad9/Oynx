import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Exclude Playwright E2E specs — those run via `npm run test:e2e`.
    exclude: ["tests/e2e/**", "node_modules/**"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

