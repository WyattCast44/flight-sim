const DEFAULT_DECIMALS = 2;

/**
 * Default string formatting for unit display (spec: 2 decimal places default).
 */
export function formatUnitValue(value: number, decimals: number = DEFAULT_DECIMALS): string {
  return value.toFixed(decimals);
}
