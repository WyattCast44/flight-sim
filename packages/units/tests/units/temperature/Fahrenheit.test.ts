import { Fahrenheit } from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "../../helpers.js";

describe("Fahrenheit", () => {
  const v = 59;
  const u = Fahrenheit.fromFahrenheit(v);

  it("round-trips", () => {
    expectClose(u.toKelvin().toFahrenheit().value, v);
    expectClose(u.toCelsius().toFahrenheit().value, v);
  });
});
