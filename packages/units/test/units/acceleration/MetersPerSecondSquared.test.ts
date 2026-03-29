import { MetersPerSecondSquared } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("MetersPerSecondSquared", () => {
  const v = 9.81;
  const u = MetersPerSecondSquared.fromMetersPerSecondSquared(v);

  it("round-trips", () => {
    expectClose(u.toFeetPerSecondSquared().toMetersPerSecondSquared().value, v);
  });
});
