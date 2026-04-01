import type { FeetPerMinute } from "../units/velocity/FeetPerMinute.js";
import type { FeetPerSecond } from "../units/velocity/FeetPerSecond.js";
import type { KilometersPerHour } from "../units/velocity/KilometersPerHour.js";
import type { Knots } from "../units/velocity/Knots.js";
import type { MetersPerSecond } from "../units/velocity/MetersPerSecond.js";
import type { MilesPerHour } from "../units/velocity/MilesPerHour.js";
import { Unit } from "./Unit.js";

/**
 * Speed. Internal base: {@link MetersPerSecond}.
 */
export abstract class Velocity extends Unit {
  abstract toMetersPerSecond(): MetersPerSecond;
  abstract toFeetPerSecond(): FeetPerSecond;
  abstract toKnots(): Knots;
  abstract toMilesPerHour(): MilesPerHour;
  abstract toKilometersPerHour(): KilometersPerHour;
  abstract toFeetPerMinute(): FeetPerMinute;

  abstract toSIUnits(): MetersPerSecond;
}
