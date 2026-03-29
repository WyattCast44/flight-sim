import { PoundsMass } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("PoundsMass", () => {
  const v = 200;
  const u = PoundsMass.fromPoundsMass(v);

  it("round-trips", () => {
    expectClose(u.toKilograms().toPoundsMass().value, v);
    expectClose(u.toSlugs().toPoundsMass().value, v);
  });
});
