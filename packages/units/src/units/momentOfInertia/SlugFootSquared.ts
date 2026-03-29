import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { MomentOfInertia } from "../../categories/MomentOfInertia.js";
import { KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED } from "./constants.js";
import { KilogramMeterSquared } from "./KilogramMeterSquared.js";

export class SlugFootSquared extends MomentOfInertia {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "SlugFootSquared");
  }

  static fromSlugFootSquared(value: number): SlugFootSquared {
    return new SlugFootSquared(value);
  }

  static fromKilogramMeterSquared(value: number): SlugFootSquared {
    return new SlugFootSquared(value / KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED);
  }

  toKilogramMeterSquared(): KilogramMeterSquared {
    return new KilogramMeterSquared(this.value * KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED);
  }

  toSlugFootSquared(): SlugFootSquared {
    return this;
  }

  getStringUnits(): string {
    return "slug·ft²";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} slug·ft²`;
  }
}
