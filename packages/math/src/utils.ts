export function degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function radToDeg(radians: number): number {
    return radians * 180 / Math.PI;
}

export function round(value: number, precision: number = 2): number {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function isApproximatelyZero(value: number, epsilon: number = 1e-8): boolean {
    return Math.abs(value) < epsilon;
}