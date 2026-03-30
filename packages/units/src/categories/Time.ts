import type { Hours } from "../units/time/Hours.js";
import type { Minutes } from "../units/time/Minutes.js";
import type { Seconds } from "../units/time/Seconds.js";
import type { Milliseconds } from "../units/time/Milliseconds.js";

export abstract class Time {
  abstract readonly value: number;

  abstract toMilliseconds(): Milliseconds;
  abstract toSeconds(): Seconds;
  abstract toMinutes(): Minutes;
  abstract toHours(): Hours;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
