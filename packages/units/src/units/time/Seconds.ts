import { assertNonNegative } from "../../core/validate.js";
import { Time } from "../../categories/Time.js";
import type { Unit } from "../../categories/Unit.js";
import { SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "./constants.js";
import { Hours } from "./Hours.js";
import { Minutes } from "./Minutes.js";
import { Milliseconds } from "./Milliseconds.js";

export class Seconds extends Time {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "Seconds");
  }

  static fromMilliseconds(value: number): Seconds {
    return new Seconds(value / 1000);
  }

  static fromSeconds(value: number): Seconds {
    return new Seconds(value);
  }

  static fromMinutes(value: number): Seconds {
    return new Seconds(value * SECONDS_PER_MINUTE);
  }

  static fromHours(value: number): Seconds {
    return new Seconds(value * SECONDS_PER_HOUR);
  }

  static fromSIValue(value: number | Unit): Seconds {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Seconds.fromSeconds(si);
  }

  toMilliseconds(): Milliseconds {
    return new Milliseconds(this.value * 1000);
  }

  toSeconds(): Seconds {
    return this;
  }

  toMinutes(): Minutes {
    return new Minutes(this.value / SECONDS_PER_MINUTE);
  }

  toHours(): Hours {
    return new Hours(this.value / SECONDS_PER_HOUR);
  }

  toSIUnits(): Seconds {
    return this;
  }

  getStringUnits(): string {
    return "s";
  }
}
