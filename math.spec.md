**Specification: Math Package for 6DOF Web-Based Flight Simulator**

**Project Name:** `@flight-sim/math` (TypeScript package)

**Goal**  
Create a lightweight, type-safe, **units-aware** vector and matrix mathematics library that serves as the foundational layer for all physics calculations in the simulator. It must integrate seamlessly with the `@flight-sim/units` package (which uses `abstract class Unit` with `.toSIUnits()`), enforce metric base units internally, support rigid-body 6DOF operations, and provide excellent debuggability via the structured logging package (`flight-sim/logging`)

### 1. Core Design Philosophy

- **Units-Aware Generics**: Vectors are generic over physical unit types from `@flight-sim/units` (`UnitType extends Unit`).
- **Metric-First Internal Calculations**: All math uses the internal SI base units. The `.toSIUnits()` method is the primary conversion mechanism.
- **Immutability by Default**: All operations return new instances.
- **Self-Documenting Code**: Clear, descriptive class/method/variable names. Avoid heavy abbreviations.
- **Strong Typing + Runtime Safety**: Validate finite values and log suspicious operations.

### 2. Main Components

- `**Vector3<UnitType extends Unit>`** — Primary 3D vector class
- `**Vector2<UnitType extends Unit>`** — 2D variant
- `**Matrix3x3**`
- `**Quaternion**`
- Utility modules: `transformations.ts`, `integration.ts`, `constants.ts`

Specialized type aliases (recommended):

- `PositionVector3 = Vector3<Meters>`
- `VelocityVector3 = Vector3<MetersPerSecond>`
- `ForceVector3 = Vector3<Newtons>`
- `AccelerationVector3 = Vector3<MetersPerSecondSquared>`
- `AngularVelocityVector3 = Vector3<RadiansPerSecond>`

### 3. Integration with Units Package

Use `.toSIUnits()` to convert any unit to its internal base form before heavy computation.

### 4. Implementation Requirements

- Monorepo location: `packages/math/`
- Dependencies: `@flight-sim/units` and the logging package `@flight-sim/logging`) (both via `workspace:*`)
- Strict TypeScript + Vitest with high coverage

### 5. Documentation Deliverables

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/TESTING.md`
- `docs/CONTRIBUTING.md`

### 6. Full Example: `Vector3.ts`

Below is a complete, production-ready implementation of `Vector3.ts` that follows all the design principles (self-documenting names, proper generics, `.toSIUnits()` integration, logging, and immutability).

```ts
import type { Unit } from '@flight-sim/units';
import { logger, Logger } from '@flight-sim/logging';

/**
 * A three-dimensional vector carrying a physical quantity with explicit units.
 * 
 * All components must be of the same unit type (e.g. all Meters, all Newtons).
 * This class is immutable — operations return new Vector3 instances.
 */
export class Vector3<UnitType extends Unit> {
  public readonly x: UnitType;
  public readonly y: UnitType;
  public readonly z: UnitType;

  private readonly logger: Logger;

  /**
   * Creates a new Vector3 with three components of the same unit type.
   */
  constructor(x: UnitType, y: UnitType, z: UnitType) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.logger = logger;

