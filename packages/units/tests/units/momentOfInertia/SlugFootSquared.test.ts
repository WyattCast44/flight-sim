import { SlugFootSquared } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("SlugFootSquared", () => {
  const v = 100;
  const u = SlugFootSquared.fromSlugFootSquared(v);

  it("round-trips", () => {
    expectClose(u.toKilogramMeterSquared().toSlugFootSquared().value, v);
  });
});
