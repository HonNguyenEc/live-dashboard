import { appConfig } from '@/config/app.config';
import type { Measures } from '@/modules/dashboard/types';
import { KpiCard } from './KpiCard';

/**
 * Render KPI cards from the config-driven definitions. The card count is
 * flexible — add/remove entries in appConfig.kpis to change it.
 */
export function KpiCardList({ measures }: { measures: Measures }) {
  return (
    <>
      {appConfig.kpis.map((kpi) => (
        <KpiCard
          key={kpi.key}
          label={kpi.label}
          value={kpi.format(measures[kpi.key])}
          accent={kpi.accent}
        />
      ))}
    </>
  );
}
