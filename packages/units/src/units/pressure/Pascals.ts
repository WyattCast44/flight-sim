import { assertFiniteNumber } from "../../core/validate.js";
import { Pressure } from "../../categories/Pressure.js";
import {
  PASCALS_PER_HECTOPASCAL,
  PASCALS_PER_PSF,
  PASCALS_PER_PSI,
} from "./constants.js";
import { Hectopascals } from "./Hectopascals.js";
import { PoundsPerSquareFoot } from "./PoundsPerSquareFoot.js";
import { PoundsPerSquareInch } from "./PoundsPerSquareInch.js";

export class Pascals extends Pressure {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Pascals");
  }

  static fromPascals(value: number): Pascals {
    return new Pascals(value);
  }

  static fromHectopascals(value: number): Pascals {
    return new Pascals(value * PASCALS_PER_HECTOPASCAL);
  }

  static fromMillibars(value: number): Pascals {
    return new Pascals(value * PASCALS_PER_HECTOPASCAL);
  }

  static fromPoundsPerSquareInch(value: number): Pascals {
    return new Pascals(value * PASCALS_PER_PSI);
  }

  static fromPoundsPerSquareFoot(value: number): Pascals {
    return new Pascals(value * PASCALS_PER_PSF);
  }

  toPascals(): Pascals {
    return this;
  }

  toHectopascals(): Hectopascals {
    return new Hectopascals(this.value / PASCALS_PER_HECTOPASCAL);
  }

  toPoundsPerSquareInch(): PoundsPerSquareInch {
    return new PoundsPerSquareInch(this.value / PASCALS_PER_PSI);
  }

  toPoundsPerSquareFoot(): PoundsPerSquareFoot {
    return new PoundsPerSquareFoot(this.value / PASCALS_PER_PSF);
  }

  toSIUnits(): Pascals {
    return this;
  }

  getStringUnits(): string {
    return "Pa";
  }
}
