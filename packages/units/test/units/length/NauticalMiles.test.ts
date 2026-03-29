import { NauticalMiles } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("NauticalMiles", () => {
  const nm = 2;
  const u = NauticalMiles.fromNauticalMiles(nm);

  it("round-trips", () => {
    expectClose(u.toFeet().toNauticalMiles().value, nm);
    expectClose(u.toMeters().toNauticalMiles().value, nm);
    expectClose(u.toInches().toNauticalMiles().value, nm);
    expectClose(u.toKilometers().toNauticalMiles().value, nm);
  });

  it("static factories", () => {
    expectClose(NauticalMiles.fromMeters(u.toMeters().value).value, nm);
    expectClose(NauticalMiles.fromFeet(u.toFeet().value).value, nm);
    expectClose(NauticalMiles.fromInches(u.toInches().value).value, nm);
    expectClose(NauticalMiles.fromKilometers(u.toKilometers().value).value, nm);
  });

  it("strings", () => {
    expect(u.getStringUnits()).toBe("NM");
  });
});
