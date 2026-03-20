'use client';

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';

export type BrandItem = {
  slug: string;
  title: string;
  description: string;
  meta?: string;
  brand?: string; // brand/category tab label
  coverUrl?: string | null;
  publishedAt?: string | null;
};

type BrandListProps = {
  locale: string;
  items: BrandItem[];
  /** Danh sách tabs (thương hiệu / categories). null = không có filter */
  brands: string[] | null;
};

function formatDate(dateStr: string | null | undefined, locale: string) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Hook: observe children of a container and add `brand-row-visible`
 * class when they scroll into view.
 */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('brand-row-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.15},
    );

    const rows = container.querySelectorAll('.brand-row');
    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  });

  return containerRef;
}

export function BrandList({locale, items, brands}: BrandListProps) {
  const [activeTab, setActiveTab] = useState<string>('');
  const bodyRef = useScrollReveal();

  const filtered =
    activeTab && brands
      ? items.filter((item) => item.brand === activeTab || item.meta === activeTab)
      : items;

  return (
    <div className="brand-list">
      {/* Tab navigation – thương hiệu */}
      {brands && brands.length > 0 && (
        <nav className="brand-tabs" aria-label={locale === 'vi' ? 'Lọc theo thương hiệu' : 'Filter by brand'}>
          <button
            type="button"
            className={`brand-tab${activeTab === '' ? ' brand-tab-active' : ''}`}
            onClick={() => setActiveTab('')}
          >
            {locale === 'vi' ? 'Tất cả' : 'All'}
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              className={`brand-tab${activeTab === brand ? ' brand-tab-active' : ''}`}
              onClick={() => setActiveTab(brand)}
            >
              {brand}
            </button>
          ))}
        </nav>
      )}

      {/* Danh sách rows – alternating layout */}
      <div className="brand-list-body" ref={bodyRef}>
        {filtered.length === 0 ? (
          <p className="brand-list-empty">
            {locale === 'vi' ? 'Không có dự án trong danh mục này.' : 'No projects in this category.'}
          </p>
        ) : (
          filtered.map((item, index) => (
            <Link
              key={item.slug}
              href={`/${locale}/projects/${item.slug}`}
              className={`brand-row${index % 2 === 1 ? ' brand-row-reverse' : ''}`}
            >
              {/* Ảnh thumbnail */}
              <div className="brand-row-thumb">
                {item.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="brand-row-img"
                  />
                ) : (
                  <div className="brand-row-img brand-row-placeholder" />
                )}
              </div>

              {/* Nội dung */}
              <div className="brand-row-content">
                <p className="brand-row-meta">
                  {item.meta ?? item.brand ?? ''}
                  {item.publishedAt && (
                    <span className="brand-row-date">
                      {' '}— {formatDate(item.publishedAt, locale)}
                    </span>
                  )}
                </p>
                <h3 className="brand-row-title">{item.title}</h3>
                <p className="brand-row-desc">{item.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
