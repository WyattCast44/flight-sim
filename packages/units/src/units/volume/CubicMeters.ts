import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Volume } from "../../categories/Volume.js";
import {
  CUBIC_METERS_PER_CUBIC_FOOT,
  CUBIC_METERS_PER_US_GALLON,
  CUBIC_METERS_PER_LITER,
} from "./constants.js";
import { CubicFeet } from "./CubicFeet.js";
import { Liters } from "./Liters.js";
import { USGallons } from "./USGallons.js";

/**
 * Volume in cubic meters (SI base for this category).
 */
export class CubicMeters extends Volume {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "CubicMeters");
  }

  static fromCubicMeters(value: number): CubicMeters {
    return new CubicMeters(value);
  }

  static fromLiters(value: number): CubicMeters {
    return new CubicMeters(value * CUBIC_METERS_PER_LITER);
  }

  static fromUSGallons(value: number): CubicMeters {
    return new CubicMeters(value * CUBIC_METERS_PER_US_GALLON);
  }

  static fromCubicFeet(value: number): CubicMeters {
    return new CubicMeters(value * CUBIC_METERS_PER_CUBIC_FOOT);
  }

  toLiters(): Liters {
    return new Liters(this.value / CUBIC_METERS_PER_LITER);
  }

  toUSGallons(): USGallons {
    return new USGallons(this.value / CUBIC_METERS_PER_US_GALLON);
  }

  toCubicMeters(): CubicMeters {
    return this;
  }

  toCubicFeet(): CubicFeet {
    return new CubicFeet(this.value / CUBIC_METERS_PER_CUBIC_FOOT);
  }

  getStringUnits(): string {
    return "m³";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} m³`;
  }
}
