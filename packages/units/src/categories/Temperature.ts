import type { Celsius } from "../units/temperature/Celsius.js";
import type { Fahrenheit } from "../units/temperature/Fahrenheit.js";
import type { Kelvin } from "../units/temperature/Kelvin.js";
import { Unit } from "./Unit.js";

export abstract class Temperature extends Unit {
  abstract toKelvin(): Kelvin;
  abstract toCelsius(): Celsius;
  abstract toFahrenheit(): Fahrenheit;

  abstract toSIUnits(): Kelvin;
}
