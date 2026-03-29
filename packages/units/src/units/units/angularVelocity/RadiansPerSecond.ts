import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { AngularVelocity } from "../../categories/AngularVelocity.js";
import {
  RADIANS_PER_DEGREE,
  RADIANS_PER_REVOLUTION_PER_MINUTE,
} from "./constants.js";
import { DegreesPerSecond } from "./DegreesPerSecond.js";
import { RevolutionsPerMinute } from "./RevolutionsPerMinute.js";

export class RadiansPerSecond extends AngularVelocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "RadiansPerSecond");
  }

  static fromRadiansPerSecond(value: number): RadiansPerSecond {
    return new RadiansPerSecond(value);
  }

  static fromDegreesPerSecond(value: number): RadiansPerSecond {
    return new RadiansPerSecond(value * RADIANS_PER_DEGREE);
  }

  static fromRevolutionsPerMinute(value: number): RadiansPerSecond {
    return new RadiansPerSecond(value * RADIANS_PER_REVOLUTION_PER_MINUTE);
  }

  toRadiansPerSecond(): RadiansPerSecond {
    return this;
  }

  toDegreesPerSecond(): DegreesPerSecond {
    return new DegreesPerSecond(this.value / RADIANS_PER_DEGREE);
  }

  toRevolutionsPerMinute(): RevolutionsPerMinute {
    return new RevolutionsPerMinute(this.value / RADIANS_PER_REVOLUTION_PER_MINUTE);
  }

  getStringUnits(): string {
    return "rad/s";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} rad/s`;
  }
}
