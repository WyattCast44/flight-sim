import { assertFiniteNumber } from "../../core/validate.js";
import { AngularVelocity } from "../../categories/AngularVelocity.js";
import {
  RADIANS_PER_DEGREE,
  RADIANS_PER_REVOLUTION_PER_MINUTE,
} from "./constants.js";
import { DegreesPerSecond } from "./DegreesPerSecond.js";
import { RadiansPerSecond } from "./RadiansPerSecond.js";

export class RevolutionsPerMinute extends AngularVelocity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "RevolutionsPerMinute");
  }

  static fromRevolutionsPerMinute(value: number): RevolutionsPerMinute {
    return new RevolutionsPerMinute(value);
  }

  static fromRadiansPerSecond(value: number): RevolutionsPerMinute {
    return new RevolutionsPerMinute(value / RADIANS_PER_REVOLUTION_PER_MINUTE);
  }

  static fromDegreesPerSecond(value: number): RevolutionsPerMinute {
    return new RevolutionsPerMinute(
      (value * RADIANS_PER_DEGREE) / RADIANS_PER_REVOLUTION_PER_MINUTE,
    );
  }

  toRadiansPerSecond(): RadiansPerSecond {
    return new RadiansPerSecond(this.value * RADIANS_PER_REVOLUTION_PER_MINUTE);
  }

  toDegreesPerSecond(): DegreesPerSecond {
    return this.toRadiansPerSecond().toDegreesPerSecond();
  }

  toRevolutionsPerMinute(): RevolutionsPerMinute {
    return this;
  }

  toSIUnits(): RadiansPerSecond {
    return this.toRadiansPerSecond();
  }

  getStringUnits(): string {
    return "RPM";
  }
}
