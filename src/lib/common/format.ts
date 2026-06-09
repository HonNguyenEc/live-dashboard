/** Shared number formatting helpers. */

/**
 * Compact format with K / M suffix, e.g. 7_240_000 -> "7.24M", 59_000 -> "59K".
 * Values under 1000 are shown as-is. Trailing ".00" is trimmed.
 */
export function formatCompact(value: number): string {
  if (!Number.isFinite(value)) return '0';
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return trimZeros(value / 1_000_000) + 'M';
  if (abs >= 1_000) return trimZeros(value / 1_000) + 'K';
  return trimZeros(value);
}

/** Two-decimal fixed format, e.g. 122.853 -> "122.85" (used for AOV). */
export function formatDecimal(value: number): string {
  if (!Number.isFinite(value)) return '0.00';
  return value.toFixed(2);
}

/** Thousands-separated integer, e.g. 59000 -> "59,000". */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return Math.round(value).toLocaleString('en-US');
}

/** Round to at most 2 decimals and drop a trailing ".00" / ".x0". */
function trimZeros(value: number): string {
  return value
    .toFixed(2)
    .replace(/\.00$/, '')
    .replace(/(\.\d)0$/, '$1');
}
