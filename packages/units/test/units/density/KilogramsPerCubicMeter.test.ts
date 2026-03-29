import { KilogramsPerCubicMeter } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("KilogramsPerCubicMeter", () => {
  const v = 1.225;
  const u = KilogramsPerCubicMeter.fromKilogramsPerCubicMeter(v);

  it("round-trips", () => {
    expectClose(u.toSlugsPerCubicFoot().toKilogramsPerCubicMeter().value, v);
  });
});
