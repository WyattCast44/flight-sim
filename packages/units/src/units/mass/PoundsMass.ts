import { assertNonNegative } from "../../core/validate.js";
import { Mass } from "../../categories/Mass.js";
import { KILOGRAMS_PER_POUND_MASS, KILOGRAMS_PER_SLUG } from "./constants.js";
import { Kilograms } from "./Kilograms.js";
import { Slugs } from "./Slugs.js";

export class PoundsMass extends Mass {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "PoundsMass");
  }

  static fromPoundsMass(value: number): PoundsMass {
    return new PoundsMass(value);
  }

  static fromKilograms(value: number): PoundsMass {
    return new PoundsMass(value / KILOGRAMS_PER_POUND_MASS);
  }

  static fromSlugs(value: number): PoundsMass {
    return new PoundsMass((value * KILOGRAMS_PER_SLUG) / KILOGRAMS_PER_POUND_MASS);
  }

  toKilograms(): Kilograms {
    return new Kilograms(this.value * KILOGRAMS_PER_POUND_MASS);
  }

  toPoundsMass(): PoundsMass {
    return this;
  }

  toSlugs(): Slugs {
    return this.toKilograms().toSlugs();
  }

  toSIUnits(): Kilograms {
    return this.toKilograms();
  }

  getStringUnits(): string {
    return "lbm";
  }
}
