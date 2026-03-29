import { Hectopascals } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Hectopascals", () => {
  const v = 1013;
  const u = Hectopascals.fromHectopascals(v);

  it("round-trips", () => {
    expectClose(u.toPascals().toHectopascals().value, v);
    expectClose(u.toPoundsPerSquareInch().toHectopascals().value, v);
    expectClose(u.toPoundsPerSquareFoot().toHectopascals().value, v);
  });

  it("fromMillibars matches fromHectopascals", () => {
    expectClose(Hectopascals.fromMillibars(v).value, v);
  });
});
