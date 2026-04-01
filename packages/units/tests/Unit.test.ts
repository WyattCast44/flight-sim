import { describe, it, expect } from 'vitest';

// Import concrete units for testing
import { Meters, Feet, Inches } from '../src/';
import { Newtons } from '../src/';
import { Kilograms } from '../src/';

describe('Unit Arithmetic and Helper Methods', () => {

  describe('add()', () => {
    it('should add two units of the same category', () => {
      const a = new Meters(10);
      const b = new Meters(5);
      const result = a.add(b);

      expect(result).toBeInstanceOf(Meters);
      expect(result.value).toBe(15);
    });

    it('should add mixed units and preserve concrete type', () => {
      const feet = new Feet(10);
      const inches = new Inches(12); // 1 foot

      const result = feet.add(inches);

      expect(result).toBeInstanceOf(Feet);
      expect(result.value).toBeCloseTo(11, 2);
    });

    it('should throw when adding incompatible units', () => {
      const length = new Meters(10);
      const mass = new Kilograms(5);

      expect(() => length.add(mass)).toThrow(/Cannot add incompatible units/);
    });
  });

  describe('subtract()', () => {
    it('should subtract two units of the same category', () => {
      const a = new Meters(20);
      const b = new Meters(8);
      const result = a.subtract(b);

      expect(result).toBeInstanceOf(Meters);
      expect(result.value).toBe(12);
    });

    it('should preserve concrete type when subtracting mixed units', () => {
      const feet = new Feet(10);
      const inches = new Inches(12);

      const result = feet.subtract(inches);

      expect(result).toBeInstanceOf(Feet);
      expect(result.value).toBeCloseTo(9, 2);
    });
  });

  describe('multiplyByScalar()', () => {
    it('should correctly multiply a unit by a scalar', () => {
      const feet = new Feet(1);
      const result = feet.multiplyByScalar(2);

      expect(result).toBeInstanceOf(Feet);
      expect(result.value).toBe(2);                    // This should now pass
    });

    it('should handle fractional and negative scalars', () => {
      const meters = new Meters(10);
      expect(meters.multiplyByScalar(0.5).value).toBe(5);
      expect(meters.multiplyByScalar(-2).value).toBe(-20);
    });
  });

  describe('divideByScalar()', () => {
    it('should divide a unit by a scalar', () => {
      const meters = new Meters(20);
      const result = meters.divideByScalar(4);

      expect(result.value).toBe(5);
    });

    it('should throw on division by zero or non-finite values', () => {
      const meters = new Meters(10);
      expect(() => meters.divideByScalar(0)).toThrow(/invalid scalar/);
      expect(() => meters.divideByScalar(NaN)).toThrow(/invalid scalar/);
    });
  });

  // ====================== New Helper Methods ======================

  describe('negate()', () => {
    it('should return a unit with negated value', () => {
      const positive = new Newtons(100);
      const negative = positive.negate();

      expect(negative).toBeInstanceOf(Newtons);
      expect(negative.value).toBe(-100);
    });

    it('should negate zero correctly', () => {
      const zero = new Meters(0);
      expect(zero.negate().value).toBe(-0);
    });
  });

  describe('isZero()', () => {
    it('should return true for zero value', () => {
      const zero = new Meters(0);
      expect(zero.isZero()).toBe(true);
    });

    it('should return false for non-zero value', () => {
      const positive = new Feet(1);
      const negative = new Newtons(-0.001);

      expect(positive.isZero()).toBe(false);
      expect(negative.isZero()).toBe(false);
    });
  });

  describe('equals()', () => {
    it('should return true for exactly equal units', () => {
      const a = new Meters(10);
      const b = new Meters(10);
      expect(a.equals(b)).toBe(true);
    });

    it('should return true for approximately equal units within tolerance', () => {
      const a = new Meters(10);
      const b = new Meters(10.0000005);
      expect(a.equals(b)).toBe(true);           // default tolerance 1e-6
    });

    it('should return false when difference exceeds tolerance', () => {
      const a = new Meters(10);
      const b = new Meters(10.001);
      expect(a.equals(b)).toBe(false);
    });

    it('should return false for different physical categories', () => {
      const length = new Meters(10);
      const mass = new Kilograms(10);
      expect(length.equals(mass)).toBe(false);
    });

    it('should respect custom tolerance', () => {
      const a = new Meters(10);
      const b = new Meters(10.005);
      expect(a.equals(b, 0.01)).toBe(true);
      expect(a.equals(b, 0.001)).toBe(false);
    });
  });

  describe('abs()', () => {
    it('should return absolute value', () => {
      const negative = new Newtons(-75);
      const result = negative.absoluteValue();

      expect(result).toBe(75);
    });
  });

  describe('min() and max()', () => {
    it('should return the smaller unit (min)', () => {
      const a = new Meters(15);
      const b = new Meters(8);
      const result = a.min(b);

      expect(result).toBeInstanceOf(Meters);
      expect(result.value).toBe(8);
    });

    it('should return the larger unit (max)', () => {
      const a = new Meters(15);
      const b = new Meters(28);
      const result = a.max(b);

      expect(result.value).toBe(28);
    });

    it('should throw when comparing incompatible units', () => {
      const length = new Meters(10);
      const force = new Newtons(100);

      expect(() => length.min(force)).toThrow(/incompatible units/);
      expect(() => length.max(force)).toThrow(/incompatible units/);
    });
  });

  describe('Method chaining', () => {
    it('should support fluent chaining of all operations', () => {
      const result = new Feet(20)
        .multiplyByScalar(1.5)           // 30 ft
        .add(new Inches(24))             // + 2 ft = 32 ft
        .subtract(new Meters(6.096))     // - 20 ft = 12 ft
        .negate()                        // -12 ft
        .absoluteValue() 

      expect(result).toBeCloseTo(12, 2);
    });
  });

  describe('Integration with fromSIValue', () => {
    it('should preserve concrete type through all operations', () => {
      const original = new Inches(36);        // 3 feet

      const result = original
        .multiplyByScalar(2) // 6 feet
        .add(new Feet(1)) // 7 feet
        .negate() // -7 feet
        .absoluteValue(); // 7 feet

      expect(result).toBeCloseTo(84, 1); // 7 feet = 84 inches
    });
  });
});