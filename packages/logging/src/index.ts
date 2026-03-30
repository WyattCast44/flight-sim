export { Logger } from "./Logger.js";
export { NoopDriver } from "./drivers/NoopDriver.js";
export { PinoDriver } from "./drivers/PinoDriver.js";
export type { PinoDriverOptions, PrettyOptions } from "./drivers/PinoDriver.js";
export type { LogDriver, LogLevel } from "./types.js";

import { Logger } from "./Logger.js";
import { PinoDriver } from "./drivers/PinoDriver.js";

/**
 * Process-wide logger singleton, pre-configured with {@link PinoDriver}.
 *
 * Call {@link Logger.setDriver | logger.setDriver()} to swap the backend
 * (e.g. {@link NoopDriver} in tests).
 */
export const logger = new Logger(new PinoDriver({ pretty: true }));
