import type { SalesRecord, SlicerState } from '../types';

/**
 * Filter records by the slicer selection.
 * An empty selection on a dimension means "no filter" (show all) — Power BI style.
 */
export function filterRecords(records: SalesRecord[], slicers: SlicerState): SalesRecord[] {
  const { platforms, brands } = slicers;
  const platformSet = platforms.length ? new Set(platforms) : null;
  const brandSet = brands.length ? new Set(brands) : null;

  if (!platformSet && !brandSet) return records;

  return records.filter((r) => {
    if (platformSet && !platformSet.has(r.platform)) return false;
    if (brandSet && !brandSet.has(r.brand)) return false;
    return true;
  });
}
