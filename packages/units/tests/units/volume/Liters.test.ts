import { CubicMeters, Liters } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Liters", () => {
  const v = 100;
  const u = Liters.fromLiters(v);

  it("round-trips", () => {
    expectClose(u.toCubicMeters().toLiters().value, v);
    expectClose(u.toUSGallons().toLiters().value, v);
    expectClose(u.toCubicFeet().toLiters().value, v);
  });
});
