import type { Newtons } from "../units/force/Newtons.js";
import type { PoundsForce } from "../units/force/PoundsForce.js";
import { Unit } from "./Unit.js";

export abstract class Force extends Unit {
  abstract toNewtons(): Newtons;
  abstract toPoundsForce(): PoundsForce;

  abstract toSIUnits(): Newtons;
}
