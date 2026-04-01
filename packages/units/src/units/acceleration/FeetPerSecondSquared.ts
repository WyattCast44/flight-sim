import { assertFiniteNumber } from "../../core/validate.js";
import { Acceleration } from "../../categories/Acceleration.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): FeetPerSecondSquared {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return FeetPerSecondSquared.fromMetersPerSecondSquared(si);
  }

  toMetersPerSecondSquared(): MetersPerSecondSquared {
    return new MetersPerSecondSquared(this.value * METERS_PER_FOOT);
  }

  toFeetPerSecondSquared(): FeetPerSecondSquared {
    return this;
  }

  toSIUnits(): MetersPerSecondSquared {
    return this.toMetersPerSecondSquared();
  }

  getStringUnits(): string {
    return "ft/s²";
  }
}
