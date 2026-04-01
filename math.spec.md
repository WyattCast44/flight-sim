**Specification: Math Package for 6DOF Web-Based Flight Simulator**

**Project Name:** `@flight-sim/math` (TypeScript package)

**Goal**  
Create a lightweight, type-safe, **units-aware** vector and matrix mathematics library that serves as the foundational layer for all physics calculations in the simulator. It must integrate seamlessly with the `@flight-sim/units` package, enforce metric base units internally, support rigid-body 6DOF operations, and provide excellent debuggability via your structured logging package.

This package will be the backbone for position, velocity, acceleration, forces, moments, rotations, and coordinate transformations.

### 1. Core Design Philosophy

- **Self-Documenting**: All classes and methods should be well named and not overly abbreviated, I want someone to be able to read the code and understand what it does without having to read the documentation or have to look up scientific notation naming conventions. Variables should also include units in the name if needed, or typed if that makes things more clear to the reader.
- **Units-Aware Generics**: Vectors and matrices are generic over physical unit types from `@flight-sim/units` (e.g., `Vector3<Meters>`, `Vector3<Newtons>`, `Vector3<MetersPerSecond>`). This catches unit mismatches at compile time where possible and provides runtime safety.
- **Metric-First Internal Calculations**: All mathematical operations should use the SI base units defined in the units package (Meters, kg, Newtons, rad/s, kg·m², Pa, etc.). Conversions happen only at input/output boundaries.
- **Immutability by Default**: All core math objects (`Vector3`, `Quaternion`, etc.) are immutable. Mutation methods return new instances (with optional in-place variants for performance-critical integration loops).
- **Strong Typing + Runtime Checks**: Constructor validation for NaN/Infinity, logging of suspicious operations (via injected or default structured logger).
- **Performance Conscious**: Simple, inlineable operations. Avoid heavy abstractions in hot paths (e.g., numerical integration). Provide both generic and specialized (non-generic) versions where needed for speed.
- **No External Math Dependencies**: Pure TypeScript implementation (no gl-matrix, three.js math, etc.). You can add optional adapters later.
- **Integration with Logging**: Accept an optional `Logger` instance from your structured logging package. Log at appropriate levels (debug for vector ops in dev, warn for domain violations like non-normalized quaternions, error for invalid states).

### 2. Main Components

#### Core Vector Types
- **`Vector3<U extends Unit>`** — Primary class for 3D quantities (position, velocity, force, etc.)
  - Generic over any unit from the units package.
  - Constructors: `new Vector3(x: U, y: U, z: U)`
  - Static factories: `Vector3.zero<U>()`, `Vector3.fromArray<U>(arr: number[])`, `fromMeters(x, y, z)`, etc.
  - Operations (returning same unit type where applicable):
    - `add(other: Vector3<U>)`, `subtract`, `scale(scalar: number)`
    - `dot(other: Vector3<U>)`: returns scalar (unit-aware where possible)
    - `cross(other: Vector3<U>)`: for vectors of same dimensionality
    - `magnitude()`, `normalize()`, `distanceTo(other)`
    - `lerp`, `clamp`, `project`, etc.
  - Conversion helpers: `.toMeters()` if U is Length-based, etc.

- **`Vector2<U extends Unit>`** — For 2D cases (e.g., horizontal wind, screen coordinates).

- **Specialized convenience types** (type aliases or subclasses):
  - `PositionVector = Vector3<Meters>`
  - `VelocityVector = Vector3<MetersPerSecond>`
  - `ForceVector = Vector3<Newtons>`
  - `AngularVelocityVector = Vector3<RadiansPerSecond>`
  - `AccelerationVector = Vector3<MetersPerSecondSquared>`

#### Matrices
- **`Matrix3x3`** — For rotation matrices, inertia tensors, direction cosine matrices (DCM).
  - Operations: multiply, transpose, inverse, determinant.
  - Special: `fromQuaternion(q: Quaternion)`, `toQuaternion()`.

- **`Matrix4x4`** — For homogeneous transformations if needed later (less critical for pure 6DOF).

#### Quaternion
- **`Quaternion`** — Essential for attitude representation (avoids gimbal lock).
  - Constructors: from axis-angle, from Euler angles (with clear convention: e.g., roll-pitch-yaw in body or NED frame).
  - Operations: multiply, conjugate, normalize, slerp (spherical linear interpolation).
  - Conversions: `toRotationMatrix()`, `toEulerDegrees()` / `toEulerRadians()` (with documented convention).
  - Static: identity, fromRotationMatrix, etc.

