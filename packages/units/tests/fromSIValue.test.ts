import {
  Degrees,
  Feet,
  Meters,
  Milliseconds,
  Radians,
  Seconds,
  Unit,
  UnitValueError,
} from "@flight-sim/units";
import { describe, expect, it } from "vitest";
import { expectClose } from "./helpers.js";

describe("fromSIValue", () => {
  it("builds length from SI meters (number or unit)", () => {
    expectClose(Feet.fromSIValue(3.048).value, 10);
    expectClose(Feet.fromSIValue(new Meters(3.048)).value, 10);
    expectClose(Meters.fromSIValue(2.5).value, 2.5);
    expectClose(Meters.fromSIValue(Feet.fromFeet(1)).value, Meters.fromFeet(1).value);
  });

  it("angles use radians as SI scalar", () => {
    expectClose(Radians.fromSIValue(Math.PI).value, Math.PI);
    expectClose(Degrees.fromSIValue(Math.PI).value, 180);
    expectClose(Degrees.fromSIValue(new Radians(Math.PI)).value, 180);
  });

  it("time: SI scalar is seconds (including for Milliseconds)", () => {
    expectClose(Seconds.fromSIValue(1).value, 1);
    expectClose(Milliseconds.fromSIValue(1).value, 1000);
    expectClose(Milliseconds.fromSIValue(Milliseconds.fromMilliseconds(500)).value, 500);
  });

  it("Unit.add uses concrete static fromSIValue", () => {
    const sum = Feet.fromFeet(1).add(Meters.fromMeters(0.3048));
    expectClose(sum.value, 2);
  });

  it("Unit.fromSIValue throws by default", () => {
    expect(() => Unit.fromSIValue(1)).toThrow(UnitValueError);
  });
});
