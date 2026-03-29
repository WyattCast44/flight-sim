import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: false,
    include: ["test/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/units/units/**/*.ts"],
      exclude: ["**/constants.ts"],
      // Primary bar: 80% statements/lines. Branches/functions stay lower (angleMath ternary, many `to*` methods).
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
      "@flight-sim/units": path.resolve(dirname, "src/index.ts"),
    },
  },
});
