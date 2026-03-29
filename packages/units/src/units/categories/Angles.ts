import type { Bearing } from "../units/angles/Bearing.js";
import type { Degrees } from "../units/angles/Degrees.js";
import type { DegreesCardinal } from "../units/angles/DegreesCardinal.js";
import type { Radians } from "../units/angles/Radians.js";

export abstract class Angles {
  abstract readonly value: number;

  abstract toRadians(): Radians;
  abstract toDegrees(): Degrees;
  abstract toDegreesCardinal(): DegreesCardinal;
  abstract toBearing(): Bearing;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
