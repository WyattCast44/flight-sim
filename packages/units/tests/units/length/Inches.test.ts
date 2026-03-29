import { Inches } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Inches", () => {
  const inches = 72;
  const u = Inches.fromInches(inches);

  it("round-trips", () => {
    expectClose(u.toFeet().toInches().value, inches);
    expectClose(u.toMeters().toInches().value, inches);
    expectClose(u.toKilometers().toInches().value, inches);
    expectClose(u.toNauticalMiles().toInches().value, inches);
  });

  it("static factories", () => {
    expectClose(Inches.fromMeters(u.toMeters().value).value, inches);
    expectClose(Inches.fromFeet(u.toFeet().value).value, inches);
    expectClose(Inches.fromKilometers(u.toKilometers().value).value, inches);
    expectClose(Inches.fromNauticalMiles(u.toNauticalMiles().value).value, inches);
  });

  it("strings", () => {
    expect(u.getStringUnits()).toBe("in");
  });
});
