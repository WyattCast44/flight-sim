import type { CubicFeet } from "../units/volume/CubicFeet.js";
import type { CubicMeters } from "../units/volume/CubicMeters.js";
import type { Liters } from "../units/volume/Liters.js";
import type { USGallons } from "../units/volume/USGallons.js";
import { Unit } from "./Unit.js";

/**
 * Volume. Internal base: {@link CubicMeters}.
 */
export abstract class Volume extends Unit {
  abstract toLiters(): Liters;
  abstract toUSGallons(): USGallons;
  abstract toCubicMeters(): CubicMeters;
  abstract toCubicFeet(): CubicFeet;

  abstract toSIUnits(): CubicMeters;
}
