import { zeroPositionMeters } from "@flight-sim/environment";
import { describe, expect, it } from "vitest";

describe("@flight-sim/environment", () => {
  it("exports zero position in meters via units and math", () => {
    const v = zeroPositionMeters();

    expect(v.x.value).toBe(0);
    expect(v.y.value).toBe(0);
    expect(v.z.value).toBe(0);
  });
});
