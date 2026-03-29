import { FeetPerSecondSquared } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("FeetPerSecondSquared", () => {
  const v = 32.174;
  const u = FeetPerSecondSquared.fromFeetPerSecondSquared(v);

  it("round-trips", () => {
    expectClose(u.toMetersPerSecondSquared().toFeetPerSecondSquared().value, v);
  });
});
