import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Acceleration } from "../../categories/Acceleration.js";
import { METERS_PER_FOOT } from "./constants.js";
import { FeetPerSecondSquared } from "./FeetPerSecondSquared.js";

export class MetersPerSecondSquared extends Acceleration {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "MetersPerSecondSquared");
  }

  static fromMetersPerSecondSquared(value: number): MetersPerSecondSquared {
    return new MetersPerSecondSquared(value);
  }

  static fromFeetPerSecondSquared(value: number): MetersPerSecondSquared {
    return new MetersPerSecondSquared(value * METERS_PER_FOOT);
  }

  toMetersPerSecondSquared(): MetersPerSecondSquared {
    return this;
  }

  toFeetPerSecondSquared(): FeetPerSecondSquared {
    return new FeetPerSecondSquared(this.value / METERS_PER_FOOT);
  }

  getStringUnits(): string {
    return "m/s²";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} m/s²`;
  }
}
