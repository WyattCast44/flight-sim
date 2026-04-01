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
import { KilometersPerHour } from "./KilometersPerHour.js";
import { Knots } from "./Knots.js";
import { MetersPerSecond } from "./MetersPerSecond.js";
import { MilesPerHour } from "./MilesPerHour.js";

export class FeetPerSecond extends Velocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "FeetPerSecond");
  }

  static fromFeetPerSecond(value: number): FeetPerSecond {
    return new FeetPerSecond(value);
  }

  static fromMetersPerSecond(value: number): FeetPerSecond {
    return new FeetPerSecond(value / METERS_PER_SECOND_PER_FOOT_PER_SECOND);
  }

  static fromKnots(value: number): FeetPerSecond {
    return new FeetPerSecond(
      (value * METERS_PER_SECOND_PER_KNOT) / METERS_PER_SECOND_PER_FOOT_PER_SECOND,
    );
  }

  static fromMilesPerHour(value: number): FeetPerSecond {
    return new FeetPerSecond(
      (value * METERS_PER_SECOND_PER_MPH) / METERS_PER_SECOND_PER_FOOT_PER_SECOND,
    );
  }

  static fromKilometersPerHour(value: number): FeetPerSecond {
    return new FeetPerSecond(
      (value * METERS_PER_SECOND_PER_KMH) / METERS_PER_SECOND_PER_FOOT_PER_SECOND,
    );
  }

  static fromFeetPerMinute(value: number): FeetPerSecond {
    return new FeetPerSecond(
      (value * METERS_PER_SECOND_PER_FPM) / METERS_PER_SECOND_PER_FOOT_PER_SECOND,
    );
  }

  toMetersPerSecond(): MetersPerSecond {
    return new MetersPerSecond(this.value * METERS_PER_SECOND_PER_FOOT_PER_SECOND);
  }

  toFeetPerSecond(): FeetPerSecond {
    return this;
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
    return this.toMetersPerSecond().toFeetPerMinute();
  }

  toSIUnits(): MetersPerSecond {
    return this.toMetersPerSecond();
  }

  getStringUnits(): string {
    return "ft/s";
  }
}
