import { Kelvin } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Kelvin", () => {
  const v = 288.15;
  const u = Kelvin.fromKelvin(v);

  it("round-trips", () => {
    expectClose(u.toCelsius().toKelvin().value, v);
    expectClose(u.toFahrenheit().toKelvin().value, v);
  });
});
