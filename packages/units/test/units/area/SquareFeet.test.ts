import { SquareFeet } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("SquareFeet", () => {
  const v = 1000;
  const u = SquareFeet.fromSquareFeet(v);

  it("round-trips", () => {
    expectClose(u.toSquareMeters().toSquareFeet().value, v);
  });

  it("static factories", () => {
    expectClose(SquareFeet.fromSquareMeters(u.toSquareMeters().value).value, v);
  });

  it("strings", () => {
    expect(u.getStringUnits()).toBe("ft²");
  });
});
