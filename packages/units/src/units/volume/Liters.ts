import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Volume } from "../../categories/Volume.js";
import {
  CUBIC_METERS_PER_CUBIC_FOOT,
  CUBIC_METERS_PER_US_GALLON,
  CUBIC_METERS_PER_LITER,
} from "./constants.js";
import { CubicFeet } from "./CubicFeet.js";
import { CubicMeters } from "./CubicMeters.js";
import { USGallons } from "./USGallons.js";

/**
 * Volume in liters.
 */
export class Liters extends Volume {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Liters");
  }

  static fromLiters(value: number): Liters {
    return new Liters(value);
  }

  static fromCubicMeters(value: number): Liters {
    return new Liters(value / CUBIC_METERS_PER_LITER);
  }

  static fromUSGallons(value: number): Liters {
    return new Liters((value * CUBIC_METERS_PER_US_GALLON) / CUBIC_METERS_PER_LITER);
  }

  static fromCubicFeet(value: number): Liters {
    return new Liters((value * CUBIC_METERS_PER_CUBIC_FOOT) / CUBIC_METERS_PER_LITER);
  }

  toLiters(): Liters {
    return this;
  }

  toUSGallons(): USGallons {
    return this.toCubicMeters().toUSGallons();
  }

  toCubicMeters(): CubicMeters {
    return new CubicMeters(this.value * CUBIC_METERS_PER_LITER);
  }

  toCubicFeet(): CubicFeet {
    return this.toCubicMeters().toCubicFeet();
  }

  getStringUnits(): string {
    return "L";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} L`;
  }
}
