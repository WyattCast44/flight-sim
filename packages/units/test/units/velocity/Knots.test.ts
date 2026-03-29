import { Knots } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Knots", () => {
  const v = 250;
  const u = Knots.fromKnots(v);

  it("round-trips", () => {
    expectClose(u.toMetersPerSecond().toKnots().value, v);
    expectClose(u.toFeetPerSecond().toKnots().value, v);
    expectClose(u.toMilesPerHour().toKnots().value, v);
    expectClose(u.toKilometersPerHour().toKnots().value, v);
    expectClose(u.toFeetPerMinute().toKnots().value, v);
  });
});
