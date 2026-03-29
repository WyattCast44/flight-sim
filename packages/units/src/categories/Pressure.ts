import type { Hectopascals } from "../units/pressure/Hectopascals.js";
import type { Pascals } from "../units/pressure/Pascals.js";
import type { PoundsPerSquareFoot } from "../units/pressure/PoundsPerSquareFoot.js";
import type { PoundsPerSquareInch } from "../units/pressure/PoundsPerSquareInch.js";

export abstract class Pressure {
  abstract readonly value: number;

  abstract toPascals(): Pascals;
  abstract toHectopascals(): Hectopascals;
  abstract toPoundsPerSquareInch(): PoundsPerSquareInch;
  abstract toPoundsPerSquareFoot(): PoundsPerSquareFoot;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
