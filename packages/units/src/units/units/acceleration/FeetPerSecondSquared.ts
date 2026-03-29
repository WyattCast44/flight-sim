import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Acceleration } from "../../categories/Acceleration.js";
import { METERS_PER_FOOT } from "./constants.js";
import { MetersPerSecondSquared } from "./MetersPerSecondSquared.js";

export class FeetPerSecondSquared extends Acceleration {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "FeetPerSecondSquared");
  }

  static fromFeetPerSecondSquared(value: number): FeetPerSecondSquared {
    return new FeetPerSecondSquared(value);
  }

  static fromMetersPerSecondSquared(value: number): FeetPerSecondSquared {
    return new FeetPerSecondSquared(value / METERS_PER_FOOT);
  }

  toMetersPerSecondSquared(): MetersPerSecondSquared {
    return new MetersPerSecondSquared(this.value * METERS_PER_FOOT);
  }

  toFeetPerSecondSquared(): FeetPerSecondSquared {
    return this;
  }

  getStringUnits(): string {
    return "ft/s²";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} ft/s²`;
  }
}
