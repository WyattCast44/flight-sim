import { assertFiniteNumber } from "../../core/validate.js";
import { Angles } from "../../categories/Angles.js";
import {
  bearingClockwiseDegreesToRadians,
  mathDegreesToRadians,
  mathRadiansToDegrees,
  normalizeCardinal1to360,
  radiansToCardinalDegrees,
  radiansToClockwiseBearingDegrees,
} from "./angleMath.js";
import { Bearing } from "./Bearing.js";
import { Degrees } from "./Degrees.js";
import { DegreesCardinal } from "./DegreesCardinal.js";

export class Radians extends Angles {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Radians");
  }

  static fromRadians(value: number): Radians {
    return new Radians(value);
  }

  static fromDegrees(value: number): Radians {
    return new Radians(mathDegreesToRadians(value));
  }

  static fromDegreesCardinal(value: number): Radians {
    return new Radians(Math.PI / 2 - (normalizeCardinal1to360(value) * Math.PI) / 180);
  }

  static fromBearing(value: number): Radians {
    return new Radians(bearingClockwiseDegreesToRadians(value));
  }

  toRadians(): Radians {
    return this;
  }

  toDegrees(): Degrees {
    return new Degrees(mathRadiansToDegrees(this.value));
  }

  toDegreesCardinal(): DegreesCardinal {
    return new DegreesCardinal(radiansToCardinalDegrees(this.value));
  }

  toBearing(): Bearing {
    return new Bearing(radiansToClockwiseBearingDegrees(this.value));
  }

  toSIUnits(): Radians {
    return this;
  }

  getStringUnits(): string {
    return "rad";
  }
}
