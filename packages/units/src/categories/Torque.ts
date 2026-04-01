import type { FootPoundsForce } from "../units/torque/FootPoundsForce.js";
import type { NewtonMeters } from "../units/torque/NewtonMeters.js";
import { Unit } from "./Unit.js";

export abstract class Torque extends Unit {
  abstract toNewtonMeters(): NewtonMeters;
  abstract toFootPoundsForce(): FootPoundsForce;

  abstract toSIUnits(): NewtonMeters;
}
