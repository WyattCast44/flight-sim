import { MetersPerSecondSquared, Feet, Meters, Altitude } from "@flight-sim/units";
import { GravityModel } from "./GravityModel";

/**
 * WGS84-based gravity model that varies with geometric altitude.
 *
 * Uses the simplified free-air approximation:
 *   g(h) ≈ g₀ * (1 - 2h/R)   where R ≈ 6371 km (mean Earth radius)
 *
 * This is sufficiently accurate up to 100 km for aircraft simulation.
 * Gravity decreases by about 0.003 m/s² per 10 km of altitude.
 */
export class WGS84GravityModel extends GravityModel {
  public static readonly EARTH_RADIUS_M = 6_371_000; // Mean radius, WGS84 approx

  public readonly seaLevelGravity: MetersPerSecondSquared;

  constructor(seaLevelG: MetersPerSecondSquared = new MetersPerSecondSquared(9.80665)) {
    super();
    this.seaLevelGravity = seaLevelG;
  }

  getGravityAtAltitude(altitude: Feet | Meters | Altitude): MetersPerSecondSquared {
    const h = altitude.toMeters().value;

    // Prevent unrealistic values at very high altitudes
    if (h > 100_000) {
      throw new Error(`Gravity requested at extreme altitude: ${h}m`);
    }

    // Free-air correction: g decreases linearly with height
    const factor = 1 - (2 * h) / WGS84GravityModel.EARTH_RADIUS_M;
    const g = this.seaLevelGravity.value * factor;

    return new MetersPerSecondSquared(Math.max(g, 9.75)); // safety floor is 9.75 m/s² so that we don't get negative gravity
  }

  getGravityAtSeaLevel(): MetersPerSecondSquared {
    return this.seaLevelGravity;
  }
}