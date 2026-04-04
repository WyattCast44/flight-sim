import { AtmosphereModel } from "./AtmosphereModel";
import { AtmosphereConditions } from "./AtmosphereConditions";
import {
  Feet,
  Meters,
  Kelvin,
  Celsius,
  Pascals,
  KilogramsPerCubicMeter,
} from "@flight-sim/units";

/**
 * Atmosphere deviations for non-standard conditions (weather, ISA offsets, etc.).
 *
 * Common use cases:
 * - "ISA +12" → deltaTemperature = +12°C
 * - High pressure system → higher seaLevelPressure
 * - Cold day or inversion layers (via temperature offset)
 */
export interface AtmosphereDeviations {
  /** Uniform temperature offset applied at all altitudes (in °C) */
  readonly deltaTemperature: Celsius;

  /** Sea-level pressure (QNH). Standard ISA = 101325 Pa */
  readonly seaLevelPressure: Pascals;
}

/**
 * Wrapper that adds realistic deviations (weather offsets) to any base atmosphere model.
 *
 * This is the recommended way to support dynamic weather in your flight simulator
 * while keeping the core StandardAtmosphere1976 pure and standards-compliant.
 */
export class DeviatedAtmosphere extends AtmosphereModel {
  private readonly baseModel: AtmosphereModel;
  private deviations: AtmosphereDeviations;

  constructor(
    baseModel: AtmosphereModel,
    initialDeviations: Partial<AtmosphereDeviations> = {},
  ) {
    super(baseModel.gravityModel);

    this.baseModel = baseModel;

    this.deviations = {
      deltaTemperature: initialDeviations.deltaTemperature ?? new Celsius(0),
      seaLevelPressure:
        initialDeviations.seaLevelPressure ?? new Pascals(101325),
    };
  }

  /**
   * Update deviations at runtime (e.g., from weather system, ATC, or user settings).
   */
  public setDeviations(newDeviations: Partial<AtmosphereDeviations>): void {
    this.deviations = {
      ...this.deviations,
      ...newDeviations,
    };
  }

  /**
   * Get current deviation settings.
   */
  public getDeviations(): AtmosphereDeviations {
    return { ...this.deviations };
  }

  /**
   * Main method — computes deviated conditions efficiently.
   */
  public getConditionsAtAltitude(
    altitude: Feet | Meters,
  ): AtmosphereConditions {
    const std = this.baseModel.getConditionsAtAltitude(altitude);

    // 1. Apply temperature deviation (uniform shift)
    const adjustedTempKelvin = new Kelvin(
      std.temperature.value + this.deviations.deltaTemperature.value, // if delta.value is in Celsius (difference)
    );

    // 2. Scale pressure based on new sea-level pressure (QNH)
    const stdSeaLevelPressure = this.baseModel.getPressureAtAltitude(
      new Meters(0),
    );
    const pressureScale =
      this.deviations.seaLevelPressure.value / stdSeaLevelPressure.value;
    const adjustedPressure = new Pascals(std.pressure.value * pressureScale);

    // 3. Recompute density using ideal gas law (physically correct)
    const R = this.getSpecificGasConstant();
    const adjustedDensity = new KilogramsPerCubicMeter(
      adjustedPressure.value / (R * adjustedTempKelvin.value),
    );

    return new AtmosphereConditions(
      std.altitude,
      adjustedTempKelvin,
      adjustedPressure,
      adjustedDensity,
    );
  }

  // ─────────────────────────────────────────────────────────────
  // Delegate individual getters to the efficient batched method
  // ─────────────────────────────────────────────────────────────

  public getTemperatureAtAltitude(altitude: Feet | Meters): Kelvin {
    return this.getConditionsAtAltitude(altitude).temperature;
  }

  public getPressureAtAltitude(altitude: Feet | Meters): Pascals {
    return this.getConditionsAtAltitude(altitude).pressure;
  }

  public getDensityAtAltitude(altitude: Feet | Meters): KilogramsPerCubicMeter {
    return this.getConditionsAtAltitude(altitude).density;
  }

  // The base class already provides getSpeedOfSoundAtAltitude() and
  // getDynamicViscosityAtAltitude() — they will automatically use the
  // deviated temperature and pressure via getConditionsAtAltitude().
}
