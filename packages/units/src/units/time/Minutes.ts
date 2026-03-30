import { formatUnitValue } from "../../core/format.js";
import { assertNonNegative } from "../../core/validate.js";
import { Time } from "../../categories/Time.js";
import { SECONDS_PER_MINUTE } from "./constants.js";
import { Hours } from "./Hours.js";
import { Seconds } from "./Seconds.js";
import { Milliseconds } from "./Milliseconds.js";

export class Minutes extends Time {
  constructor(public readonly value: number) {
    super();
    assertNonNegative(value, "Minutes");
  }

  static fromMilliseconds(value: number): Minutes {
    return new Minutes(value / SECONDS_PER_MINUTE * 1000);
  }

  static fromMinutes(value: number): Minutes {
    return new Minutes(value);
  }

  static fromSeconds(value: number): Minutes {
    return new Minutes(value / SECONDS_PER_MINUTE);
  }

  static fromHours(value: number): Minutes {
    return new Minutes(value * 60);
  }

  toMilliseconds(): Milliseconds {
    return new Milliseconds(this.value * SECONDS_PER_MINUTE * 1000);
  }

  toSeconds(): Seconds {
    return new Seconds(this.value * SECONDS_PER_MINUTE);
  }

  toMinutes(): Minutes {
    return this;
  }

  toHours(): Hours {
    return new Hours(this.value / 60);
  }

  getStringUnits(): string {
    return "min";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} min`;
  }
}
