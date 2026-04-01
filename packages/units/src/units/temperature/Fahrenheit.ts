import { assertFiniteNumber } from "../../core/validate.js";
import { Temperature } from "../../categories/Temperature.js";
import { FAHRENHEIT_OFFSET_TO_RANKINE } from "./constants.js";
import { Celsius } from "./Celsius.js";
import { Kelvin } from "./Kelvin.js";

export class Fahrenheit extends Temperature {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Fahrenheit");
  }

  static fromFahrenheit(value: number): Fahrenheit {
    return new Fahrenheit(value);
  }

  static fromKelvin(value: number): Fahrenheit {
    return new Fahrenheit((value * 9) / 5 - FAHRENHEIT_OFFSET_TO_RANKINE);
  }

  static fromCelsius(value: number): Fahrenheit {
    return new Fahrenheit((value * 9) / 5 + 32);
  }

  toKelvin(): Kelvin {
    return new Kelvin(((this.value + FAHRENHEIT_OFFSET_TO_RANKINE) * 5) / 9);
  }

  toCelsius(): Celsius {
    return this.toKelvin().toCelsius();
  }

  toFahrenheit(): Fahrenheit {
    return this;
  }

  toSIUnits(): Kelvin {
    return this.toKelvin();
  }

  getStringUnits(): string {
    return "°F";
  }
}
