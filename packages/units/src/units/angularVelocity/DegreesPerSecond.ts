import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { AngularVelocity } from "../../categories/AngularVelocity.js";
import {
  RADIANS_PER_DEGREE,
  RADIANS_PER_REVOLUTION_PER_MINUTE,
} from "./constants.js";
import { RadiansPerSecond } from "./RadiansPerSecond.js";
import { RevolutionsPerMinute } from "./RevolutionsPerMinute.js";

export class DegreesPerSecond extends AngularVelocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "DegreesPerSecond");
  }

  static fromDegreesPerSecond(value: number): DegreesPerSecond {
    return new DegreesPerSecond(value);
  }

  static fromRadiansPerSecond(value: number): DegreesPerSecond {
    return new DegreesPerSecond(value / RADIANS_PER_DEGREE);
  }

  static fromRevolutionsPerMinute(value: number): DegreesPerSecond {
    return new DegreesPerSecond(
      (value * RADIANS_PER_REVOLUTION_PER_MINUTE) / RADIANS_PER_DEGREE,
    );
  }

  toRadiansPerSecond(): RadiansPerSecond {
    return new RadiansPerSecond(this.value * RADIANS_PER_DEGREE);
  }

  toDegreesPerSecond(): DegreesPerSecond {
    return this;
  }

  toRevolutionsPerMinute(): RevolutionsPerMinute {
    return this.toRadiansPerSecond().toRevolutionsPerMinute();
  }

  getStringUnits(): string {
    return "deg/s";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} deg/s`;
  }
}
