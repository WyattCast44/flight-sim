import { Meters, Kelvin, Pascals, KilogramsPerCubicMeter } from "@flight-sim/units";

/**
 * Container for all atmospheric properties at a specific altitude.
 *
 * This is the preferred return type when multiple properties are needed,
 * as it avoids redundant calculations.
 */
export class AtmosphereConditions {
  constructor(
    /** Geometric (true) altitude */
    public readonly altitude: Meters,

    /** Static temperature in Kelvin (preferred for physics calculations) */
    public readonly temperature: Kelvin,

    /** Static pressure */
    public readonly pressure: Pascals,

    /** Air density */
    public readonly density: KilogramsPerCubicMeter
  ) {}

  /**
   * Quick check for physical consistency using the ideal gas law:
   * P ≈ ρ * R * T   (within floating-point tolerance)
   */
  public isPhysicallyConsistent(tolerance: number = 0.01): boolean {
    const R = 287; // J/(kg·K) — dry air
    const calculatedPressure = this.density.value * R * this.temperature.value;
    const diff = Math.abs(this.pressure.value - calculatedPressure) / this.pressure.value;
    return diff <= tolerance;
  }
}