/** Exact US gallon definition: 231 in³. */
export const LITERS_PER_CUBIC_METER = 1000;
export const CUBIC_METERS_PER_LITER = 0.001;

const METERS_PER_FOOT = 0.3048;
const CUBIC_METERS_PER_CUBIC_FOOT = METERS_PER_FOOT ** 3;

/** US gallon to m³: (231 / 1728) ft³ */
export const CUBIC_METERS_PER_US_GALLON = (231 / 1728) * CUBIC_METERS_PER_CUBIC_FOOT;

export { CUBIC_METERS_PER_CUBIC_FOOT };
