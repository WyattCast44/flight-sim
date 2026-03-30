# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands

This is a Turborepo monorepo with npm workspaces. All top-level commands delegate to Turbo:

```bash
npm run build          # Build all packages (tsc)
npm test               # Run all tests across packages
npm run typecheck      # Type-check without emitting
npm run dev            # Watch mode for all packages
```

Per-package commands (run from package directory):

```bash
npm test                    # Run tests once (vitest run)
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report (v8 provider)
npx vitest run tests/units/length/Meters.test.ts  # Single test file
```

Turbo pipeline: `test` and `typecheck` depend on `^build` (dependencies build first).

## Architecture

**Two packages** under `packages/`:

- **@flight-sim/units** — Immutable, type-safe physical quantity value objects (Length, Velocity, Angles, etc.)
- **@flight-sim/simulator** — Fixed-timestep simulation loop with RAF/setTimeout scheduling

### Units Package Pattern

Each physical quantity follows **Abstract Category → Concrete Units**:

- `src/categories/` — Abstract base classes (e.g., `Length`) declaring all conversion methods (`toFeet()`, `toMeters()`, etc.)
- `src/units/<category>/` — Concrete implementations (e.g., `Meters`, `Feet`) extending the category base, each with a `constants.ts` for conversion factors
- `src/core/` — Shared validation (`assertFiniteNumber`, `assertNonNegative`) and formatting

**All internal physics use SI bases** (Meters, Kilograms, Radians, Pascals, Kelvin, etc.). Conversions always return new instances (immutable). Constructors validate inputs and throw `UnitValueError` for NaN/Infinity/domain violations.

**Angles are special:** `Degrees`/`Radians` are mathematical (CCW, unbounded), `DegreesCardinal` is 1–360° clockwise from north (auto-normalized), `Bearing` is clockwise from north and unbounded.

### Simulator Package

`Simulator` class uses a fixed-timestep accumulator pattern (default 240 Hz, configurable via `tickRate`). Supports pause/resume, time scaling (min 0.01x), and before/after physics step callbacks. Callbacks are wrapped in try/catch so one error doesn't crash the loop. `scheduleFrame` abstracts RAF (browser) vs setTimeout (Node).

## TypeScript Configuration

- Strict mode with `exactOptionalPropertyTypes`, `noImplicitReturns`, `noUnusedLocals`
- Target: ESNext, Module: NodeNext
- Root `tsconfig.json` provides path aliases mapping `@flight-sim/*` to `src/` directories

## Testing

- Vitest with `globals: false` (explicit imports required)
- Tests live in `tests/` directories mirroring source structure
- Coverage thresholds: 70% (statements, lines, branches, functions)
- `constants.ts` files excluded from coverage
