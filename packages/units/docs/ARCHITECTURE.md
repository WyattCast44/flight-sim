# Architecture: @flight-sim/units

This document describes how the library is structured, why it uses abstract bases plus concrete classes, which SI types anchor each category, and what to expect at runtime.

## Repository layout

Source lives under `packages/units/src/`:

```text
src/
├── index.ts                    # package entry; re-exports ./units/index.js
└── units/
    ├── index.ts                # public API barrel
    ├── core/                   # validate, format, ScalarUnit
    ├── categories/             # abstract base per quantity kind
    │   ├── Length.ts
    │   ├── …
    │   └── index.ts
    └── units/                  # concrete classes grouped by category
        ├── length/
        ├── velocity/
        └── …
```

Tests live under `packages/units/test/` and mirror category folders (see [TESTING.md](TESTING.md)).

## Textual class diagram

Each **category** is an abstract class. **Concrete units** extend exactly one category and implement every conversion declared on that category.

```text
                    ┌─────────────────┐
                    │  abstract       │
                    │  Length         │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
    ┌─────────┐         ┌──────────┐       ┌────────────┐
    │ Meters  │         │ Feet     │  …    │ NauticalMiles │
    │ (base)  │         │          │       │              │
    └─────────┘         └──────────┘       └────────────┘
```

**Altitude** (`MeanSeaLevel`, `AboveGroundLevel`) is a separate category but stores **meters** internally and reuses `Meters` for numeric conversion to other length-like units; labels (`m MSL`, `m AGL`) differ.

**Angles** is special: four representations (mathematical degrees, radians, compass cardinal 1–360°, and unbounded bearing). Conversions go through shared helpers in `units/angles/angleMath.ts` so cardinal vs mathematical conventions stay consistent.

**Pressure**: `Hectopascals` implements **millibars** as `static fromMillibars` (1 mb = 1 hPa). `Pascals` also exposes `fromMillibars` for convenience.

## Why abstract base + concrete pattern?

1. **Exhaustive conversions** — The abstract class lists every `toXxx(): Xxx` for the category. TypeScript forces each new file to implement the full surface when you add a unit.
2. **Discoverability** — Instance autocomplete on `Length` shows every legal target unit in that category only.
3. **Single hub** — Implementations typically convert to the category’s SI type once (e.g. `toMeters()`, `toPascals()`), then `fromYyy` on the target, which keeps factors in one place per category (`constants.ts`).
4. **Zero-cost SI identity** — On the SI class, the matching `to…()` (e.g. `toMeters()` on `Meters`) returns `this` (no allocation).

## Internal base units (physics)

These are the **canonical** numeric representations for simulator internals. Imperial and other units should be converted **to** these at boundaries (inputs) and **from** these for display or file export.

| Category | Base class | Stored value (conceptually) |
|----------|------------|-----------------------------|
| Length | `Meters` | meters |
| Altitude | `MeanSeaLevel` / `AboveGroundLevel` | meters (semantic label differs) |
| Area | `SquareMeters` | m² |
| Volume | `CubicMeters` | m³ |
| Velocity | `MetersPerSecond` | m/s |
| Acceleration | `MetersPerSecondSquared` | m/s² |
| Angular velocity | `RadiansPerSecond` | rad/s |
| Angular acceleration | `RadiansPerSecondSquared` | rad/s² |
| Mass | `Kilograms` | kg |
| Force | `Newtons` | N |
| Torque | `NewtonMeters` | N·m |
| Moment of inertia | `KilogramMeterSquared` | kg·m² |
| Density | `KilogramsPerCubicMeter` | kg/m³ |
| Pressure | `Pascals` | Pa |
| Power | `Watts` | W |
| Temperature | `Kelvin` | K |
| Angles | `Radians` | rad (mathematical CCW); see angle helpers for cardinal/bearing |
| Time | `Seconds` | s |

## Angle conventions

- **`Degrees`** — Mathematical: positive **counterclockwise** (standard 2D angle).
- **`Radians`** — Same as mathematical convention; base for the category.
- **`DegreesCardinal`** — Compass-style: **1–360°**, positive **clockwise** from north; constructor **normalizes** inputs to that range (0° maps to 360°).
- **`Bearing`** — Clockwise from north; **any finite real** (multi-turn allowed). **`toDegreesCardinal()`** returns the **equivalent** direction in 1–360°; the instance’s `.value` is unchanged.

## Performance notes

- **Allocations** — Every `toYyy()` allocates a new object. Hot physics loops should store state in plain SI numbers (`number`) and wrap this library at boundaries if profiling shows pressure.
- **SI identity** — On the SI class for a category, the matching `to…()` (e.g. `toMeters()` on `Meters`) returns `this`, so repeated `x.toMeters().toMeters()` does not allocate extra SI wrappers on the inner reference (non-SI types still allocate when converting).
- **No runtime deps** — Tree-shaking friendly; only import what you use.
- **Constants** — Conversion factors are module-level numbers; no registry or stringly dispatch at runtime.

## Related reading

- [spec.md](../spec.md) — Full product specification
- [CONTRIBUTING.md](CONTRIBUTING.md) — How to extend the library
- [TESTING.md](TESTING.md) — Verification strategy
