import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Density } from "../../categories/Density.js";
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

  toKilogramsPerCubicMeter(): KilogramsPerCubicMeter {
    return new KilogramsPerCubicMeter(this.value * KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT);
  }

  toSlugsPerCubicFoot(): SlugsPerCubicFoot {
    return this;
  }

  getStringUnits(): string {
    return "slug/ft³";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} slug/ft³`;
  }
}
