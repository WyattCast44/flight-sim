import { FeetPerSecond } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("FeetPerSecond", () => {
  const v = 100;
  const u = FeetPerSecond.fromFeetPerSecond(v);

  it("round-trips", () => {
    expectClose(u.toMetersPerSecond().toFeetPerSecond().value, v);
    expectClose(u.toKnots().toFeetPerSecond().value, v);
    expectClose(u.toMilesPerHour().toFeetPerSecond().value, v);
    expectClose(u.toKilometersPerHour().toFeetPerSecond().value, v);
    expectClose(u.toFeetPerMinute().toFeetPerSecond().value, v);
  });
});
