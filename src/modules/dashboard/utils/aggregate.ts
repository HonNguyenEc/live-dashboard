import { PLATFORMS } from '@/constants/data.constants';
import type { ChartPoint, SalesRecord } from '../types';

/** Build the full 00:00..23:00 hour axis (24 slots). */
function buildHourAxis(): string[] {
  return Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, '0')}:00`);
}

/**
 * Group filtered records by hour into chart points.
 * Each point carries GMV summed per platform (clustered bars, left axis) and
 * total gross orders for the hour (line, right axis).
 *
 * Every hour 00:00..23:00 is emitted (zero-filled) so the X axis is continuous
 * even when a slicer removes some hours.
 */
export function aggregateByHour(records: SalesRecord[]): ChartPoint[] {
  const byHour = new Map<string, ChartPoint>();

  for (const hour of buildHourAxis()) {
    byHour.set(hour, { hour, Lazada: 0, Shopee: 0, Tiktok: 0, grossOrders: 0 });
  }

  for (const r of records) {
    const point = byHour.get(r.hour);
    if (!point) continue; // ignore rows with an unexpected hour value
    point[r.platform] += r.gmv;
    point.grossOrders += r.gross_order;
  }

  return buildHourAxis().map((hour) => byHour.get(hour) as ChartPoint);
}

/** Platform series keys present on a ChartPoint (for rendering bars/legend). */
export const PLATFORM_SERIES = PLATFORMS;
