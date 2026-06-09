import { cn } from '@/lib/common/cn';

type CheckboxProps = {
  checked: boolean;
  label: string;
  className?: string;
};

/**
 * Presentational checkbox (the parent row owns click handling, including
 * Shift+click, so this is a non-interactive visual element).
 */
export function Checkbox({ checked, label, className }: CheckboxProps) {
  return (
    <span className={cn('flex items-center gap-2 select-none', className)}>
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border',
          checked ? 'border-tiktok bg-tiktok text-white' : 'border-gray-400 bg-white',
        )}
      >
        {checked && (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="truncate text-sm text-gray-800">{label}</span>
    </span>
  );
}
