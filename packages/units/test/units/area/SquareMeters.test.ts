import { SquareFeet, SquareMeters } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("SquareMeters", () => {
  const v = 25;
  const u = SquareMeters.fromSquareMeters(v);

  it("round-trips", () => {
    expectClose(u.toSquareFeet().toSquareMeters().value, v);
  });
});
