import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Torque } from "../../categories/Torque.js";
import { NEWTON_METERS_PER_FOOT_POUND_FORCE } from "./constants.js";
import { NewtonMeters } from "./NewtonMeters.js";

export class FootPoundsForce extends Torque {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "FootPoundsForce");
  }

  static fromFootPoundsForce(value: number): FootPoundsForce {
    return new FootPoundsForce(value);
  }

  static fromNewtonMeters(value: number): FootPoundsForce {
    return new FootPoundsForce(value / NEWTON_METERS_PER_FOOT_POUND_FORCE);
  }

  toNewtonMeters(): NewtonMeters {
    return new NewtonMeters(this.value * NEWTON_METERS_PER_FOOT_POUND_FORCE);
  }

  toFootPoundsForce(): FootPoundsForce {
    return this;
  }

  getStringUnits(): string {
    return "ft·lbf";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} ft·lbf`;
  }
}
