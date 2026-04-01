import type { FeetPerSecondSquared } from "../units/acceleration/FeetPerSecondSquared.js";
import type { MetersPerSecondSquared } from "../units/acceleration/MetersPerSecondSquared.js";
import { Unit } from "./Unit.js";

export abstract class Acceleration extends Unit {
  abstract toMetersPerSecondSquared(): MetersPerSecondSquared;
  abstract toFeetPerSecondSquared(): FeetPerSecondSquared;

  abstract toSIUnits(): MetersPerSecondSquared;
}
