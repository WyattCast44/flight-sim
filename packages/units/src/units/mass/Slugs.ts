import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Mass } from "../../categories/Mass.js";
import { KILOGRAMS_PER_POUND_MASS, KILOGRAMS_PER_SLUG } from "./constants.js";
import { Kilograms } from "./Kilograms.js";
import { PoundsMass } from "./PoundsMass.js";

export class Slugs extends Mass {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "Slugs");
  }

  static fromSlugs(value: number): Slugs {
    return new Slugs(value);
  }

  static fromKilograms(value: number): Slugs {
    return new Slugs(value / KILOGRAMS_PER_SLUG);
  }

  static fromPoundsMass(value: number): Slugs {
    return new Slugs((value * KILOGRAMS_PER_POUND_MASS) / KILOGRAMS_PER_SLUG);
  }

  toKilograms(): Kilograms {
    return new Kilograms(this.value * KILOGRAMS_PER_SLUG);
  }

  toPoundsMass(): PoundsMass {
    return this.toKilograms().toPoundsMass();
  }

  toSlugs(): Slugs {
    return this;
  }

  getStringUnits(): string {
    return "slug";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} slug`;
  }
}
