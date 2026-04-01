import { assertFiniteNumber } from "../../core/validate.js";
import { AngularAcceleration } from "../../categories/AngularAcceleration.js";
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
