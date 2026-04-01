import type { DegreesPerSecond } from "../units/angularVelocity/DegreesPerSecond.js";
import type { RadiansPerSecond } from "../units/angularVelocity/RadiansPerSecond.js";
import type { RevolutionsPerMinute } from "../units/angularVelocity/RevolutionsPerMinute.js";
import { Unit } from "./Unit.js";

export abstract class AngularVelocity extends Unit {
  abstract toRadiansPerSecond(): RadiansPerSecond;
  abstract toDegreesPerSecond(): DegreesPerSecond;
  abstract toRevolutionsPerMinute(): RevolutionsPerMinute;

  abstract toSIUnits(): RadiansPerSecond;
}
