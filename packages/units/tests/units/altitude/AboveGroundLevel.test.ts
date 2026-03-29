import { AboveGroundLevel } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("AboveGroundLevel", () => {
  const m = 500;
  const a = AboveGroundLevel.fromMeters(m);

  it("matches length conversions from meters", () => {
    expectClose(a.toMeters().value, m);
    expectClose(a.toFeet().toMeters().value, m);
    expectClose(a.toAboveGroundLevel().value, m);
    expectClose(a.toMeanSeaLevel().value, m);
  });

  it("labels", () => {
    expect(a.getStringUnits()).toContain("AGL");
  });
});
