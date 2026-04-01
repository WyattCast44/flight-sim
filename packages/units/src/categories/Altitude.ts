import type { AboveGroundLevel } from "../units/altitude/AboveGroundLevel.js";
import type { MeanSeaLevel } from "../units/altitude/MeanSeaLevel.js";
import type { Feet } from "../units/length/Feet.js";
import type { Inches } from "../units/length/Inches.js";
import type { Kilometers } from "../units/length/Kilometers.js";
import type { Meters } from "../units/length/Meters.js";
import type { NauticalMiles } from "../units/length/NauticalMiles.js";
import { Unit } from "./Unit.js";

/**
 * Altitude relative to MSL or AGL. Internal numeric value is always **meters** (see concrete classes).
 */
export abstract class Altitude extends Unit {
  abstract toMeanSeaLevel(): MeanSeaLevel;
  abstract toAboveGroundLevel(): AboveGroundLevel;

  abstract toMeters(): Meters;
  abstract toFeet(): Feet;
  abstract toNauticalMiles(): NauticalMiles;
  abstract toKilometers(): Kilometers;
  abstract toInches(): Inches;

  abstract toSIUnits(): Altitude;
}
