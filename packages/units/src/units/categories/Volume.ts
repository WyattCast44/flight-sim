import type { CubicFeet } from "../units/volume/CubicFeet.js";
import type { CubicMeters } from "../units/volume/CubicMeters.js";
import type { Liters } from "../units/volume/Liters.js";
import type { USGallons } from "../units/volume/USGallons.js";

/**
 * Volume. Internal base: {@link CubicMeters}.
 */
export abstract class Volume {
  abstract readonly value: number;

  abstract toLiters(): Liters;
  abstract toUSGallons(): USGallons;
  abstract toCubicMeters(): CubicMeters;
  abstract toCubicFeet(): CubicFeet;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
