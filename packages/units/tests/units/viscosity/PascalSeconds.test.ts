import { PascalSeconds, UnitValueError } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("PascalSeconds", () => {
  const v = 1.81e-5;
  const u = PascalSeconds.fromPascalSeconds(v);

  it("is SI base for viscosity (identity conversions)", () => {
    expectClose(u.toPascalSeconds().value, v);
    expectClose(u.toSIUnits().value, v);
  });

  it("fromSIValue accepts Pa·s scalar or same-category unit", () => {
    expectClose(PascalSeconds.fromSIValue(v).value, v);
    expectClose(PascalSeconds.fromSIValue(u).value, v);
  });

  it("strings", () => {
    expect(u.getStringUnits()).toBe("Pa·s");
    expect(u.toString()).toContain("Pa·s");
  });

  it("rejects non-finite values", () => {
    expect(() => new PascalSeconds(Number.NaN)).toThrow(UnitValueError);
    expect(() => new PascalSeconds(Number.POSITIVE_INFINITY)).toThrow(UnitValueError);
  });

  it("add preserves concrete type", () => {
    const sum = u.add(PascalSeconds.fromPascalSeconds(v));
    expect(sum).toBeInstanceOf(PascalSeconds);
    expectClose(sum.value, 2 * v);
  });
});
