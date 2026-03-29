import type { FeetPerSecondSquared } from "../units/acceleration/FeetPerSecondSquared.js";
import type { MetersPerSecondSquared } from "../units/acceleration/MetersPerSecondSquared.js";

export abstract class Acceleration {
  abstract readonly value: number;

  abstract toMetersPerSecondSquared(): MetersPerSecondSquared;
  abstract toFeetPerSecondSquared(): FeetPerSecondSquared;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
