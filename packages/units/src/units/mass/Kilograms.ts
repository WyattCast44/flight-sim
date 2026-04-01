import { assertNonNegative } from "../../core/validate.js";
import { Mass } from "../../categories/Mass.js";
import type { Unit } from "../../categories/Unit.js";
import { KILOGRAMS_PER_POUND_MASS, KILOGRAMS_PER_SLUG } from "./constants.js";
import { PoundsMass } from "./PoundsMass.js";
import { Slugs } from "./Slugs.js";

export class Kilograms extends Mass {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "Kilograms");
  }

  static fromKilograms(value: number): Kilograms {
    return new Kilograms(value);
  }

  static fromPoundsMass(value: number): Kilograms {
    return new Kilograms(value * KILOGRAMS_PER_POUND_MASS);
  }

  static fromSlugs(value: number): Kilograms {
    return new Kilograms(value * KILOGRAMS_PER_SLUG);
  }

  static fromSIValue(value: number | Unit): Kilograms {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Kilograms.fromKilograms(si);
  }

  toKilograms(): Kilograms {
    return this;
  }

  toPoundsMass(): PoundsMass {
    return new PoundsMass(this.value / KILOGRAMS_PER_POUND_MASS);
  }

  toSlugs(): Slugs {
    return new Slugs(this.value / KILOGRAMS_PER_SLUG);
  }

  toSIUnits(): Kilograms {
    return this;
  }

  getStringUnits(): string {
    return "kg";
  }
}
