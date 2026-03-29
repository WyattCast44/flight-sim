import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Angles } from "../../categories/Angles.js";
import {
  bearingClockwiseDegreesToRadians,
  mathDegreesToRadians,
  mathRadiansToDegrees,
  normalizeCardinal1to360,
  radiansToCardinalDegrees,
} from "./angleMath.js";
import { Bearing } from "./Bearing.js";
import { DegreesCardinal } from "./DegreesCardinal.js";
import { Radians } from "./Radians.js";

/**
 * Mathematical angle in degrees (positive counterclockwise).
 */
export class Degrees extends Angles {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Degrees");
  }

  static fromDegrees(value: number): Degrees {
    return new Degrees(value);
  }

  static fromRadians(value: number): Degrees {
    return new Degrees(mathRadiansToDegrees(value));
  }

  static fromDegreesCardinal(value: number): Degrees {
    const c = normalizeCardinal1to360(value);
    return new Degrees(90 - c);
  }

  static fromBearing(value: number): Degrees {
    return new Degrees(mathRadiansToDegrees(bearingClockwiseDegreesToRadians(value)));
  }

  toRadians(): Radians {
    return new Radians(mathDegreesToRadians(this.value));
  }

  toDegrees(): Degrees {
    return this;
  }

  toDegreesCardinal(): DegreesCardinal {
    return new DegreesCardinal(radiansToCardinalDegrees(this.toRadians().value));
  }

  toBearing(): Bearing {
    return this.toRadians().toBearing();
  }

  getStringUnits(): string {
    return "°";
  }

  toString(): string {
    return `${formatUnitValue(this.value)}°`;
  }
}
