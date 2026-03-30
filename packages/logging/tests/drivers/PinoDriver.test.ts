import { describe, expect, it } from "vitest";
import pino from "pino";
import { PinoDriver } from "@flight-sim/logging";

function createCapturingDriver(): {
  driver: PinoDriver;
  lines: () => Record<string, unknown>[];
} {
  const dest = pino.destination({ sync: true, dest: "/dev/null" });
  const chunks: string[] = [];
  dest.write = (data: string): boolean => {
    chunks.push(data);
    return true;
  };

  const driver = new PinoDriver({ level: "debug" }, dest);
  return {
    driver,
    lines: () => chunks.map((c) => JSON.parse(c) as Record<string, unknown>),
  };
}

describe("PinoDriver", () => {
  it("writes JSON with the correct level", () => {
    const { driver, lines } = createCapturingDriver();

    driver.log("info", "hello");

    const output = lines();
    expect(output).toHaveLength(1);
    expect(output[0]).toMatchObject({ level: 30, msg: "hello" });
  });

  it("includes context fields in the JSON output", () => {
    const { driver, lines } = createCapturingDriver();

    driver.log("error", "failed", { hook: "onBeforeTick", code: 42 });

    const output = lines();
    expect(output).toHaveLength(1);
    expect(output[0]).toMatchObject({
      level: 50,
      msg: "failed",
      hook: "onBeforeTick",
      code: 42,
    });
  });

  it("maps all four levels to pino numeric levels", () => {
    const { driver, lines } = createCapturingDriver();

    driver.log("debug", "d");
    driver.log("info", "i");
    driver.log("warn", "w");
    driver.log("error", "e");

    const levels = lines().map((l) => l.level);
    expect(levels).toEqual([20, 30, 40, 50]);
  });
});
