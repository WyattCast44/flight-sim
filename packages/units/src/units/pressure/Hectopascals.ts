import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Pressure } from "../../categories/Pressure.js";
import {
  PASCALS_PER_HECTOPASCAL,
  PASCALS_PER_PSF,
  PASCALS_PER_PSI,
} from "./constants.js";
import { Pascals } from "./Pascals.js";
import { PoundsPerSquareFoot } from "./PoundsPerSquareFoot.js";
import { PoundsPerSquareInch } from "./PoundsPerSquareInch.js";

/**
 * Hectopascals (100 Pa). Millibars are identical (1 mb = 1 hPa); use {@link Hectopascals.fromMillibars}.
 */
export class Hectopascals extends Pressure {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Hectopascals");
  }

  static fromHectopascals(value: number): Hectopascals {
    return new Hectopascals(value);
  }

  /** Alias: 1 millibar = 1 hPa. */
  static fromMillibars(value: number): Hectopascals {
    return new Hectopascals(value);
  }

  static fromPascals(value: number): Hectopascals {
    return new Hectopascals(value / PASCALS_PER_HECTOPASCAL);
  }

  static fromPoundsPerSquareInch(value: number): Hectopascals {
    return new Hectopascals((value * PASCALS_PER_PSI) / PASCALS_PER_HECTOPASCAL);
  }

  static fromPoundsPerSquareFoot(value: number): Hectopascals {
    return new Hectopascals((value * PASCALS_PER_PSF) / PASCALS_PER_HECTOPASCAL);
  }

  toPascals(): Pascals {
    return new Pascals(this.value * PASCALS_PER_HECTOPASCAL);
  }

  toHectopascals(): Hectopascals {
    return this;
  }

  toPoundsPerSquareInch(): PoundsPerSquareInch {
    return this.toPascals().toPoundsPerSquareInch();
  }

  toPoundsPerSquareFoot(): PoundsPerSquareFoot {
    return this.toPascals().toPoundsPerSquareFoot();
  }

  getStringUnits(): string {
    return "hPa";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} hPa`;
  }
}
