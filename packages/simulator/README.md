# @flight-sim/simulator

A fixed-timestep simulation loop for the flight-sim project. It decouples **physics updates** (which run at a constant rate) from **rendering** (which runs as fast as the display allows), ensuring deterministic and stable simulation regardless of frame rate.

If you are new to real-time simulation architecture, the key terms and patterns used here are defined in the [Concepts](#concepts) section at the end.

## Installation

```bash
npm install @flight-sim/simulator
```

## Quick Start

```typescript
import { Simulator } from "@flight-sim/simulator";

const sim = new Simulator({ tickRate: 240 });

// Register physics callbacks
sim.onBeforeTick((dt) => {
  // Read input, update control surfaces — runs every fixed tick
});

sim.onAfterTick((dt) => {
  // Step the physics world, emit state — runs every fixed tick
});

// Register render callback
sim.onFrame((alpha) => {
  // Interpolate and draw — runs once per display frame
});

sim.start();
```

## How It Fits in the App

The `Simulator` is the heartbeat of the flight-sim runtime. It does not contain any physics or rendering logic itself — instead, it provides the **timing infrastructure** that other systems hook into:

```
┌──────────────────────────────────────────────────┐
│                   Simulator                      │
│                                                  │
│  Wall Clock ──► Accumulator ──► Fixed Ticks      │
│                                  │               │
│                          onBeforeTick(dt)         │
│                          onAfterTick(dt)          │
│                                  │               │
│                          onFrame(alpha)           │
└──────────────────────────────────────────────────┘
        ▲                          │
        │                          ▼
   start/stop/               Physics World,
   pause/resume              Renderer, HUD, etc.
```

In a typical setup:

- **Input systems** read controls in `onBeforeTick`
- **Physics** (e.g., a future `World.step()`) runs in `onAfterTick`
- **Rendering** interpolates between physics states in `onFrame`
- **Lifecycle hooks** (`onStart`, `onStop`, `onPause`, `onResume`) handle setup and teardown of dependent systems

The simulator has no dependency on `@flight-sim/units`. All time values passed to callbacks are plain numbers in **seconds** (SI base unit). Consuming code is responsible for wrapping these in unit types if desired.

## API Reference

### Constructor

```typescript
new Simulator(options?: { tickRate?: number })
```

| Option | Default | Description |
|--------|---------|-------------|
| `tickRate` | `240` | Physics tick frequency in Hz. Determines `fixedTimeStep` (= `1 / tickRate`). 240 Hz is recommended for 6DOF flight dynamics. |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fixedTimeStep` | `readonly number` | The fixed physics timestep in seconds (e.g., `1/240 = ~0.00417s`). |

### Lifecycle Methods

```typescript
start(): void
```
Initializes and begins the simulation loop. Resets the accumulator, captures the current wall time, fires `onStart` callbacks, and requests the first frame. **Idempotent** — calling `start()` on an already-running simulator is a no-op.

```typescript
pause(): void
```
Freezes time advancement. The frame scheduling loop keeps running (so `resume()` is instant), but the accumulator does not advance and no tick or frame callbacks fire. Fires `onPause` callbacks. No-op if already paused or not running.

```typescript
resume(): void
```
Resumes time advancement after a pause. Resets the wall-time reference to prevent a large time spike from the paused duration. Fires `onResume` callbacks. No-op if not paused or not running.

```typescript
stop(): void
```
Completely halts the simulator. No further frames are requested. Fires `onStop` callbacks. No-op if not running.

### State Queries

```typescript
isRunning(): boolean   // Has start() been called without a subsequent stop()?
isPaused(): boolean    // Is time frozen?
isActive(): boolean    // Shorthand for isRunning() && !isPaused()
```

### Time Control

```typescript
setTimeScale(scale: number): void
```
Controls simulation speed relative to real time. A scale of `2.0` runs the simulation at double speed; `0.5` runs at half speed. Clamped to a minimum of `0.01` to prevent zero-velocity physics breakdowns.

```typescript
getTimeScale(): number  // Default: 1.0
```

### Callback Registration

All registration methods accept a callback and push it onto an internal array. Multiple callbacks per hook are supported. Callbacks are executed in registration order. **There is no deregistration API** — callbacks persist for the lifetime of the `Simulator` instance.

#### Physics Tick Callbacks

These fire inside the fixed-timestep loop and may execute **multiple times per frame** (or zero times, if the frame was fast enough that the accumulator hasn't reached the next tick).

```typescript
onBeforeTick(callback: (dt: number) => void): void
```
Fires **before** each physics tick. `dt` is always exactly `fixedTimeStep`. Use this for reading input, updating control surfaces, or any pre-physics work.

```typescript
onAfterTick(callback: (dt: number) => void): void
```
Fires **after** each physics tick. `dt` is always exactly `fixedTimeStep`. Use this for stepping the physics world, emitting state snapshots, or applying forces.

#### Render Callback

```typescript
onFrame(callback: (alpha: number) => void): void
```
Fires **once per display frame**, after all physics ticks for that frame have completed. `alpha` is the **interpolation factor** — a value in the range `[0, 1)` representing how far the accumulator has progressed toward the next tick. Use it to interpolate entity positions between the previous and current physics state for smooth rendering.

```
alpha = 0.0  → render at previous tick's state
alpha = 0.5  → render halfway between previous and current tick
alpha = 0.99 → render nearly at current tick's state
```

#### Lifecycle Callbacks

```typescript
onStart(callback: () => void): void    // Fires on start()
onStop(callback: () => void): void     // Fires on stop()
onPause(callback: () => void): void    // Fires on pause()
onResume(callback: () => void): void   // Fires on resume()
```

### Utility Exports

```typescript
import { scheduleFrame, cancelScheduledFrame } from "@flight-sim/simulator";
```

```typescript
scheduleFrame(callback: (time: number) => void): number
```
Requests the next frame using `requestAnimationFrame` in browsers or `setTimeout(..., 0)` + `performance.now()` in Node.js. Returns a handle for cancellation.

```typescript
cancelScheduledFrame(handle: number): void
```
Cancels a previously scheduled frame.

## Error Handling

All callbacks (tick, frame, and lifecycle) are wrapped in `try/catch`. If a callback throws:

1. The error is logged via `@flight-sim/logging` with context (which hook threw, the error object).
2. Remaining callbacks in the same phase still execute.
3. The simulation loop continues uninterrupted.

This means a bug in one system (e.g., rendering) will not crash the physics loop or vice versa.

## Execution Order Per Frame

Each animation frame follows this sequence:

1. Compute wall-clock delta since last frame
2. If active (running and not paused):
   1. Scale delta by `timeScale` and add to `accumulator`
   2. **While** `accumulator >= fixedTimeStep`:
      - Execute all `onBeforeTick` callbacks with `fixedTimeStep`
      - Execute all `onAfterTick` callbacks with `fixedTimeStep`
      - Subtract `fixedTimeStep` from `accumulator`
   3. Compute `alpha = accumulator / fixedTimeStep`
   4. Execute all `onFrame` callbacks with `alpha`
3. Request next frame

## Examples

### Slow Motion

```typescript
const sim = new Simulator();
sim.setTimeScale(0.25); // Quarter speed — useful for debugging physics
sim.start();
```

### Pause Menu

```typescript
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (sim.isPaused()) {
      sim.resume();
    } else {
      sim.pause();
    }
  }
});
```

### Physics with Rendering Interpolation

```typescript
let previousPosition = { x: 0, y: 0, z: 0 };
let currentPosition = { x: 0, y: 0, z: 0 };

