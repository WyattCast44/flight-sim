import type { Hectopascals } from "../units/pressure/Hectopascals.js";
import type { Pascals } from "../units/pressure/Pascals.js";
import type { PoundsPerSquareFoot } from "../units/pressure/PoundsPerSquareFoot.js";
import type { PoundsPerSquareInch } from "../units/pressure/PoundsPerSquareInch.js";
import { Unit } from "./Unit.js";

export abstract class Pressure extends Unit {
  abstract toPascals(): Pascals;
  abstract toHectopascals(): Hectopascals;
  abstract toPoundsPerSquareInch(): PoundsPerSquareInch;
  abstract toPoundsPerSquareFoot(): PoundsPerSquareFoot;

  abstract toSIUnits(): Pascals;
}
