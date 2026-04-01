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
import { Knots } from "./Knots.js";
import { MetersPerSecond } from "./MetersPerSecond.js";
import { MilesPerHour } from "./MilesPerHour.js";

export class KilometersPerHour extends Velocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "KilometersPerHour");
  }

  static fromKilometersPerHour(value: number): KilometersPerHour {
    return new KilometersPerHour(value);
  }

  static fromMetersPerSecond(value: number): KilometersPerHour {
    return new KilometersPerHour(value / METERS_PER_SECOND_PER_KMH);
  }

  static fromFeetPerSecond(value: number): KilometersPerHour {
    return new KilometersPerHour(
      (value * METERS_PER_SECOND_PER_FOOT_PER_SECOND) / METERS_PER_SECOND_PER_KMH,
    );
  }

  static fromKnots(value: number): KilometersPerHour {
    return new KilometersPerHour(
      (value * METERS_PER_SECOND_PER_KNOT) / METERS_PER_SECOND_PER_KMH,
    );
  }

  static fromMilesPerHour(value: number): KilometersPerHour {
    return new KilometersPerHour(
      (value * METERS_PER_SECOND_PER_MPH) / METERS_PER_SECOND_PER_KMH,
    );
  }

  static fromFeetPerMinute(value: number): KilometersPerHour {
    return new KilometersPerHour(
      (value * METERS_PER_SECOND_PER_FPM) / METERS_PER_SECOND_PER_KMH,
    );
  }

  static fromSIValue(value: number | Unit): KilometersPerHour {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return KilometersPerHour.fromMetersPerSecond(si);
  }

  toMetersPerSecond(): MetersPerSecond {
    return new MetersPerSecond(this.value * METERS_PER_SECOND_PER_KMH);
  }

  toFeetPerSecond(): FeetPerSecond {
    return this.toMetersPerSecond().toFeetPerSecond();
  }

  toKnots(): Knots {
    return this.toMetersPerSecond().toKnots();
  }

  toMilesPerHour(): MilesPerHour {
    return this.toMetersPerSecond().toMilesPerHour();
  }

  toKilometersPerHour(): KilometersPerHour {
    return this;
  }

  toFeetPerMinute(): FeetPerMinute {
    return this.toMetersPerSecond().toFeetPerMinute();
  }

  toSIUnits(): MetersPerSecond {
    return this.toMetersPerSecond();
  }

  getStringUnits(): string {
    return "km/h";
  }
}
