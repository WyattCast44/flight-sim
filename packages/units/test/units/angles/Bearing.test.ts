import { Bearing, DegreesCardinal } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Bearing", () => {
  it("preserves raw value", () => {
    const b = Bearing.fromBearing(390.5);
    expect(b.value).toBe(390.5);
    expectClose(b.toDegreesCardinal().value, 30.5);
  });

  it("round-trips direction", () => {
    const b = Bearing.fromBearing(1234);
    expectClose(b.toRadians().toBearing().toDegreesCardinal().value, b.toDegreesCardinal().value);
  });

  it("toDegreesCardinal matches cardinal of principal direction", () => {
    const c = Bearing.fromBearing(450).toDegreesCardinal();
    expect(c).toBeInstanceOf(DegreesCardinal);
    expectClose(c.value, 90);
  });
});
