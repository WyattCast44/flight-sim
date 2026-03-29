import { Kilometers } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Kilometers", () => {
  const km = 3.5;
  const u = Kilometers.fromKilometers(km);

  it("round-trips", () => {
    expectClose(u.toFeet().toKilometers().value, km);
    expectClose(u.toMeters().toKilometers().value, km);
    expectClose(u.toInches().toKilometers().value, km);
    expectClose(u.toNauticalMiles().toKilometers().value, km);
  });

  it("static factories", () => {
    expectClose(Kilometers.fromMeters(u.toMeters().value).value, km);
    expectClose(Kilometers.fromFeet(u.toFeet().value).value, km);
    expectClose(Kilometers.fromInches(u.toInches().value).value, km);
    expectClose(Kilometers.fromNauticalMiles(u.toNauticalMiles().value).value, km);
  });

  it("strings", () => {
    expect(u.getStringUnits()).toBe("km");
  });
});
