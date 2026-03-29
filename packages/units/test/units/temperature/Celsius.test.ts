import { Celsius } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Celsius", () => {
  const v = 15;
  const u = Celsius.fromCelsius(v);

  it("round-trips", () => {
    expectClose(u.toKelvin().toCelsius().value, v);
    expectClose(u.toFahrenheit().toCelsius().value, v);
  });
});