#### Utilities & Helpers
- Coordinate transformation helpers (initial set):
  - Body ↔ NED (North-East-Down)
  - Rotation matrix ↔ Quaternion conversions
  - Gravity vector in different frames
- Numerical integration helpers (for later 6DOF integrator):
  - Simple Euler step
  - Basic RK4 (Runge-Kutta 4) template for state vectors
- Angle utilities that bridge with the units `Angles` category (e.g., wrapping, conversion between Degrees/Radians/Cardinal).
- Common constants: `GRAVITY_MS2`, `EARTH_RADIUS_M`, etc. (as typed units).

### 3. Implementation Requirements (Strict TypeScript)

- **Monorepo Placement**: `packages/math/`
- **Dependencies**:
  - `"@flight-sim/units": "workspace:*"`
  - Your structured logging package (`workspace:*`)
- **Folder Structure** (suggested):
  ```
  packages/math/
  ├── src/
  │   ├── Vector2.ts
  │   ├── Vector3.ts
  │   ├── Matrix3x3.ts
  │   ├── Quaternion.ts
  │   ├── types.ts                 # unit-generic type aliases
  │   ├── transformations.ts       # coordinate frame helpers
  │   ├── integration.ts           # numerical integrators
  │   └── index.ts                 # barrel export
  ├── tests/
  │   ├── Vector3.test.ts
  │   ├── Quaternion.test.ts
  │   └── ...
  ├── package.json
  ├── tsconfig.json
  ├── vitest.config.ts
  └── README.md
  ```

- Follow the same strict TS rules as the units package.
- All public classes should have comprehensive JSDoc comments explaining units expectations and conventions (e.g., rotation order, positive directions).

### 4. Testing Requirements (Vitest)

- Full coverage for all mathematical operations.
- Round-trip tests with units (create with one unit → operate → convert back → assert equality within epsilon).
- Special tests for:
  - Quaternion normalization and rotation accuracy (e.g., rotate a vector 90° and check result).
  - Cross product right-hand rule.
  - Inertia tensor operations (symmetry, positive-definiteness checks with logging).
  - Edge cases: zero vectors, near-zero magnitudes, NaN propagation with clear error logging.
- Integration tests that combine multiple types (e.g., force = mass × acceleration, then add to momentum).

Aim for clear, descriptive test names and 95%+ coverage on core logic.

### 5. Documentation Deliverables

Produce these Markdown files:

1. **`README.md`**
   - Overview and motivation
   - Quick start examples (with units)
   - Metric base unit enforcement explanation
   - How to use with structured logger

2. **`docs/ARCHITECTURE.md`**
   - Design decisions (generics vs performance, immutability)
   - Unit integration strategy
   - Coordinate system conventions (define NED, Body, Wind axes clearly)
   - List of supported operations

3. **`docs/TESTING.md`**
   - Test organization and running instructions
   - What is tested (especially unit safety)

4. **`docs/CONTRIBUTING.md`**
   - Adding new vector operations
   - Adding new coordinate transformations
   - Performance guidelines

### 6. Logging Integration Example
```ts
const v1 = new Vector3(new Newtons(10), ...);
const result = v1.add(v2); // internally logs debug info if logger provided
```

The logger should be injectable (constructor param with default no-op or console-based in dev).

### 7. Acceptance Criteria

- All core classes compile under strict TypeScript.
- Seamless interoperability with `@flight-sim/units` (no raw `number` leakage in public API where a unit makes sense).
- Quaternion and rotation matrix conversions are accurate and well-documented.
- Vitest suite passes with high coverage.
- Documentation is complete and includes usage examples that could directly feed into a future 6DOF state integrator.
- Ready for use in the next layer (coordinate frames or basic rigid body).

---

This spec follows the same style and rigor as the units specification. It positions the math package as the critical bridge between raw units and full physics.

**Next after this package** would logically be:
- Coordinate Frames & Transformations package (or module inside math)
- Or a lightweight 6DOF State + Integrator

Would you like me to:
- Adjust any part of this spec?
- Provide starter code for `Vector3` (with units generic)?
- Write the monorepo config updates needed to add this package?
- Or move on to the spec for coordinate transformations?

Let me know how you'd like to proceed!