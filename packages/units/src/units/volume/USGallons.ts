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
import { Liters } from "./Liters.js";

/**
 * Volume in US gallons.
 */
export class USGallons extends Volume {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "USGallons");
  }

  static fromUSGallons(value: number): USGallons {
    return new USGallons(value);
  }

  static fromCubicMeters(value: number): USGallons {
    return new USGallons(value / CUBIC_METERS_PER_US_GALLON);
  }

  static fromLiters(value: number): USGallons {
    return new USGallons((value * CUBIC_METERS_PER_LITER) / CUBIC_METERS_PER_US_GALLON);
  }

  static fromCubicFeet(value: number): USGallons {
    return new USGallons((value * CUBIC_METERS_PER_CUBIC_FOOT) / CUBIC_METERS_PER_US_GALLON);
  }

  static fromSIValue(value: number | Unit): USGallons {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return USGallons.fromCubicMeters(si);
  }

  toLiters(): Liters {
    return this.toCubicMeters().toLiters();
  }

  toUSGallons(): USGallons {
    return this;
  }

  toCubicMeters(): CubicMeters {
    return new CubicMeters(this.value * CUBIC_METERS_PER_US_GALLON);
  }

  toCubicFeet(): CubicFeet {
    return this.toCubicMeters().toCubicFeet();
  }

  toSIUnits(): CubicMeters {
    return this.toCubicMeters();
  }

  getStringUnits(): string {
    return "US gal";
  }
}
