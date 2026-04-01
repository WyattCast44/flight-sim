import type { Kilograms } from "../units/mass/Kilograms.js";
import type { PoundsMass } from "../units/mass/PoundsMass.js";
import type { Slugs } from "../units/mass/Slugs.js";
import { Unit } from "./Unit.js";

export abstract class Mass extends Unit {
  abstract toKilograms(): Kilograms;
  abstract toPoundsMass(): PoundsMass;
  abstract toSlugs(): Slugs;

  abstract toSIUnits(): Kilograms;
}
