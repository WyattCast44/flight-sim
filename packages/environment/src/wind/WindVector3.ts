import { Knots, MetersPerSecond, DegreesCardinal } from "@flight-sim/units";

/**
 * Immutable 3D wind velocity vector in North-East-Down (NED) coordinates
 * 
 * Also includes the direction and speed of the wind in meteorological convention.
 * 
 * @example
 * ```typescript
 * const wind = new WindVector3(new MetersPerSecond(10), new MetersPerSecond(20), new MetersPerSecond(30), new DegreesCardinal(45), new Knots(50));
 * console.log(wind.toString());
 * ```
 */
export class WindVector3 {
  /** North component (m/s) — positive = wind blowing north */
  public readonly north: MetersPerSecond;
  /** East component (m/s) — positive = wind blowing east */
  public readonly east: MetersPerSecond;
  /** Down component (m/s) — positive = downdraft, negative = updraft */
  public readonly down: MetersPerSecond;
  /** Direction of the wind (degrees cardinal) - the direction the wind is coming FROM */
  public readonly direction: DegreesCardinal;
  /** Speed of the wind (knots) */
  public readonly speed: Knots;

  constructor(
    north: MetersPerSecond,
    east: MetersPerSecond,
    down: MetersPerSecond,
    direction: DegreesCardinal,
    speed: Knots,
  ) {
    this.north = north;
    this.east = east;
    this.down = down;
    this.direction = direction;
    this.speed = speed;

    this.validateFinite();
  }

  private validateFinite(): void {
    if (
      !isFinite(this.north.value) ||
      !isFinite(this.east.value) ||
      !isFinite(this.down.value) ||
      !isFinite(this.direction.toDegrees().value) ||
      !isFinite(this.speed.toKnots().value)
    ) {
      throw new Error(
        `WindVector3 components must be finite. Got: North=${this.north.value}, East=${this.east.value}, Down=${this.down.value}, Direction=${this.direction.toDegrees().value}, Speed=${this.speed.toKnots().value}`,
      );
    }
  }

  // ====================== Factory Methods ======================

  /**
   * Create wind from horizontal speed and direction (most common aviation input).
   *
   * @param speed - Horizontal wind speed in knots
   * @param direction - Horizontal wind direction in degrees cardinal
   * @param verticalSpeed - Vertical wind speed in knots
   * @returns A new WindVector3
   */
  static fromHorizontal(
    speed: Knots,
    direction: DegreesCardinal,
    verticalSpeed: Knots = new Knots(0),
  ): WindVector3 {
    let speedMs = speed.toMetersPerSecond().value;
    let verticalMs = verticalSpeed.toMetersPerSecond().value;

    // Convert meteorological direction (FROM) to math angle
    // wind direction, is by convention, the direction the wind is coming FROM
    let windDirectionRad = ((90 - direction.toDegrees().value) * Math.PI) / 180;

    // TODO: need to check the math for calculating the north and east components
    // and the conveersion between the math angle and the degrees cardinal
    let north = new MetersPerSecond(speedMs * Math.cos(windDirectionRad));
    let east = new MetersPerSecond(speedMs * Math.sin(windDirectionRad));
    let down = new MetersPerSecond(verticalMs);

    return new WindVector3(north, east, down, direction, speed);
  }

  /** Zero wind (calm conditions) */
  static readonly ZERO = new WindVector3(
    new MetersPerSecond(0),
    new MetersPerSecond(0),
    new MetersPerSecond(0),
    new DegreesCardinal(0), // 0 degrees is the default direction for calm wind
    new Knots(0),
  );

  // ====================== Derived Properties ======================

  // ====================== Operations ======================
  /** Add turbulence or gust delta */
  addDelta(
    deltaNorth: MetersPerSecond,
    deltaEast: MetersPerSecond,
    deltaDown: MetersPerSecond,
  ): WindVector3 {
    return new WindVector3(
      this.north.add(deltaNorth),
      this.east.add(deltaEast),
      this.down.add(deltaDown),
      this.direction,
      this.speed,
    );
  }

  /** Scale the entire wind vector */
  scale(factor: number): WindVector3 {
    return new WindVector3(
      this.north.multiplyByScalar(factor),
      this.east.multiplyByScalar(factor),
      this.down.multiplyByScalar(factor),
      this.direction,
      this.speed,
    );
  }

  toString(): string {
    return (
      `WindVector3(N:${this.north.toString()} E:${this.east.toString()} D:${this.down.toString()} m/s ` +
      `| ${this.direction.toDegrees().toString()}° at ${this.speed.toKnots().toString()} kts)`
    );
  }
}

export default WindVector3;
