import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["**/constants.ts"],
      thresholds: {
        statements: 70,
        lines: 70,
        branches: 70,
        functions: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@flight-sim/simulator": path.resolve(dirname, "src/index.ts"),
    },
  },
});
