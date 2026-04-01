import { assertFiniteNumber } from "../../core/validate.js";
import { Acceleration } from "../../categories/Acceleration.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): MetersPerSecondSquared {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return MetersPerSecondSquared.fromMetersPerSecondSquared(si);
  }

  toMetersPerSecondSquared(): MetersPerSecondSquared {
    return this;
  }

  toFeetPerSecondSquared(): FeetPerSecondSquared {
    return new FeetPerSecondSquared(this.value / METERS_PER_FOOT);
  }

  toSIUnits(): MetersPerSecondSquared {
    return this;
  }

  getStringUnits(): string {
    return "m/s²";
  }
}
