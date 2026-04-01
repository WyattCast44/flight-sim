import { assertFiniteNumber } from "../../core/validate.js";
import { Temperature } from "../../categories/Temperature.js";
import type { Unit } from "../../categories/Unit.js";
import { CELSIUS_OFFSET_KELVIN, FAHRENHEIT_OFFSET_TO_RANKINE } from "./constants.js";
import { Celsius } from "./Celsius.js";
import { Fahrenheit } from "./Fahrenheit.js";

export class Kelvin extends Temperature {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Kelvin");
  }

  static fromKelvin(value: number): Kelvin {
    return new Kelvin(value);
  }

  static fromCelsius(value: number): Kelvin {
    return new Kelvin(value + CELSIUS_OFFSET_KELVIN);
  }

  static fromFahrenheit(value: number): Kelvin {
    return new Kelvin(((value + FAHRENHEIT_OFFSET_TO_RANKINE) * 5) / 9);
  }

  static fromSIValue(value: number | Unit): Kelvin {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Kelvin.fromKelvin(si);
  }

  toKelvin(): Kelvin {
    return this;
  }

  toCelsius(): Celsius {
    return new Celsius(this.value - CELSIUS_OFFSET_KELVIN);
  }

  toFahrenheit(): Fahrenheit {
    return new Fahrenheit((this.value * 9) / 5 - FAHRENHEIT_OFFSET_TO_RANKINE);
  }

  toSIUnits(): Kelvin {
    return this;
  }

  getStringUnits(): string {
    return "K";
  }
}
