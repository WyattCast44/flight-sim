import { AtmosphereModel } from "./AtmosphereModel";
import {
  KilogramsPerCubicMeter,
  Feet,
  Meters,
  Kelvin,
  Pascals,
} from "@flight-sim/units";
import { AtmosphereConditions } from "./AtmosphereConditions";

interface AtmosphereLayer {
  /** Base altitude of this layer in meters */
  readonly baseAltitude: number;
  /** Static pressure at base altitude in Pascals */
  readonly basePressure: number;
  /** Static temperature at base altitude in Kelvin */
  readonly baseTemperature: number;
  /** Static density at base altitude in kg/m³ */
  readonly baseDensity: number;
  /** Temperature lapse rate in K/m (0 for isothermal layers) */
  readonly lapseRate: number;
}

export { AtmosphereLayer };

/**
 * US Standard Atmosphere 1976 model.
 *
 * Valid altitude range: -610 m to 86,000 m (-2,000 ft to ~282,000 ft)
 * This easily covers general aviation, commercial airliners, and military aircraft up to 100,000 ft.
 *
 * @see https://en.wikipedia.org/wiki/U.S._Standard_Atmosphere
 * @see NASA TR-19770009539 (U.S. Standard Atmosphere, 1976)
 */
export class StandardAtmosphere1976 extends AtmosphereModel {
  /** Minimum valid altitude in meters */
  private static readonly MIN_ALTITUDE_M = -610;

  /** Maximum valid altitude in meters */
  private static readonly MAX_ALTITUDE_M = 86000;

  /**
   * Atmosphere layers from the US Standard Atmosphere 1976.
   * Base values are official/reference-accurate.
   */
  private static readonly LAYERS: readonly AtmosphereLayer[] = [
    {
      // Troposphere (extended below sea level)
      baseAltitude: 0,
      basePressure: 101325,
      baseTemperature: 288.15,
      baseDensity: 1.225,
      lapseRate: -0.0065,
    },
    {
      // Tropopause / Lower Stratosphere (isothermal)
      baseAltitude: 11000,
      basePressure: 22632.1,
      baseTemperature: 216.65,
      baseDensity: 0.363918,
      lapseRate: 0,
    },
    {
      // Upper Stratosphere
      baseAltitude: 20000,
      basePressure: 5474.89,
      baseTemperature: 216.65,
      baseDensity: 0.0880349,
      lapseRate: 0.001,
    },
    {
      // Stratosphere / Stratopause transition
      baseAltitude: 32000,
      basePressure: 868.019,
      baseTemperature: 228.65,
      baseDensity: 0.013225,
      lapseRate: 0.0028,
    },
    {
      // Stratopause (isothermal)
      baseAltitude: 47000,
      basePressure: 110.906,
      baseTemperature: 270.65,
      baseDensity: 0.00142753,
      lapseRate: 0,
    },
    {
      // Mesosphere (lower)
      baseAltitude: 51000,
      basePressure: 66.9389,
      baseTemperature: 270.65,
      baseDensity: 0.000861604,
      lapseRate: -0.0028,
    },
    {
      // Mesosphere (upper)
      baseAltitude: 71000,
      basePressure: 3.95642,
      baseTemperature: 214.65,
      baseDensity: 0.0000642108,
      lapseRate: -0.002,
    },
    {
      // Mesopause / Lower Thermosphere (isothermal extension)
      baseAltitude: 84852,
      basePressure: 0.3734,
      baseTemperature: 186.946,
      baseDensity: 0.0000069578,
      lapseRate: 0,
    },
  ];

  getTemperatureAtAltitude(altitude: Feet | Meters): Kelvin {
    return this.getConditionsAtAltitude(altitude).temperature;
  }

  getPressureAtAltitude(altitude: Feet | Meters): Pascals {
    return this.getConditionsAtAltitude(altitude).pressure;
  }

  getDensityAtAltitude(altitude: Feet | Meters): KilogramsPerCubicMeter {
    return this.getConditionsAtAltitude(altitude).density;
  }

