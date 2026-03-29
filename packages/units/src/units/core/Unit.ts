/**
 * Common shape for scalar unit value objects in this package.
 */
export interface ScalarUnit {
  readonly value: number;
  getStringUnits(): string;
  toString(): string;
}
