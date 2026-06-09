import type { Measures, SalesRecord } from '../types';

/**
 * Compute the three KPI measures over an already-filtered record set.
 * - Total GMV   = SUM(gmv)
 * - Gross Orders = SUM(gross_order)
 * - AOV          = Total GMV / Gross Orders (divide-by-zero -> 0)
 */
export function computeMeasures(records: SalesRecord[]): Measures {
  let totalGmv = 0;
  let grossOrders = 0;

  for (const r of records) {
    totalGmv += r.gmv;
    grossOrders += r.gross_order;
  }

  const aov = grossOrders === 0 ? 0 : totalGmv / grossOrders;
  return { totalGmv, grossOrders, aov };
}
