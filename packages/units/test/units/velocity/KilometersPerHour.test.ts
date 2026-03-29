import { KilometersPerHour } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("KilometersPerHour", () => {
  const v = 100;
  const u = KilometersPerHour.fromKilometersPerHour(v);

  it("round-trips", () => {
    expectClose(u.toMetersPerSecond().toKilometersPerHour().value, v);
    expectClose(u.toKnots().toKilometersPerHour().value, v);
    expectClose(u.toMilesPerHour().toKilometersPerHour().value, v);
    expectClose(u.toFeetPerSecond().toKilometersPerHour().value, v);
    expectClose(u.toFeetPerMinute().toKilometersPerHour().value, v);
  });
});
