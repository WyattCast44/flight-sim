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
   * Adds another unit of the **same physical category**.
   *
   * Example: Meters + Feet works. Meters + Newtons will throw.
   *
   * @throws Error if the units are from different physical categories.
   */
  public add<T extends Unit>(other: T): T {
    const thisBase = this.toSIUnits();
    const otherBase = other.toSIUnits();

    if (thisBase.constructor !== otherBase.constructor) {
      throw new Error(
        `Cannot add incompatible units: ${this.getStringUnits()} + ${other.getStringUnits()}. ` +
          `Both must belong to the same physical category.`,
      );
    }

    const resultValue = thisBase.value + otherBase.value;
    const ctor = this.constructor as typeof Unit & {
      fromSIValue(v: number | Unit): Unit;
    };
    const result = ctor.fromSIValue(resultValue);
    return result as T;
  }
}
