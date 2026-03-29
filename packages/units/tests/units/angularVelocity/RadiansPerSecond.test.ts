import { RadiansPerSecond } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("RadiansPerSecond", () => {
  const v = 0.5;
  const u = RadiansPerSecond.fromRadiansPerSecond(v);

  it("round-trips", () => {
    expectClose(u.toDegreesPerSecond().toRadiansPerSecond().value, v);
    expectClose(u.toRevolutionsPerMinute().toRadiansPerSecond().value, v);
  });
});
