import { MetersPerSecondSquared, Feet, Meters, Altitude } from "@flight-sim/units";
import { GravityModel } from "./GravityModel";

/**
 * Simple constant gravity model using standard value g₀ = 9.80665 m/s².
 *
 * This is the most commonly used model for general aviation and airliner simulations
 * where extreme precision in gravity variation is not required.
 */
export class ConstantGravityModel extends GravityModel {
  public readonly standardGravity: MetersPerSecondSquared;

  constructor(value: MetersPerSecondSquared = new MetersPerSecondSquared(9.80665)) {
    super();
    this.standardGravity = value;
  }

  getGravityAtAltitude(_: Feet | Meters | Altitude): MetersPerSecondSquared {
    return this.standardGravity;
  }

  getGravityAtSeaLevel(): MetersPerSecondSquared {
    return this.standardGravity;
  }
}
