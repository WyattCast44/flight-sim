import type { KilogramsPerCubicMeter } from "../units/density/KilogramsPerCubicMeter.js";
import type { SlugsPerCubicFoot } from "../units/density/SlugsPerCubicFoot.js";
import { Unit } from "./Unit.js";

export abstract class Density extends Unit {
  abstract toKilogramsPerCubicMeter(): KilogramsPerCubicMeter;
  abstract toSlugsPerCubicFoot(): SlugsPerCubicFoot;

  abstract toSIUnits(): KilogramsPerCubicMeter;
}
