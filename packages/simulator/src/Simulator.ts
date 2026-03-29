export class Simulator {
  private _isRunning = false; // Has the simulator been started and not stopped?
  private _isPaused = false; // Is time currently frozen?
  private timeScale = 1.0;

  private lastWallTime = 0;
  private accumulator = 0;

  /** Fixed physics timestep (e.g. 1/240 seconds) */
  public readonly fixedTimeStep: number;

  private readonly onBeforeStep: Array<() => void> = [];
  private readonly onAfterStep: Array<(dt: number) => void> = [];

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
    this.requestNextFrame();
  }

  /** Freeze time advancement, but keep the RAF loop alive */
  public pause(): void {
    this._isPaused = true;
  }

  /** Resume time advancement */
  public resume(): void {
    if (!this._isRunning || !this._isPaused) return;
    this._isPaused = false;
    this.lastWallTime = performance.now(); // prevent large jump
    this.requestNextFrame();
  }

  /** Completely stop the simulator */
  public stop(): void {
    this._isRunning = false;
    this._isPaused = true;
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
   * Register a callback that runs **before** each fixed physics step.
   * Good for reading input, updating controls, etc.
   */
  public onBeforePhysicsStep(callback: () => void): void {
    this.onBeforeStep.push(callback);
  }

  /**
   * Register a callback that runs **after** each fixed physics step.
   * Good for World.step(), state emission, etc.
   */
  public onAfterPhysicsStep(callback: (dt: number) => void): void {
    this.onAfterStep.push(callback);
  }

  // ─────────────────────────────────────────────────────────────
  // Internal frame loop
  // ─────────────────────────────────────────────────────────────

  private requestNextFrame(): void {
    if (!this._isRunning) return;
    requestAnimationFrame(this.frameCallback);
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
        this.executeBeforeStep();
        this.executeAfterStep(this.fixedTimeStep);
        this.accumulator -= this.fixedTimeStep;
      }
    }

    this.requestNextFrame();
  };

  private executeBeforeStep(): void {
    for (const callback of this.onBeforeStep) {
      try {
        callback();
      } catch (error) {
        console.error("Error in onBeforePhysicsStep callback:", error);
      }
    }
  }

  private executeAfterStep(dt: number): void {
    for (const callback of this.onAfterStep) {
      try {
        callback(dt);
      } catch (error) {
        console.error("Error in onAfterPhysicsStep callback:", error);
      }
    }
  }
}
