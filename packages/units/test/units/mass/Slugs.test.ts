import { Slugs } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Slugs", () => {
  const v = 2;
  const u = Slugs.fromSlugs(v);

  it("round-trips", () => {
    expectClose(u.toKilograms().toSlugs().value, v);
    expectClose(u.toPoundsMass().toSlugs().value, v);
  });
});
