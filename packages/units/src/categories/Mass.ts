import type { Kilograms } from "../units/mass/Kilograms.js";
import type { PoundsMass } from "../units/mass/PoundsMass.js";
import type { Slugs } from "../units/mass/Slugs.js";

export abstract class Mass {
  abstract readonly value: number;

  abstract toKilograms(): Kilograms;
  abstract toPoundsMass(): PoundsMass;
  abstract toSlugs(): Slugs;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
