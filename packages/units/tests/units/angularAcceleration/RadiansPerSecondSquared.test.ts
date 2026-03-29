import { RadiansPerSecondSquared } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("RadiansPerSecondSquared", () => {
  const v = 0.1;
  const u = RadiansPerSecondSquared.fromRadiansPerSecondSquared(v);

  it("round-trips", () => {
    expectClose(u.toDegreesPerSecondSquared().toRadiansPerSecondSquared().value, v);
  });
});
