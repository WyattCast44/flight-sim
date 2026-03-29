/**
 * Exercises every `static from*` entry point for conversion coverage.
 */
import {
  AboveGroundLevel,
  Bearing,
  Celsius,
  CubicFeet,
  CubicMeters,
  Degrees,
  DegreesCardinal,
  DegreesPerSecond,
  DegreesPerSecondSquared,
  Feet,
  FeetPerMinute,
  FeetPerSecond,
  FeetPerSecondSquared,
  FootPoundsForce,
  Fahrenheit,
  Hectopascals,
  Horsepower,
  Hours,
  Inches,
  Kelvin,
  Kilograms,
  KilogramsPerCubicMeter,
  KilogramMeterSquared,
  Kilometers,
  KilometersPerHour,
  Knots,
  Liters,
  MeanSeaLevel,
  Meters,
  MetersPerSecond,
  MetersPerSecondSquared,
  MilesPerHour,
  Minutes,
  NewtonMeters,
  Newtons,
  NauticalMiles,
  Pascals,
  PoundsForce,
  PoundsMass,
  PoundsPerSquareFoot,
  PoundsPerSquareInch,
  Radians,
  RadiansPerSecond,
  RadiansPerSecondSquared,
  RevolutionsPerMinute,
  Seconds,
  SlugFootSquared,
  Slugs,
  SlugsPerCubicFoot,
  SquareFeet,
  SquareMeters,
  USGallons,
  Watts,
} from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "./helpers.js";

