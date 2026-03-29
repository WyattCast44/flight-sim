import { PoundsForce } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("PoundsForce", () => {
  const v = 500;
  const u = PoundsForce.fromPoundsForce(v);

  it("round-trips", () => {
    expectClose(u.toNewtons().toPoundsForce().value, v);
  });
});
