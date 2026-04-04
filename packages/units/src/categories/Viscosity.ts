import type { PascalSeconds } from "../units/viscosity/PascalSeconds.js";
import { Unit } from "./Unit.js";

export abstract class Viscosity extends Unit {
  abstract toPascalSeconds(): PascalSeconds;

  abstract toSIUnits(): PascalSeconds;
}
