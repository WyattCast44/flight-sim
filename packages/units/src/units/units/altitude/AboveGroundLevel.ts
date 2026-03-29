import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Altitude } from "../../categories/Altitude.js";
import { MeanSeaLevel } from "./MeanSeaLevel.js";
import { Feet } from "../length/Feet.js";
import { Inches } from "../length/Inches.js";
import { Kilometers } from "../length/Kilometers.js";
import { Meters } from "../length/Meters.js";
import { NauticalMiles } from "../length/NauticalMiles.js";

/**
 * Altitude above ground level. Value is stored in **meters**.
 */
export class AboveGroundLevel extends Altitude {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "AboveGroundLevel");
  }

  static fromMeters(value: number): AboveGroundLevel {
    return new AboveGroundLevel(value);
  }

  static fromFeet(value: number): AboveGroundLevel {
    return new AboveGroundLevel(Meters.fromFeet(value).value);
  }

  static fromInches(value: number): AboveGroundLevel {
    return new AboveGroundLevel(Meters.fromInches(value).value);
  }

  static fromNauticalMiles(value: number): AboveGroundLevel {
    return new AboveGroundLevel(Meters.fromNauticalMiles(value).value);
  }

  static fromKilometers(value: number): AboveGroundLevel {
    return new AboveGroundLevel(Meters.fromKilometers(value).value);
  }

  toMeanSeaLevel(): MeanSeaLevel {
    return new MeanSeaLevel(this.value);
  }

  toAboveGroundLevel(): AboveGroundLevel {
    return this;
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

  getStringUnits(): string {
    return "m AGL";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} m AGL`;
  }
}
