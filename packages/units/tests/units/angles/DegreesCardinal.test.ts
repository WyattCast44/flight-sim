import { DegreesCardinal } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("DegreesCardinal", () => {
  it("normalizes to 1–360", () => {
    expect(DegreesCardinal.fromDegreesCardinal(370).value).toBe(10);
    expect(DegreesCardinal.fromDegreesCardinal(-10).value).toBe(350);
    expect(DegreesCardinal.fromDegreesCardinal(0).value).toBe(360);
  });

  it("round-trips", () => {
    const u = DegreesCardinal.fromDegreesCardinal(45);
    expectClose(u.toRadians().toDegreesCardinal().value, 45);
    expectClose(u.toDegrees().toDegreesCardinal().value, 45);
    expectClose(u.toBearing().toDegreesCardinal().value, 45);
  });
});
