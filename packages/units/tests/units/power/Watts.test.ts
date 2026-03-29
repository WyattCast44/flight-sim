import { Watts } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Watts", () => {
  const v = 745.7;
  const u = Watts.fromWatts(v);

  it("round-trips", () => {
    expectClose(u.toHorsepower().toWatts().value, v);
  });
});
