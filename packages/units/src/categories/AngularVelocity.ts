import type { DegreesPerSecond } from "../units/angularVelocity/DegreesPerSecond.js";
import type { RadiansPerSecond } from "../units/angularVelocity/RadiansPerSecond.js";
import type { RevolutionsPerMinute } from "../units/angularVelocity/RevolutionsPerMinute.js";

export abstract class AngularVelocity {
  abstract readonly value: number;

  abstract toRadiansPerSecond(): RadiansPerSecond;
  abstract toDegreesPerSecond(): DegreesPerSecond;
  abstract toRevolutionsPerMinute(): RevolutionsPerMinute;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
