import { PoundsPerSquareFoot } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("PoundsPerSquareFoot", () => {
  const v = 2000;
  const u = PoundsPerSquareFoot.fromPoundsPerSquareFoot(v);

  it("round-trips", () => {
    expectClose(u.toPascals().toPoundsPerSquareFoot().value, v);
    expectClose(u.toHectopascals().toPoundsPerSquareFoot().value, v);
    expectClose(u.toPoundsPerSquareInch().toPoundsPerSquareFoot().value, v);
  });
});
