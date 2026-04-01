import { assertFiniteNumber } from "../../core/validate.js";
import { Volume } from "../../categories/Volume.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): Liters {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Liters.fromCubicMeters(si);
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

  toSIUnits(): CubicMeters {
    return this.toCubicMeters();
  }

  getStringUnits(): string {
    return "L";
  }
}
