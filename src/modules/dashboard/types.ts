import type { Platform } from '@/constants/data.constants';

/** One row from the Excel "Real-Time Data" sheet. */
export type SalesRecord = {
  platform: Platform;
  brand: string;
  created_date: string; // e.g. '2026-06-06'
  hour: string; // '00:00' ... '23:00'
  gmv: number;
  gross_order: number;
};

/**
 * Slicer selection. Empty array = no filter on that dimension (show all),
 * matching Power BI behavior.
 */
export type SlicerState = {
  platforms: string[];
  brands: string[];
};

/** Computed KPI values over the filtered dataset. */
export type Measures = {
  totalGmv: number;
  grossOrders: number;
  aov: number;
};

/**
 * One point on the X axis (an hour). Holds GMV split per platform (clustered
 * bars on the left axis) plus total gross orders (line on the right axis).
 */
export type ChartPoint = {
  hour: string; // '00:00' ... '23:00'
  Lazada: number;
  Shopee: number;
  Tiktok: number;
  grossOrders: number;
};