describe("static factory coverage", () => {
  it("length", () => {
    const m = Meters.fromMeters(200);
    expectClose(Feet.fromMeters(m.value).toMeters().value, m.value);
    expectClose(Feet.fromInches(m.toInches().value).toMeters().value, m.value);
    expectClose(Feet.fromKilometers(m.toKilometers().value).toMeters().value, m.value);
    expectClose(Feet.fromNauticalMiles(m.toNauticalMiles().value).toMeters().value, m.value);

    const f = Feet.fromFeet(300);
    expectClose(Meters.fromFeet(f.value).toFeet().value, f.value);
    expectClose(Meters.fromInches(f.toInches().value).toFeet().value, f.value);
    expectClose(Meters.fromNauticalMiles(f.toNauticalMiles().value).toFeet().value, f.value);
    expectClose(Meters.fromKilometers(f.toKilometers().value).toFeet().value, f.value);

    const inch = Inches.fromInches(24);
    expectClose(Inches.fromMeters(inch.toMeters().value).toInches().value, inch.value);
    expectClose(Inches.fromFeet(inch.toFeet().value).toInches().value, inch.value);
    expectClose(Inches.fromKilometers(inch.toKilometers().value).toInches().value, inch.value);
    expectClose(Inches.fromNauticalMiles(inch.toNauticalMiles().value).toInches().value, inch.value);

    const km = Kilometers.fromKilometers(2);
    expectClose(Kilometers.fromMeters(km.toMeters().value).toKilometers().value, km.value);
    expectClose(Kilometers.fromFeet(km.toFeet().value).toKilometers().value, km.value);
    expectClose(Kilometers.fromInches(km.toInches().value).toKilometers().value, km.value);
    expectClose(Kilometers.fromNauticalMiles(km.toNauticalMiles().value).toKilometers().value, km.value);

    const nm = NauticalMiles.fromNauticalMiles(3);
    expectClose(NauticalMiles.fromMeters(nm.toMeters().value).toNauticalMiles().value, nm.value);
    expectClose(NauticalMiles.fromFeet(nm.toFeet().value).toNauticalMiles().value, nm.value);
    expectClose(NauticalMiles.fromInches(nm.toInches().value).toNauticalMiles().value, nm.value);
    expectClose(NauticalMiles.fromKilometers(nm.toKilometers().value).toNauticalMiles().value, nm.value);
  });

  it("altitude", () => {
    const msl = MeanSeaLevel.fromMeters(3000);
    expectClose(MeanSeaLevel.fromFeet(msl.toFeet().value).value, msl.value);
    expectClose(MeanSeaLevel.fromInches(msl.toInches().value).value, msl.value);
    expectClose(MeanSeaLevel.fromKilometers(msl.toKilometers().value).value, msl.value);
    expectClose(MeanSeaLevel.fromNauticalMiles(msl.toNauticalMiles().value).value, msl.value);

    const agl = AboveGroundLevel.fromMeters(500);
    expectClose(AboveGroundLevel.fromFeet(agl.toFeet().value).value, agl.value);
    expectClose(AboveGroundLevel.fromInches(agl.toInches().value).value, agl.value);
    expectClose(AboveGroundLevel.fromKilometers(agl.toKilometers().value).value, agl.value);
    expectClose(AboveGroundLevel.fromNauticalMiles(agl.toNauticalMiles().value).value, agl.value);
  });

  it("area", () => {
    const sm = SquareMeters.fromSquareMeters(40);
    expectClose(SquareFeet.fromSquareMeters(sm.value).toSquareMeters().value, sm.value);
    const sf = SquareFeet.fromSquareFeet(400);
    expectClose(SquareMeters.fromSquareFeet(sf.value).toSquareFeet().value, sf.value);
  });

  it("volume", () => {
    const m3 = CubicMeters.fromCubicMeters(2);
    expectClose(CubicMeters.fromLiters(m3.toLiters().value).value, m3.value);
    expectClose(CubicMeters.fromUSGallons(m3.toUSGallons().value).value, m3.value);
    expectClose(CubicMeters.fromCubicFeet(m3.toCubicFeet().value).value, m3.value);

    const L = Liters.fromLiters(400);
    expectClose(Liters.fromCubicMeters(L.toCubicMeters().value).value, L.value);
    expectClose(Liters.fromUSGallons(L.toUSGallons().value).value, L.value);
    expectClose(Liters.fromCubicFeet(L.toCubicFeet().value).value, L.value);

    const g = USGallons.fromUSGallons(80);
    expectClose(USGallons.fromCubicMeters(g.toCubicMeters().value).value, g.value);
    expectClose(USGallons.fromLiters(g.toLiters().value).value, g.value);
    expectClose(USGallons.fromCubicFeet(g.toCubicFeet().value).value, g.value);

    const cf = CubicFeet.fromCubicFeet(1000);
    expectClose(CubicFeet.fromCubicMeters(cf.toCubicMeters().value).value, cf.value);
    expectClose(CubicFeet.fromLiters(cf.toLiters().value).value, cf.value);
    expectClose(CubicFeet.fromUSGallons(cf.toUSGallons().value).value, cf.value);
  });

  it("velocity", () => {
    const ms = MetersPerSecond.fromMetersPerSecond(40);
    expectClose(MetersPerSecond.fromFeetPerSecond(ms.toFeetPerSecond().value).value, ms.value);
    expectClose(MetersPerSecond.fromKnots(ms.toKnots().value).value, ms.value);
    expectClose(MetersPerSecond.fromMilesPerHour(ms.toMilesPerHour().value).value, ms.value);
    expectClose(MetersPerSecond.fromKilometersPerHour(ms.toKilometersPerHour().value).value, ms.value);
    expectClose(MetersPerSecond.fromFeetPerMinute(ms.toFeetPerMinute().value).value, ms.value);

    const fps = FeetPerSecond.fromFeetPerSecond(100);
    expectClose(FeetPerSecond.fromMetersPerSecond(fps.toMetersPerSecond().value).value, fps.value);
    expectClose(FeetPerSecond.fromKnots(fps.toKnots().value).value, fps.value);
    expectClose(FeetPerSecond.fromMilesPerHour(fps.toMilesPerHour().value).value, fps.value);
    expectClose(FeetPerSecond.fromKilometersPerHour(fps.toKilometersPerHour().value).value, fps.value);
    expectClose(FeetPerSecond.fromFeetPerMinute(fps.toFeetPerMinute().value).value, fps.value);

    const kt = Knots.fromKnots(200);
    expectClose(Knots.fromMetersPerSecond(kt.toMetersPerSecond().value).value, kt.value);
    expectClose(Knots.fromFeetPerSecond(kt.toFeetPerSecond().value).value, kt.value);
    expectClose(Knots.fromMilesPerHour(kt.toMilesPerHour().value).value, kt.value);
    expectClose(Knots.fromKilometersPerHour(kt.toKilometersPerHour().value).value, kt.value);
    expectClose(Knots.fromFeetPerMinute(kt.toFeetPerMinute().value).value, kt.value);

    const mph = MilesPerHour.fromMilesPerHour(120);
    expectClose(MilesPerHour.fromMetersPerSecond(mph.toMetersPerSecond().value).value, mph.value);
    expectClose(MilesPerHour.fromFeetPerSecond(mph.toFeetPerSecond().value).value, mph.value);
    expectClose(MilesPerHour.fromKnots(mph.toKnots().value).value, mph.value);
    expectClose(MilesPerHour.fromKilometersPerHour(mph.toKilometersPerHour().value).value, mph.value);
    expectClose(MilesPerHour.fromFeetPerMinute(mph.toFeetPerMinute().value).value, mph.value);

    const kmh = KilometersPerHour.fromKilometersPerHour(90);
    expectClose(KilometersPerHour.fromMetersPerSecond(kmh.toMetersPerSecond().value).value, kmh.value);
    expectClose(KilometersPerHour.fromFeetPerSecond(kmh.toFeetPerSecond().value).value, kmh.value);
    expectClose(KilometersPerHour.fromKnots(kmh.toKnots().value).value, kmh.value);
    expectClose(KilometersPerHour.fromMilesPerHour(kmh.toMilesPerHour().value).value, kmh.value);
    expectClose(KilometersPerHour.fromFeetPerMinute(kmh.toFeetPerMinute().value).value, kmh.value);

    const fpm = FeetPerMinute.fromFeetPerMinute(2000);
    expectClose(FeetPerMinute.fromMetersPerSecond(fpm.toMetersPerSecond().value).value, fpm.value);
    expectClose(FeetPerMinute.fromFeetPerSecond(fpm.toFeetPerSecond().value).value, fpm.value);
    expectClose(FeetPerMinute.fromKnots(fpm.toKnots().value).value, fpm.value);
    expectClose(FeetPerMinute.fromMilesPerHour(fpm.toMilesPerHour().value).value, fpm.value);
    expectClose(FeetPerMinute.fromKilometersPerHour(fpm.toKilometersPerHour().value).value, fpm.value);
  });

  it("acceleration", () => {
    const a = MetersPerSecondSquared.fromMetersPerSecondSquared(5);
    expectClose(
      MetersPerSecondSquared.fromFeetPerSecondSquared(a.toFeetPerSecondSquared().value).value,
      a.value,
    );
    const b = FeetPerSecondSquared.fromFeetPerSecondSquared(10);
    expectClose(
      FeetPerSecondSquared.fromMetersPerSecondSquared(b.toMetersPerSecondSquared().value).value,
      b.value,
    );
  });

  it("angular velocity", () => {
    const r = RadiansPerSecond.fromRadiansPerSecond(2);
    expectClose(RadiansPerSecond.fromDegreesPerSecond(r.toDegreesPerSecond().value).value, r.value);
    expectClose(RadiansPerSecond.fromRevolutionsPerMinute(r.toRevolutionsPerMinute().value).value, r.value);

    const d = DegreesPerSecond.fromDegreesPerSecond(45);
    expectClose(DegreesPerSecond.fromRadiansPerSecond(d.toRadiansPerSecond().value).value, d.value);
    expectClose(DegreesPerSecond.fromRevolutionsPerMinute(d.toRevolutionsPerMinute().value).value, d.value);

    const rpm = RevolutionsPerMinute.fromRevolutionsPerMinute(2400);
    expectClose(RevolutionsPerMinute.fromRadiansPerSecond(rpm.toRadiansPerSecond().value).value, rpm.value);
    expectClose(RevolutionsPerMinute.fromDegreesPerSecond(rpm.toDegreesPerSecond().value).value, rpm.value);
  });

  it("angular acceleration", () => {
    const r = RadiansPerSecondSquared.fromRadiansPerSecondSquared(0.2);
    expectClose(
      RadiansPerSecondSquared.fromDegreesPerSecondSquared(r.toDegreesPerSecondSquared().value).value,
      r.value,
    );
    const d = DegreesPerSecondSquared.fromDegreesPerSecondSquared(10);
    expectClose(
      DegreesPerSecondSquared.fromRadiansPerSecondSquared(d.toRadiansPerSecondSquared().value).value,
      d.value,
    );
  });

  it("mass", () => {
    const kg = Kilograms.fromKilograms(80);
    expectClose(Kilograms.fromPoundsMass(kg.toPoundsMass().value).value, kg.value);
    expectClose(Kilograms.fromSlugs(kg.toSlugs().value).value, kg.value);

    const lbm = PoundsMass.fromPoundsMass(150);
    expectClose(PoundsMass.fromKilograms(lbm.toKilograms().value).value, lbm.value);
    expectClose(PoundsMass.fromSlugs(lbm.toSlugs().value).value, lbm.value);

    const slug = Slugs.fromSlugs(5);
    expectClose(Slugs.fromKilograms(slug.toKilograms().value).value, slug.value);
    expectClose(Slugs.fromPoundsMass(slug.toPoundsMass().value).value, slug.value);
  });

  it("force", () => {
    const n = Newtons.fromNewtons(5000);
    expectClose(Newtons.fromPoundsForce(n.toPoundsForce().value).value, n.value);
    const lbf = PoundsForce.fromPoundsForce(2000);
    expectClose(PoundsForce.fromNewtons(lbf.toNewtons().value).value, lbf.value);
  });

  it("torque", () => {
    const nm = NewtonMeters.fromNewtonMeters(2000);
    expectClose(NewtonMeters.fromFootPoundsForce(nm.toFootPoundsForce().value).value, nm.value);
    const ftlb = FootPoundsForce.fromFootPoundsForce(500);
    expectClose(FootPoundsForce.fromNewtonMeters(ftlb.toNewtonMeters().value).value, ftlb.value);
  });

  it("moment of inertia", () => {
    const k = KilogramMeterSquared.fromKilogramMeterSquared(8000);
    expectClose(KilogramMeterSquared.fromSlugFootSquared(k.toSlugFootSquared().value).value, k.value);
    const s = SlugFootSquared.fromSlugFootSquared(600);
    expectClose(SlugFootSquared.fromKilogramMeterSquared(s.toKilogramMeterSquared().value).value, s.value);
  });

  it("density", () => {
    const d = KilogramsPerCubicMeter.fromKilogramsPerCubicMeter(1.2);
    expectClose(KilogramsPerCubicMeter.fromSlugsPerCubicFoot(d.toSlugsPerCubicFoot().value).value, d.value);
    const s = SlugsPerCubicFoot.fromSlugsPerCubicFoot(0.002);
    expectClose(SlugsPerCubicFoot.fromKilogramsPerCubicMeter(s.toKilogramsPerCubicMeter().value).value, s.value);
  });

  it("pressure", () => {
    const pa = Pascals.fromPascals(100000);
    expectClose(Pascals.fromHectopascals(pa.toHectopascals().value).value, pa.value);
    expectClose(Pascals.fromMillibars(pa.toHectopascals().value).value, pa.value);
    expectClose(Pascals.fromPoundsPerSquareInch(pa.toPoundsPerSquareInch().value).value, pa.value);
    expectClose(Pascals.fromPoundsPerSquareFoot(pa.toPoundsPerSquareFoot().value).value, pa.value);

    const hpa = Hectopascals.fromHectopascals(1012);
    expectClose(Hectopascals.fromPascals(hpa.toPascals().value).value, hpa.value);
    expectClose(Hectopascals.fromMillibars(hpa.value).value, hpa.value);
    expectClose(Hectopascals.fromPoundsPerSquareInch(hpa.toPoundsPerSquareInch().value).value, hpa.value);
    expectClose(Hectopascals.fromPoundsPerSquareFoot(hpa.toPoundsPerSquareFoot().value).value, hpa.value);

    const psi = PoundsPerSquareInch.fromPoundsPerSquareInch(15);
    expectClose(PoundsPerSquareInch.fromPascals(psi.toPascals().value).value, psi.value);
    expectClose(PoundsPerSquareInch.fromHectopascals(psi.toHectopascals().value).value, psi.value);
    expectClose(PoundsPerSquareInch.fromMillibars(psi.toHectopascals().value).value, psi.value);
    expectClose(PoundsPerSquareInch.fromPoundsPerSquareFoot(psi.toPoundsPerSquareFoot().value).value, psi.value);

    const psf = PoundsPerSquareFoot.fromPoundsPerSquareFoot(2000);
    expectClose(PoundsPerSquareFoot.fromPascals(psf.toPascals().value).value, psf.value);
    expectClose(PoundsPerSquareFoot.fromHectopascals(psf.toHectopascals().value).value, psf.value);
    expectClose(PoundsPerSquareFoot.fromMillibars(psf.toHectopascals().value).value, psf.value);
    expectClose(PoundsPerSquareFoot.fromPoundsPerSquareInch(psf.toPoundsPerSquareInch().value).value, psf.value);
  });

  it("power", () => {
    const w = Watts.fromWatts(1491.4);
    expectClose(Watts.fromHorsepower(w.toHorsepower().value).value, w.value);
    const hp = Horsepower.fromHorsepower(2);
    expectClose(Horsepower.fromWatts(hp.toWatts().value).value, hp.value);
  });

  it("temperature", () => {
    const k = Kelvin.fromKelvin(300);
    expectClose(Kelvin.fromCelsius(k.toCelsius().value).value, k.value);
    expectClose(Kelvin.fromFahrenheit(k.toFahrenheit().value).value, k.value);

    const c = Celsius.fromCelsius(20);
    expectClose(Celsius.fromKelvin(c.toKelvin().value).value, c.value);
    expectClose(Celsius.fromFahrenheit(c.toFahrenheit().value).value, c.value);

    const f = Fahrenheit.fromFahrenheit(68);
    expectClose(Fahrenheit.fromKelvin(f.toKelvin().value).value, f.value);
    expectClose(Fahrenheit.fromCelsius(f.toCelsius().value).value, f.value);
  });

  it("angles", () => {
    const r = Radians.fromRadians(0.75);
    expectClose(Radians.fromDegrees(r.toDegrees().value).value, r.value);
    expectClose(Radians.fromDegreesCardinal(r.toDegreesCardinal().value).value, r.value);
    expectClose(Radians.fromBearing(r.toBearing().value).value, r.value);

    const d = Degrees.fromDegrees(-20);
    expectClose(Degrees.fromRadians(d.toRadians().value).value, d.value);
    expectClose(Degrees.fromDegreesCardinal(d.toDegreesCardinal().value).value, d.value);
    expectClose(Degrees.fromBearing(d.toBearing().value).value, d.value);

    const c = DegreesCardinal.fromDegreesCardinal(200);
    expectClose(DegreesCardinal.fromRadians(c.toRadians().value).value, c.value);
    expectClose(DegreesCardinal.fromDegrees(c.toDegrees().value).value, c.value);
    expectClose(DegreesCardinal.fromBearing(c.toBearing().value).value, c.value);

    const b = Bearing.fromBearing(-400);
    expectClose(Bearing.fromRadians(b.toRadians().value).toDegreesCardinal().value, b.toDegreesCardinal().value);
    expectClose(Bearing.fromDegrees(b.toDegrees().value).toDegreesCardinal().value, b.toDegreesCardinal().value);
    expectClose(Bearing.fromDegreesCardinal(b.toDegreesCardinal().value).value, b.toDegreesCardinal().value);
  });

  it("time", () => {
    const s = Seconds.fromSeconds(5000);
    expectClose(Seconds.fromMinutes(s.toMinutes().value).value, s.value);
    expectClose(Seconds.fromHours(s.toHours().value).value, s.value);

    const min = Minutes.fromMinutes(120);
    expectClose(Minutes.fromSeconds(min.toSeconds().value).value, min.value);
    expectClose(Minutes.fromHours(min.toHours().value).value, min.value);

    const h = Hours.fromHours(8);
    expectClose(Hours.fromSeconds(h.toSeconds().value).value, h.value);
    expectClose(Hours.fromMinutes(h.toMinutes().value).value, h.value);
  });
});
