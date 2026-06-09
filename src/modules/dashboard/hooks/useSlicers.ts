'use client';

import { useCallback, useState } from 'react';
import type { SlicerState } from '../types';

export type SlicerDimension = keyof SlicerState; // 'platforms' | 'brands'

const EMPTY: SlicerState = { platforms: [], brands: [] };

/**
 * Power BI-style slicer selection.
 *
 * - Plain click on a value: select ONLY that value (replace previous selection).
 *   Clicking the value that is already the sole selection clears it (back to "all").
 * - CTRL (or CMD on Mac) + click: toggle the value in/out of the multi-selection.
 * - Empty selection on a dimension = no filter (show all).
 */
export function useSlicers() {
  const [slicers, setSlicers] = useState<SlicerState>(EMPTY);

  const toggle = useCallback((dimension: SlicerDimension, value: string, multi: boolean) => {
    setSlicers((prev) => {
      const current = prev[dimension];
      const has = current.includes(value);

      let next: string[];
      if (multi) {
        // Add/remove from the multi-selection.
        next = has ? current.filter((v) => v !== value) : [...current, value];
      } else {
        // Plain click: replace with just this value, or clear if it was the
        // only selected one (toggle the single selection off).
        next = has && current.length === 1 ? [] : [value];
      }

      return { ...prev, [dimension]: next };
    });
  }, []);

  const clear = useCallback((dimension: SlicerDimension) => {
    setSlicers((prev) => ({ ...prev, [dimension]: [] }));
  }, []);

  return { slicers, toggle, clear };
}
