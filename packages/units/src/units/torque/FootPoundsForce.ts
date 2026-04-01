import { assertFiniteNumber } from "../../core/validate.js";
import { Torque } from "../../categories/Torque.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): FootPoundsForce {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return FootPoundsForce.fromNewtonMeters(si);
  }

  toNewtonMeters(): NewtonMeters {
    return new NewtonMeters(this.value * NEWTON_METERS_PER_FOOT_POUND_FORCE);
  }

  toFootPoundsForce(): FootPoundsForce {
    return this;
  }

  toSIUnits(): NewtonMeters {
    return this.toNewtonMeters();
  }

  getStringUnits(): string {
    return "ft·lbf";
  }
}
