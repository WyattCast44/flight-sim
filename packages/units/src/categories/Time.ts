import type { Hours } from "../units/time/Hours.js";
import type { Minutes } from "../units/time/Minutes.js";
import type { Seconds } from "../units/time/Seconds.js";
import type { Milliseconds } from "../units/time/Milliseconds.js";
import { Unit } from "./Unit.js";

export abstract class Time extends Unit {
  abstract toMilliseconds(): Milliseconds;
  abstract toSeconds(): Seconds;
  abstract toMinutes(): Minutes;
  abstract toHours(): Hours;

  abstract toSIUnits(): Seconds;
}
