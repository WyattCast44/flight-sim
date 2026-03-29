import { Horsepower } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Horsepower", () => {
  const v = 100;
  const u = Horsepower.fromHorsepower(v);

  it("round-trips", () => {
    expectClose(u.toWatts().toHorsepower().value, v);
  });
});
