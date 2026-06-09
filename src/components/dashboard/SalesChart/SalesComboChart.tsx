'use client';

import {
  Bar,
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

export function SalesComboChart({ data }: { data: ChartPoint[] }) {
  return (
    <div className="flex h-[420px] flex-col">
      <div className="mb-2">
        <h2 className="text-sm font-semibold text-gray-800">GMV and Gross Orders</h2>
        <ChartLegend />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
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
            <Bar
              key={platform}
              yAxisId="gmv"
              dataKey={platform}
              name={platform}
              fill={PLATFORM_COLORS[platform]}
              maxBarSize={14}
            />
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
