import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Temperature } from "../../categories/Temperature.js";
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

  toKelvin(): Kelvin {
    return this;
  }

  toCelsius(): Celsius {
    return new Celsius(this.value - CELSIUS_OFFSET_KELVIN);
  }

  toFahrenheit(): Fahrenheit {
    return new Fahrenheit((this.value * 9) / 5 - FAHRENHEIT_OFFSET_TO_RANKINE);
  }

  getStringUnits(): string {
    return "K";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} K`;
  }
}
