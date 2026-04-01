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
import { MetersPerSecond } from "./MetersPerSecond.js";
import { MilesPerHour } from "./MilesPerHour.js";

export class Knots extends Velocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Knots");
  }

  static fromKnots(value: number): Knots {
    return new Knots(value);
  }

  static fromMetersPerSecond(value: number): Knots {
    return new Knots(value / METERS_PER_SECOND_PER_KNOT);
  }

  static fromFeetPerSecond(value: number): Knots {
    return new Knots(
      (value * METERS_PER_SECOND_PER_FOOT_PER_SECOND) / METERS_PER_SECOND_PER_KNOT,
    );
  }

  static fromMilesPerHour(value: number): Knots {
    return new Knots((value * METERS_PER_SECOND_PER_MPH) / METERS_PER_SECOND_PER_KNOT);
  }

  static fromKilometersPerHour(value: number): Knots {
    return new Knots((value * METERS_PER_SECOND_PER_KMH) / METERS_PER_SECOND_PER_KNOT);
  }

  static fromFeetPerMinute(value: number): Knots {
    return new Knots((value * METERS_PER_SECOND_PER_FPM) / METERS_PER_SECOND_PER_KNOT);
  }

  toMetersPerSecond(): MetersPerSecond {
    return new MetersPerSecond(this.value * METERS_PER_SECOND_PER_KNOT);
  }

  toFeetPerSecond(): FeetPerSecond {
    return this.toMetersPerSecond().toFeetPerSecond();
  }

  toKnots(): Knots {
    return this;
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
    return "kt";
  }
}
