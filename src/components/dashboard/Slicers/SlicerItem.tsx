'use client';

import { Checkbox } from '@/components/common/Checkbox';
import { cn } from '@/lib/common/cn';

type SlicerItemProps = {
  value: string;
  selected: boolean;
  onToggle: (value: string, shiftKey: boolean) => void;
};

export function SlicerItem({ value, selected, onToggle }: SlicerItemProps) {
  return (
    <button
      type="button"
      // Pass shiftKey through so the hook can do single vs multi selection.
      onClick={(e) => onToggle(value, e.shiftKey)}
      className={cn(
        'flex w-full items-center rounded px-2 py-1 text-left hover:bg-black/5',
        selected && 'bg-accent/15',
      )}
    >
      <Checkbox checked={selected} label={value} />
    </button>
  );
}
