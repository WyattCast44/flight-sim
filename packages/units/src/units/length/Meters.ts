import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Length } from "../../categories/Length.js";
import { Feet } from "./Feet.js";
import { Inches } from "./Inches.js";
import { Kilometers } from "./Kilometers.js";
import {
  METERS_PER_FOOT,
  METERS_PER_INCH,
  METERS_PER_KILOMETER,
  METERS_PER_NAUTICAL_MILE,
} from "./constants.js";
import { NauticalMiles } from "./NauticalMiles.js";

/**
 * Length in meters (SI base for this category).
 */
export class Meters extends Length {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Meters");
  }

  static fromMeters(value: number): Meters {
    return new Meters(value);
  }

  static fromFeet(value: number): Meters {
    return new Meters(value * METERS_PER_FOOT);
  }

  static fromInches(value: number): Meters {
    return new Meters(value * METERS_PER_INCH);
  }

  static fromNauticalMiles(value: number): Meters {
    return new Meters(value * METERS_PER_NAUTICAL_MILE);
  }

  static fromKilometers(value: number): Meters {
    return new Meters(value * METERS_PER_KILOMETER);
  }

  toFeet(): Feet {
    return new Feet(this.value / METERS_PER_FOOT);
  }

  toMeters(): Meters {
    return this;
  }

  toNauticalMiles(): NauticalMiles {
    return new NauticalMiles(this.value / METERS_PER_NAUTICAL_MILE);
  }

  toKilometers(): Kilometers {
    return new Kilometers(this.value / METERS_PER_KILOMETER);
  }

  toInches(): Inches {
    return new Inches(this.value / METERS_PER_INCH);
  }

  getStringUnits(): string {
    return "m";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} m`;
  }
}
