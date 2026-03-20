import Link from 'next/link';

type Brand = {
  name: string;
  tag: string;
  description: string;
  slug?: string;
  coverUrl?: string | null;
  logoUrl?: string | null;
};

type EcosystemBrandsProps = {
  locale: string;
  title: string;
  description: string;
  brands: Brand[];
};

export function EcosystemBrands({locale, title, description, brands}: EcosystemBrandsProps) {
  return (
    <section className="aladdin-section ecosystem-brands-section" style={{backgroundColor: '#fff', padding: '100px 0'}}>
      <div className="shell">
        <div className="ecosystem-top-row" style={{display: 'flex', flexWrap: 'wrap', gap: '48px', marginBottom: '80px', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <div className="ecosystem-title-block" style={{flex: '1 1 300px', maxWidth: '400px'}}>
            <h2 style={{fontSize: '32px', color: '#111', marginBottom: '32px', fontWeight: 600, lineHeight: 1.3}}>
              {title}
            </h2>
            <Link
              href={`/${locale}/projects`}
              className="ecosystem-btn"
            >
              {locale === 'vi' ? 'Xem thêm' : 'See more'}
            </Link>
          </div>
          <div className="ecosystem-desc-block" style={{flex: '1 1 500px', maxWidth: '700px'}}>
            <p style={{fontSize: '16px', color: '#444', lineHeight: 1.8, fontWeight: 400}}>
              {description}
            </p>
          </div>
        </div>

        <div className="partner-slider tk-ani">
          <div className="partner-swiper">
            <div className="partner-swiper-wrapper">
              {/* Nhân bản mảng 3 lần để tạo cảm giác scroll vô cực */}
              {[...brands, ...brands, ...brands].map((brand, i) => (
                <Link
                  href={brand.slug ? `/${locale}/projects/${brand.slug}` : `/${locale}/projects`}
                  key={`${brand.name}-${i}`}
                  className="ecosystem-logo"
                >
                  {brand.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                    />
                  ) : brand.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.coverUrl}
                      alt={brand.name}
                    />
                  ) : (
                    <span style={{color: '#666', fontWeight: 600, fontSize: '18px', textAlign: 'center'}}>{brand.name}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
