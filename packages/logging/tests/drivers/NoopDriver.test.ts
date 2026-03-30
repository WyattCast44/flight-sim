import { describe, expect, it, vi } from "vitest";
import { NoopDriver } from "@flight-sim/logging";

describe("NoopDriver", () => {
  it("implements LogDriver without throwing", () => {
    const driver = new NoopDriver();

    expect(() => {
      driver.log("error", "boom", { error: new Error("fail") });
      driver.log("warn", "heads up");
      driver.log("info", "ok", { key: "value" });
      driver.log("debug", "trace");
    }).not.toThrow();
  });
});
