import { assertFiniteNumber } from "../../core/validate.js";
import { Pressure } from "../../categories/Pressure.js";
import type { Unit } from "../../categories/Unit.js";
import {
  PASCALS_PER_HECTOPASCAL,
  PASCALS_PER_PSF,
  PASCALS_PER_PSI,
} from "./constants.js";
import { Hectopascals } from "./Hectopascals.js";
import { Pascals } from "./Pascals.js";
import { PoundsPerSquareFoot } from "./PoundsPerSquareFoot.js";

export class PoundsPerSquareInch extends Pressure {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "PoundsPerSquareInch");
  }

  static fromPoundsPerSquareInch(value: number): PoundsPerSquareInch {
    return new PoundsPerSquareInch(value);
  }

  static fromPascals(value: number): PoundsPerSquareInch {
    return new PoundsPerSquareInch(value / PASCALS_PER_PSI);
  }

  static fromHectopascals(value: number): PoundsPerSquareInch {
    return new PoundsPerSquareInch(
      (value * PASCALS_PER_HECTOPASCAL) / PASCALS_PER_PSI,
    );
  }

  static fromMillibars(value: number): PoundsPerSquareInch {
    return new PoundsPerSquareInch(
      (value * PASCALS_PER_HECTOPASCAL) / PASCALS_PER_PSI,
    );
  }

  static fromPoundsPerSquareFoot(value: number): PoundsPerSquareInch {
    return new PoundsPerSquareInch(
      (value * PASCALS_PER_PSF) / PASCALS_PER_PSI,
    );
  }

  static fromSIValue(value: number | Unit): PoundsPerSquareInch {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return PoundsPerSquareInch.fromPascals(si);
  }

  toPascals(): Pascals {
    return new Pascals(this.value * PASCALS_PER_PSI);
  }

  toHectopascals(): Hectopascals {
    return this.toPascals().toHectopascals();
  }

  toPoundsPerSquareInch(): PoundsPerSquareInch {
    return this;
  }

  toPoundsPerSquareFoot(): PoundsPerSquareFoot {
    return this.toPascals().toPoundsPerSquareFoot();
  }

  toSIUnits(): Pascals {
    return this.toPascals();
  }

  getStringUnits(): string {
    return "psi";
  }
}
