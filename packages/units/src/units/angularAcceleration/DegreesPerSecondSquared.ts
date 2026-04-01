import { assertFiniteNumber } from "../../core/validate.js";
import { AngularAcceleration } from "../../categories/AngularAcceleration.js";
import type { Unit } from "../../categories/Unit.js";
import { RADIANS_PER_DEGREE } from "./constants.js";
import { RadiansPerSecondSquared } from "./RadiansPerSecondSquared.js";

export class DegreesPerSecondSquared extends AngularAcceleration {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "DegreesPerSecondSquared");
  }

  static fromDegreesPerSecondSquared(value: number): DegreesPerSecondSquared {
    return new DegreesPerSecondSquared(value);
  }

  static fromRadiansPerSecondSquared(value: number): DegreesPerSecondSquared {
    return new DegreesPerSecondSquared(value / RADIANS_PER_DEGREE);
  }

  static fromSIValue(value: number | Unit): DegreesPerSecondSquared {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return DegreesPerSecondSquared.fromRadiansPerSecondSquared(si);
  }

  toRadiansPerSecondSquared(): RadiansPerSecondSquared {
    return new RadiansPerSecondSquared(this.value * RADIANS_PER_DEGREE);
  }

  toDegreesPerSecondSquared(): DegreesPerSecondSquared {
    return this;
  }

  toSIUnits(): RadiansPerSecondSquared {
    return this.toRadiansPerSecondSquared();
  }

  getStringUnits(): string {
    return "deg/s²";
  }
}