  getConditionsAtAltitude(altitude: Feet | Meters): AtmosphereConditions {
    const altitudeM = this.normalizeAltitude(altitude);
    const layer = this.findLayer(altitudeM);
    const temperature = this.computeTemperature(altitudeM, layer);
    const pressure = this.computePressure(altitudeM, layer, temperature);
    const density = this.computeDensity(altitudeM, layer, temperature);

    return new AtmosphereConditions(altitudeM, temperature, pressure, density);
  }

  /**
   * Convert input altitude to Meters and validate range.
   * Uses geometric (true) altitude.
   */
  private normalizeAltitude(altitude: Feet | Meters): Meters {
    const altitudeM = altitude instanceof Feet ? altitude.toMeters() : altitude;

    if (
      altitudeM.value < StandardAtmosphere1976.MIN_ALTITUDE_M ||
      altitudeM.value > StandardAtmosphere1976.MAX_ALTITUDE_M
    ) {
      throw new RangeError(
        `Altitude ${altitudeM.value}m is outside the valid range for US Standard Atmosphere 1976. ` +
          `Valid range: ${StandardAtmosphere1976.MIN_ALTITUDE_M}m to ${StandardAtmosphere1976.MAX_ALTITUDE_M}m.`,
      );
    }
    return altitudeM;
  }

  /**
   * Find the layer containing the given geometric altitude.
   */
  private findLayer(altitude: Meters): AtmosphereLayer {
    const layers = StandardAtmosphere1976.LAYERS;

    // Negative altitudes use the troposphere layer (extrapolates correctly)
    if (altitude.value < 0) {
      return layers[0];
    }

    // Find the highest layer whose base altitude <= current altitude
    for (let i = layers.length - 1; i >= 0; i--) {
      if (altitude.value >= layers[i].baseAltitude) {
        return layers[i];
      }
    }
    return layers[0];
  }

  /**
   * Compute temperature at altitude (always returns Kelvin).
   */
  private computeTemperature(altitude: Meters, layer: AtmosphereLayer): Kelvin {
    if (layer.lapseRate === 0) {
      return new Kelvin(layer.baseTemperature);
    }

    const deltaAltitude = altitude.value - layer.baseAltitude;
    const temperature = layer.baseTemperature + layer.lapseRate * deltaAltitude;
    return new Kelvin(Math.max(temperature, 180)); // prevent unrealistic low temps in upper layers
  }

  /**
   * Compute pressure using the barometric formula.
   */
  private computePressure(
    altitude: Meters,
    layer: AtmosphereLayer,
    temperature: Kelvin,
  ): Pascals {
    const R = this.getSpecificGasConstant();
    const g = this.gravityModel.getGravityAtAltitude(altitude).value;
    const deltaH = altitude.value - layer.baseAltitude;

    let pressure: number;

    if (layer.lapseRate === 0) {
      // Isothermal layer
      const exponent = (g * deltaH) / (R * temperature.value);
      pressure = layer.basePressure * Math.exp(-exponent);
    } else {
      // Temperature gradient layer
      const temperatureRatio = temperature.value / layer.baseTemperature;
      const exponent = g / (R * layer.lapseRate);
      pressure = layer.basePressure * Math.pow(temperatureRatio, -exponent);
    }

    return new Pascals(pressure);
  }

  /**
   * Compute density using the barometric formula.
   */
  private computeDensity(
    altitude: Meters,
    layer: AtmosphereLayer,
    temperature: Kelvin,
  ): KilogramsPerCubicMeter {
    const R = this.getSpecificGasConstant();
    const g = this.gravityModel.getGravityAtAltitude(altitude).value;
    const deltaH = altitude.value - layer.baseAltitude;

    let density: number;

    if (layer.lapseRate === 0) {
      // Isothermal
      const exponent = (g * deltaH) / (R * temperature.value);
      density = layer.baseDensity * Math.exp(-exponent);
    } else {
      // Gradient
      const temperatureRatio = temperature.value / layer.baseTemperature;
      const exponent = g / (R * layer.lapseRate) + 1;
      density = layer.baseDensity * Math.pow(temperatureRatio, -exponent);
    }

    return new KilogramsPerCubicMeter(density);
  }
}
