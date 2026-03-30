import pino from "pino";
import type { DestinationStream } from "pino";
import type { LogDriver, LogLevel } from "../types.js";

/**
 * A {@link LogDriver} backed by pino.
 *
 * Maps {@link LogLevel} calls to the corresponding pino level method
 * and passes structured context as the first argument (pino's
 * "mergingObject" convention).
 */
export class PinoDriver implements LogDriver {
  private readonly pino: pino.Logger;

  constructor(options?: pino.LoggerOptions, destination?: DestinationStream) {
    this.pino = destination !== undefined
      ? pino(options ?? {}, destination)
      : pino(options);
  }

  log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): void {
    if (context !== undefined) {
      this.pino[level](context, message);
    } else {
      this.pino[level](message);
    }
  }
}
