import { Hectopascals, Pascals } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Pascals", () => {
  const v = 101325;
  const u = Pascals.fromPascals(v);

  it("round-trips", () => {
    expectClose(u.toHectopascals().toPascals().value, v);
    expectClose(u.toPoundsPerSquareInch().toPascals().value, v);
    expectClose(u.toPoundsPerSquareFoot().toPascals().value, v);
  });

  it("millibars same as hPa", () => {
    expectClose(Pascals.fromMillibars(1013.25).value, Hectopascals.fromMillibars(1013.25).toPascals().value);
  });
});
