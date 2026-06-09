'use client';

import { useMemo } from 'react';
import { Card } from '@/components/common/Card';
import { Spinner } from '@/components/common/Spinner';
import { KpiCardList } from '@/components/dashboard/KpiCards/KpiCardList';
import { SalesComboChart } from '@/components/dashboard/SalesChart/SalesComboChart';
import { SlicerPanel } from '@/components/dashboard/Slicers/SlicerPanel';
import { useSalesData } from '@/modules/dashboard/hooks/useSalesData';
import { useSlicers } from '@/modules/dashboard/hooks/useSlicers';
import { aggregateByHour } from '@/modules/dashboard/utils/aggregate';
import { filterRecords } from '@/modules/dashboard/utils/filter';
import { computeMeasures } from '@/modules/dashboard/utils/measures';

export default function DashboardPage() {
  const { data, loading, error } = useSalesData();
  const { slicers, toggle } = useSlicers();

  // Recompute everything from the filtered set whenever data or slicers change.
  const filtered = useMemo(() => filterRecords(data, slicers), [data, slicers]);
  const measures = useMemo(() => computeMeasures(filtered), [filtered]);
  const chartData = useMemo(() => aggregateByHour(filtered), [filtered]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-tiktok">
        <Spinner />
        <span className="ml-2 text-sm">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-red-600">
        <p className="font-medium">Không thể tải dữ liệu</p>
        <p className="mt-1 text-sm text-gray-600">{error}</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: KPI cards + slicers on one line (mockup layout). */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCardList measures={measures} />
        <SlicerPanel slicers={slicers} onToggle={toggle} />
      </div>

      {/* Combo chart, full width. */}
      <Card className="p-4">
        <SalesComboChart data={chartData} />
      </Card>
    </div>
  );
}
