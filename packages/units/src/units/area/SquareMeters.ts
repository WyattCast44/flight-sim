import { assertFiniteNumber } from "../../core/validate.js";
import { Area } from "../../categories/Area.js";
import type { Unit } from "../../categories/Unit.js";
import { SQUARE_METERS_PER_SQUARE_FOOT } from "./constants.js";
import { SquareFeet } from "./SquareFeet.js";

/**
 * Area in square meters (SI base for this category).
 */
export class SquareMeters extends Area {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "SquareMeters");
  }

  static fromSquareMeters(value: number): SquareMeters {
    return new SquareMeters(value);
  }

  static fromSquareFeet(value: number): SquareMeters {
    return new SquareMeters(value * SQUARE_METERS_PER_SQUARE_FOOT);
  }

  static fromSIValue(value: number | Unit): SquareMeters {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return SquareMeters.fromSquareMeters(si);
  }

  toSquareFeet(): SquareFeet {
    return new SquareFeet(this.value / SQUARE_METERS_PER_SQUARE_FOOT);
  }

  toSquareMeters(): SquareMeters {
    return this;
  }

  toSIUnits(): SquareMeters {
    return this;
  }

  getStringUnits(): string {
    return "m²";
  }
}
