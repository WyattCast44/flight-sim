const RAD_PER_DEG = Math.PI / 180;
const DEG_PER_RAD = 180 / Math.PI;

/** Mathematical CCW degrees → radians. */
export function mathDegreesToRadians(deg: number): number {
  return deg * RAD_PER_DEG;
}

/** Radians → mathematical CCW degrees. */
export function mathRadiansToDegrees(rad: number): number {
  return rad * DEG_PER_RAD;
}

/**
 * Compass bearing clockwise from north (degrees) in (0, 360], 360 = North.
 * Handles multi-turn inputs.
 */
export function normalizeCardinal1to360(degCw: number): number {
  let x = degCw % 360;
  if (x <= 0) {
    x += 360;
  }
  return x === 0 ? 360 : x;
}

/** Cardinal degrees (1–360, CW from north) → mathematical radians (CCW from +x, East = 0). */
export function cardinalDegreesToRadians(cardinal: number): number {
  return Math.PI / 2 - cardinal * RAD_PER_DEG;
}

/** Mathematical radians → cardinal degrees (1–360). */
export function radiansToCardinalDegrees(rad: number): number {
  const mathDeg = mathRadiansToDegrees(rad);
  return normalizeCardinal1to360(90 - mathDeg);
}

/** Clockwise degrees from north (any real) → mathematical radians (principal direction). */
export function bearingClockwiseDegreesToRadians(bearingCw: number): number {
  const cardinal = normalizeCardinal1to360(bearingCw);
  return cardinalDegreesToRadians(cardinal);
}

/** Mathematical radians → clockwise bearing (principal, not wrapped). */
export function radiansToClockwiseBearingDegrees(rad: number): number {
  const mathDeg = mathRadiansToDegrees(rad);
  return 90 - mathDeg;
}
