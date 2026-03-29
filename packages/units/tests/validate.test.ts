import { assertFiniteNumber, assertNonNegative, assertPositive, UnitValueError } from "@flight-sim/units";
import { describe, expect, it } from "vitest";

describe("validate", () => {
  it("assertFiniteNumber rejects NaN and Infinity", () => {
    expect(() => assertFiniteNumber(Number.NaN, "x")).toThrow(UnitValueError);
    expect(() => assertFiniteNumber(Number.POSITIVE_INFINITY, "x")).toThrow(UnitValueError);
  });

  it("assertNonNegative rejects negative", () => {
    expect(() => assertNonNegative(-1, "x")).toThrow(UnitValueError);
  });

  it("assertPositive rejects zero and negative", () => {
    expect(() => assertPositive(0, "x")).toThrow(UnitValueError);
    expect(() => assertPositive(-1, "x")).toThrow(UnitValueError);
  });
});
