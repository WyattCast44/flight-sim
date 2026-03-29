import { KilogramMeterSquared } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("KilogramMeterSquared", () => {
  const v = 5000;
  const u = KilogramMeterSquared.fromKilogramMeterSquared(v);

  it("round-trips", () => {
    expectClose(u.toSlugFootSquared().toKilogramMeterSquared().value, v);
  });
});
