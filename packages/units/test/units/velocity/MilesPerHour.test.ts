import { MilesPerHour } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("MilesPerHour", () => {
  const v = 60;
  const u = MilesPerHour.fromMilesPerHour(v);

  it("round-trips", () => {
    expectClose(u.toMetersPerSecond().toMilesPerHour().value, v);
    expectClose(u.toKnots().toMilesPerHour().value, v);
    expectClose(u.toFeetPerSecond().toMilesPerHour().value, v);
    expectClose(u.toKilometersPerHour().toMilesPerHour().value, v);
    expectClose(u.toFeetPerMinute().toMilesPerHour().value, v);
  });
});
