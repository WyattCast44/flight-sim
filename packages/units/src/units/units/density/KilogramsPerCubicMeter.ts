import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Density } from "../../categories/Density.js";
import { KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT } from "./constants.js";
import { SlugsPerCubicFoot } from "./SlugsPerCubicFoot.js";

export class KilogramsPerCubicMeter extends Density {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "KilogramsPerCubicMeter");
  }

  static fromKilogramsPerCubicMeter(value: number): KilogramsPerCubicMeter {
    return new KilogramsPerCubicMeter(value);
  }

  static fromSlugsPerCubicFoot(value: number): KilogramsPerCubicMeter {
    return new KilogramsPerCubicMeter(value * KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT);
  }

  toKilogramsPerCubicMeter(): KilogramsPerCubicMeter {
    return this;
  }

  toSlugsPerCubicFoot(): SlugsPerCubicFoot {
    return new SlugsPerCubicFoot(this.value / KILOGRAMS_PER_CUBIC_METER_PER_SLUG_PER_CUBIC_FOOT);
  }

  getStringUnits(): string {
    return "kg/m³";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} kg/m³`;
  }
}
