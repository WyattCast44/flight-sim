import type { KilogramMeterSquared } from "../units/momentOfInertia/KilogramMeterSquared.js";
import type { SlugFootSquared } from "../units/momentOfInertia/SlugFootSquared.js";

export abstract class MomentOfInertia {
  abstract readonly value: number;

  abstract toKilogramMeterSquared(): KilogramMeterSquared;
  abstract toSlugFootSquared(): SlugFootSquared;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
