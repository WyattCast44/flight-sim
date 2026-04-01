import { assertFiniteNumber } from "../../core/validate.js";
import { Length } from "../../categories/Length.js";
import type { Unit } from "../../categories/Unit.js";
import { Feet } from "./Feet.js";
import { Kilometers } from "./Kilometers.js";
import { Meters } from "./Meters.js";
import {
  METERS_PER_FOOT,
  METERS_PER_INCH,
  METERS_PER_KILOMETER,
  METERS_PER_NAUTICAL_MILE,
} from "./constants.js";
import { NauticalMiles } from "./NauticalMiles.js";

/**
 * Length in inches.
 */
export class Inches extends Length {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Inches");
  }

  static fromInches(value: number): Inches {
    return new Inches(value);
  }

  static fromMeters(value: number): Inches {
    return new Inches(value / METERS_PER_INCH);
  }

  static fromFeet(value: number): Inches {
    return new Inches((value * METERS_PER_FOOT) / METERS_PER_INCH);
  }

  static fromNauticalMiles(value: number): Inches {
    return new Inches((value * METERS_PER_NAUTICAL_MILE) / METERS_PER_INCH);
  }

  static fromKilometers(value: number): Inches {
    return new Inches((value * METERS_PER_KILOMETER) / METERS_PER_INCH);
  }

  static fromSIValue(value: number | Unit): Inches {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Inches.fromMeters(si);
  }

  toFeet(): Feet {
    return this.toMeters().toFeet();
  }

  toMeters(): Meters {
    return new Meters(this.value * METERS_PER_INCH);
  }

  toNauticalMiles(): NauticalMiles {
    return this.toMeters().toNauticalMiles();
  }

  toKilometers(): Kilometers {
    return this.toMeters().toKilometers();
  }

  toInches(): Inches {
    return this;
  }

  toSIUnits(): Meters {
    return this.toMeters();
  }

  getStringUnits(): string {
    return "in";
  }
}
