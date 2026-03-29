# Testing: @flight-sim/units

## Runner and layout

Tests use **Vitest** (v8 coverage). Spec files are `*.test.ts` under `packages/units/test/`.

| Path | Role |
|------|------|
| `test/helpers.ts` | Shared `expectClose` helper |
| `test/units/<category>/<Class>.test.ts` | One file per concrete unit class (round-trips, factories, strings, edge cases) |
| `test/staticFactories.test.ts` | Calls every `static from…` to cover factory entry points |
| `test/validate.test.ts` | `UnitValueError` / assert helpers |
| `test/sanity.test.ts` | Cross-category smoke imports and quick round-trips |

Vitest resolves `@flight-sim/units` to `src/index.ts` via `vitest.config.ts` so tests run against TypeScript sources without requiring a prior `tsc`.

## Commands (npm)

Run from `packages/units`:

| Command | Description |
|---------|-------------|
| `npm test` | Single Vitest run |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with coverage report |

From the **monorepo root**, `npm test` invokes Turbo and may run tests in multiple packages; ensure `@flight-sim/units` is included in the workspace pipeline you care about.

## Coverage

Coverage is scoped to **concrete unit implementations**:

- **Included:** `src/units/units/**/*.ts`
- **Excluded:** `**/constants.ts` (numeric factors only)

**Thresholds** (enforced when you run `npm run test:coverage`):

| Metric | Minimum |
|--------|---------|
| Statements | 80% |
| Lines | 80% |
| Branches | 75% |
| Functions | 75% |

Branches and functions stay slightly lower because of optional paths (e.g. angle normalization) and the large surface of `to*` methods; statements and lines target **80%** as the primary bar.

## What the tests guarantee

- **Round-trip stability** — For each category, converting through other units and back agrees with the original value within a tight numeric tolerance (see `expectClose`).
- **Static factories** — `fromXxx` helpers are callable and consistent with instance conversions.
- **Validation** — Non-finite numbers throw; domain rules (e.g. non-negative mass/time) throw `UnitValueError`.
- **Regression wiring** — `sanity.test.ts` fails if exports break or a major conversion path stops working.
- **Special rules** — Altitude labels (MSL/AGL), pressure millibars vs hPa, cardinal normalization, and bearing vs `DegreesCardinal` are covered in dedicated tests.

They do **not** replace formal dimensional analysis of every physical formula in the simulator; they verify the **unit layer** behaves consistently.

## CI tips

- Run `npm run build && npm test` before publishing.
- If Turbo’s `test` task depends on `^build`, workspace consumers may build dependencies first; Vitest still transpiles TS from source for this package when run locally.

## See also

- [README.md](../README.md) — Package overview and scripts table
- [CONTRIBUTING.md](CONTRIBUTING.md) — Extending tests when adding units
