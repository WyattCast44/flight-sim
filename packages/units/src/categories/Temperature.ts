import type { Celsius } from "../units/temperature/Celsius.js";
import type { Fahrenheit } from "../units/temperature/Fahrenheit.js";
import type { Kelvin } from "../units/temperature/Kelvin.js";

export abstract class Temperature {
  abstract readonly value: number;

  abstract toKelvin(): Kelvin;
  abstract toCelsius(): Celsius;
  abstract toFahrenheit(): Fahrenheit;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
