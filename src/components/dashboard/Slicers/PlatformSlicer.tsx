'use client';

import { PLATFORMS } from '@/constants/data.constants';
import { SlicerItem } from './SlicerItem';

type PlatformSlicerProps = {
  selected: string[];
  onToggle: (value: string, shiftKey: boolean) => void;
};

export function PlatformSlicer({ selected, onToggle }: PlatformSlicerProps) {
  const selectedSet = new Set(selected);
  return (
    <div className="flex flex-col">
      <span className="mb-1 text-sm font-semibold text-gray-700">Platform</span>
      <div className="flex flex-col gap-0.5">
        {PLATFORMS.map((platform) => (
          <SlicerItem
            key={platform}
            value={platform}
            selected={selectedSet.has(platform)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
