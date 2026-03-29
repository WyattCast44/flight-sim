import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Mass } from "../../categories/Mass.js";
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

  toKilograms(): Kilograms {
    return this;
  }

  toPoundsMass(): PoundsMass {
    return new PoundsMass(this.value / KILOGRAMS_PER_POUND_MASS);
  }

  toSlugs(): Slugs {
    return new Slugs(this.value / KILOGRAMS_PER_SLUG);
  }

  getStringUnits(): string {
    return "kg";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} kg`;
  }
}
