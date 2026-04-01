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
}