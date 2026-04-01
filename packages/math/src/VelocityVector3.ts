import { MetersPerSecond } from "@flight-sim/units";
import { Vector3 } from "./Vector3";

export class VelocityVector3 extends Vector3<MetersPerSecond> {
  /**
   * Conventional notation for velocity vector components.
   * - u: forward velocity
   * - v: right velocity
   * - w: down velocity
   */
  get u(): MetersPerSecond {
    return this.x;
  }
  get v(): MetersPerSecond {
    return this.y;
  }
  get w(): MetersPerSecond {
    return this.z;
  }

  /**
   * Clear notation for velocity vector components.
   * - forward: forward velocity
   * - right: right velocity
   * - down: down velocity
   */
  get forward(): MetersPerSecond {
    return this.x;
  }
  get right(): MetersPerSecond {
    return this.y;
  }
  get down(): MetersPerSecond {
    return this.z;
  }

  constructor(forward: MetersPerSecond, right: MetersPerSecond, down: MetersPerSecond) {
    super(forward, right, down);
  }

  /**
   * Creates a velocity vector using the SI units for velocity (MetersPerSecond).
   *
   * @param northMetersPerSecond - The north component of the velocity in MetersPerSecond.
   * @param eastMetersPerSecond - The east component of the velocity in MetersPerSecond.
   * @param downMetersPerSecond - The down component of the velocity in MetersPerSecond.
   * @returns A new VelocityVector3 with the velocity components in MetersPerSecond.
   */
  public static createFromMetersPerSecond(
    northMetersPerSecond: number | MetersPerSecond,
    eastMetersPerSecond: number | MetersPerSecond,
    downMetersPerSecond: number | MetersPerSecond,
  ): VelocityVector3 {
    return new VelocityVector3(
      northMetersPerSecond instanceof MetersPerSecond ? northMetersPerSecond : new MetersPerSecond(northMetersPerSecond),
      eastMetersPerSecond instanceof MetersPerSecond ? eastMetersPerSecond : new MetersPerSecond(eastMetersPerSecond),
      downMetersPerSecond instanceof MetersPerSecond ? downMetersPerSecond : new MetersPerSecond(downMetersPerSecond),
    );
  }

  public override clone(): VelocityVector3 {
    return new VelocityVector3(this.forward, this.right, this.down);
  }

  public override toReadableObject(): {
    x: string;
    y: string;
    z: string;
    forward: string;
    right: string;
    down: string;
    u: string;
    v: string;
    w: string;
  } {
    const o = super.toReadableObject();
    return { ...o, forward: o.x, right: o.y, down: o.z, u: o.x, v: o.y, w: o.z };
  }

  public override toString(): string {
    return `VelocityVector(${this.forward.toString()}, ${this.right.toString()}, ${this.down.toString()})`;
  }
}
