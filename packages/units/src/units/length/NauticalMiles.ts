import { assertFiniteNumber } from "../../core/validate.js";
import { Length } from "../../categories/Length.js";
import type { Unit } from "../../categories/Unit.js";
import { Feet } from "./Feet.js";
import { Inches } from "./Inches.js";
import { Kilometers } from "./Kilometers.js";
import { Meters } from "./Meters.js";
import {
  METERS_PER_FOOT,
  METERS_PER_INCH,
  METERS_PER_KILOMETER,
  METERS_PER_NAUTICAL_MILE,
} from "./constants.js";

/**
 * Length in nautical miles.
 */
export class NauticalMiles extends Length {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "NauticalMiles");
  }

  static fromNauticalMiles(value: number): NauticalMiles {
    return new NauticalMiles(value);
  }

  static fromMeters(value: number): NauticalMiles {
    return new NauticalMiles(value / METERS_PER_NAUTICAL_MILE);
  }

  static fromFeet(value: number): NauticalMiles {
    return new NauticalMiles((value * METERS_PER_FOOT) / METERS_PER_NAUTICAL_MILE);
  }

  static fromInches(value: number): NauticalMiles {
    return new NauticalMiles((value * METERS_PER_INCH) / METERS_PER_NAUTICAL_MILE);
  }

  static fromKilometers(value: number): NauticalMiles {
    return new NauticalMiles((value * METERS_PER_KILOMETER) / METERS_PER_NAUTICAL_MILE);
  }

  static fromSIValue(value: number | Unit): NauticalMiles {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return NauticalMiles.fromMeters(si);
  }

  toFeet(): Feet {
    return this.toMeters().toFeet();
  }

  toMeters(): Meters {
    return new Meters(this.value * METERS_PER_NAUTICAL_MILE);
  }

  toNauticalMiles(): NauticalMiles {
    return this;
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
    return "NM";
  }
}
