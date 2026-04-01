import { assertFiniteNumber } from "../../core/validate.js";
import { AngularAcceleration } from "../../categories/AngularAcceleration.js";
import { RADIANS_PER_DEGREE } from "./constants.js";
import { DegreesPerSecondSquared } from "./DegreesPerSecondSquared.js";

export class RadiansPerSecondSquared extends AngularAcceleration {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "RadiansPerSecondSquared");
  }

  static fromRadiansPerSecondSquared(value: number): RadiansPerSecondSquared {
    return new RadiansPerSecondSquared(value);
  }

  static fromDegreesPerSecondSquared(value: number): RadiansPerSecondSquared {
    return new RadiansPerSecondSquared(value * RADIANS_PER_DEGREE);
  }

  toRadiansPerSecondSquared(): RadiansPerSecondSquared {
    return this;
  }

  toDegreesPerSecondSquared(): DegreesPerSecondSquared {
    return new DegreesPerSecondSquared(this.value / RADIANS_PER_DEGREE);
  }

  toSIUnits(): RadiansPerSecondSquared {
    return this;
  }

  getStringUnits(): string {
    return "rad/s²";
  }
}
