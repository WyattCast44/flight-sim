import type { SquareFeet } from "../units/area/SquareFeet.js";
import type { SquareMeters } from "../units/area/SquareMeters.js";

/**
 * Area. Internal base: {@link SquareMeters}.
 */
export abstract class Area {
  abstract readonly value: number;

  abstract toSquareFeet(): SquareFeet;
  abstract toSquareMeters(): SquareMeters;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
