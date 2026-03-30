import { logger } from "@flight-sim/logging";
import { scheduleFrame } from "./scheduleFrame.js";

export class Simulator {
  private _isRunning = false; // Has the simulator been started and not stopped?
  private _isPaused = false; // Is time currently frozen?
  private timeScale = 1.0;

  private lastWallTime = 0;
  private accumulator = 0;

  /** Fixed physics timestep (e.g. 1/240 seconds) */
  public readonly fixedTimeStep: number;

  private readonly beforeTickCallbacks: Array<(dt: number) => void> = [];
  private readonly afterTickCallbacks: Array<(dt: number) => void> = [];
  private readonly frameCallbacks: Array<(alpha: number) => void> = [];
  private readonly startCallbacks: Array<() => void> = [];
  private readonly stopCallbacks: Array<() => void> = [];
  private readonly pauseCallbacks: Array<() => void> = [];
  private readonly resumeCallbacks: Array<() => void> = [];

  constructor(options: { tickRate?: number } = {}) {
    this.fixedTimeStep = 1 / (options.tickRate ?? 240); // 240 Hz recommended for 6DOF
  }

  // ─────────────────────────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────────────────────────

  public start(): void {
    if (this._isRunning) return;
    this._isRunning = true;
    this._isPaused = false;
    this.lastWallTime = performance.now();
    this.accumulator = 0;
    this.executeCallbacks(this.startCallbacks, "onStart");
    this.requestNextFrame();
  }

  /** Freeze time advancement, but keep the RAF loop alive */
  public pause(): void {
    if (!this._isRunning || this._isPaused) return;
    this._isPaused = true;
    this.executeCallbacks(this.pauseCallbacks, "onPause");
  }

  /** Resume time advancement */
  public resume(): void {
    if (!this._isRunning || !this._isPaused) return;
    this._isPaused = false;
    this.lastWallTime = performance.now(); // prevent large jump
    this.executeCallbacks(this.resumeCallbacks, "onResume");
    this.requestNextFrame();
  }

  /** Completely stop the simulator */
  public stop(): void {
    if (!this._isRunning) return;
    this._isRunning = false;
    this._isPaused = true;
    this.executeCallbacks(this.stopCallbacks, "onStop");
  }

  public isRunning(): boolean {
    return this._isRunning;
  }

  public isPaused(): boolean {
    return this._isPaused;
  }

  /** Convenience: is the simulation actively advancing time? */
  public isActive(): boolean {
    return this._isRunning && !this._isPaused;
  }

  // ─────────────────────────────────────────────────────────────
  // Time control
  // ─────────────────────────────────────────────────────────────

  public setTimeScale(scale: number): void {
    this.timeScale = Math.max(0.01, scale);
  }

  public getTimeScale(): number {
    return this.timeScale;
  }

  // ─────────────────────────────────────────────────────────────
  // Registration API (this is what World will use)
  // ─────────────────────────────────────────────────────────────

  /**
   * Register a callback that runs **before** each fixed tick.
   * Good for reading input, updating controls, etc.
   */
  public onBeforeTick(callback: (dt: number) => void): void {
    this.beforeTickCallbacks.push(callback);
  }

  /**
   * Register a callback that runs **after** each fixed tick.
   * Good for World.step(), state emission, etc.
   */
  public onAfterTick(callback: (dt: number) => void): void {
    this.afterTickCallbacks.push(callback);
  }

  /**
   * Register a callback that runs **once per frame**, after all fixed ticks.
   * Receives `alpha` (0–1), the interpolation factor between the last two ticks.
   * Good for rendering interpolation.
   */
  public onFrame(callback: (alpha: number) => void): void {
    this.frameCallbacks.push(callback);
  }

  /** Register a callback that runs when the simulator starts. */
  public onStart(callback: () => void): void {
    this.startCallbacks.push(callback);
  }

  /** Register a callback that runs when the simulator stops. */
  public onStop(callback: () => void): void {
    this.stopCallbacks.push(callback);
  }

  /** Register a callback that runs when the simulator pauses. */
  public onPause(callback: () => void): void {
    this.pauseCallbacks.push(callback);
  }

  /** Register a callback that runs when the simulator resumes. */
  public onResume(callback: () => void): void {
    this.resumeCallbacks.push(callback);
  }

  // ─────────────────────────────────────────────────────────────
  // Internal frame loop
  // ─────────────────────────────────────────────────────────────

  private requestNextFrame(): void {
    if (!this._isRunning) return;
    scheduleFrame(this.frameCallback);
  }

  private frameCallback = (wallNow: number): void => {
    if (!this._isRunning) return;

    const wallDeltaMs = wallNow - this.lastWallTime;
    this.lastWallTime = wallNow;

    if (this.isActive()) {
      // ← Only advance if not paused
      const dt = (wallDeltaMs / 1000) * this.timeScale;
      this.accumulator += dt;

      while (this.accumulator >= this.fixedTimeStep) {
        this.executeBeforeTick(this.fixedTimeStep);
        this.executeAfterTick(this.fixedTimeStep);
        this.accumulator -= this.fixedTimeStep;
      }

      const alpha = this.accumulator / this.fixedTimeStep;
      this.executeFrame(alpha);
    }

    this.requestNextFrame();
  };

  private executeBeforeTick(dt: number): void {
    for (const callback of this.beforeTickCallbacks) {
      try {
        callback(dt);
      } catch (error) {
        logger.error("Error in tick callback", { hook: "onBeforeTick", error });
      }
    }
  }

  private executeAfterTick(dt: number): void {
    for (const callback of this.afterTickCallbacks) {
      try {
        callback(dt);
      } catch (error) {
        logger.error("Error in tick callback", { hook: "onAfterTick", error });
      }
    }
  }

  private executeFrame(alpha: number): void {
    for (const callback of this.frameCallbacks) {
      try {
        callback(alpha);
      } catch (error) {
        logger.error("Error in frame callback", { hook: "onFrame", error });
      }
    }
  }

  private executeCallbacks(callbacks: Array<() => void>, hook: string): void {
    for (const callback of callbacks) {
      try {
        callback();
      } catch (error) {
        logger.error("Error in lifecycle callback", { hook, error });
      }
    }
  }
}
