import { assertNonNegative } from "../../core/validate.js";
import { Density } from "../../categories/Density.js";
import type { Unit } from "../../categories/Unit.js";
import { KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT } from "./constants.js";
import { KilogramsPerCubicMeter } from "./KilogramsPerCubicMeter.js";

export class SlugsPerCubicFoot extends Density {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "SlugsPerCubicFoot");
  }

  static fromSlugsPerCubicFoot(value: number): SlugsPerCubicFoot {
    return new SlugsPerCubicFoot(value);
  }

  static fromKilogramsPerCubicMeter(value: number): SlugsPerCubicFoot {
    return new SlugsPerCubicFoot(value / KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT);
  }

  static fromSIValue(value: number | Unit): SlugsPerCubicFoot {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return SlugsPerCubicFoot.fromKilogramsPerCubicMeter(si);
  }

  toKilogramsPerCubicMeter(): KilogramsPerCubicMeter {
    return new KilogramsPerCubicMeter(this.value * KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT);
  }

  toSlugsPerCubicFoot(): SlugsPerCubicFoot {
    return this;
  }

  toSIUnits(): KilogramsPerCubicMeter {
    return this.toKilogramsPerCubicMeter();
  }

  getStringUnits(): string {
    return "slug/ft³";
  }
}
