import { MetersPerSecond } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("MetersPerSecond", () => {
  const v = 55;
  const u = MetersPerSecond.fromMetersPerSecond(v);

  it("round-trips", () => {
    expectClose(u.toFeetPerSecond().toMetersPerSecond().value, v);
    expectClose(u.toKnots().toMetersPerSecond().value, v);
    expectClose(u.toMilesPerHour().toMetersPerSecond().value, v);
    expectClose(u.toKilometersPerHour().toMetersPerSecond().value, v);
    expectClose(u.toFeetPerMinute().toMetersPerSecond().value, v);
  });
});
