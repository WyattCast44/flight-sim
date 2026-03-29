import { DegreesPerSecondSquared } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("DegreesPerSecondSquared", () => {
  const v = 90;
  const u = DegreesPerSecondSquared.fromDegreesPerSecondSquared(v);

  it("round-trips", () => {
    expectClose(u.toRadiansPerSecondSquared().toDegreesPerSecondSquared().value, v);
  });
});
