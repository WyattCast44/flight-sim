import type { FootPoundsForce } from "../units/torque/FootPoundsForce.js";
import type { NewtonMeters } from "../units/torque/NewtonMeters.js";

export abstract class Torque {
  abstract readonly value: number;

  abstract toNewtonMeters(): NewtonMeters;
  abstract toFootPoundsForce(): FootPoundsForce;

  abstract getStringUnits(): string;
  abstract toString(): string;
}
