import { Unit } from "@flight-sim/units";

export class Vector3<UnitType extends Unit> {
  public readonly x: UnitType;
  public readonly y: UnitType;
  public readonly z: UnitType;

  constructor(x: UnitType, y: UnitType, z: UnitType) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.validateComponentsAreFinite();
  }

  // ====================== Static Factories ======================

  /**
   * Creates a zero vector for any unit type.
   *
   * @param unitConstructor - The constructor for the unit type.
   * @returns A new Vector3 with the zero components.
   * @example
   * ```typescript
   * const zero = Vector3.createZero(Meters);
   * ```
   */
  public static createZero<UnitType extends Unit>(
    unitConstructor: new (value: number) => UnitType,
  ): Vector3<UnitType> {
    const zero = new unitConstructor(0);

    return new Vector3<UnitType>(zero, zero, zero);
  }

  // ====================== Core Methods ======================

  /**
   * Converts the vector to the base units.
   *
   * @returns A new Vector3 with the components in the base units for the unit type.
   * @example
   * ```typescript
   * const position = new Vector3(new Feet(0), new Feet(0), new Feet(0));
   * const baseUnits = position.convertToBaseUnits();
   * console.log(baseUnits.toString()); // "Vector3(0.00 m, 0.00 m, 0.00 m)"
   * ```
   */
  public convertToBaseUnits(): Vector3<Unit> {
    return new Vector3(
      this.x.toSIUnits(),
      this.y.toSIUnits(),
      this.z.toSIUnits(),
    );
  }
  
  public toReadableObject(): { x: string; y: string; z: string } {
    return {
      x: this.x.toString(),
      y: this.y.toString(),
      z: this.z.toString(),
    };
  }

  public toString(): string {
    return `Vector3(${this.x.toString()}, ${this.y.toString()}, ${this.z.toString()})`;
  }

  public toArray(): [UnitType, UnitType, UnitType] {
    return [this.x, this.y, this.z];
  }

  public toRawArray(): [number, number, number] {
    return [this.x.value, this.y.value, this.z.value];
  }

  private validateComponentsAreFinite(): void {
    if (
      !isFinite(this.x.value) ||
      !isFinite(this.y.value) ||
      !isFinite(this.z.value)
    ) {
      throw new Error(
        "Components must be finite numbers (no NaN or Infinity). Values: " +
          JSON.stringify({
            x: this.x.value,
            y: this.y.value,
            z: this.z.value,
          }),
      );
    }
  }

  // ====================== Math Operations ======================

  /**
   * Adds two vectors of the same unit type.
   *
   * @param other - The vector to add to this vector.
   * @returns A new Vector3 with the sum of the two vectors.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
   * const v2 = new Vector3(new Meters(4), new Meters(5), new Meters(6));
   * const v3 = v1.addVector(v2);
   * console.log(v3.toString()); // "Vector3(5.00 m, 7.00 m, 9.00 m)"
   * ```
   */
  public addVector(other: Vector3<UnitType>): Vector3<UnitType> {
    // We convert to SI, add in base units, then convert back to the original unit type
    const thisBase = this.convertToBaseUnits();
    const otherBase = other.convertToBaseUnits();

    const resultBaseX = thisBase.x.add(otherBase.x);
    const resultBaseY = thisBase.y.add(otherBase.y);
    const resultBaseZ = thisBase.z.add(otherBase.z);

    let xConstructor = this.x.constructor as typeof Unit;
    let yConstructor = this.y.constructor as typeof Unit;
    let zConstructor = this.z.constructor as typeof Unit;

    return new Vector3(
      xConstructor.fromSIValue(resultBaseX) as UnitType,
      yConstructor.fromSIValue(resultBaseY) as UnitType,
      zConstructor.fromSIValue(resultBaseZ) as UnitType,
    );
  }

  /**
   * Subtracts two vectors of the same unit type.
   *
   * @param other - The vector to subtract from this vector.
   * @returns A new Vector3 with the difference of the two vectors.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
   * const v2 = new Vector3(new Meters(4), new Meters(5), new Meters(6));
   * const v3 = v1.subtractVector(v2);
   * console.log(v3.toString()); // "Vector3(-3.00 m, -3.00 m, -3.00 m)"
   * ```
   */
  public subtractVector(other: Vector3<UnitType>): Vector3<UnitType> {
    // We convert to SI, subtract in base units, then convert back to the original unit type
    const thisBase = this.convertToBaseUnits();
    const otherBase = other.convertToBaseUnits();

    const resultBaseX = thisBase.x.subtract(otherBase.x);
    const resultBaseY = thisBase.y.subtract(otherBase.y);
    const resultBaseZ = thisBase.z.subtract(otherBase.z);

    let xConstructor = this.x.constructor as typeof Unit;
    let yConstructor = this.y.constructor as typeof Unit;
    let zConstructor = this.z.constructor as typeof Unit;

    return new Vector3(
      xConstructor.fromSIValue(resultBaseX) as UnitType,
      yConstructor.fromSIValue(resultBaseY) as UnitType,
      zConstructor.fromSIValue(resultBaseZ) as UnitType,
    );
  }

  /**
   * Scales a vector by a scalar.
   *
   * @param scalar - The scalar to scale the vector by.
   * @returns A new Vector3 with the scaled vector.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
   * const v2 = v1.scaleByScalar(2);
   * console.log(v2.toString()); // "Vector3(2.00 m, 4.00 m, 6.00 m)"
   * ```
   */
  public scaleByScalar(scalar: number): Vector3<UnitType> {
    return new Vector3(
      this.x.multiplyByScalar(scalar) as UnitType,
      this.y.multiplyByScalar(scalar) as UnitType,
      this.z.multiplyByScalar(scalar) as UnitType,
    );
  }

  /**
   * Returns the squared magnitude (length²) of the vector in the current unit type.
   *
   * This is mathematically equivalent to magnitude()² but avoids the expensive square root.
   *
   * In flight sims this is preferred for:
   * - Fast distance comparisons (e.g. is aircraft within range?)
   * - Performance-critical checks (stall speed, ground proximity, etc.)
   * - Avoiding floating-point precision issues near zero
   *
   * @returns The squared magnitude of the vector in the current unit type.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(3), new Meters(4), new Meters(5));
   * const sqMag = v1.squaredMagnitude();
   * console.log(sqMag.toString()); // "50.00 m^2"
   * ```
   */
  public squaredMagnitude(): number {
    const base = this.convertToBaseUnits();

    const sqMagValue =
      base.x.value * base.x.value +
      base.y.value * base.y.value +
      base.z.value * base.z.value;

    return sqMagValue;
  }

  /**
   * Returns the magnitude (length) of the vector in its current unit type.
   *
   * For positions/distances this gives meters/feet/etc.
   * For velocities it gives speed in the velocity unit.
   * For forces it gives the total force magnitude in Newtons.
   *
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(3), new Meters(4), new Meters(5));
   * const mag = v1.magnitude();
   * console.log(mag.toString()); // "7.07 m"
   * ```
   */
  public magnitude(): UnitType {
    const sqMag = this.squaredMagnitude();

    const magValue = Math.sqrt(sqMag);

    const constructor = this.x.constructor as typeof Unit;

    return constructor.fromSIValue(magValue) as UnitType;
  }

  /**
   * Returns whether the vector is approximately zero.
   *
   * @param epsilon - The tolerance for the approximation.
   * @returns True if the vector is approximately zero, false otherwise.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(0), new Meters(0), new Meters(0));
   * const isZero = v1.isApproximatelyZero();
   * console.log(isZero); // true
   * ```
   */
  public isApproximatelyZero(epsilon: number = 1e-8): boolean {
    return this.squaredMagnitude() < epsilon * epsilon;
  }

  /**
   * Returns the squared distance between this vector and another vector.
   *
   * @param other - The vector to calculate the distance to.
   * @returns The squared distance between the two vectors.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
   * const v2 = new Vector3(new Meters(4), new Meters(5), new Meters(6));
   * const distanceSquared = v1.distanceSquaredTo(v2);
   * console.log(distanceSquared); // "27.00 m^2"
   * ```
   */
  public distanceSquaredTo(other: Vector3<UnitType>): number {
    return this.subtractVector(other).squaredMagnitude();
  }

  /**
   * Returns the dot product of this vector and another vector.
   *
   * @param other - The vector to calculate the dot product with.
   * @returns The dot product of the two vectors.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
   * const v2 = new Vector3(new Meters(4), new Meters(5), new Meters(6));
   * const dotProduct = v1.dotProductWith(v2);
   * console.log(dotProduct); // "32.00 (m^2)"
   * ```
   */
  public dotProductWith(other: Vector3<UnitType>): number {
    const thisBase = this.convertToBaseUnits();
    const otherBase = other.convertToBaseUnits();

    return (
      thisBase.x.value * otherBase.x.value +
      thisBase.y.value * otherBase.y.value +
      thisBase.z.value * otherBase.z.value
    );
  }

  /**
   * Returns a normalized (unit) vector in the same direction.
   *
   * @returns A new Vector3 with the normalized vector.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(3), new Meters(4), new Meters(5));
   * const normalized = v1.normalize();
   * console.log(normalized.toString()); // "Vector3(0.4242 m, 0.5656 m, 0.7071 m)"
   * ```
   */
  public normalize(): Vector3<UnitType> {
    const sqMag = this.squaredMagnitude();

    if (sqMag <= 0 || !isFinite(sqMag)) {
      throw new Error(
        `Cannot normalize zero or near-zero length vector: ${this.toString()}`,
      );
    }

    return this.scaleByScalar(1 / Math.sqrt(sqMag)) as Vector3<UnitType>;
  }

  /**
   * Returns the cross product of this vector and another vector.
   *
   * @param other - The vector to calculate the cross product with.
   * @returns The cross product of the two vectors.
   * @example
   * ```typescript
   * const v1 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
   * const v2 = new Vector3(new Meters(4), new Meters(5), new Meters(6));
   * const crossProduct = v1.crossProductWith(v2);
   * console.log(crossProduct); // "[2.00, -2.00, 2.00]"
   * ```
   */
  public crossProductWith(other: Vector3<any>): [number, number, number] {
    const thisBase = this.convertToBaseUnits();
    const otherBase = other.convertToBaseUnits();

    const cx =
      thisBase.y.value * otherBase.z.value -
      thisBase.z.value * otherBase.y.value;
    const cy =
      thisBase.z.value * otherBase.x.value -
      thisBase.x.value * otherBase.z.value;
    const cz =
      thisBase.x.value * otherBase.y.value -
      thisBase.y.value * otherBase.x.value;

    return [cx, cy, cz];
  }
}
