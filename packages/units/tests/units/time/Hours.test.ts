import { Hours } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Hours", () => {
  const v = 2.5;
  const u = Hours.fromHours(v);

  it("round-trips", () => {
    expectClose(u.toSeconds().toHours().value, v);
    expectClose(u.toMinutes().toHours().value, v);
  });
});
