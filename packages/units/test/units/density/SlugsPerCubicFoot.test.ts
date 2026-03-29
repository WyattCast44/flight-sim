import { SlugsPerCubicFoot } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("SlugsPerCubicFoot", () => {
  const v = 0.002;
  const u = SlugsPerCubicFoot.fromSlugsPerCubicFoot(v);

  it("round-trips", () => {
    expectClose(u.toKilogramsPerCubicMeter().toSlugsPerCubicFoot().value, v);
  });
});
