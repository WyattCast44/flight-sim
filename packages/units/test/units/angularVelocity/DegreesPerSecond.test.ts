import { DegreesPerSecond } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("DegreesPerSecond", () => {
  const v = 45;
  const u = DegreesPerSecond.fromDegreesPerSecond(v);

  it("round-trips", () => {
    expectClose(u.toRadiansPerSecond().toDegreesPerSecond().value, v);
    expectClose(u.toRevolutionsPerMinute().toDegreesPerSecond().value, v);
  });
});
