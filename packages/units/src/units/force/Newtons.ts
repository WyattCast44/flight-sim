import { assertFiniteNumber } from "../../core/validate.js";
import { Force } from "../../categories/Force.js";
import type { Unit } from "../../categories/Unit.js";
import { NEWTONS_PER_POUND_FORCE } from "./constants.js";
import { PoundsForce } from "./PoundsForce.js";

export class Newtons extends Force {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Newtons");
  }

  static fromNewtons(value: number): Newtons {
    return new Newtons(value);
  }

  static fromPoundsForce(value: number): Newtons {
    return new Newtons(value * NEWTONS_PER_POUND_FORCE);
  }

  static fromSIValue(value: number | Unit): Newtons {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Newtons.fromNewtons(si);
  }

  toNewtons(): Newtons {
    return this;
  }

  toPoundsForce(): PoundsForce {
    return new PoundsForce(this.value / NEWTONS_PER_POUND_FORCE);
  }

  toSIUnits(): Newtons {
    return this;
  }

  getStringUnits(): string {
    return "N";
  }
}
