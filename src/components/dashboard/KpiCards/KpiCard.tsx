import { Card } from '@/components/common/Card';

type KpiCardProps = {
  label: string;
  value: string;
  accent?: boolean;
};

export function KpiCard({ label, value, accent }: KpiCardProps) {
  return (
    <Card accent={accent} className="flex flex-col items-center justify-center px-4 py-5">
      <span className="text-sm font-semibold uppercase tracking-wide text-gray-700">{label}</span>
      <span className="mt-1 text-3xl font-bold text-tiktok">{value}</span>
    </Card>
  );
}
