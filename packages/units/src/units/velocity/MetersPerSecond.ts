import { assertFiniteNumber } from "../../core/validate.js";
import { Velocity } from "../../categories/Velocity.js";
import type { Unit } from "../../categories/Unit.js";
import {
  METERS_PER_SECOND_PER_FOOT_PER_SECOND,
  METERS_PER_SECOND_PER_FPM,
  METERS_PER_SECOND_PER_KMH,
  METERS_PER_SECOND_PER_KNOT,
  METERS_PER_SECOND_PER_MPH,
} from "./constants.js";
import { FeetPerMinute } from "./FeetPerMinute.js";
import { FeetPerSecond } from "./FeetPerSecond.js";
import { KilometersPerHour } from "./KilometersPerHour.js";
import { Knots } from "./Knots.js";
import { MilesPerHour } from "./MilesPerHour.js";

/**
 * Speed in meters per second (SI base for this category).
 */
export class MetersPerSecond extends Velocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "MetersPerSecond");
  }

  static fromMetersPerSecond(value: number): MetersPerSecond {
    return new MetersPerSecond(value);
  }

  static fromFeetPerSecond(value: number): MetersPerSecond {
    return new MetersPerSecond(value * METERS_PER_SECOND_PER_FOOT_PER_SECOND);
  }

  static fromKnots(value: number): MetersPerSecond {
    return new MetersPerSecond(value * METERS_PER_SECOND_PER_KNOT);
  }

  static fromMilesPerHour(value: number): MetersPerSecond {
    return new MetersPerSecond(value * METERS_PER_SECOND_PER_MPH);
  }

  static fromKilometersPerHour(value: number): MetersPerSecond {
    return new MetersPerSecond(value * METERS_PER_SECOND_PER_KMH);
  }

  static fromFeetPerMinute(value: number): MetersPerSecond {
    return new MetersPerSecond(value * METERS_PER_SECOND_PER_FPM);
  }

  static fromSIValue(value: number | Unit): MetersPerSecond {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return MetersPerSecond.fromMetersPerSecond(si);
  }

  toMetersPerSecond(): MetersPerSecond {
    return this;
  }

  toFeetPerSecond(): FeetPerSecond {
    return new FeetPerSecond(this.value / METERS_PER_SECOND_PER_FOOT_PER_SECOND);
  }

  toKnots(): Knots {
    return new Knots(this.value / METERS_PER_SECOND_PER_KNOT);
  }

  toMilesPerHour(): MilesPerHour {
    return new MilesPerHour(this.value / METERS_PER_SECOND_PER_MPH);
  }

  toKilometersPerHour(): KilometersPerHour {
    return new KilometersPerHour(this.value / METERS_PER_SECOND_PER_KMH);
  }

  toFeetPerMinute(): FeetPerMinute {
    return new FeetPerMinute(this.value / METERS_PER_SECOND_PER_FPM);
  }

  toSIUnits(): MetersPerSecond {
    return this;
  }

  getStringUnits(): string {
    return "m/s";
  }
}
