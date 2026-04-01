import { assertFiniteNumber } from "../../core/validate.js";
import { Velocity } from "../../categories/Velocity.js";
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
import { MetersPerSecond } from "./MetersPerSecond.js";

export class MilesPerHour extends Velocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "MilesPerHour");
  }

  static fromMilesPerHour(value: number): MilesPerHour {
    return new MilesPerHour(value);
  }

  static fromMetersPerSecond(value: number): MilesPerHour {
    return new MilesPerHour(value / METERS_PER_SECOND_PER_MPH);
  }

  static fromFeetPerSecond(value: number): MilesPerHour {
    return new MilesPerHour(
      (value * METERS_PER_SECOND_PER_FOOT_PER_SECOND) / METERS_PER_SECOND_PER_MPH,
    );
  }

  static fromKnots(value: number): MilesPerHour {
    return new MilesPerHour(
      (value * METERS_PER_SECOND_PER_KNOT) / METERS_PER_SECOND_PER_MPH,
    );
  }

  static fromKilometersPerHour(value: number): MilesPerHour {
    return new MilesPerHour(
      (value * METERS_PER_SECOND_PER_KMH) / METERS_PER_SECOND_PER_MPH,
    );
  }

  static fromFeetPerMinute(value: number): MilesPerHour {
    return new MilesPerHour(
      (value * METERS_PER_SECOND_PER_FPM) / METERS_PER_SECOND_PER_MPH,
    );
  }

  toMetersPerSecond(): MetersPerSecond {
    return new MetersPerSecond(this.value * METERS_PER_SECOND_PER_MPH);
  }

  toFeetPerSecond(): FeetPerSecond {
    return this.toMetersPerSecond().toFeetPerSecond();
  }

  toKnots(): Knots {
    return this.toMetersPerSecond().toKnots();
  }

  toMilesPerHour(): MilesPerHour {
    return this;
  }

  toKilometersPerHour(): KilometersPerHour {
    return this.toMetersPerSecond().toKilometersPerHour();
  }

  toFeetPerMinute(): FeetPerMinute {
    return this.toMetersPerSecond().toFeetPerMinute();
  }

  toSIUnits(): MetersPerSecond {
    return this.toMetersPerSecond();
  }

  getStringUnits(): string {
    return "mph";
  }
}
