import { Feet } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Feet", () => {
  const feet = 123.456;
  const f = Feet.fromFeet(feet);

  it("round-trips through every other length unit", () => {
    expectClose(f.toMeters().toFeet().value, feet);
    expectClose(f.toInches().toFeet().value, feet);
    expectClose(f.toKilometers().toFeet().value, feet);
    expectClose(f.toNauticalMiles().toFeet().value, feet);
  });

  it("static factories", () => {
    expectClose(Feet.fromMeters(f.toMeters().value).value, feet);
    expectClose(Feet.fromInches(f.toInches().value).value, feet);
    expectClose(Feet.fromKilometers(f.toKilometers().value).value, feet);
    expectClose(Feet.fromNauticalMiles(f.toNauticalMiles().value).value, feet);
  });

  it("toString and getStringUnits", () => {
    expect(f.getStringUnits()).toBe("ft");
    expect(f.toString()).toContain("ft");
  });

  it("handles zero and negative", () => {
    expectClose(Feet.fromFeet(0).toMeters().value, 0);
    expectClose(Feet.fromFeet(-10).toMeters().toFeet().value, -10);
  });
});
