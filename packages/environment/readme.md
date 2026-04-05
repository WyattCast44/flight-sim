# @flight-sim/environment

Core environment modeling package for the flight simulator. Provides accurate atmospheric conditions and gravitational models suitable for **general aviation**, **commercial airliners**, and **military aircraft** operating up to ~100,000 ft MSL.

## Features

### Atmosphere Model
- **US Standard Atmosphere 1976** implementation (`StandardAtmosphere1976`)
- Layered model with correct temperature lapse rates, pressure, and density calculations
- Efficient batched queries via `getConditionsAtAltitude()` (recommended for performance)
- Support for altitudes from -610 m to 86,000 m (-2,000 ft to ~282,000 ft)
- Returns temperature in **Kelvin** internally (best for physics calculations)
- Additional derived properties:
  - Speed of sound (`getSpeedOfSoundAtAltitude()`)
  - Dynamic viscosity via **Sutherland’s law** (`getDynamicViscosityAtAltitude()`)

### Deviation / Weather System
- `DeviatedAtmosphere` wrapper for realistic non-standard conditions
- Supports:
  - **ISA temperature deviation** (`deltaTemperature`)
  - **Sea-level pressure (QNH)** adjustment
- Density automatically recalculated using the ideal gas law
- Easy runtime updates via `setDeviations()`

### Gravity Models
- Abstract `GravityModel` base class
- `ConstantGravityModel` – simple and fast (default g₀ = 9.80665 m/s²)
- `WGS84GravityModel` – realistic gravity variation with altitude using free-air approximation
- Supports `Feet`, `Meters`, and `Altitude` input types

### Unit Safety
- Strong typing using the `@flight-sim/units` library
- All public APIs accept `Feet | Meters | Altitude`

## Architecture

### Design Principles
- **Composition over inheritance** — `DeviatedAtmosphere` wraps any `AtmosphereModel`
- **Single source of truth** — `getConditionsAtAltitude()` is the efficient entry point
- **Physical consistency** — All models maintain ideal gas law relationships
- **Extensibility** — Easy to add new atmosphere models, gravity models, or deviation types
- **Testability** — Pure models with minimal side effects

### Key Classes

```ts
AtmosphereModel (abstract)
├── StandardAtmosphere1976
└── DeviatedAtmosphere (wrapper)

GravityModel (abstract)
├── ConstantGravityModel
└── WGS84GravityModel