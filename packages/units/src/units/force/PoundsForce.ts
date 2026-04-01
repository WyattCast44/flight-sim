import { assertFiniteNumber } from "../../core/validate.js";
import { Force } from "../../categories/Force.js";
import type { Unit } from "../../categories/Unit.js";
import { NEWTONS_PER_POUND_FORCE } from "./constants.js";
import { Newtons } from "./Newtons.js";

export class PoundsForce extends Force {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "PoundsForce");
  }

  static fromPoundsForce(value: number): PoundsForce {
    return new PoundsForce(value);
  }

  static fromNewtons(value: number): PoundsForce {
    return new PoundsForce(value / NEWTONS_PER_POUND_FORCE);
  }

  static fromSIValue(value: number | Unit): PoundsForce {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return PoundsForce.fromNewtons(si);
  }

  toNewtons(): Newtons {
    return new Newtons(this.value * NEWTONS_PER_POUND_FORCE);
  }

  toPoundsForce(): PoundsForce {
    return this;
  }

  toSIUnits(): Newtons {
    return this.toNewtons();
  }

  getStringUnits(): string {
    return "lbf";
  }
}
