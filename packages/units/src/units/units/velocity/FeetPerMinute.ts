import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Velocity } from "../../categories/Velocity.js";
import {
  METERS_PER_SECOND_PER_FOOT_PER_SECOND,
  METERS_PER_SECOND_PER_FPM,
  METERS_PER_SECOND_PER_KMH,
  METERS_PER_SECOND_PER_KNOT,
  METERS_PER_SECOND_PER_MPH,
} from "./constants.js";
import { FeetPerSecond } from "./FeetPerSecond.js";
import { KilometersPerHour } from "./KilometersPerHour.js";
import { Knots } from "./Knots.js";
import { MetersPerSecond } from "./MetersPerSecond.js";
import { MilesPerHour } from "./MilesPerHour.js";

export class FeetPerMinute extends Velocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "FeetPerMinute");
  }

  static fromFeetPerMinute(value: number): FeetPerMinute {
    return new FeetPerMinute(value);
  }

  static fromMetersPerSecond(value: number): FeetPerMinute {
    return new FeetPerMinute(value / METERS_PER_SECOND_PER_FPM);
  }

  static fromFeetPerSecond(value: number): FeetPerMinute {
    return new FeetPerMinute(
      (value * METERS_PER_SECOND_PER_FOOT_PER_SECOND) / METERS_PER_SECOND_PER_FPM,
    );
  }

  static fromKnots(value: number): FeetPerMinute {
    return new FeetPerMinute(
      (value * METERS_PER_SECOND_PER_KNOT) / METERS_PER_SECOND_PER_FPM,
    );
  }

  static fromMilesPerHour(value: number): FeetPerMinute {
    return new FeetPerMinute(
      (value * METERS_PER_SECOND_PER_MPH) / METERS_PER_SECOND_PER_FPM,
    );
  }

  static fromKilometersPerHour(value: number): FeetPerMinute {
    return new FeetPerMinute(
      (value * METERS_PER_SECOND_PER_KMH) / METERS_PER_SECOND_PER_FPM,
    );
  }

  toMetersPerSecond(): MetersPerSecond {
    return new MetersPerSecond(this.value * METERS_PER_SECOND_PER_FPM);
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
    return this.toMetersPerSecond().toKilometersPerHour();
  }

  toFeetPerMinute(): FeetPerMinute {
    return this;
  }

  getStringUnits(): string {
    return "ft/min";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} ft/min`;
  }
}
