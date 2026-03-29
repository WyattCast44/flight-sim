import { Radians } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Radians", () => {
  const v = 0.25;
  const u = Radians.fromRadians(v);

  it("round-trips", () => {
    expectClose(u.toDegrees().toRadians().value, v);
    expectClose(u.toDegreesCardinal().toRadians().value, v);
    expectClose(u.toBearing().toRadians().value, v);
  });
});
