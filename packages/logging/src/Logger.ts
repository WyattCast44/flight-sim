import type { LogDriver, LogLevel } from "./types.js";

/**
 * Normalize an `error` value in a context bag so it is always
 * JSON-serializable regardless of what the caller threw.
 */
function normalizeContext(
  context: Record<string, unknown>,
): Record<string, unknown> {
  if (!("error" in context)) return context;

  const raw = context.error;

  if (raw instanceof Error) {
    return {
      ...context,
      error: { name: raw.name, message: raw.message, stack: raw.stack },
    };
  }

  if (typeof raw !== "string") {
    return { ...context, error: String(raw) };
  }

  return context;
}

/**
 * Structured logger with a swappable {@link LogDriver} backend.
 *
 * @example
 * ```ts
 * import { logger } from "@flight-sim/logging";
 *
 * logger.info("Simulation started");
 * logger.error("Callback failed", { hook: "onBeforeTick", error });
 *
 * // In tests:
 * import { Logger, NoopDriver } from "@flight-sim/logging";
 * const silent = new Logger(new NoopDriver());
 * ```
 */
export class Logger {
  private driver: LogDriver;

  constructor(driver: LogDriver) {
    this.driver = driver;
  }

  /**
   * Replace the active driver. Affects all subsequent log calls.
   */
  setDriver(driver: LogDriver): void {
    this.driver = driver;
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.dispatch("error", message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.dispatch("warn", message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.dispatch("info", message, context);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.dispatch("debug", message, context);
  }

  private dispatch(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): void {
    const normalized =
      context !== undefined ? normalizeContext(context) : undefined;
    this.driver.log(level, message, normalized);
  }
}
