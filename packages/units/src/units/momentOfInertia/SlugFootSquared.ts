import { assertNonNegative } from "../../core/validate.js";
import { MomentOfInertia } from "../../categories/MomentOfInertia.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): SlugFootSquared {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return SlugFootSquared.fromKilogramMeterSquared(si);
  }

  toKilogramMeterSquared(): KilogramMeterSquared {
    return new KilogramMeterSquared(this.value * KILOGRAM_METER_SQUARED_PER_SLUG_FOOT_SQUARED);
  }

  toSlugFootSquared(): SlugFootSquared {
    return this;
  }

  toSIUnits(): KilogramMeterSquared {
    return this.toKilogramMeterSquared();
  }

  getStringUnits(): string {
    return "slug·ft²";
  }
}
