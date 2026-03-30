import { Time } from "../../categories/Time.js";
import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Hours } from "./Hours.js";
import { Minutes } from "./Minutes.js";
import { Seconds } from "./Seconds.js";

class Milliseconds extends Time {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "Milliseconds");
  }

  static fromMilliseconds(value: number): Milliseconds {
    return new Milliseconds(value);
  }

  static fromSeconds(value: number): Milliseconds {
    return new Milliseconds(value * 1000);
  }

  static fromMinutes(value: number): Milliseconds {
    return new Milliseconds(value * 1000 * 60);
  }

  static fromHours(value: number): Milliseconds {
    return new Milliseconds(value * 1000 * 60 * 60);
  }

  toMilliseconds(): Milliseconds {
    return this;
  }

  toSeconds(): Seconds {
    return new Seconds(this.value / 1000);
  }

  toMinutes(): Minutes {
    return new Minutes(this.value / 1000 / 60);
  }

  toHours(): Hours {
    return new Hours(this.value / 1000 / 60 / 60);
  }

  getStringUnits(): string {
    return "ms";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} ms`;
  }
}

export { Milliseconds };