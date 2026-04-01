import { assertFiniteNumber } from "../../core/validate.js";
import { AngularVelocity } from "../../categories/AngularVelocity.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): RadiansPerSecond {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return RadiansPerSecond.fromRadiansPerSecond(si);
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

  toSIUnits(): RadiansPerSecond {
    return this;
  }

  getStringUnits(): string {
    return "rad/s";
  }
}
