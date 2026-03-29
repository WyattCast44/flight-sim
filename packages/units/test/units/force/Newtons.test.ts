import { Newtons } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Newtons", () => {
  const v = 1000;
  const u = Newtons.fromNewtons(v);

  it("round-trips", () => {
    expectClose(u.toPoundsForce().toNewtons().value, v);
  });
});