sim.onBeforeTick(() => {
  previousPosition = { ...currentPosition };
});

sim.onAfterTick((dt) => {
  // Advance physics by dt seconds
  currentPosition.x += velocity.x * dt;
  currentPosition.y += velocity.y * dt;
  currentPosition.z += velocity.z * dt;
});

sim.onFrame((alpha) => {
  // Interpolate for smooth rendering between ticks
  const renderX = previousPosition.x + (currentPosition.x - previousPosition.x) * alpha;
  const renderY = previousPosition.y + (currentPosition.y - previousPosition.y) * alpha;
  const renderZ = previousPosition.z + (currentPosition.z - previousPosition.z) * alpha;
  drawAircraft(renderX, renderY, renderZ);
});
```

## Concepts

This section defines the simulation architecture patterns and terminology used in this package. If you are unfamiliar with real-time simulation design, these are the terms to research further.

### Fixed Timestep

A **fixed timestep** (also called a **fixed time step** or **constant delta time**) means the physics simulation always advances by the same time increment — in this case, `1/tickRate` seconds per tick. This is critical for deterministic and stable physics. Variable timesteps (where `dt` changes every frame) cause integration errors that accumulate over time, making physics behave differently at different frame rates. A fixed timestep guarantees that running the same inputs always produces the same outputs, regardless of how fast the machine renders.

See: [Glenn Fiedler's "Fix Your Timestep!"](https://gafferongames.com/post/fix_your_timestep/) — the canonical reference for this pattern.

### Accumulator Pattern

The **accumulator** bridges the gap between variable-rate rendering and fixed-rate physics. Each frame, the real elapsed time (scaled by `timeScale`) is added to the accumulator. The physics loop then drains the accumulator in fixed-size chunks. If a frame takes 16.67ms (60 FPS) and the fixed timestep is ~4.17ms (240 Hz), the physics loop runs 4 ticks that frame. If a frame takes only 2ms, the accumulator doesn't reach the threshold and no physics ticks run — the leftover carries into the next frame.

This is sometimes called a **semi-fixed timestep** because the outer loop (rendering) runs at a variable rate while the inner loop (physics) runs at a fixed rate.

### Interpolation Factor (Alpha)

After the accumulator drains, there is almost always a remainder — time that hasn't yet been consumed by a full physics tick. The **interpolation factor** (`alpha`) is this remainder divided by the fixed timestep, producing a value in `[0, 1)`. Renderers use alpha to blend between the previous and current physics states, eliminating the visual stutter that would occur if rendering only snapped to discrete physics positions. This technique is called **temporal interpolation** or **state interpolation**.

Without interpolation, a 240 Hz physics simulation rendered at 60 FPS would visually appear to update only 60 times per second despite having more precise internal state.

### requestAnimationFrame (RAF)

`requestAnimationFrame` is a browser API that schedules a callback to run before the next display repaint — typically at the monitor's refresh rate (60 Hz, 120 Hz, 144 Hz, etc.). It is the standard way to drive render loops in the browser because it automatically synchronizes with the display and pauses when the tab is backgrounded. In Node.js (where there is no display), this package falls back to `setTimeout(..., 0)` with `performance.now()` timestamps.

### Tick Rate

The **tick rate** is the frequency of fixed physics updates, measured in Hz. A tick rate of 240 means 240 physics updates per second. Higher tick rates produce more accurate simulations (especially for fast-moving objects and stiff constraints) at the cost of more CPU time. 240 Hz is a common choice for **6DOF (six degrees of freedom)** simulations — systems where an object can translate along and rotate around three axes (X, Y, Z) — because flight dynamics involve rapid rotational changes that need fine temporal resolution to remain stable.

### Time Scaling (Time Dilation)

**Time scaling** multiplies the real elapsed time before it enters the accumulator. A scale of `1.0` is real-time. Values below 1.0 produce slow motion; values above 1.0 produce fast-forward. This is useful for debugging (slow motion to inspect physics behavior), cinematic effects, or accelerated simulation. The minimum scale is clamped to `0.01` to prevent division-by-zero or frozen-time edge cases in downstream physics code.

### Game Loop / Simulation Loop

The overall pattern — "measure elapsed time, run fixed physics updates, render with interpolation, repeat" — is known as a **game loop** or **simulation loop**. It is the foundational architecture of virtually all real-time simulations, from games to flight simulators to robotics. The `Simulator` class implements the timing and scheduling layer of this loop, delegating the actual physics and rendering work to registered callbacks.

For a comprehensive treatment, see:
- [Game Programming Patterns: Game Loop](https://gameprogrammingpatterns.com/game-loop.html) by Robert Nystrom
- [Glenn Fiedler's "Fix Your Timestep!"](https://gafferongames.com/post/fix_your_timestep/)
