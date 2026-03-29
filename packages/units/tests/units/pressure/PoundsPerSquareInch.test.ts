import { PoundsPerSquareInch } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("PoundsPerSquareInch", () => {
  const v = 14.7;
  const u = PoundsPerSquareInch.fromPoundsPerSquareInch(v);

  it("round-trips", () => {
    expectClose(u.toPascals().toPoundsPerSquareInch().value, v);
    expectClose(u.toHectopascals().toPoundsPerSquareInch().value, v);
    expectClose(u.toPoundsPerSquareFoot().toPoundsPerSquareInch().value, v);
  });
});
