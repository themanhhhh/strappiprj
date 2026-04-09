import Link from 'next/link';
import {ButtonLink} from '@/components/button-link';

type Brand = {
  name: string;
  tag: string;
  description: string;
  slug?: string;
  coverUrl?: string | null;
};

type BrandGridProps = {
  locale: string;
  title: string;
  brands: Brand[];
};

export function BrandGrid({locale, title, brands}: BrandGridProps) {
  const visibleBrands = brands.slice(0, 6);

  return (
    <section className="aladdin-section aladdin-brand-section">
      <div className="shell">
        <h2 className="section-title-center">{title}</h2>

        <div className="aladdin-brand-grid">
          {visibleBrands.map((brand) => (
            <Link
              href={brand.slug ? `/${locale}/projects/${brand.slug}` : `/${locale}/projects`}
              key={brand.name}
              className="aladdin-brand-card"
            >
              <div className="brand-card-image">
                {brand.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.coverUrl}
                    alt={brand.name}
                    className="brand-card-img"
                  />
                ) : (
                  <div className="image-placeholder" />
                )}
              </div>
              <div className="brand-card-content">
                <p className="brand-tag">{brand.tag}</p>
                <h3 className="brand-name">{brand.name}</h3>
                <p className="brand-desc">{brand.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="button-row" style={{justifyContent: 'center', marginTop: '40px'}}>
          <ButtonLink href={`/${locale}/projects`} variant="secondary">
            {locale === 'vi' ? 'Xem thêm' : 'See more'}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
