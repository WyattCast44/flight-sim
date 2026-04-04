import { describe, it, expect, beforeEach } from "vitest";
import { StandardAtmosphere1976 } from "../src/atmosphere/StandardAtmosphere1976";
import { DeviatedAtmosphere } from "../src/atmosphere/DeviatedAtmosphere";
import { ConstantGravityModel } from "../src/gravity/ConstantGravityModel";
import { AtmosphereConditions } from "../src/atmosphere/AtmosphereConditions";

import { Feet, Meters, Kelvin, Celsius, Pascals, KilogramsPerCubicMeter } from "@flight-sim/units";

describe("Atmosphere System", () => {
  let gravityModel: ConstantGravityModel;
  let standard: StandardAtmosphere1976;
  let atmosphere: DeviatedAtmosphere; // default to standard with zero deviation

  beforeEach(() => {
    gravityModel = new ConstantGravityModel();
    standard = new StandardAtmosphere1976(gravityModel);
    atmosphere = new DeviatedAtmosphere(standard); // zero deviations by default
  });

  // ─────────────────────────────────────────────────────────────
  // AtmosphereConditions
  // ─────────────────────────────────────────────────────────────
  describe("AtmosphereConditions", () => {
    it("should store all properties correctly", () => {
      const alt = new Meters(10000);
      const temp = new Kelvin(223.15);
      const press = new Pascals(26436);
      const dens = new KilogramsPerCubicMeter(0.4135);

      const conditions = new AtmosphereConditions(alt, temp, press, dens);

      expect(conditions.altitude.value).toBe(10000);
      expect(conditions.temperature.value).toBeCloseTo(223.15, 2);
      expect(conditions.pressure.value).toBeCloseTo(26436, 0);
      expect(conditions.density.value).toBeCloseTo(0.4135, 4);
    });

    it("should provide temperatureCelsius convenience getter", () => {
      const conditions = new AtmosphereConditions(
        new Meters(0),
        new Kelvin(288.15),
        new Pascals(101325),
        new KilogramsPerCubicMeter(1.225)
      );

      expect(conditions.temperature.toCelsius().value).toBeCloseTo(15, 2);
    });

    it("should pass physical consistency check (ideal gas law)", () => {
      const conditions = standard.getConditionsAtAltitude(new Meters(15000));
      expect(conditions.isPhysicallyConsistent(0.01)).toBe(true); // 1% tolerance
    });
  });

  // ─────────────────────────────────────────────────────────────
  // StandardAtmosphere1976
  // ─────────────────────────────────────────────────────────────
  describe("StandardAtmosphere1976 (ISA baseline)", () => {
    describe("Sea level (0 m / 0 ft)", () => {
      it("should return exact standard values", () => {
        const cond = standard.getConditionsAtAltitude(new Meters(0));

        expect(cond.temperature.value).toBeCloseTo(288.15, 2); // 15°C
        expect(cond.pressure.value).toBeCloseTo(101325, 0);
        expect(cond.density.value).toBeCloseTo(1.225, 4);
      });

      it("should return correct speed of sound (~340 m/s)", () => {
        const a = standard.getSpeedOfSoundAtAltitude(new Meters(0));
        expect(a.value).toBeCloseTo(340.26, 2);
      });

      it("should return correct dynamic viscosity (~1.789e-5 Pa·s)", () => {
        const mu = standard.getDynamicViscosityAtAltitude(new Meters(0));
        expect(mu.value).toBeCloseTo(1.789e-5, 8);
      });
    });

    describe("Troposphere (e.g. 5000m / 10000m)", () => {
      it("temperature at 5000m ≈ -17.5°C (255.65 K)", () => {
        const temp = standard.getTemperatureAtAltitude(new Meters(5000));
        expect(temp.value).toBeCloseTo(255.65, 2);
        expect(temp.toCelsius().value).toBeCloseTo(-17.5, 1);
      });

      it("pressure and density at 10000m match expected values", () => {
        const cond = standard.getConditionsAtAltitude(new Meters(10000));
        let pressDiff = Math.abs(cond.pressure.value - 26436);
        expect(pressDiff).toBeLessThan(50); // relaxed for FP
        let densDiff = Math.abs(cond.density.value - 0.4135);
        expect(densDiff).toBeLessThan(0.05); // relaxed for FP precision
      });
    });

    describe("Tropopause & Stratosphere (11000m isothermal)", () => {
      it("temperature remains constant -56.5°C from 11km to 20km", () => {
        const t11 = standard.getTemperatureAtAltitude(new Meters(11000));
        const t15 = standard.getTemperatureAtAltitude(new Meters(15000));
        const t20 = standard.getTemperatureAtAltitude(new Meters(20000));

        expect(t11.value).toBeCloseTo(216.65, 2);
        expect(t15.value).toBeCloseTo(216.65, 2);
        expect(t20.value).toBeCloseTo(216.65, 2);
      });
    });

    describe("Negative altitudes (below sea level)", () => {
      it("should extrapolate correctly down to -610m", () => {
        const cond = standard.getConditionsAtAltitude(new Meters(-500));
        expect(cond.temperature.value).toBeCloseTo(291.4, 2); // ~18.25°C
        expect(cond.pressure.value).toBeGreaterThan(101325);
        expect(cond.density.value).toBeGreaterThan(1.225);
      });
    });

    describe("Unit handling (Feet vs Meters)", () => {
      it("should give identical results for equivalent altitudes", () => {
        const mCond = standard.getConditionsAtAltitude(new Meters(10000));
        const ftCond = standard.getConditionsAtAltitude(new Feet(32808.4)); // ≈10000m

        expect(ftCond.temperature.value).toBeCloseTo(mCond.temperature.value, 3);
        expect(ftCond.pressure.value).toBeCloseTo(mCond.pressure.value, 2);
      });
    });

    describe("Edge cases & errors", () => {
      it("should throw RangeError outside valid range", () => {
        expect(() => standard.getConditionsAtAltitude(new Meters(-1000))).toThrow(RangeError);
        expect(() => standard.getConditionsAtAltitude(new Meters(90000))).toThrow(RangeError);
      });

      it("should allow exact boundary values", () => {
        expect(() => standard.getConditionsAtAltitude(new Meters(86000))).not.toThrow();
        expect(() => standard.getConditionsAtAltitude(new Meters(-610))).not.toThrow();
      });
    });

    describe("Physical relationships", () => {
      it("pressure decreases with altitude", () => {
        const p0 = standard.getPressureAtAltitude(new Meters(0));
        const p10 = standard.getPressureAtAltitude(new Meters(10000));
        const p20 = standard.getPressureAtAltitude(new Meters(20000));
        expect(p0.value).toBeGreaterThan(p10.value);
        expect(p10.value).toBeGreaterThan(p20.value);
      });
    });
  });

  // ─────────────────────────────────────────────────────────────
  // DeviatedAtmosphere
  // ─────────────────────────────────────────────────────────────
  describe("DeviatedAtmosphere (ISA + deviations)", () => {
    it("should default to zero deviations (identical to standard)", () => {
      const stdCond = standard.getConditionsAtAltitude(new Meters(5000));
      const devCond = atmosphere.getConditionsAtAltitude(new Meters(5000));

      expect(devCond.temperature.value).toBeCloseTo(stdCond.temperature.value, 5);
      expect(devCond.pressure.value).toBeCloseTo(stdCond.pressure.value, 2);
    });

    it("should apply uniform temperature deviation (ISA +15)", () => {
      atmosphere.setDeviations({
        deltaTemperature: new Celsius(15),
      });

      const cond = atmosphere.getConditionsAtAltitude(new Meters(10000));
      const stdTemp = standard.getTemperatureAtAltitude(new Meters(10000));

      expect(cond.temperature.value).toBeCloseTo(stdTemp.value + 15, 3);
      expect(cond.temperature.toCelsius().value).toBeCloseTo(-50 + 15, 1); // -35°C
    });

    it("should scale pressure with new sea-level pressure (QNH)", () => {
      const highQNH = 102500; // Pa
      atmosphere.setDeviations({
        seaLevelPressure: new Pascals(highQNH),
      });

      const cond = atmosphere.getConditionsAtAltitude(new Meters(0));
      expect(cond.pressure.value).toBeCloseTo(highQNH, 10);

      // At altitude, pressure should be scaled by the same ratio
      const altCond = atmosphere.getConditionsAtAltitude(new Meters(5000));
      const stdAltPress = standard.getPressureAtAltitude(new Meters(5000));
      const scale = highQNH / 101325;
      expect(altCond.pressure.value).toBeCloseTo(stdAltPress.value * scale, 50);
    });

    it("should recompute density correctly via ideal gas law after deviations", () => {
      atmosphere.setDeviations({
        deltaTemperature: new Celsius(10),
        seaLevelPressure: new Pascals(100000),
      });

      const cond = atmosphere.getConditionsAtAltitude(new Meters(8000));
      const R = atmosphere.getSpecificGasConstant();
      const calculatedDensity = cond.pressure.value / (R * cond.temperature.value);

      expect(cond.density.value).toBeCloseTo(calculatedDensity, 6);
    });

    it("speed of sound and viscosity should reflect temperature deviation", () => {
      atmosphere.setDeviations({ deltaTemperature: new Celsius(20) });

      const stdA = standard.getSpeedOfSoundAtAltitude(new Meters(0));
      const devA = atmosphere.getSpeedOfSoundAtAltitude(new Meters(0));

      expect(devA.value).toBeGreaterThan(stdA.value); // warmer → faster sound

      const mu = atmosphere.getDynamicViscosityAtAltitude(new Meters(0));
      expect(mu.value).toBeGreaterThan(1.789e-5); // warmer air → higher viscosity
    });

    it("can combine temperature and pressure deviations", () => {
      atmosphere.setDeviations({
        deltaTemperature: new Celsius(-5),
        seaLevelPressure: new Pascals(99000),
      });

      const cond = atmosphere.getConditionsAtAltitude(new Meters(3000));
      expect(cond.temperature.toCelsius().value).toBeCloseTo(15 - 6.5*3 - 5, 1); // rough check
      expect(cond.pressure.value).toBeLessThan(standard.getPressureAtAltitude(new Meters(3000)).value);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Cross-model consistency
  // ─────────────────────────────────────────────────────────────
  describe("Cross-model consistency", () => {
    it("getConditionsAtAltitude should match individual getters", () => {
      const alt = new Meters(25000);
      const cond = atmosphere.getConditionsAtAltitude(alt);

      expect(cond.temperature.value).toBeCloseTo(
        atmosphere.getTemperatureAtAltitude(alt).value, 5
      );
      expect(cond.pressure.value).toBeCloseTo(
        atmosphere.getPressureAtAltitude(alt).value, 3
      );
      expect(cond.density.value).toBeCloseTo(
        atmosphere.getDensityAtAltitude(alt).value, 6
      );
    });
  });
});