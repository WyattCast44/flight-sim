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

    simulator.onBeforeTick(() => {
      beforeStepSpy();
    });
    simulator.onAfterTick((dt) => {
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

      simulator.onBeforeTick(() => {
        throw new Error("Boom!");
      });

      simulator.start();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 80);
      });

      simulator.stop();

      expect(logRecords.length).toBeGreaterThan(0);
      expect(logRecords[0]!.level).toBe("error");
      expect(logRecords[0]!.context).toHaveProperty("hook", "onBeforeTick");
      expect(afterStepSpy).toHaveBeenCalled(); // other callbacks still run

      logger.setDriver(new NoopDriver());
    });
  });

  describe("accumulator behavior", () => {
    it("accumulates time correctly with time scaling", async () => {
      const fastSimulator = new Simulator({ tickRate: 60 });
      const afterSpy = vi.fn<(dt: number) => void>();

      fastSimulator.onAfterTick(afterSpy);
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

  describe("onFrame", () => {
    it("calls frame callbacks once per frame with interpolation alpha", async () => {
      const frameSpy = vi.fn<(alpha: number) => void>();
      simulator.onFrame(frameSpy);

      simulator.start();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      });

      simulator.stop();

      expect(frameSpy).toHaveBeenCalled();
      // Alpha should always be between 0 and 1
      frameSpy.mock.calls.forEach(([alpha]) => {
        expect(alpha).toBeGreaterThanOrEqual(0);
        expect(alpha).toBeLessThan(1);
      });
    });

    it("does NOT call frame callbacks when paused", async () => {
      const frameSpy = vi.fn<(alpha: number) => void>();
      simulator.onFrame(frameSpy);

      simulator.start();
      simulator.pause();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      });

      simulator.stop();

      expect(frameSpy).not.toHaveBeenCalled();
    });

    it("continues running even if a frame callback throws", async () => {
      const logRecords: Array<{ level: LogLevel; message: string; context?: Record<string, unknown> }> = [];
      const capturingDriver: LogDriver = {
        log(level, message, context) {
          logRecords.push({ level, message, context });
        },
      };
      logger.setDriver(capturingDriver);

      simulator.onFrame(() => {
        throw new Error("Frame boom!");
      });

      simulator.start();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      });

      simulator.stop();

      const frameErrors = logRecords.filter((r) => r.context?.hook === "onFrame");
      expect(frameErrors.length).toBeGreaterThan(0);
      expect(frameErrors[0]!.level).toBe("error");

      logger.setDriver(new NoopDriver());
    });
  });

  describe("lifecycle hooks", () => {
    it("calls onStart callbacks when started", () => {
      const startSpy = vi.fn();
      simulator.onStart(startSpy);

      simulator.start();
      expect(startSpy).toHaveBeenCalledOnce();

      simulator.stop();
    });

    it("does not call onStart if already running", () => {
      const startSpy = vi.fn();
      simulator.onStart(startSpy);

      simulator.start();
      simulator.start(); // no-op
      expect(startSpy).toHaveBeenCalledOnce();

      simulator.stop();
    });

    it("calls onStop callbacks when stopped", () => {
      const stopSpy = vi.fn();
      simulator.onStop(stopSpy);

      simulator.start();
      simulator.stop();
      expect(stopSpy).toHaveBeenCalledOnce();
    });

    it("does not call onStop if not running", () => {
      const stopSpy = vi.fn();
      simulator.onStop(stopSpy);

      simulator.stop();
      expect(stopSpy).not.toHaveBeenCalled();
    });

    it("calls onPause callbacks when paused", () => {
      const pauseSpy = vi.fn();
      simulator.onPause(pauseSpy);

      simulator.start();
      simulator.pause();
      expect(pauseSpy).toHaveBeenCalledOnce();

      simulator.stop();
    });

    it("does not call onPause if already paused", () => {
      const pauseSpy = vi.fn();
      simulator.onPause(pauseSpy);

      simulator.start();
      simulator.pause();
      simulator.pause(); // no-op
      expect(pauseSpy).toHaveBeenCalledOnce();

      simulator.stop();
    });

    it("calls onResume callbacks when resumed", () => {
      const resumeSpy = vi.fn();
      simulator.onResume(resumeSpy);

      simulator.start();
      simulator.pause();
      simulator.resume();
      expect(resumeSpy).toHaveBeenCalledOnce();

      simulator.stop();
    });

    it("does not call onResume if not paused", () => {
      const resumeSpy = vi.fn();
      simulator.onResume(resumeSpy);

      simulator.start();
      simulator.resume(); // no-op, not paused
      expect(resumeSpy).not.toHaveBeenCalled();

      simulator.stop();
    });

    it("continues running even if a lifecycle callback throws", () => {
      const logRecords: Array<{ level: LogLevel; message: string; context?: Record<string, unknown> }> = [];
      const capturingDriver: LogDriver = {
        log(level, message, context) {
          logRecords.push({ level, message, context });
        },
      };
      logger.setDriver(capturingDriver);

      const stopSpy = vi.fn();
      simulator.onStart(() => {
        throw new Error("Start boom!");
      });
      simulator.onStop(stopSpy);

      simulator.start();
      simulator.stop();

      expect(logRecords.some((r) => r.context?.hook === "onStart")).toBe(true);
      expect(stopSpy).toHaveBeenCalledOnce();

      logger.setDriver(new NoopDriver());
    });
  });

  describe("runFor", () => {
    it("starts and stops after the specified simulation seconds", async () => {
      const stopSpy = vi.fn();
      simulator.onStop(stopSpy);

      simulator.runFor(0.05); // 50ms of sim time
      expect(simulator.isRunning()).toBe(true);

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 150);
      });

      expect(simulator.isRunning()).toBe(false);
      expect(stopSpy).toHaveBeenCalledOnce();
    });

    it("respects timeScale (faster sim time at higher scale)", async () => {
      const afterSpy = vi.fn<(dt: number) => void>();
      const fastSim = new Simulator({ tickRate: 60 });
      fastSim.onAfterTick(afterSpy);
      fastSim.setTimeScale(10.0); // 10x speed

      fastSim.runFor(0.5); // 0.5 sim seconds = ~50ms wall time at 10x

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 200);
      });

      expect(fastSim.isRunning()).toBe(false);
      // At 60Hz, 0.5 sim seconds = ~30 ticks
      expect(afterSpy.mock.calls.length).toBeGreaterThanOrEqual(25);
    });

    it("clears runFor target when stop() is called manually", async () => {
      const stopSpy = vi.fn();
      simulator.onStop(stopSpy);

      simulator.runFor(10); // Long duration
      simulator.stop(); // Manual stop

      expect(simulator.isRunning()).toBe(false);
      expect(stopSpy).toHaveBeenCalledOnce();

      // Restarting should not auto-stop
      simulator.start();
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      });
      expect(simulator.isRunning()).toBe(true);
      simulator.stop();
    });

    it("fires onStart and onStop callbacks", async () => {
      const startSpy = vi.fn();
      const stopSpy = vi.fn();
      simulator.onStart(startSpy);
      simulator.onStop(stopSpy);

      simulator.runFor(0.02);

      expect(startSpy).toHaveBeenCalledOnce();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 150);
      });

      expect(stopSpy).toHaveBeenCalledOnce();
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
