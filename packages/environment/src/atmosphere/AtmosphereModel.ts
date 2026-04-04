import {
  Altitude,
  Feet,
  Kelvin,
  KilogramsPerCubicMeter,
  Meters,
  MetersPerSecond,
  MetersPerSecondSquared,
  PascalSeconds,
  Pascals,
} from "@flight-sim/units";
import { AtmosphereConditions } from "./AtmosphereConditions";

/** Placeholder until gravity models are implemented in this package. */
export interface GravityModel {
  getGravityAtAltitude(
    altitude: Feet | Meters | Altitude,
  ): MetersPerSecondSquared;
}

/**
 * Abstract base class for atmosphere models.
 *
 * Prefer `getConditionsAtAltitude()` when you need multiple properties
 * at the same altitude — it computes everything in a single pass for efficiency.
 *
 * All internal calculations use Kelvin. Public temperature getter returns Kelvin
 * for consistency with physics formulas (speed of sound, viscosity, etc.).
 */
export abstract class AtmosphereModel {
  constructor(public readonly gravityModel: GravityModel) {}

  /**
   * Get all atmospheric conditions at the given altitude in one efficient call.
   */
  abstract getConditionsAtAltitude(
    altitude: Feet | Meters | Altitude,
  ): AtmosphereConditions;

  /**
   * Temperature at altitude (Kelvin). Preferred over Celsius for calculations.
   */
  abstract getTemperatureAtAltitude(altitude: Feet | Meters): Kelvin;

  abstract getPressureAtAltitude(altitude: Feet | Meters | Altitude): Pascals;

  abstract getDensityAtAltitude(
    altitude: Feet | Meters | Altitude,
  ): KilogramsPerCubicMeter;

  /**
   * Speed of sound (Mach 1) using γ = 1.4 for dry air.
   * a = sqrt(γ * R * T)
   */
  getSpeedOfSoundAtAltitude(
    altitude: Feet | Meters | Altitude,
  ): MetersPerSecond {
    const T = this.getTemperatureAtAltitude(altitude);
    const gamma = 1.4;
    const R = this.getSpecificGasConstant();
    const a = Math.sqrt(gamma * R * T.value);
    return new MetersPerSecond(a);
  }

  /**
   * Dynamic viscosity using Sutherland's law (standard for aviation).
   * μ = μ₀ * (T/T₀)^(3/2) * (T₀ + S) / (T + S)
   *
   * Reference values (sea level ISA):
   *   μ₀ = 1.716e-5 Pa·s at T₀ = 273.15 K
   *   Sutherland constant S = 110.4 K
   *
   * Accurate for the temperature range encountered by GA, airliners, and military aircraft.
   */
  getDynamicViscosityAtAltitude(
    altitude: Feet | Meters | Altitude,
  ): PascalSeconds {
    const T = this.getTemperatureAtAltitude(altitude).value; // Kelvin

    const mu0 = 1.716e-5; // Pa·s (reference viscosity)
    const T0 = 273.15; // K
    const S = 110.4; // K (Sutherland constant for air)

    const factor = (Math.pow(T / T0, 1.5) * (T0 + S)) / (T + S);
    const mu = mu0 * factor;

    return new PascalSeconds(mu);
  }

  /**
   * Specific gas constant for dry air: 287 J/(kg·K)
   * Override in subclasses if you support humid air or other gases.
   */
  getSpecificGasConstant(): number {
    return 287;
  }
}
