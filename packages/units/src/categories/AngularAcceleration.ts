import type { DegreesPerSecondSquared } from "../units/angularAcceleration/DegreesPerSecondSquared.js";
import type { RadiansPerSecondSquared } from "../units/angularAcceleration/RadiansPerSecondSquared.js";
import { Unit } from "./Unit.js";

export abstract class AngularAcceleration extends Unit {
  abstract toRadiansPerSecondSquared(): RadiansPerSecondSquared;
  abstract toDegreesPerSecondSquared(): DegreesPerSecondSquared;

  abstract toSIUnits(): RadiansPerSecondSquared;
}
