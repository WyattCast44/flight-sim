import type { Feet } from "../units/length/Feet.js";
import type { Inches } from "../units/length/Inches.js";
import type { Kilometers } from "../units/length/Kilometers.js";
import type { Meters } from "../units/length/Meters.js";
import type { NauticalMiles } from "../units/length/NauticalMiles.js";

/**
 * Linear distance. Internal base: {@link Meters}.
 */
export abstract class Length {
  abstract readonly value: number;
  
  abstract toFeet(): Feet;
  abstract toMeters(): Meters;
  abstract toNauticalMiles(): NauticalMiles;
  abstract toKilometers(): Kilometers;
  abstract toInches(): Inches;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
