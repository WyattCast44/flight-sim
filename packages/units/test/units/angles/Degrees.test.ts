import { Degrees } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Degrees", () => {
  const v = -30;
  const u = Degrees.fromDegrees(v);

  it("round-trips", () => {
    expectClose(u.toRadians().toDegrees().value, v);
    expectClose(u.toDegreesCardinal().toDegrees().value, v);
    expectClose(u.toBearing().toDegrees().value, v);
  });
});
