import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Time } from "../../categories/Time.js";
import { SECONDS_PER_HOUR } from "./constants.js";
import { Minutes } from "./Minutes.js";
import { Seconds } from "./Seconds.js";
import { Milliseconds } from "./Milliseconds.js";

export class Hours extends Time {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "Hours");
  }

  static fromHours(value: number): Hours {
    return new Hours(value);
  }

  static fromMilliseconds(value: number): Hours {
    return new Hours(value / SECONDS_PER_HOUR * 1000);
  }

  static fromSeconds(value: number): Hours {
    return new Hours(value / SECONDS_PER_HOUR);
  }

  static fromMinutes(value: number): Hours {
    return new Hours(value / 60);
  }

  toMilliseconds(): Milliseconds {
    return new Milliseconds(this.value * SECONDS_PER_HOUR * 1000);
  }

  toSeconds(): Seconds {
    return new Seconds(this.value * SECONDS_PER_HOUR);
  }

  toMinutes(): Minutes {
    return this.toSeconds().toMinutes();
  }

  toHours(): Hours {
    return this;
  }

  getStringUnits(): string {
    return "h";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} h`;
  }
}
