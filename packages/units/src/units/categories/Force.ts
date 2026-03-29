import type { Newtons } from "../units/force/Newtons.js";
import type { PoundsForce } from "../units/force/PoundsForce.js";

export abstract class Force {
  abstract readonly value: number;

  abstract toNewtons(): Newtons;
  abstract toPoundsForce(): PoundsForce;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
