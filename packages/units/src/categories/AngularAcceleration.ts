import type { DegreesPerSecondSquared } from "../units/angularAcceleration/DegreesPerSecondSquared.js";
import type { RadiansPerSecondSquared } from "../units/angularAcceleration/RadiansPerSecondSquared.js";

export abstract class AngularAcceleration {
  abstract readonly value: number;

  abstract toRadiansPerSecondSquared(): RadiansPerSecondSquared;
  abstract toDegreesPerSecondSquared(): DegreesPerSecondSquared;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
