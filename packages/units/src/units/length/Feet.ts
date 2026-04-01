import { assertFiniteNumber } from "../../core/validate.js";
import { Length } from "../../categories/Length.js";
import { Inches } from "./Inches.js";
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
 * Length in feet.
 */
export class Feet extends Length {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Feet");
  }

  static fromFeet(value: number): Feet {
    return new Feet(value);
  }

  static fromMeters(value: number): Feet {
    return new Feet(value / METERS_PER_FOOT);
  }

  static fromInches(value: number): Feet {
    return new Feet((value * METERS_PER_INCH) / METERS_PER_FOOT);
  }

  static fromNauticalMiles(value: number): Feet {
    return new Feet((value * METERS_PER_NAUTICAL_MILE) / METERS_PER_FOOT);
  }

  static fromKilometers(value: number): Feet {
    return new Feet((value * METERS_PER_KILOMETER) / METERS_PER_FOOT);
  }

  toFeet(): Feet {
    return this;
  }

  toMeters(): Meters {
    return new Meters(this.value * METERS_PER_FOOT);
  }

  toNauticalMiles(): NauticalMiles {
    return this.toMeters().toNauticalMiles();
  }

  toKilometers(): Kilometers {
    return this.toMeters().toKilometers();
  }

  toInches(): Inches {
    return this.toMeters().toInches();
  }

  toSIUnits(): Meters {
    return this.toMeters();
  }

  getStringUnits(): string {
    return "ft";
  }
}
