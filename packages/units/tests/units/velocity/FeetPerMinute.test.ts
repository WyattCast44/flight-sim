import { FeetPerMinute } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("FeetPerMinute", () => {
  const v = 500;
  const u = FeetPerMinute.fromFeetPerMinute(v);

  it("round-trips", () => {
    expectClose(u.toMetersPerSecond().toFeetPerMinute().value, v);
    expectClose(u.toKnots().toFeetPerMinute().value, v);
    expectClose(u.toMilesPerHour().toFeetPerMinute().value, v);
    expectClose(u.toKilometersPerHour().toFeetPerMinute().value, v);
    expectClose(u.toFeetPerSecond().toFeetPerMinute().value, v);
  });
});
