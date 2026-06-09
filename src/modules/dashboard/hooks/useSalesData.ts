'use client';

import { useEffect, useState } from 'react';
import type { SalesRecord } from '../types';

type State = {
  data: SalesRecord[];
  loading: boolean;
  error: string | null;
};

/**
 * Fetch the full sales dataset once from /api/sales and hold it in state.
 * All filtering/aggregation happens client-side for instant slicer response.
 */
export function useSalesData(): State {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/sales');
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = (await res.json()) as SalesRecord[];
        if (!cancelled) setState({ data, loading: false, error: null });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load data';
        if (!cancelled) setState({ data: [], loading: false, error: message });
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
