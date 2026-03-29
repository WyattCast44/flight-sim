import type { Horsepower } from "../units/power/Horsepower.js";
import type { Watts } from "../units/power/Watts.js";

export abstract class Power {
  abstract readonly value: number;

  abstract toWatts(): Watts;
  abstract toHorsepower(): Horsepower;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
