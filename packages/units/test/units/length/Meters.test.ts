import { Meters } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Meters", () => {
  const mVal = 400;
  const m = Meters.fromMeters(mVal);

  it("round-trips", () => {
    expectClose(m.toFeet().toMeters().value, mVal);
    expectClose(m.toInches().toMeters().value, mVal);
    expectClose(m.toKilometers().toMeters().value, mVal);
    expectClose(m.toNauticalMiles().toMeters().value, mVal);
  });

  it("static factories", () => {
    expectClose(Meters.fromFeet(m.toFeet().value).value, mVal);
    expectClose(Meters.fromInches(m.toInches().value).value, mVal);
    expectClose(Meters.fromNauticalMiles(m.toNauticalMiles().value).value, mVal);
    expectClose(Meters.fromKilometers(m.toKilometers().value).value, mVal);
  });

  it("strings", () => {
    expect(m.getStringUnits()).toBe("m");
    expect(m.toString()).toContain("m");
  });
});
