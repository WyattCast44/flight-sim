import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Volume } from "../../categories/Volume.js";
import {
  CUBIC_METERS_PER_CUBIC_FOOT,
  CUBIC_METERS_PER_US_GALLON,
  CUBIC_METERS_PER_LITER,
} from "./constants.js";
import { CubicMeters } from "./CubicMeters.js";
import { Liters } from "./Liters.js";
import { USGallons } from "./USGallons.js";

/**
 * Volume in cubic feet.
 */
export class CubicFeet extends Volume {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "CubicFeet");
  }

  static fromCubicFeet(value: number): CubicFeet {
    return new CubicFeet(value);
  }

  static fromCubicMeters(value: number): CubicFeet {
    return new CubicFeet(value / CUBIC_METERS_PER_CUBIC_FOOT);
  }

  static fromLiters(value: number): CubicFeet {
    return new CubicFeet((value * CUBIC_METERS_PER_LITER) / CUBIC_METERS_PER_CUBIC_FOOT);
  }

  static fromUSGallons(value: number): CubicFeet {
    return new CubicFeet((value * CUBIC_METERS_PER_US_GALLON) / CUBIC_METERS_PER_CUBIC_FOOT);
  }

  toLiters(): Liters {
    return this.toCubicMeters().toLiters();
  }

  toUSGallons(): USGallons {
    return this.toCubicMeters().toUSGallons();
  }

  toCubicMeters(): CubicMeters {
    return new CubicMeters(this.value * CUBIC_METERS_PER_CUBIC_FOOT);
  }

  toCubicFeet(): CubicFeet {
    return this;
  }

  getStringUnits(): string {
    return "ft³";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} ft³`;
  }
}
