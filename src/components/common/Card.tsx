import type { ReactNode } from 'react';
import { cn } from '@/lib/common/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Render a yellow accent border on the left edge (mockup KPI card). */
  accent?: boolean;
};

export function Card({ children, className, accent = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-white shadow-sm ring-1 ring-black/5',
        accent && 'border-l-4 border-accent',
        className,
      )}
    >
      {children}
    </div>
  );
}
