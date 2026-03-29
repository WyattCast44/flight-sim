/** Thrown when a unit value is NaN, infinite, or violates domain rules. */
export class UnitValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitValueError";
  }
}

export function assertFiniteNumber(value: number, context: string): void {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new UnitValueError(`${context}: value must be a finite number, got ${String(value)}`);
  }
}

export function assertNonNegative(value: number, context: string): void {
  assertFiniteNumber(value, context);
  if (value < 0) {
    throw new UnitValueError(`${context}: value must be non-negative, got ${String(value)}`);
  }
}

export function assertPositive(value: number, context: string): void {
  assertFiniteNumber(value, context);
  if (value <= 0) {
    throw new UnitValueError(`${context}: value must be positive, got ${String(value)}`);
  }
}
