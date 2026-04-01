import { assertFiniteNumber } from "../../core/validate.js";
import { Torque } from "../../categories/Torque.js";
import type { Unit } from "../../categories/Unit.js";
import { NEWTON_METERS_PER_FOOT_POUND_FORCE } from "./constants.js";
import { FootPoundsForce } from "./FootPoundsForce.js";

export class NewtonMeters extends Torque {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "NewtonMeters");
  }

  static fromNewtonMeters(value: number): NewtonMeters {
    return new NewtonMeters(value);
  }

  static fromFootPoundsForce(value: number): NewtonMeters {
    return new NewtonMeters(value * NEWTON_METERS_PER_FOOT_POUND_FORCE);
  }

  static fromSIValue(value: number | Unit): NewtonMeters {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return NewtonMeters.fromNewtonMeters(si);
  }

  toNewtonMeters(): NewtonMeters {
    return this;
  }

  toFootPoundsForce(): FootPoundsForce {
    return new FootPoundsForce(this.value / NEWTON_METERS_PER_FOOT_POUND_FORCE);
  }

  toSIUnits(): NewtonMeters {
    return this;
  }

  getStringUnits(): string {
    return "N·m";
  }
}
