import type { Bearing } from "../units/angles/Bearing.js";
import type { Degrees } from "../units/angles/Degrees.js";
import type { DegreesCardinal } from "../units/angles/DegreesCardinal.js";
import type { Radians } from "../units/angles/Radians.js";
import { Unit } from "./Unit.js";

export abstract class Angles extends Unit {
  abstract toRadians(): Radians;
  abstract toDegrees(): Degrees;
  abstract toDegreesCardinal(): DegreesCardinal;
  abstract toBearing(): Bearing;

  abstract toSIUnits(): Radians;
}
