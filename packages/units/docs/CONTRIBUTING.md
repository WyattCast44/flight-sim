# Contributing to @flight-sim/units

Short guide for extending the library without breaking the public contract.

## Naming

- **Classes** — `PascalCase`, full unit name: `MetersPerSecond`, `PoundsPerSquareInch`, `MeanSeaLevel`.
- **Files** — One concrete class per file, filename matches the class: `MetersPerSecond.ts`.
- **Factories** — `static fromMeters(value: number)` etc.; mirror the unit name after `from`.
- **Converters** — `toFeet(): Feet`, `toPascals(): Pascals`; no abbreviations in method names except widely understood `psi`/`kt` in `getStringUnits()` / `toString()` where appropriate.
- **Categories** — Abstract class name matches the quantity: `Length`, `Velocity`, `Angles`.

## Adding or changing a unit

1. Read [README.md](../README.md) checklists (“add a new unit” / “add a new category”).
2. Keep **all units in a category convertible to each other** — update every sibling when you add one.
3. Prefer **one canonical conversion path** through the SI base (or documented angle math) to avoid drift.
4. Document new factors in code comments with a source (see below).
5. Add tests: per-class file, `staticFactories`, and `sanity` where applicable.

## Conversion formulas and constants

Prefer **exact definitions** where they exist:

- **SI and imperial anchors** — NIST *Guide for the Use of the International System of Units (SI)* and related NIST publications: [https://www.nist.gov/pml/special-publication-811](https://www.nist.gov/pml/special-publication-811)
- **Foot–inch–meter** — International foot = **0.3048 m** exactly; inch = **0.0254 m** exactly.
- **Nautical mile** — **1852 m** (SI Brochure / ICAO usage).
- **Avoirdupois pound (mass)** — **0.45359237 kg** exactly (international definition).
- **Gravity-related slugs / lbf** — Derived from **lbf → N** and **ft → m**; cross-check with engineering references: [https://en.wikipedia.org/wiki/Pound-force](https://en.wikipedia.org/wiki/Pound-force), [https://en.wikipedia.org/wiki/Slug_%28unit%29](https://en.wikipedia.org/wiki/Slug_%28unit%29)
- **US gallon** — **231 in³** (liquid US gallon definition); used to derive m³.
- **Temperature** — `K = °C + 273.15`; Fahrenheit conversions use the **459.67** offset pattern consistent with `°F` ↔ `K` references: [https://en.wikipedia.org/wiki/Fahrenheit](https://en.wikipedia.org/wiki/Fahrenheit)
- **Angles / compass** — Document assumptions in [ARCHITECTURE.md](ARCHITECTURE.md); cardinal vs mathematical conventions are easy to confuse.

Wikipedia is acceptable for **sanity checks** and human-readable derivations; prefer **NIST / SI Brochure** for authoritative numeric definitions.

## Style

- Match existing files: strict TypeScript, `.js` extensions in **relative** imports (NodeNext), minimal comments (explain *why* or non-obvious physics, not obvious code).
- Do not add dependencies without maintainer agreement; the package is **zero runtime dependencies** by design.

## Pull requests

- Include tests for any new conversion path or validation rule.
- Run `npm run build`, `npm test`, and `npm run test:coverage` from `packages/units`.
- Update [spec.md](../spec.md) if the public inventory of units or semantics changes.
