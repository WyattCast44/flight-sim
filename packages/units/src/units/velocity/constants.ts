/** NIST / international foot definitions. */
export const METERS_PER_FOOT = 0.3048;
export const METERS_PER_SECOND_PER_FOOT_PER_SECOND = METERS_PER_FOOT;

/** 1 kt = 1 NM / h = 1852 m / 3600 s */
export const METERS_PER_SECOND_PER_KNOT = 1852 / 3600;

/** 1 mph = 5280 ft / 3600 s */
export const METERS_PER_SECOND_PER_MPH = (5280 * METERS_PER_FOOT) / 3600;

/** 1 km/h = 1000 m / 3600 s */
export const METERS_PER_SECOND_PER_KMH = 1000 / 3600;

/** 1 ft/min */
export const METERS_PER_SECOND_PER_FPM = METERS_PER_FOOT / 60;
