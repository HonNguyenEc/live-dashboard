'use client';

import { useMemo, useState } from 'react';
import { BRANDS } from '@/constants/data.constants';
import { SlicerItem } from './SlicerItem';

type BrandSlicerProps = {
  selected: string[];
  onToggle: (value: string, multi: boolean) => void;
};

export function BrandSlicer({ selected, onToggle }: BrandSlicerProps) {
  const [search, setSearch] = useState('');
  const selectedSet = new Set(selected);

  const visibleBrands = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return BRANDS;
    return BRANDS.filter((b) => b.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col">
      <span className="mb-1 text-sm font-semibold text-gray-700">Brand</span>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="mb-1 w-full rounded border border-gray-300 px-2 py-1 text-sm outline-none focus:border-accent"
      />
      <div className="flex max-h-28 flex-col gap-0.5 overflow-y-auto">
        {visibleBrands.map((brand) => (
          <SlicerItem
            key={brand}
            value={brand}
            selected={selectedSet.has(brand)}
            onToggle={onToggle}
          />
        ))}
        {visibleBrands.length === 0 && (
          <span className="px-2 py-1 text-sm text-gray-400">Không có brand</span>
        )}
      </div>
    </div>
  );
}
