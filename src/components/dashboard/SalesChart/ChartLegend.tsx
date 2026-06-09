import { GROSS_ORDERS_COLOR, PLATFORM_COLORS, PLATFORMS } from '@/constants/data.constants';

/** Legend: one swatch per platform (bars) plus the Gross Orders line. */
export function ChartLegend() {
  const items = [
    ...PLATFORMS.map((p) => ({ label: p, color: PLATFORM_COLORS[p], line: false })),
    { label: 'Gross Orders', color: GROSS_ORDERS_COLOR, line: true },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 px-1 text-xs text-gray-600">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-sm"
            style={{
              backgroundColor: item.color,
              width: item.line ? 14 : 10,
              height: item.line ? 3 : 10,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
