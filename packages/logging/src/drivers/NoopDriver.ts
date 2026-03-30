import type { LogDriver, LogLevel } from "../types.js";

/**
 * A {@link LogDriver} that discards all log records.
 * Useful in tests or when logging should be silenced.
 */
export class NoopDriver implements LogDriver {
  log(
    _level: LogLevel,
    _message: string,
    _context?: Record<string, unknown>,
  ): void {
    // intentionally empty
  }
}
