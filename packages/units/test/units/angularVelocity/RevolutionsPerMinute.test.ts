import { RevolutionsPerMinute } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("RevolutionsPerMinute", () => {
  const v = 3000;
  const u = RevolutionsPerMinute.fromRevolutionsPerMinute(v);

  it("round-trips", () => {
    expectClose(u.toRadiansPerSecond().toRevolutionsPerMinute().value, v);
    expectClose(u.toDegreesPerSecond().toRevolutionsPerMinute().value, v);
  });
});
