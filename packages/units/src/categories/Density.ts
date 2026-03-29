import type { KilogramsPerCubicMeter } from "../units/density/KilogramsPerCubicMeter.js";
import type { SlugsPerCubicFoot } from "../units/density/SlugsPerCubicFoot.js";

export abstract class Density {
  abstract readonly value: number;

  abstract toKilogramsPerCubicMeter(): KilogramsPerCubicMeter;
  abstract toSlugsPerCubicFoot(): SlugsPerCubicFoot;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
