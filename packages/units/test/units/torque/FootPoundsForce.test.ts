import { FootPoundsForce } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("FootPoundsForce", () => {
  const v = 100;
  const u = FootPoundsForce.fromFootPoundsForce(v);

  it("round-trips", () => {
    expectClose(u.toNewtonMeters().toFootPoundsForce().value, v);
  });
});