    this.validateComponentsAreFinite();
  }

  /**
   * Creates a zero vector for any unit type.
   */
  public static createZero<UnitType extends Unit>(
    unitConstructor: new (value: number) => UnitType,
  ): Vector3<UnitType> {
    const zero = new unitConstructor(0);
    return new Vector3(zero, zero, zero);
  }

  /**
   * Creates a position vector using the internal base unit (Meters).
   */
  public static createPositionInMeters(
    xMeters: number,
    yMeters: number,
    zMeters: number,
  ): Vector3<Meters> {
    return new Vector3(
      new Meters(xMeters),
      new Meters(yMeters),
      new Meters(zMeters),
    );
  }

  /**
   * Creates a velocity vector using the internal base unit (MetersPerSecond).
   */
  public static createVelocityInMetersPerSecond(
    xMetersPerSecond: number,
    yMetersPerSecond: number,
    zMetersPerSecond: number,
  ): Vector3<MetersPerSecond> {
    return new Vector3(
      new MetersPerSecond(xMetersPerSecond),
      new MetersPerSecond(yMetersPerSecond),
      new MetersPerSecond(zMetersPerSecond),
    );
  }

  /**
   * Creates a force vector using the internal base unit (Newtons).
   */
  public static createForceInNewtons(
    xNewtons: number,
    yNewtons: number,
    zNewtons: number,
  ): Vector3<Newtons> {
    return new Vector3(
      new Newtons(xNewtons),
      new Newtons(yNewtons),
      new Newtons(zNewtons),
    );
  }

  private validateComponentsAreFinite(): void {
    if (!isFinite(this.x.value) || !isFinite(this.y.value) || !isFinite(this.z.value)) {
      this.logger.error('Vector3 created with non-finite values', {
        x: this.x.value,
        y: this.y.value,
        z: this.z.value,
      });
      throw new Error('Vector3 components must be finite numbers (no NaN or Infinity)');
    }
  }

  /**
   * Returns a new vector that is the sum of this vector and another of the same unit type.
   */
  public addVector(other: Vector3<UnitType>): Vector3<UnitType> {
    this.logger.debug('Adding two vectors', {
      thisVector: this.toReadableObject(),
      otherVector: other.toReadableObject(),
    });

    return new Vector3(
      this.x.toSIUnits().add(other.x.toSIUnits()) as UnitType,  // Note: requires .add() on Unit
      this.y.toSIUnits().add(other.y.toSIUnits()) as UnitType,
      this.z.toSIUnits().add(other.z.toSIUnits()) as UnitType,
    );
  }

  /**
   * Returns a new vector that is the difference of this vector and another.
   */
  public subtractVector(other: Vector3<UnitType>): Vector3<UnitType> {
    return new Vector3(
      this.x.toSIUnits().subtract(other.x.toSIUnits()) as UnitType,
      this.y.toSIUnits().subtract(other.y.toSIUnits()) as UnitType,
      this.z.toSIUnits().subtract(other.z.toSIUnits()) as UnitType,
    );
  }

  /**
   * Returns a new vector scaled by a dimensionless scalar value.
   */
  public scaleByScalar(scalar: number): Vector3<UnitType> {
    if (!isFinite(scalar)) {
      this.logger.warn('Scaling Vector3 with non-finite scalar', { scalar });
    }

    return new Vector3(
      this.x.toSIUnits().multiplyByScalar(scalar) as UnitType,
      this.y.toSIUnits().multiplyByScalar(scalar) as UnitType,
      this.z.toSIUnits().multiplyByScalar(scalar) as UnitType,
    );
  }

  /**
   * Calculates the dot product with another vector of the same unit type.
   */
  public calculateDotProductWith(other: Vector3<UnitType>): number {
    const baseThis = this.convertToBaseUnits();
    const baseOther = other.convertToBaseUnits();

    return (
      baseThis.x.value * baseOther.x.value +
      baseThis.y.value * baseOther.y.value +
      baseThis.z.value * baseOther.z.value
    );
  }

  /**
   * Calculates the cross product (right-hand rule).
   */
  public calculateCrossProductWith(other: Vector3<UnitType>): Vector3<UnitType> {
    const a = this.convertToBaseUnits();
    const b = other.convertToBaseUnits();

    return new Vector3(
      a.y.multiplyByScalar(b.z.value).subtract(a.z.multiplyByScalar(b.y.value)) as UnitType,
      a.z.multiplyByScalar(b.x.value).subtract(a.x.multiplyByScalar(b.z.value)) as UnitType,
      a.x.multiplyByScalar(b.y.value).subtract(a.y.multiplyByScalar(b.x.value)) as UnitType,
    );
  }

  /**
   * Calculates the magnitude of the vector in its current unit type.
   */
  public calculateMagnitude(): UnitType {
    const base = this.convertToBaseUnits();

    const magnitudeValue = Math.sqrt(
      base.x.value * base.x.value +
      base.y.value * base.y.value +
      base.z.value * base.z.value
    );

    return new (this.x.constructor as new (v: number) => UnitType)(magnitudeValue);
  }

  /**
   * Returns a normalized (unit) vector in the same direction.
   */
  public normalizeToUnitVector(): Vector3<UnitType> {
    const magnitude = this.calculateMagnitude().value;

    if (magnitude === 0) {
      this.logger.warn('Attempted to normalize zero vector');
      return Vector3.createZero(this.x.constructor as any);
    }

    return this.scaleByScalar(1 / magnitude);
  }

  /**
   * Converts all components to their internal SI base units.
   * Useful before performing physics calculations.
   */
  public convertToBaseUnits(): Vector3<Unit> {
    return new Vector3(
      this.x.toSIUnits(),
      this.y.toSIUnits(),
      this.z.toSIUnits(),
    );
  }

  /**
   * Returns a plain object useful for logging and debugging.
   */
  public toReadableObject() {
    return {
      x: this.x.toString(),
      y: this.y.toString(),
      z: this.z.toString(),
    };
  }

  /**
   * Human-readable string representation of the vector.
   */
  public toString(): string {
    return `Vector3(${this.x.toString()}, ${this.y.toString()}, ${this.z.toString()})`;
  }
}
```