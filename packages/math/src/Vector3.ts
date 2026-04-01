import { Meters, MetersPerSecond, Newtons, Unit } from "@flight-sim/units";

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
   * Creates a position vector using the SI units for position (Meters).
   *
   * @param xMeters - The x component of the position in Meters.
   * @param yMeters - The y component of the position in Meters.
   * @param zMeters - The z component of the position in Meters.
   * @returns A new Vector3 with the position components in Meters.
   */
  public static createPositionInMeters(
    xMeters: number | Meters,
    yMeters: number | Meters,
    zMeters: number | Meters,
  ): Vector3<Meters> {
    return new Vector3(
      xMeters instanceof Meters ? xMeters : new Meters(xMeters),
      yMeters instanceof Meters ? yMeters : new Meters(yMeters),
      zMeters instanceof Meters ? zMeters : new Meters(zMeters),
    );
  }

  /**
   * Creates a velocity vector using the SI units for velocity (MetersPerSecond).
   *
   * @param xMetersPerSecond - The x component of the velocity in MetersPerSecond.
   * @param yMetersPerSecond - The y component of the velocity in MetersPerSecond.
   * @param zMetersPerSecond - The z component of the velocity in MetersPerSecond.
   * @returns A new Vector3 with the velocity components in MetersPerSecond.
   */
  public static createVelocityInMetersPerSecond(
    xMetersPerSecond: number | MetersPerSecond,
    yMetersPerSecond: number | MetersPerSecond,
    zMetersPerSecond: number | MetersPerSecond,
  ): Vector3<MetersPerSecond> {
    return new Vector3(
      xMetersPerSecond instanceof MetersPerSecond
        ? xMetersPerSecond
        : new MetersPerSecond(xMetersPerSecond),
      yMetersPerSecond instanceof MetersPerSecond
        ? yMetersPerSecond
        : new MetersPerSecond(yMetersPerSecond),
      zMetersPerSecond instanceof MetersPerSecond
        ? zMetersPerSecond
        : new MetersPerSecond(zMetersPerSecond),
    );
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

  private validateComponentsAreFinite(): void {
    if (
      !isFinite(this.x.value) ||
      !isFinite(this.y.value) ||
      !isFinite(this.z.value)
    ) {
      throw new Error(
        "Vector3 components must be finite numbers (no NaN or Infinity). Values: " +
          JSON.stringify({
            x: this.x.value,
            y: this.y.value,
            z: this.z.value,
          }),
      );
    }
  }
}
