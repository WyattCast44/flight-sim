import { MeanSeaLevel } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("MeanSeaLevel", () => {
  const m = 1500;
  const a = MeanSeaLevel.fromMeters(m);

  it("matches length conversions from meters", () => {
    expectClose(a.toMeters().value, m);
    expectClose(a.toFeet().toMeters().value, m);
    expectClose(a.toMeanSeaLevel().value, m);
    expectClose(a.toAboveGroundLevel().value, m);
  });

  it("static factories", () => {
    expectClose(MeanSeaLevel.fromFeet(a.toFeet().value).value, m);
    expectClose(MeanSeaLevel.fromInches(a.toInches().value).value, m);
  });

  it("labels", () => {
    expect(a.getStringUnits()).toContain("MSL");
    expect(a.toString()).toContain("MSL");
  });
});
