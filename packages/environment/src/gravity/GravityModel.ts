import { MetersPerSecondSquared, Feet, Meters, Altitude } from "@flight-sim/units";

/**
 * Abstract base class for gravitational acceleration models.
 *
 * In flight simulation, gravity affects:
 * - Weight and lift calculations
 * - Atmospheric pressure/density formulas (when using variable g)
 * - Orbital mechanics (if extending to space)
 *
 * Prefer `getGravityAtAltitude()` for most aircraft work.
 */
export abstract class GravityModel {
  /**
   * Returns local gravitational acceleration at the given geometric altitude.
   * This is the primary method used by AtmosphereModel and flight dynamics.
   * 
   * @param altitude - The altitude to get the gravity at.
   * @returns The gravity at the given altitude in meters per second squared.
   */
  abstract getGravityAtAltitude(altitude: Feet | Meters | Altitude): MetersPerSecondSquared;

  /**
   * Returns gravitational acceleration at mean sea level (for this model).
   * Often used as reference for standard atmosphere calculations.
   * 
   * @returns The gravity at sea level in meters per second squared.
   */
  abstract getGravityAtSeaLevel(): MetersPerSecondSquared;
}