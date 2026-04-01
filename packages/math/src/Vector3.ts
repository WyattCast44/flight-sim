import { Newtons, Unit } from "@flight-sim/units";

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

  /**
   * Creates a force vector using the SI units for force (Newtons).
   *
   * @param xNewtons - The x component of the force in Newtons.
   * @param yNewtons - The y component of the force in Newtons.
   * @param zNewtons - The z component of the force in Newtons.
   * @returns A new Vector3 with the force components in Newtons.
   */
  public static createForceInNewtons(
    xNewtons: number | Newtons,
    yNewtons: number | Newtons,
    zNewtons: number | Newtons,
  ): Vector3<Newtons> {
    return new Vector3(
      xNewtons instanceof Newtons ? xNewtons : new Newtons(xNewtons),
      yNewtons instanceof Newtons ? yNewtons : new Newtons(yNewtons),
      zNewtons instanceof Newtons ? zNewtons : new Newtons(zNewtons),
    );
  }

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

  public clone(): Vector3<UnitType> {
    return new Vector3(this.x, this.y, this.z);
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

  /**
   * MATH OPERATIONS
   */

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
   * Todo: implement: 
   * - magnitude: in the current unit type, ie. Meters, Feet, etc.
   * - dot product
   * - cross product
   * - normalize to unit vector
   */
}
