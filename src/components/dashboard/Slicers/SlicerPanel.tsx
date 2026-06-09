'use client';

import { Card } from '@/components/common/Card';
import type { SlicerDimension } from '@/modules/dashboard/hooks/useSlicers';
import type { SlicerState } from '@/modules/dashboard/types';
import { BrandSlicer } from './BrandSlicer';
import { PlatformSlicer } from './PlatformSlicer';

type SlicerPanelProps = {
  slicers: SlicerState;
  onToggle: (dimension: SlicerDimension, value: string, multi: boolean) => void;
};

/**
 * Platform + Brand slicers. Tip: click = single select, Ctrl+click = multi.
 */
export function SlicerPanel({ slicers, onToggle }: SlicerPanelProps) {
  return (
    <>
      <Card className="px-3 py-3">
        <PlatformSlicer
          selected={slicers.platforms}
          onToggle={(value, multi) => onToggle('platforms', value, multi)}
        />
      </Card>
      <Card className="px-3 py-3">
        <BrandSlicer
          selected={slicers.brands}
          onToggle={(value, multi) => onToggle('brands', value, multi)}
        />
      </Card>
    </>
  );
}
