import type { KilogramMeterSquared } from "../units/momentOfInertia/KilogramMeterSquared.js";
import type { SlugFootSquared } from "../units/momentOfInertia/SlugFootSquared.js";
import { Unit } from "./Unit.js";

export abstract class MomentOfInertia extends Unit {
  abstract toKilogramMeterSquared(): KilogramMeterSquared;
  abstract toSlugFootSquared(): SlugFootSquared;

  abstract toSIUnits(): KilogramMeterSquared;
}
