# @flight-sim/units

Type-safe, immutable **physical quantity** value objects for a 6DOF flight simulator: one class per unit, fluent conversions within each category, and **metric (SI) internal bases** for physics.

## Design philosophy

- **Single source of truth** — Each concrete unit is its own class with a `readonly value` in that unit’s numeric representation.
- **Strongly typed conversions** — Within a category (e.g. `Length`), every instance exposes `toMeters()`, `toFeet()`, and so on; you cannot accidentally mix categories at compile time.
- **Immutable** — Values are read-only; conversions return new instances.
- **Fail-fast** — `NaN`, non-finite numbers, and invalid domains (e.g. negative mass) throw `UnitValueError` at construction.
- **Abstract category + concrete units** — Each category has an abstract base class declaring all `to…()` methods; each unit implements them. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Install

From the monorepo root (workspace package):

```json
{
  "dependencies": {
    "@flight-sim/units": "workspace:*"
  }
}
```

Build the package before publishing or linking consumers that read `dist/`:

```bash
cd packages/units && npm run build
```

For local development, the root `tsconfig` may map `@flight-sim/units` to `./packages/units/src` so you can skip a build in the editor.

## Quick start

```typescript
import { Knots, Meters, Pascals, MeanSeaLevel } from "@flight-sim/units";

const length = new Feet(100);
const lengthInMeters = length.toMeters();
console.log(lengthInMeters.value); // 30.48 m

const lengthInNauticalMiles = length.toNauticalMiles();
console.log(lengthInNauticalMiles.value); // 0.054 NM

const lengthInKilometers = length.toKilometers();
console.log(lengthInKilometers.value); // 0.091 km

const lengthInInches = length.toInches();
console.log(lengthInInches.value); // 1200 in
```

Default `toString()` uses two decimal places; use `.value` and `.getStringUnits()` for custom formatting.

## API surface

- **Entry** — `src/index.ts` re-exports [src/units/index.ts](src/units/index.ts) (all categories, concrete units, and helpers).
- **Helpers** — `formatUnitValue`, `assertFiniteNumber`, `assertNonNegative`, `assertPositive`, `UnitValueError`, `ScalarUnit`.

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Layout, class relationships, SI base table, performance notes |
| [docs/TESTING.md](docs/TESTING.md) | Test layout, npm commands, coverage thresholds |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Naming, adding units/categories, conversion references |

## How to add a new unit (same category)

Use an existing category (e.g. `Length`) as a template.

1. **Constants** — Add any new conversion factors to the category’s `constants.ts` (or create one), with a comment citing [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) sources.
2. **Concrete class** — Add `src/units/units/<category>/YourUnit.ts`:
   - `constructor(public readonly value: number)` with `assertFiniteNumber` (or `assertNonNegative` if required).
   - `static from…` factories for **every** unit in the category, including the new one.
   - The category’s SI `to…()` method (e.g. `toMeters()`, `toPascals()`): if this class **is** SI, `return this`; otherwise convert to SI then delegate.
   - Implement **every** abstract `to…()` from the category file (typically convert via the SI `to…()` once, then the target’s `from…` or constructor).
   - `getStringUnits()` and `toString()` (default two decimals via `formatUnitValue`).
3. **Category abstract class** — In `src/units/categories/<Category>.ts`, add:
   - `import type` for the new concrete class.
   - Abstract `toYourUnit(): YourUnit` on the base.
4. **Barrel** — Export the new class from `src/units/index.ts`.
5. **Every other concrete file in that category** — Add `fromYourUnit`, `toYourUnit`, and wire all existing `to…` methods so the category stays complete.
6. **Tests** — Add `test/units/<category>/YourUnit.test.ts` (round-trips, factories, strings, boundaries). Extend [test/staticFactories.test.ts](test/staticFactories.test.ts) for the new static entry points. Update [test/sanity.test.ts](test/sanity.test.ts) if you maintain a full smoke matrix.
7. **Build** — `npm run build` and `npm test` from `packages/units`.

## How to add a new category

1. Create `src/units/categories/NewCategory.ts` with `abstract class NewCategory` and abstract `to…()` for each planned concrete unit, plus `getStringUnits()` / `toString()` as abstract or shared via a pattern from an existing category.
2. Add folder `src/units/units/newcategory/` and implement **all** concrete units together so the abstract API stays consistent.
3. Export the category and all concretes from `src/units/categories/index.ts` and `src/units/index.ts`.
4. Add tests under `test/units/newcategory/` and extend factory/sanity coverage as above.
5. Document the category in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [spec.md](spec.md) if the public contract changes.

## Scripts (npm)

| Command | Description |
|---------|-------------|
| `npm run build` | Emit `dist/` with `tsc` |
| `npm run build:watch` | Watch mode compile |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Vitest watch |
| `npm run test:coverage` | Vitest with v8 coverage (see [docs/TESTING.md](docs/TESTING.md)) |
| `npm run typecheck` | `tsc --noEmit` |

From the monorepo root, `npm test` runs Turbo across workspaces (see root `package.json`).

## License

See the repository root for license terms.
