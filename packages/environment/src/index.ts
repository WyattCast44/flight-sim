import { Vector3 } from "@flight-sim/math";
import { Meters } from "@flight-sim/units";

/**
 * Origin position in meters (0, 0, 0). Useful as a wiring smoke export for `@flight-sim/units` + `@flight-sim/math`.
 */
export function zeroPositionMeters(): Vector3<Meters> {
  return Vector3.createZero(Meters);
}
