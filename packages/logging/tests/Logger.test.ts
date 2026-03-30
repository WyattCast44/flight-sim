import { describe, expect, it, vi } from "vitest";
import { Logger, NoopDriver } from "@flight-sim/logging";
import type { LogDriver, LogLevel } from "@flight-sim/logging";

function createCapturingDriver(): {
  driver: LogDriver;
  records: Array<{ level: LogLevel; message: string; context?: Record<string, unknown> }>;
} {
  const records: Array<{ level: LogLevel; message: string; context?: Record<string, unknown> }> =
    [];
  const driver: LogDriver = {
    log(level, message, context) {
      records.push({ level, message, context });
    },
  };
  return { driver, records };
}

describe("Logger", () => {
  describe("level methods", () => {
    it.each(["error", "warn", "info", "debug"] as const)(
      "logger.%s() dispatches to the driver with the correct level",
      (level) => {
        const { driver, records } = createCapturingDriver();
        const log = new Logger(driver);

        log[level]("test message", { key: "value" });

        expect(records).toHaveLength(1);
        expect(records[0]).toEqual({
          level,
          message: "test message",
          context: { key: "value" },
        });
      },
    );

    it("passes undefined context when none is provided", () => {
      const { driver, records } = createCapturingDriver();
      const log = new Logger(driver);

      log.info("bare message");

      expect(records[0]!.context).toBeUndefined();
    });
  });

  describe("error normalization", () => {
    it("serializes Error instances in context.error", () => {
      const { driver, records } = createCapturingDriver();
      const log = new Logger(driver);
      const err = new Error("kaboom");

      log.error("failed", { error: err });

      const ctx = records[0]!.context!;
      expect(ctx.error).toEqual({
        name: "Error",
        message: "kaboom",
        stack: err.stack,
      });
    });

    it("coerces non-string, non-Error values in context.error to string", () => {
      const { driver, records } = createCapturingDriver();
      const log = new Logger(driver);

      log.error("failed", { error: 42 });

      expect(records[0]!.context!.error).toBe("42");
    });

    it("passes string errors through unchanged", () => {
      const { driver, records } = createCapturingDriver();
      const log = new Logger(driver);

      log.error("failed", { error: "string error" });

      expect(records[0]!.context!.error).toBe("string error");
    });

    it("preserves other context fields alongside normalized error", () => {
      const { driver, records } = createCapturingDriver();
      const log = new Logger(driver);

      log.error("failed", { error: new Error("x"), hook: "before" });

      const ctx = records[0]!.context!;
      expect(ctx.hook).toBe("before");
      expect(ctx.error).toHaveProperty("name", "Error");
    });
  });

  describe("setDriver", () => {
    it("switches the active driver", () => {
      const { driver: first, records: firstRecords } = createCapturingDriver();
      const { driver: second, records: secondRecords } =
        createCapturingDriver();
      const log = new Logger(first);

      log.info("to first");
      log.setDriver(second);
      log.info("to second");

      expect(firstRecords).toHaveLength(1);
      expect(secondRecords).toHaveLength(1);
      expect(firstRecords[0]!.message).toBe("to first");
      expect(secondRecords[0]!.message).toBe("to second");
    });

    it("can switch to NoopDriver to silence output", () => {
      const { driver, records } = createCapturingDriver();
      const log = new Logger(driver);

      log.info("before");
      log.setDriver(new NoopDriver());
      log.info("silenced");

      expect(records).toHaveLength(1);
    });
  });
});
