import type { SquareFeet } from "../units/area/SquareFeet.js";
import type { SquareMeters } from "../units/area/SquareMeters.js";
import { Unit } from "./Unit.js";

/**
 * Area. Internal base: {@link SquareMeters}.
 */
export abstract class Area extends Unit {
  abstract toSquareFeet(): SquareFeet;
  abstract toSquareMeters(): SquareMeters;

  abstract toSIUnits(): SquareMeters;
}
