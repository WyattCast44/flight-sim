import { expect } from "vitest";

export const EPS = 1e-9;

export function expectClose(actual: number, expected: number, epsilon: number = EPS): void {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(epsilon);
}
