import { CubicFeet } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("CubicFeet", () => {
  const v = 500;
  const u = CubicFeet.fromCubicFeet(v);

  it("round-trips", () => {
    expectClose(u.toCubicMeters().toCubicFeet().value, v);
    expectClose(u.toLiters().toCubicFeet().value, v);
    expectClose(u.toUSGallons().toCubicFeet().value, v);
  });
});
