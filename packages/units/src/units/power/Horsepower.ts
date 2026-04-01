import { assertFiniteNumber } from "../../core/validate.js";
import { Power } from "../../categories/Power.js";
import type { Unit } from "../../categories/Unit.js";
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

  static fromSIValue(value: number | Unit): Horsepower {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Horsepower.fromWatts(si);
  }

  toWatts(): Watts {
    return new Watts(this.value * WATTS_PER_HORSEPOWER);
  }

  toHorsepower(): Horsepower {
    return this;
  }

  toSIUnits(): Watts {
    return this.toWatts();
  }

  getStringUnits(): string {
    return "hp";
  }
}
