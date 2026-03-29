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
  Fahrenheit,
  FootPoundsForce,
  Horsepower,
  Hectopascals,
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

describe("sanity — import and round-trip smoke", () => {
  it("covers every exported concrete unit", () => {
    expectClose(Meters.fromMeters(10).toFeet().toMeters().value, 10);
    expectClose(Feet.fromFeet(10).toMeters().toFeet().value, 10);
    expectClose(Inches.fromInches(12).toFeet().value, 1);
    expectClose(Kilometers.fromKilometers(1).toMeters().value, 1000);
    expectClose(NauticalMiles.fromNauticalMiles(1).toMeters().value, 1852);

    expectClose(MeanSeaLevel.fromMeters(100).toMeters().value, 100);
    expectClose(AboveGroundLevel.fromMeters(50).toMeters().value, 50);

    expectClose(SquareMeters.fromSquareMeters(1).toSquareFeet().toSquareMeters().value, 1);
    expectClose(SquareFeet.fromSquareFeet(1).toSquareMeters().toSquareFeet().value, 1);

    expectClose(CubicMeters.fromCubicMeters(1).toLiters().value, 1000);
    expectClose(Liters.fromLiters(1).toCubicMeters().value, 0.001);
    expectClose(USGallons.fromUSGallons(1).toLiters().toUSGallons().value, 1);
    expectClose(CubicFeet.fromCubicFeet(1).toCubicMeters().toCubicFeet().value, 1);

    expectClose(MetersPerSecond.fromMetersPerSecond(10).toKnots().toMetersPerSecond().value, 10);
    expectClose(FeetPerSecond.fromFeetPerSecond(1).toMetersPerSecond().toFeetPerSecond().value, 1);
    expectClose(Knots.fromKnots(100).toMetersPerSecond().toKnots().value, 100);
    expectClose(MilesPerHour.fromMilesPerHour(60).toMetersPerSecond().toMilesPerHour().value, 60);
    expectClose(KilometersPerHour.fromKilometersPerHour(100).toMetersPerSecond().toKilometersPerHour().value, 100);
    expectClose(FeetPerMinute.fromFeetPerMinute(1000).toMetersPerSecond().toFeetPerMinute().value, 1000);

    expectClose(
      MetersPerSecondSquared.fromMetersPerSecondSquared(1).toFeetPerSecondSquared().toMetersPerSecondSquared().value,
      1,
    );
    expectClose(
      FeetPerSecondSquared.fromFeetPerSecondSquared(1).toMetersPerSecondSquared().toFeetPerSecondSquared().value,
      1,
    );

    expectClose(RadiansPerSecond.fromRadiansPerSecond(1).toDegreesPerSecond().toRadiansPerSecond().value, 1);
    expectClose(DegreesPerSecond.fromDegreesPerSecond(1).toRadiansPerSecond().toDegreesPerSecond().value, 1);
    expectClose(RevolutionsPerMinute.fromRevolutionsPerMinute(60).toRadiansPerSecond().toRevolutionsPerMinute().value, 60);

    expectClose(
      RadiansPerSecondSquared.fromRadiansPerSecondSquared(1).toDegreesPerSecondSquared().toRadiansPerSecondSquared().value,
      1,
    );
    expectClose(
      DegreesPerSecondSquared.fromDegreesPerSecondSquared(1).toRadiansPerSecondSquared().toDegreesPerSecondSquared().value,
      1,
    );

    expectClose(Kilograms.fromKilograms(1).toPoundsMass().toKilograms().value, 1);
    expectClose(PoundsMass.fromPoundsMass(1).toKilograms().toPoundsMass().value, 1);
    expectClose(Slugs.fromSlugs(1).toKilograms().toSlugs().value, 1);

    expectClose(Newtons.fromNewtons(1).toPoundsForce().toNewtons().value, 1);
    expectClose(PoundsForce.fromPoundsForce(1).toNewtons().toPoundsForce().value, 1);

    expectClose(NewtonMeters.fromNewtonMeters(1).toFootPoundsForce().toNewtonMeters().value, 1);
    expectClose(FootPoundsForce.fromFootPoundsForce(1).toNewtonMeters().toFootPoundsForce().value, 1);

    expectClose(
      KilogramMeterSquared.fromKilogramMeterSquared(1).toSlugFootSquared().toKilogramMeterSquared().value,
      1,
    );
    expectClose(
      SlugFootSquared.fromSlugFootSquared(1).toKilogramMeterSquared().toSlugFootSquared().value,
      1,
    );

    expectClose(
      KilogramsPerCubicMeter.fromKilogramsPerCubicMeter(1).toSlugsPerCubicFoot().toKilogramsPerCubicMeter().value,
      1,
    );
    expectClose(
      SlugsPerCubicFoot.fromSlugsPerCubicFoot(1).toKilogramsPerCubicMeter().toSlugsPerCubicFoot().value,
      1,
    );

    expectClose(Pascals.fromPascals(100000).toHectopascals().toPascals().value, 100000);
    expectClose(Hectopascals.fromHectopascals(1000).toPascals().toHectopascals().value, 1000);
    expectClose(PoundsPerSquareInch.fromPoundsPerSquareInch(1).toPascals().toPoundsPerSquareInch().value, 1);
    expectClose(PoundsPerSquareFoot.fromPoundsPerSquareFoot(1).toPascals().toPoundsPerSquareFoot().value, 1);

    expectClose(Watts.fromWatts(745.69987158227022).toHorsepower().toWatts().value, 745.69987158227022);
    expectClose(Horsepower.fromHorsepower(1).toWatts().toHorsepower().value, 1);

    expectClose(Kelvin.fromKelvin(273.15).toCelsius().toKelvin().value, 273.15);
    expectClose(Celsius.fromCelsius(0).toKelvin().toCelsius().value, 0);
    expectClose(Fahrenheit.fromFahrenheit(32).toCelsius().toFahrenheit().value, 32);

    expectClose(Radians.fromRadians(1).toDegrees().toRadians().value, 1);
    expectClose(Degrees.fromDegrees(1).toRadians().toDegrees().value, 1);
    expectClose(DegreesCardinal.fromDegreesCardinal(90).toRadians().toDegreesCardinal().value, 90);
    expectClose(Bearing.fromBearing(90).toRadians().toBearing().toDegreesCardinal().value, 90);

    expectClose(Seconds.fromSeconds(3600).toHours().toSeconds().value, 3600);
    expectClose(Minutes.fromMinutes(60).toHours().toMinutes().value, 60);
    expectClose(Hours.fromHours(1).toSeconds().toHours().value, 1);
  });
});
