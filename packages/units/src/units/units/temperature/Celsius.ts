import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Temperature } from "../../categories/Temperature.js";
import { CELSIUS_OFFSET_KELVIN, FAHRENHEIT_OFFSET_TO_RANKINE } from "./constants.js";
import { Fahrenheit } from "./Fahrenheit.js";
import { Kelvin } from "./Kelvin.js";

export class Celsius extends Temperature {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Celsius");
  }

  static fromCelsius(value: number): Celsius {
    return new Celsius(value);
  }

  static fromKelvin(value: number): Celsius {
    return new Celsius(value - CELSIUS_OFFSET_KELVIN);
  }

  static fromFahrenheit(value: number): Celsius {
    return new Celsius(((value + FAHRENHEIT_OFFSET_TO_RANKINE) * 5) / 9 - CELSIUS_OFFSET_KELVIN);
  }

  toKelvin(): Kelvin {
    return new Kelvin(this.value + CELSIUS_OFFSET_KELVIN);
  }

  toCelsius(): Celsius {
    return this;
  }

  toFahrenheit(): Fahrenheit {
    return this.toKelvin().toFahrenheit();
  }

  getStringUnits(): string {
    return "°C";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} °C`;
  }
}
