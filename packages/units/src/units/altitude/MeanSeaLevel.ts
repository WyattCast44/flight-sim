import { assertFiniteNumber } from "../../core/validate.js";
import { Altitude } from "../../categories/Altitude.js";
import { AboveGroundLevel } from "./AboveGroundLevel.js";
import { Feet } from "../length/Feet.js";
import { Inches } from "../length/Inches.js";
import { Kilometers } from "../length/Kilometers.js";
import { Meters } from "../length/Meters.js";
import { NauticalMiles } from "../length/NauticalMiles.js";

/**
 * Altitude above mean sea level. Value is stored in **meters**.
 */
export class MeanSeaLevel extends Altitude {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "MeanSeaLevel");
  }

  static fromMeters(value: number): MeanSeaLevel {
    return new MeanSeaLevel(value);
  }

  static fromFeet(value: number): MeanSeaLevel {
    return new MeanSeaLevel(Meters.fromFeet(value).value);
  }

  static fromInches(value: number): MeanSeaLevel {
    return new MeanSeaLevel(Meters.fromInches(value).value);
  }

  static fromNauticalMiles(value: number): MeanSeaLevel {
    return new MeanSeaLevel(Meters.fromNauticalMiles(value).value);
  }

  static fromKilometers(value: number): MeanSeaLevel {
    return new MeanSeaLevel(Meters.fromKilometers(value).value);
  }

  toMeanSeaLevel(): MeanSeaLevel {
    return this;
  }

  toAboveGroundLevel(): AboveGroundLevel {
    return new AboveGroundLevel(this.value);
  }

  toMeters(): Meters {
    return new Meters(this.value);
  }

  toFeet(): Feet {
    return new Meters(this.value).toFeet();
  }

  toNauticalMiles(): NauticalMiles {
    return new Meters(this.value).toNauticalMiles();
  }

  toKilometers(): Kilometers {
    return new Meters(this.value).toKilometers();
  }

  toInches(): Inches {
    return new Meters(this.value).toInches();
  }

  toSIUnits(): MeanSeaLevel {
    return this;
  }

  getStringUnits(): string {
    return "m MSL";
  }
}
