import { NewtonMeters } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("NewtonMeters", () => {
  const v = 500;
  const u = NewtonMeters.fromNewtonMeters(v);

  it("round-trips", () => {
    expectClose(u.toFootPoundsForce().toNewtonMeters().value, v);
  });
});
