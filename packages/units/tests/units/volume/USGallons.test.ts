import { USGallons } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("USGallons", () => {
  const v = 40;
  const u = USGallons.fromUSGallons(v);

  it("round-trips", () => {
    expectClose(u.toCubicMeters().toUSGallons().value, v);
    expectClose(u.toLiters().toUSGallons().value, v);
    expectClose(u.toCubicFeet().toUSGallons().value, v);
  });

  it("strings", () => {
    expect(u.getStringUnits()).toContain("gal");
  });
});
