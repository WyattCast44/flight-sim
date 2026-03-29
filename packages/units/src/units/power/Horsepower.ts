import { formatUnitValue } from "../../core/format.js";
import { assertFiniteNumber } from "../../core/validate.js";
import { Power } from "../../categories/Power.js";
import { WATTS_PER_HORSEPOWER } from "./constants.js";
import { Watts } from "./Watts.js";

export class Horsepower extends Power {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Horsepower");
  }

  static fromHorsepower(value: number): Horsepower {
    return new Horsepower(value);
  }

  static fromWatts(value: number): Horsepower {
    return new Horsepower(value / WATTS_PER_HORSEPOWER);
  }

  toWatts(): Watts {
    return new Watts(this.value * WATTS_PER_HORSEPOWER);
  }

  toHorsepower(): Horsepower {
    return this;
  }

  getStringUnits(): string {
    return "hp";
  }

  toString(): string {
    return `${formatUnitValue(this.value)} hp`;
  }
}
