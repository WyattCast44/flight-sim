import { Meters } from "@flight-sim/units";
import { Vector3 } from "./Vector3";

export class PositionVector3 extends Vector3<Meters> {
  get north(): Meters {
    return this.x;
  }
  get east(): Meters {
    return this.y;
  }
  get down(): Meters {
    return this.z;
  }

  constructor(north: Meters, east: Meters, down: Meters) {
    super(north, east, down);
  }

  /**
   * Creates a position vector using the SI units for position (Meters).
   *
   * @param northMeters - The north component of the position in Meters.
   * @param eastMeters - The east component of the position in Meters.
   * @param downMeters - The down component of the position in Meters.
   * @returns A new PositionVector3 with the position components in Meters.
   */
  public static createFromMeters(
    northMeters: number | Meters,
    eastMeters: number | Meters,
    downMeters: number | Meters,
  ): PositionVector3 {
    return new PositionVector3(
      northMeters instanceof Meters ? northMeters : new Meters(northMeters),
      eastMeters instanceof Meters ? eastMeters : new Meters(eastMeters),
      downMeters instanceof Meters ? downMeters : new Meters(downMeters),
    );
  }

  public override clone(): PositionVector3 {
    return new PositionVector3(this.north, this.east, this.down);
  }

  public override toReadableObject(): {
    x: string;
    y: string;
    z: string;
    north: string;
    east: string;
    down: string;
  } {
    const o = super.toReadableObject();
    return { ...o, north: o.x, east: o.y, down: o.z };
  }

  public override toString(): string {
    return `PositionVector(${this.north.toString()}, ${this.east.toString()}, ${this.down.toString()})`;
  }
}
