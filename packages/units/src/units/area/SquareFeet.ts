import { assertFiniteNumber } from "../../core/validate.js";
import { Area } from "../../categories/Area.js";
import type { Unit } from "../../categories/Unit.js";
import { SQUARE_METERS_PER_SQUARE_FOOT } from "./constants.js";
import { SquareMeters } from "./SquareMeters.js";

/**
 * Area in square feet.
 */
export class SquareFeet extends Area {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "SquareFeet");
  }

  static fromSquareFeet(value: number): SquareFeet {
    return new SquareFeet(value);
  }

  static fromSquareMeters(value: number): SquareFeet {
    return new SquareFeet(value / SQUARE_METERS_PER_SQUARE_FOOT);
  }

  static fromSIValue(value: number | Unit): SquareFeet {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return SquareFeet.fromSquareMeters(si);
  }

  toSquareFeet(): SquareFeet {
    return this;
  }

  toSquareMeters(): SquareMeters {
    return new SquareMeters(this.value * SQUARE_METERS_PER_SQUARE_FOOT);
  }

  toSIUnits(): SquareMeters {
    return this.toSquareMeters();
  }

  getStringUnits(): string {
    return "ft²";
  }
}
