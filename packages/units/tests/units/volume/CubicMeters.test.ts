import { CubicMeters } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("CubicMeters", () => {
  const v = 2;
  const u = CubicMeters.fromCubicMeters(v);

  it("round-trips", () => {
    expectClose(u.toLiters().toCubicMeters().value, v);
    expectClose(u.toUSGallons().toCubicMeters().value, v);
    expectClose(u.toCubicFeet().toCubicMeters().value, v);
  });
});
