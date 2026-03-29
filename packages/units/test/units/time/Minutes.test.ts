import { Minutes } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Minutes", () => {
  const v = 45;
  const u = Minutes.fromMinutes(v);

  it("round-trips", () => {
    expectClose(u.toSeconds().toMinutes().value, v);
    expectClose(u.toHours().toMinutes().value, v);
  });
});
