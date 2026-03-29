import { Seconds } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Seconds", () => {
  const v = 90;
  const u = Seconds.fromSeconds(v);

  it("round-trips", () => {
    expectClose(u.toMinutes().toSeconds().value, v);
    expectClose(u.toHours().toSeconds().value, v);
  });
});
