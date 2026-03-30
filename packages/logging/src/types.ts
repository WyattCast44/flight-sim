/**
 * Supported log levels, ordered by severity (highest to lowest).
 */
export type LogLevel = "error" | "warn" | "info" | "debug";

/**
 * Contract between {@link Logger} and log output.
 *
 * Implement this interface to route structured log records to any
 * destination (pino, console, a test buffer, etc.).
 */
export interface LogDriver {
  log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): void;
}
