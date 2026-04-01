import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Angles } from "../../categories/Angles.js";
import type { Unit } from "../../categories/Unit.js";
import {
  cardinalDegreesToRadians,
  normalizeCardinal1to360,
  radiansToCardinalDegrees,
} from "./angleMath.js";
import { Bearing } from "./Bearing.js";
import { Degrees } from "./Degrees.js";
import { Radians } from "./Radians.js";

/**
 * Compass angle: 1–360°, positive clockwise from north.
 */
export class DegreesCardinal extends Angles {
  public readonly value: number;

  constructor(value: number) {
    super();
    assertFiniteNumber(value, "DegreesCardinal");
    this.value = normalizeCardinal1to360(value);
  }

  static fromDegreesCardinal(value: number): DegreesCardinal {
    return new DegreesCardinal(value);
  }

  static fromRadians(value: number): DegreesCardinal {
    return new DegreesCardinal(radiansToCardinalDegrees(value));
  }

  static fromDegrees(value: number): DegreesCardinal {
    return new DegreesCardinal(90 - value);
  }

  static fromBearing(value: number): DegreesCardinal {
    return new DegreesCardinal(value);
  }

  static fromSIValue(value: number | Unit): DegreesCardinal {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return DegreesCardinal.fromRadians(si);
  }

  toRadians(): Radians {
    return new Radians(cardinalDegreesToRadians(this.value));
  }

  toDegrees(): Degrees {
    return new Degrees(90 - this.value);
  }

  toDegreesCardinal(): DegreesCardinal {
    return this;
  }

  toBearing(): Bearing {
    return new Bearing(this.value);
  }

  toSIUnits(): Radians {
    return this.toRadians();
  }

  getStringUnits(): string {
    return "°";
  }

  toString(): string {
    return `${formatUnitValue(this.value)}°`;
  }
}
