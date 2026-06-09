import { formatCompact, formatDecimal } from '@/lib/common/format';

/** Keys of the computed dashboard measures (see modules/dashboard/utils/measures.ts). */
export type MeasureKey = 'totalGmv' | 'grossOrders' | 'aov';

export type KpiDefinition = {
  key: MeasureKey;
  label: string;
  /** Render the left yellow accent border (first card in the mockup). */
  accent?: boolean;
  format: (value: number) => string;
};

/**
 * Single source of truth for app chrome + theme + KPI list.
 * UI reads everything from here instead of hardcoding strings/colors.
 */
export const appConfig = {
  appName: 'Real-Time Sales',
  logo: '📊',
  header: {
    title: 'Real-Time Sales Dashboard',
  },
  /** Excel source (relative to project root). Sheet read is fixed to "Real-Time Data". */
  data: {
    fileName: 'real_time_sales_with_platform.xlsx',
    sheetName: 'Real-Time Data',
  },
  theme: {
    background: '#FBF4D8',
    card: '#FFFFFF',
    accent: '#EFC000',
  },
  kpis: [
    {
      key: 'totalGmv',
      label: 'Total GMV',
      accent: true,
      format: formatCompact,
    },
    {
      key: 'grossOrders',
      label: 'Gross Orders',
      format: formatCompact,
    },
    {
      key: 'aov',
      label: 'AOV',
      format: formatDecimal,
    },
  ] satisfies KpiDefinition[],
} as const;
