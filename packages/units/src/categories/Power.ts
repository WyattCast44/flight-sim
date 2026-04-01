import type { Horsepower } from "../units/power/Horsepower.js";
import type { Watts } from "../units/power/Watts.js";
import { Unit } from "./Unit.js";

export abstract class Power extends Unit {
  abstract toWatts(): Watts;
  abstract toHorsepower(): Horsepower;

  abstract toSIUnits(): Watts;
}
