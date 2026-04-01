import { assertNonNegative } from "../../core/validate.js";
import { MomentOfInertia } from "../../categories/MomentOfInertia.js";
import { KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED } from "./constants.js";
import { SlugFootSquared } from "./SlugFootSquared.js";

export class KilogramMeterSquared extends MomentOfInertia {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "KilogramMeterSquared");
  }

  static fromKilogramMeterSquared(value: number): KilogramMeterSquared {
    return new KilogramMeterSquared(value);
  }

  static fromSlugFootSquared(value: number): KilogramMeterSquared {
    return new KilogramMeterSquared(value * KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED);
  }

  toKilogramMeterSquared(): KilogramMeterSquared {
    return this;
  }

  toSlugFootSquared(): SlugFootSquared {
    return new SlugFootSquared(this.value / KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED);
  }

  toSIUnits(): KilogramMeterSquared {
    return this;
  }

  getStringUnits(): string {
    return "kg·m²";
  }
}
