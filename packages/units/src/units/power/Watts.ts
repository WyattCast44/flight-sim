import { assertFiniteNumber } from "../../core/validate.js";
import { Power } from "../../categories/Power.js";
import type { Unit } from "../../categories/Unit.js";
import { WATTS_PER_HORSEPOWER } from "./constants.js";
import { Horsepower } from "./Horsepower.js";

export class Watts extends Power {
  constructor(public readonly value: number) {
    super();
    assertFiniteNumber(value, "Watts");
  }

  static fromWatts(value: number): Watts {
    return new Watts(value);
  }

  static fromHorsepower(value: number): Watts {
    return new Watts(value * WATTS_PER_HORSEPOWER);
  }

  static fromSIValue(value: number | Unit): Watts {
    const si = typeof value === "number" ? value : value.toSIUnits().value;
    return Watts.fromWatts(si);
  }

  toWatts(): Watts {
    return this;
  }

  toHorsepower(): Horsepower {
    return new Horsepower(this.value / WATTS_PER_HORSEPOWER);
  }

  toSIUnits(): Watts {
    return this;
  }

  getStringUnits(): string {
    return "W";
  }
}
