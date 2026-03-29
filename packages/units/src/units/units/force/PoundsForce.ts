import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Force } from "../../categories/Force.js";
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

  toNewtons(): Newtons {
    return new Newtons(this.value * NEWTONS_PER_POUND_FORCE);
  }

  toPoundsForce(): PoundsForce {
    return this;
  }

  getStringUnits(): string {
    return "lbf";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} lbf`;
  }
}
