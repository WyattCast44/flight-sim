import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Pressure } from "../../categories/Pressure.js";
import {
  PASCALS_PER_HECTOPASCAL,
  PASCALS_PER_PSF,
  PASCALS_PER_PSI,
} from "./constants.js";
import { Hectopascals } from "./Hectopascals.js";
import { Pascals } from "./Pascals.js";
import { PoundsPerSquareInch } from "./PoundsPerSquareInch.js";

export class PoundsPerSquareFoot extends Pressure {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "PoundsPerSquareFoot");
  }

  static fromPoundsPerSquareFoot(value: number): PoundsPerSquareFoot {
    return new PoundsPerSquareFoot(value);
  }

  static fromPascals(value: number): PoundsPerSquareFoot {
    return new PoundsPerSquareFoot(value / PASCALS_PER_PSF);
  }

  static fromHectopascals(value: number): PoundsPerSquareFoot {
    return new PoundsPerSquareFoot(
      (value * PASCALS_PER_HECTOPASCAL) / PASCALS_PER_PSF,
    );
  }

  static fromMillibars(value: number): PoundsPerSquareFoot {
    return new PoundsPerSquareFoot(
      (value * PASCALS_PER_HECTOPASCAL) / PASCALS_PER_PSF,
    );
  }

  static fromPoundsPerSquareInch(value: number): PoundsPerSquareFoot {
    return new PoundsPerSquareFoot(
      (value * PASCALS_PER_PSI) / PASCALS_PER_PSF,
    );
  }

  toPascals(): Pascals {
    return new Pascals(this.value * PASCALS_PER_PSF);
  }

  toHectopascals(): Hectopascals {
    return this.toPascals().toHectopascals();
  }

  toPoundsPerSquareInch(): PoundsPerSquareInch {
    return this.toPascals().toPoundsPerSquareInch();
  }

  toPoundsPerSquareFoot(): PoundsPerSquareFoot {
    return this;
  }

  getStringUnits(): string {
    return "psf";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} psf`;
  }
}
