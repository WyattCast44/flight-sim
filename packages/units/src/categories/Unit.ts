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
   * Get an instance of the unit from the SI unit value.
   * 
   * For example, if this unit is Feet, this method
   * would accept a value in meters and return an instance of Feet.
   * 
   * If you pass an instance of a unit, the value will be extracted from the instance.
   * 
   * @param value - The value in the SI unit for the category of this unit.
   * @returns An instance of the unit from the SI unit value.
   * @example
   * ```typescript
   * const feet = Feet.fromSIUnits(3.048|new Meters(3.048));
   * console.log(feet); // 1 ft
   * ```
   */
  static fromSIValue(value: number|Unit): Unit {
    throw new Error("Not implemented");
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

    console.log(thisBase, otherBase);

    // Safety check: ensure they belong to the same physical dimension
    if (thisBase.constructor !== otherBase.constructor) {
      throw new Error(
        `Cannot add incompatible units: ${this.getStringUnits()} + ${other.getStringUnits()}. ` +
          `Both must belong to the same physical category.`,
      );
    }

    // for example, if we were adding feet to to feet, 
    // we would now have two values in meters - and we 
    // add them together to get the result value in meters.
    const resultValue = thisBase.value + otherBase.value;

    // then we would need to convert the result value back to the original unit type
    const result = Unit.fromSIValue(resultValue);

    return result.toSIUnits() as unknown as T;
  }
}
