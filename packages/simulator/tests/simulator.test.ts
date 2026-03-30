/// <reference lib="es2022" />
/// <reference lib="dom" />

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { logger, NoopDriver } from "@flight-sim/logging";
import type { LogDriver, LogLevel } from "@flight-sim/logging";
import { Simulator } from "../src/Simulator.js";
import { cancelScheduledFrame, scheduleFrame } from "../src/scheduleFrame.js";

describe("Simulator", () => {
  let simulator: Simulator;
  let beforeStepSpy: ReturnType<typeof vi.fn<() => void>>;
  let afterStepSpy: ReturnType<typeof vi.fn<(dt: number) => void>>;

  beforeEach(() => {
    logger.setDriver(new NoopDriver());
    simulator = new Simulator({ tickRate: 60 }); // 60 Hz for easier testing
    beforeStepSpy = vi.fn<() => void>();
    afterStepSpy = vi.fn<(dt: number) => void>();

    simulator.onBeforePhysicsStep(() => {
      beforeStepSpy();
    });
    simulator.onAfterPhysicsStep((dt) => {
      afterStepSpy(dt);
    });
  });

  afterEach(() => {
    simulator.stop();
    vi.clearAllMocks();
  });

  describe("lifecycle", () => {
    it("starts and stops correctly", () => {
      expect(simulator.isRunning()).toBe(false);
      expect(simulator.isPaused()).toBe(false);
      expect(simulator.isActive()).toBe(false);

      simulator.start();

      expect(simulator.isRunning()).toBe(true);
      expect(simulator.isPaused()).toBe(false);
      expect(simulator.isActive()).toBe(true);

      simulator.stop();

      expect(simulator.isRunning()).toBe(false);
      expect(simulator.isPaused()).toBe(true);
      expect(simulator.isActive()).toBe(false);
    });

    it("can pause and resume", () => {
      simulator.start();
      expect(simulator.isActive()).toBe(true);

      simulator.pause();
      expect(simulator.isActive()).toBe(false);
      expect(simulator.isPaused()).toBe(true);

      simulator.resume();
      expect(simulator.isActive()).toBe(true);
      expect(simulator.isPaused()).toBe(false);
    });
  });

  describe("time scaling", () => {
    it("defaults to 1.0", () => {
      expect(simulator.getTimeScale()).toBe(1.0);
    });

    it("allows setting time scale", () => {
      simulator.setTimeScale(2.5);
      expect(simulator.getTimeScale()).toBe(2.5);

      simulator.setTimeScale(0.1);
      expect(simulator.getTimeScale()).toBe(0.1);

      // Prevents invalid values
      simulator.setTimeScale(0);
      expect(simulator.getTimeScale()).toBe(0.01);
    });
  });

  describe("fixed timestep behavior", () => {
    it("calls callbacks with fixed timestep when running", async () => {
      const FIXED_DT = simulator.fixedTimeStep;

      simulator.start();

      // Wait for at least one full physics step
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      });

      simulator.stop();

      expect(beforeStepSpy).toHaveBeenCalled();
      expect(afterStepSpy).toHaveBeenCalled();

      // AfterStep should be called with the fixed timestep
      const calls = afterStepSpy.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      calls.forEach(([dt]) => {
        expect(dt).toBeCloseTo(FIXED_DT, 5);
      });
    });

    it("does NOT advance physics when paused", async () => {
      simulator.start();
      simulator.pause();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });

      simulator.stop();

      expect(beforeStepSpy).not.toHaveBeenCalled();
      expect(afterStepSpy).not.toHaveBeenCalled();
    });
  });

  describe("callback safety", () => {
    it("continues running even if a callback throws", async () => {
      const logRecords: Array<{ level: LogLevel; message: string; context?: Record<string, unknown> }> = [];
      const capturingDriver: LogDriver = {
        log(level, message, context) {
          logRecords.push({ level, message, context });
        },
      };
      logger.setDriver(capturingDriver);

      simulator.onBeforePhysicsStep(() => {
        throw new Error("Boom!");
      });

      simulator.start();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 80);
      });

      simulator.stop();

      expect(logRecords.length).toBeGreaterThan(0);
      expect(logRecords[0]!.level).toBe("error");
      expect(logRecords[0]!.context).toHaveProperty("hook", "onBeforePhysicsStep");
      expect(afterStepSpy).toHaveBeenCalled(); // other callbacks still run

      logger.setDriver(new NoopDriver());
    });
  });

  describe("accumulator behavior", () => {
    it("accumulates time correctly with time scaling", async () => {
      const fastSimulator = new Simulator({ tickRate: 60 });
      const afterSpy = vi.fn<(dt: number) => void>();

      fastSimulator.onAfterPhysicsStep(afterSpy);
      fastSimulator.setTimeScale(3.0); // 3x speed
      fastSimulator.start();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });

      fastSimulator.stop();

      // In ~100ms real time at 3x speed → ~300ms simulation time
      // With 1/60 fixed step, we expect roughly 18 calls
      expect(afterSpy.mock.calls.length).toBeGreaterThan(15);
    });
  });

  describe("scheduleFrame", () => {
    it("schedules a frame", () => {
      const callback = vi.fn();
      vi.useFakeTimers();
      scheduleFrame(callback);
      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalled();
    });

    it("cancels a scheduled frame", () => {
      const callback = vi.fn();
      const handle = scheduleFrame(callback);
      cancelScheduledFrame(handle);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
