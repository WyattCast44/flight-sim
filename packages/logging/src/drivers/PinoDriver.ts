import pino from "pino";
import type { DestinationStream } from "pino";
import type { LogDriver, LogLevel } from "../types.js";

export interface PinoDriverOptions {
  options?: pino.LoggerOptions;
  destination?: DestinationStream;
  pretty?: boolean | PrettyOptions;
}

export interface PrettyOptions {
  colorize?: boolean;
  translateTime?: string;
  ignore?: string;
}

/**
 * A {@link LogDriver} backed by pino.
 *
 * Maps {@link LogLevel} calls to the corresponding pino level method
 * and passes structured context as the first argument (pino's
 * "mergingObject" convention).
 */
export class PinoDriver implements LogDriver {
  private readonly pino: pino.Logger;

  constructor(driverOptions?: PinoDriverOptions);
  constructor(options?: pino.LoggerOptions, destination?: DestinationStream);
  constructor(
    optionsOrDriverOptions?: pino.LoggerOptions | PinoDriverOptions,
    destination?: DestinationStream,
  ) {
    if (optionsOrDriverOptions !== undefined && ("pretty" in optionsOrDriverOptions || "destination" in optionsOrDriverOptions)) {
      const { options, destination: dest, pretty } = optionsOrDriverOptions as PinoDriverOptions;
      if (pretty) {
        const prettyOptions = pretty === true ? {} : pretty;
        const transport = pino.transport({
          target: "pino-pretty",
          options: prettyOptions,
        });
        this.pino = pino(options ?? {}, transport);
      } else if (dest !== undefined) {
        this.pino = pino(options ?? {}, dest);
      } else {
        this.pino = pino(options);
      }
    } else {
      const options = optionsOrDriverOptions as pino.LoggerOptions | undefined;
      this.pino = destination !== undefined
        ? pino(options ?? {}, destination)
        : pino(options);
    }
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

