import { Kilograms, UnitValueError } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Kilograms", () => {
  const v = 100;
  const u = Kilograms.fromKilograms(v);

  it("round-trips", () => {
    expectClose(u.toPoundsMass().toKilograms().value, v);
    expectClose(u.toSlugs().toKilograms().value, v);
  });

  it("rejects negative", () => {
    expect(() => new Kilograms(-1)).toThrow(UnitValueError);
  });
});
