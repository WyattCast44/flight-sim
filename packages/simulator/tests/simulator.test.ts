import { describe, expect, it } from "vitest";
import { SIMULATOR_PACKAGE_VERSION } from "@flight-sim/simulator";

describe("@flight-sim/simulator", () => {
  it("exports a version string", () => {
    expect(SIMULATOR_PACKAGE_VERSION).toBe("0.1.0");
  });
});
