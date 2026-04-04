import { assertFiniteNumber } from "../../core/validate.js";
import { Viscosity } from "../../categories/Viscosity.js";
import type { Unit } from "../../categories/Unit.js";

export class PascalSeconds extends Viscosity {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "PascalSeconds");
  }

  static fromPascalSeconds(value: number): PascalSeconds {
    return new PascalSeconds(value);
  }

  static fromSIValue(value: number | Unit): PascalSeconds {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return PascalSeconds.fromPascalSeconds(si);
  }

  toPascalSeconds(): PascalSeconds {
    return this;
  }

  toSIUnits(): PascalSeconds {
    return this;
  }

  getStringUnits(): string {
    return "Pa·s";
  }
}
