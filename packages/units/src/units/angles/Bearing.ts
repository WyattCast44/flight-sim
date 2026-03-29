import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Angles } from "../../categories/Angles.js";
import {
  bearingClockwiseDegreesToRadians,
  mathRadiansToDegrees,
  normalizeCardinal1to360,
} from "./angleMath.js";
import { Degrees } from "./Degrees.js";
import { DegreesCardinal } from "./DegreesCardinal.js";
import { Radians } from "./Radians.js";

/**
 * Bearing: clockwise degrees from north; value may be any finite real (multi-turn).
 * Use {@link Bearing.toDegreesCardinal} for the 1–360° equivalent direction.
 */
export class Bearing extends Angles {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Bearing");
  }

  static fromBearing(value: number): Bearing {
    return new Bearing(value);
  }

  static fromRadians(value: number): Bearing {
    return new Radians(value).toBearing();
  }

  static fromDegrees(value: number): Bearing {
    return new Degrees(value).toBearing();
  }

  static fromDegreesCardinal(value: number): Bearing {
    return new DegreesCardinal(value).toBearing();
  }

  toRadians(): Radians {
    return new Radians(bearingClockwiseDegreesToRadians(this.value));
  }

  toDegrees(): Degrees {
    return new Degrees(mathRadiansToDegrees(this.toRadians().value));
  }

  toDegreesCardinal(): DegreesCardinal {
    return new DegreesCardinal(normalizeCardinal1to360(this.value));
  }

  toBearing(): Bearing {
    return this;
  }

  getStringUnits(): string {
    return "°";
  }

  toString(): string {
    return `${formatUnitValue(this.value)}°`;
  }
}
