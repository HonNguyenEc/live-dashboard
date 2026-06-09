'use client';

import {
  Bar,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GROSS_ORDERS_COLOR, PLATFORM_COLORS, PLATFORMS } from '@/constants/data.constants';
import { formatCompact, formatNumber } from '@/lib/common/format';
import type { ChartPoint } from '@/modules/dashboard/types';
import { ChartLegend } from './ChartLegend';

/** '00:00' -> '12:00 AM', '15:00' -> '3:00 PM'. */
function formatHourLabel(hour: string): string {
  const h = Number(hour.slice(0, 2));
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:00 ${period}`;
}

type SalesComboChartProps = {
  data: ChartPoint[];
  /** Currently cross-filtered hour, or null when none. */
  selectedHour: string | null;
  /** Fired when a column (hour) is clicked; toggles the cross-filter. */
  onSelectHour: (hour: string) => void;
};

export function SalesComboChart({ data, selectedHour, onSelectHour }: SalesComboChartProps) {
  // Dim the bars of non-selected hours so the active hour stands out.
  const opacityFor = (hour: string) => (selectedHour && hour !== selectedHour ? 0.25 : 1);

  return (
    <div className="flex h-[420px] flex-col">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">GMV and Gross Orders</h2>
          <ChartLegend />
        </div>
        {selectedHour && (
          <button
            type="button"
            onClick={() => onSelectHour(selectedHour)}
            className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-tiktok hover:bg-accent/30"
          >
            Đang lọc: {formatHourLabel(selectedHour)} ✕
          </button>
        )}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 8, left: 0 }}
          // Chart-level click: Recharts exposes the clicked category as activeLabel.
          onClick={(state) => {
            const hour = (state as { activeLabel?: string } | null)?.activeLabel;
            if (hour) onSelectHour(hour);
          }}
          className="cursor-pointer"
        >
          <XAxis
            dataKey="hour"
            tickFormatter={formatHourLabel}
            // Show a label every 3rd hour (12:00 AM, 3:00 AM, ...), like the mockup.
            interval={2}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            label={{ value: 'Timestamp', position: 'insideBottom', offset: -4, fontSize: 11 }}
          />
          {/* Left axis: clustered GMV bars per platform. */}
          <YAxis
            yAxisId="gmv"
            tickFormatter={(v: number) => formatCompact(v)}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Total GMV', angle: -90, position: 'insideLeft', fontSize: 11 }}
          />
          {/* Right axis: Gross Orders line. */}
          <YAxis
            yAxisId="orders"
            orientation="right"
            tickFormatter={(v: number) => formatCompact(v)}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Gross Orders', angle: 90, position: 'insideRight', fontSize: 11 }}
          />
          <Tooltip
            labelFormatter={(label: string) => formatHourLabel(label)}
            formatter={(value: number, name: string) => [formatNumber(value), name]}
          />

          {PLATFORMS.map((platform) => (
            <Bar key={platform} yAxisId="gmv" dataKey={platform} name={platform} maxBarSize={14}>
              {/* Per-cell so we can dim non-selected hours on cross-filter. */}
              {data.map((point) => (
                <Cell
                  key={point.hour}
                  fill={PLATFORM_COLORS[platform]}
                  fillOpacity={opacityFor(point.hour)}
                />
              ))}
            </Bar>
          ))}

          <Line
            yAxisId="orders"
            type="monotone"
            dataKey="grossOrders"
            name="Gross Orders"
            stroke={GROSS_ORDERS_COLOR}
            strokeWidth={2}
            dot={{ r: 3, fill: GROSS_ORDERS_COLOR }}
          >
            {/* Data label (bullet) at each Gross Orders point. */}
            <LabelList
              dataKey="grossOrders"
              position="top"
              formatter={(v: number) => formatCompact(v)}
              style={{ fontSize: 10, fill: '#5b7a8c' }}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
