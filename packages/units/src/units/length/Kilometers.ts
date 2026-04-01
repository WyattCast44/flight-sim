import { assertFiniteNumber } from "../../core/validate.js";
import { Length } from "../../categories/Length.js";
import type { Unit } from "../../categories/Unit.js";
import { Feet } from "./Feet.js";
import { Inches } from "./Inches.js";
import { Meters } from "./Meters.js";
import {
  METERS_PER_FOOT,
  METERS_PER_INCH,
  METERS_PER_KILOMETER,
  METERS_PER_NAUTICAL_MILE,
} from "./constants.js";
import { NauticalMiles } from "./NauticalMiles.js";

/**
 * Length in kilometers.
 */
export class Kilometers extends Length {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Kilometers");
  }

  static fromKilometers(value: number): Kilometers {
    return new Kilometers(value);
  }

  static fromMeters(value: number): Kilometers {
    return new Kilometers(value / METERS_PER_KILOMETER);
  }

  static fromFeet(value: number): Kilometers {
    return new Kilometers((value * METERS_PER_FOOT) / METERS_PER_KILOMETER);
  }

  static fromInches(value: number): Kilometers {
    return new Kilometers((value * METERS_PER_INCH) / METERS_PER_KILOMETER);
  }

  static fromNauticalMiles(value: number): Kilometers {
    return new Kilometers((value * METERS_PER_NAUTICAL_MILE) / METERS_PER_KILOMETER);
  }

  static fromSIValue(value: number | Unit): Kilometers {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Kilometers.fromMeters(si);
  }

  toFeet(): Feet {
    return this.toMeters().toFeet();
  }

  toMeters(): Meters {
    return new Meters(this.value * METERS_PER_KILOMETER);
  }

  toNauticalMiles(): NauticalMiles {
    return this.toMeters().toNauticalMiles();
  }

  toKilometers(): Kilometers {
    return this;
  }

  toInches(): Inches {
    return this.toMeters().toInches();
  }

  toSIUnits(): Meters {
    return this.toMeters();
  }

  getStringUnits(): string {
    return "km";
  }
}
