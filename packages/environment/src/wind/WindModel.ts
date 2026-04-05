import {
  Feet,
  Meters,
  Altitude,
  Knots,
  DegreesCardinal,
} from "@flight-sim/units";
import { TurbulenceIntensity } from "./Turbulence";

export interface WindVector3 {
    north: Knots;
    east: Knots;
    down: Knots;
    direction: DegreesCardinal;
    speed: Knots;
}

/**
 * Abstract base class for all wind models in the flight simulator.
 *
 * This design supports:
 * - Mean (steady) wind profiles
 * - Wind shear between altitude layers
 * - Turbulence and gusts (via subclasses or decorators)
 * - Easy integration with AtmosphereModel for aerodynamic force calculations
 *
 * Prefer `getWindAtAltitude()` for flight dynamics, as it includes turbulence/gusts
 * when enabled. Use `getMeanWindAtAltitude()` when you only need the steady component.
 */
export abstract class WindModel {
  /**
   * Returns the instantaneous wind velocity at the given altitude.
   * This is the **primary method** used by the flight model.
   *
   * It includes:
   * - Mean wind (steady component)
   * - Turbulence / gusts (if the concrete model supports it)
   *
   * @param altitude - Altitude in any supported unit (Feet, Meters, or Altitude)
   * @returns Full wind velocity vector (North/East/Down components recommended)
   */
  abstract getWindAtAltitude(altitude: Feet | Meters | Altitude): WindVector3;

  /**
   * Returns only the steady (mean) wind at the given altitude, without turbulence.
   * Useful for:
   * - Weather display / UI
   * - Debugging
   * - Performance calculations that should ignore random turbulence
   */
  abstract getMeanWindAtAltitude(
    altitude: Feet | Meters | Altitude,
  ): WindVector3;

  /**
   * Adds or updates a wind layer at a specific altitude.
   * Layers are typically interpolated between each other.
   *
   * @param altitude - Altitude of the layer
   * @param wind - Mean wind velocity at this altitude
   * @param turbulenceIntensity - Optional turbulence strength (0.0 = none, 1.0 = severe)
   */
  abstract addLayer(
    altitude: Feet | Meters | Altitude,
    wind: WindVector3,
    turbulenceIntensity?: TurbulenceIntensity,
  ): void;

  /**
   * Removes all wind layers and resets to zero wind.
   */
  abstract clear(): void;

  /**
   * Returns whether any wind data (mean wind or turbulence) is currently active.
   */
  abstract hasWind(): boolean;

  /**
   * Returns the wind at the surface (usually 0–50 ft AGL).
   * Important for takeoff, landing, and ground effect modeling.
   */
  abstract getSurfaceWind(): WindVector3;

  /**
   * Optional: Returns the maximum turbulence intensity currently modeled.
   * Can be used by the aircraft systems or instructor station.
   */
  abstract getMaxTurbulenceIntensity(): TurbulenceIntensity;
}
