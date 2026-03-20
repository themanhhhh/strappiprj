'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useCallback} from 'react';

type FilterBarProps = {
  label: string;
  /** Static fallback items (dùng khi Strapi chưa có data) */
  items?: Array<{label: string; value?: string}>;
  /** Danh sách categories động từ Strapi */
  categories?: string[];
  /** URL search param key, mặc định là 'category' */
  paramKey?: string;
};

export function FilterBar({
  label,
  items,
  categories,
  paramKey = 'category',
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeValue = searchParams.get(paramKey) ?? '';

  const handleClick = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, value);
      }
      const query = params.toString();
      router.push(`?${query}`, {scroll: false});
    },
    [router, searchParams, paramKey],
  );

  // Build chip list: ưu tiên categories động từ Strapi, fallback về items tĩnh
  const chips: Array<{label: string; value: string}> = [];

  if (categories && categories.length > 0) {
    chips.push({label: 'Tất cả', value: ''});
    categories.forEach((cat) => chips.push({label: cat, value: cat}));
  } else if (items) {
    chips.push({label: 'Tất cả', value: ''});
    items.forEach((item) =>
      chips.push({label: item.label, value: item.value ?? item.label}),
    );
  }

  return (
    <div className="filter-bar" aria-label={label}>
      <span className="filter-label">{label}</span>
      {chips.map((chip) => {
        const isActive =
          chip.value === '' ? activeValue === '' : activeValue === chip.value;
        return (
          <button
            key={chip.value || '__all__'}
            type="button"
            className={`chip${isActive ? ' chip-active' : ''}`}
            onClick={() => handleClick(chip.value)}
            aria-pressed={isActive}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
