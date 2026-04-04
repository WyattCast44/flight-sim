import { describe, it, expect, beforeEach } from "vitest";

import { ConstantGravityModel } from "../src/gravity/ConstantGravityModel";
import { WGS84GravityModel } from "../src/gravity/WGS84GravityModel";
import { GravityModel } from "../src/gravity/GravityModel";

import { 
  MetersPerSecondSquared, 
  Feet, 
  Meters, 
  MeanSeaLevel
} from "@flight-sim/units";

describe("Gravity System", () => {
  let constantModel: ConstantGravityModel;
  let wgs84Model: WGS84GravityModel;

  beforeEach(() => {
    constantModel = new ConstantGravityModel();
    wgs84Model = new WGS84GravityModel();
  });

  // ─────────────────────────────────────────────────────────────
  // GravityModel (Abstract Base)
  // ─────────────────────────────────────────────────────────────
  describe("GravityModel abstract base", () => {
    it("should be extended by concrete implementations", () => {
      expect(constantModel).toBeInstanceOf(GravityModel);
      expect(wgs84Model).toBeInstanceOf(GravityModel);
    });

    it("should support all three altitude input types (Feet, Meters, Altitude)", () => {
      const altM = new Meters(10000);
      const altFt = new Feet(32808.4);
      const altObj = new MeanSeaLevel(10000); 

      expect(() => constantModel.getGravityAtAltitude(altM)).not.toThrow();
      expect(() => constantModel.getGravityAtAltitude(altFt)).not.toThrow();
      expect(() => constantModel.getGravityAtAltitude(altObj)).not.toThrow();
    });
  });

  // ─────────────────────────────────────────────────────────────
  // ConstantGravityModel
  // ─────────────────────────────────────────────────────────────
  describe("ConstantGravityModel", () => {
    it("should default to standard g₀ = 9.80665 m/s²", () => {
      const g = constantModel.getGravityAtAltitude(new Meters(0));
      expect(g.value).toBeCloseTo(9.80665, 5);

      const seaLevel = constantModel.getGravityAtSeaLevel();
      expect(seaLevel.value).toBeCloseTo(9.80665, 5);
    });

    it("should allow custom constant value in constructor", () => {
      const customG = new MetersPerSecondSquared(9.81);
      const customModel = new ConstantGravityModel(customG);

      expect(customModel.getGravityAtAltitude(new Meters(50000)).value)
        .toBeCloseTo(9.81, 5);
    });

    it("should return identical value regardless of altitude", () => {
      const g0 = constantModel.getGravityAtAltitude(new Meters(0));
      const g10km = constantModel.getGravityAtAltitude(new Meters(10000));
      const g50km = constantModel.getGravityAtAltitude(new Meters(50000));
      const g100kft = constantModel.getGravityAtAltitude(new Feet(100000));

      expect(g10km.value).toBe(g0.value);
      expect(g50km.value).toBe(g0.value);
      expect(g100kft.value).toBe(g0.value);
    });

    it("should return same value for getGravityAtSeaLevel and any altitude", () => {
      const sea = constantModel.getGravityAtSeaLevel();
      const alt = constantModel.getGravityAtAltitude(new Meters(30000));
      expect(alt.value).toBe(sea.value);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // WGS84GravityModel
  // ─────────────────────────────────────────────────────────────
  describe("WGS84GravityModel (variable with altitude)", () => {
    it("should default to standard sea-level gravity", () => {
      const seaLevel = wgs84Model.getGravityAtSeaLevel();
      expect(seaLevel.value).toBeCloseTo(9.80665, 5);
    });

    it("should return slightly lower gravity at higher altitudes (free-air approximation)", () => {
      const gSea = wgs84Model.getGravityAtAltitude(new Meters(0));
      const g10km = wgs84Model.getGravityAtAltitude(new Meters(10000));
      const g30km = wgs84Model.getGravityAtAltitude(new Meters(30000));

      expect(g10km.value).toBeLessThan(gSea.value);
      expect(g30km.value).toBeLessThan(g10km.value);

      // Correct expected decrease: ~0.0308 m/s² per 10 km
      const decrease10km = gSea.value - g10km.value;
      expect(decrease10km).toBeCloseTo(0.030785, 5); // matches exact free-air formula
    });

    it("should apply free-air approximation correctly", () => {
      const h = 10000;
      const expectedFactor = 1 - (2 * h) / WGS84GravityModel.EARTH_RADIUS_M;
      const expectedG = 9.80665 * expectedFactor;

      const actual = wgs84Model.getGravityAtAltitude(new Meters(h));
      expect(actual.value).toBeCloseTo(expectedG, 6);
    });

    it("should support all altitude input types", () => {
      const g1 = wgs84Model.getGravityAtAltitude(new Meters(15000));
      const g2 = wgs84Model.getGravityAtAltitude(new Feet(49212.6));
      const g3 = wgs84Model.getGravityAtAltitude(new MeanSeaLevel(15000));

      expect(g1.value).toBeCloseTo(g2.value, 5);
      expect(g2.value).toBeCloseTo(g3.value, 5);
    });

    it("should throw for extreme altitudes above 100 km", () => {
      expect(() => 
        wgs84Model.getGravityAtAltitude(new Meters(101000))
      ).toThrow(/extreme altitude/);
    });

    it("should never return gravity below safety floor of 9.75 m/s²", () => {
      const veryHigh = wgs84Model.getGravityAtAltitude(new Meters(99999));
      expect(veryHigh.value).toBeGreaterThanOrEqual(9.75);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Convenience & Integration Methods
  // ─────────────────────────────────────────────────────────────
  describe("Convenience methods and integration", () => {
    it("gravity values should be physically reasonable for aviation altitudes", () => {
      // Up to 100,000 ft (~30.5 km) — typical military ceiling
      const g = wgs84Model.getGravityAtAltitude(new Feet(100_000));
      expect(g.value).toBeGreaterThan(9.70);
      expect(g.value).toBeLessThan(9.81);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Cross-model consistency
  // ─────────────────────────────────────────────────────────────
  describe("Cross-model consistency", () => {
    it("Constant model should match WGS84 at sea level", () => {
      const constSea = constantModel.getGravityAtSeaLevel();
      const wgsSea = wgs84Model.getGravityAtSeaLevel();

      expect(constSea.value).toBeCloseTo(wgsSea.value, 5);
    });

    it("WGS84 should deviate from constant as altitude increases", () => {
      const alt = new Meters(40000);

      const constG = constantModel.getGravityAtAltitude(alt);
      const wgsG = wgs84Model.getGravityAtAltitude(alt);

      expect(wgsG.value).toBeLessThan(constG.value);
      expect(constG.value - wgsG.value).toBeGreaterThan(0.01);
    });
  });
});