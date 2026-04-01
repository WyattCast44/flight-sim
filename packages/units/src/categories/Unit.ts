import { UnitValueError } from "../core/validate.js";
/**
 * Abstract base class for all units.
 */
export abstract class Unit {
  abstract readonly value: number;

  /**
   * Get the string representation of the units.
   *
   * For example, if this unit is a length unit, this method
   * will return the string representation of the units, ie. "m".
   *
   * @returns The string representation of the units.
   */
  abstract getStringUnits(): string;

  /**
   * Convert the unit to a string representation of the
   * value and the units.
   *
   * @param precision - The number of decimal places to round the value to. Defaults to 2.
   * @returns The string representation of the value and the units.
   *
   * @example
   * const length = new Meters(100);
   * console.log(length.toString()); // "100.00 m"
   */
  public toString(precision: number = 2): string {
    return `${this.value.toFixed(precision)} ${this.getStringUnits()}`;
  }

  /**
   * Convert the unit to the SI unit for the category of this unit.
   *
   * For example, if this unit is a length unit, this method
   * will return the SI unit for length, ie. Meters.
   */
  abstract toSIUnits(): Unit;

  /**
   * Build an instance from the SI scalar for this unit’s category, or from any unit
   * (via `value.toSIUnits().value`). Each **concrete** class must override this static;
   * the default implementation throws so missing implementations fail at runtime.
   *
   * @param value - SI numeric value for the category, or a `Unit` to read SI from.
   * @returns A new instance of the concrete unit type.
   * @throws UnitValueError when called on `Unit` itself or on a class that did not override.
   * @example
   * ```typescript
   * const feet = Feet.fromSIValue(3.048);
   * const alsoFeet = Feet.fromSIValue(new Meters(3.048));
   * ```
   */
  static fromSIValue(value: number | Unit): Unit {
    throw new UnitValueError(
      "Each concrete unit class must implement static fromSIValue(value: number | Unit).",
    );
  }

  /**
   * Adds another unit of the same physical category.
   */
  public add<T extends Unit>(other: T): T {
    const thisBase = this.toSIUnits();
    const otherBase = other.toSIUnits();

    if (thisBase.constructor !== otherBase.constructor) {
      throw new Error(
        `Cannot add incompatible units: ${this.getStringUnits()} + ${other.getStringUnits()}.`,
      );
    }

    const resultValueInSI = thisBase.value + otherBase.value;
    const ctor = this.constructor as typeof Unit;
    return ctor.fromSIValue(resultValueInSI) as T;
  }

  /**
   * Subtracts another unit of the same physical category.
   */
  public subtract<T extends Unit>(other: T): T {
    const thisBase = this.toSIUnits();
    const otherBase = other.toSIUnits();

    if (thisBase.constructor !== otherBase.constructor) {
      throw new Error(
        `Cannot subtract incompatible units: ${this.getStringUnits()} - ${other.getStringUnits()}.`,
      );
    }

    const resultValueInSI = thisBase.value - otherBase.value;
    const ctor = this.constructor as typeof Unit;
    return ctor.fromSIValue(resultValueInSI) as T;
  }

  /**
   * Multiplies this unit by a dimensionless scalar.
   * This is now correct.
   */
  public multiplyByScalar(scalar: number): this {
    if (!isFinite(scalar)) {
      throw new UnitValueError(
        `Cannot multiply unit by non-finite scalar: ${scalar}`,
      );
    }

    const thisInSI = this.toSIUnits();
    const resultValueInSI = thisInSI.value * scalar;

    const ctor = this.constructor as typeof Unit;
    return ctor.fromSIValue(resultValueInSI) as this;
  }

  /**
   * Divides this unit by a dimensionless scalar.
   */
  public divideByScalar(scalar: number): this {
    if (!isFinite(scalar) || scalar === 0) {
      throw new UnitValueError(
        `Cannot divide unit by invalid scalar: ${scalar}`,
      );
    }

    const thisInSI = this.toSIUnits();
    const resultValueInSI = thisInSI.value / scalar;

    const ctor = this.constructor as typeof Unit;
    return ctor.fromSIValue(resultValueInSI) as this;
  }

  /**
   * Returns a new unit with the negated value (multiplies by -1).
   */
  public negate(): this {
    return this.multiplyByScalar(-1);
  }

  /**
   * Returns whether this unit has a value of exactly zero.
   */
  public isZero(tolerance: number = 1e-6): boolean {
    return Math.abs(this.value) <= tolerance;
  }

  /**
   * Returns whether this unit is approximately equal to another unit
   * within a given tolerance (default: 1e-6).
   *
   * Always compares in SI base units for accuracy.
   */
  public equals(other: Unit | number, tolerance: number = 1e-6): boolean {
    if (typeof other === "number") {
      return Math.abs(this.value - other) <= tolerance;
    }

    if (
      this.constructor !== other.constructor &&
      this.toSIUnits().constructor !== other.toSIUnits().constructor
    ) {
      return false; // different physical categories
    }

    const thisBase = this.toSIUnits();
    const otherBase = other.toSIUnits();

    return Math.abs(thisBase.value - otherBase.value) <= tolerance;
  }

  /**
   * Returns the absolute value of this unit.
   *
   * @param precision - The number of decimal places to round the value to. Defaults to 2.
   * @returns The absolute value of this unit.
   */
  public absoluteValue(precision: number = 2): number {
    return Math.round(Math.abs(this.value) * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  public min(other: Unit): this {
    const thisBase = this.toSIUnits();
    const otherBase = other.toSIUnits();

    if (thisBase.constructor !== otherBase.constructor) {
      throw new Error(
        `Cannot compare min of incompatible units: ${this.getStringUnits()} and ${other.getStringUnits()}`,
      );
    }

    const resultValueInSI = Math.min(thisBase.value, otherBase.value);
    const ctor = this.constructor as typeof Unit;
    return ctor.fromSIValue(resultValueInSI) as this;
  }

  public max(other: Unit): this {
    const thisBase = this.toSIUnits();
    const otherBase = other.toSIUnits();

    if (thisBase.constructor !== otherBase.constructor) {
      throw new Error(
        `Cannot compare max of incompatible units: ${this.getStringUnits()} and ${other.getStringUnits()}`,
      );
    }

    const resultValueInSI = Math.max(thisBase.value, otherBase.value);
    const ctor = this.constructor as typeof Unit;
    return ctor.fromSIValue(resultValueInSI) as this;
  }
}
