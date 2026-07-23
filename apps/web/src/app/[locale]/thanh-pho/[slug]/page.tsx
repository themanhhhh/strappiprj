import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ButtonLink} from '@/components/button-link';
import {PageHero} from '@/components/page-hero';
import {cityPresence, getCityPresence} from '@/lib/city-presence';
import {getCityBrandSummary, getCityRestaurants, getCityStaticParams} from '@/lib/city-restaurants';
import {getLocalizedAlternates} from '@/lib/seo';

type CityPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return getCityStaticParams();
}

export async function generateMetadata({params}: CityPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const city = getCityPresence(slug);
  if (!city) return {};

  const restaurants = getCityRestaurants(slug);
  const title = `${city.city} - Cơ sở đã triển khai | New Sky`;
  const description = `Danh sách ${restaurants.length} cơ sở nhà hàng trong hệ thống Aladdin đã triển khai tại ${city.city}.`;

  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, `/thanh-pho/${slug}`),
    openGraph: {
      title,
      description,
      url: `/${locale}/thanh-pho/${slug}`,
    },
  };
}

export default async function CityPage({params}: CityPageProps) {
  const {locale, slug} = await params;
  const city = getCityPresence(slug);
  if (!city) notFound();

  const restaurants = getCityRestaurants(slug);
  const brandSummary = getCityBrandSummary(restaurants);

  return (
    <>
      <PageHero
        eyebrow="Khu vực đã triển khai"
        title={`Các cơ sở New Sky đã triển khai tại ${city.city}`}
        description={`${restaurants.length} cơ sở nhà hàng trong hệ thống Aladdin đã khai trương tại ${city.city}, theo dữ liệu dự án cập nhật 13/06/2026.`}
        actions={
          <div className="button-row">
            <ButtonLink href={`/${locale}/du-an`} variant="primary">Xem toàn bộ dự án</ButtonLink>
            <ButtonLink href={`/${locale}/lien-he`} variant="secondary">Liên hệ New Sky</ButtonLink>
          </div>
        }
      />

      <section className="section-block">
        <div className="shell page-stack">
          <div className="tile-grid">
            <article className="info-card">
              <p className="tile-meta">Tổng số cơ sở</p>
              <h2>{restaurants.length}</h2>
              <p>Các nhà hàng đã khai trương và được ghi nhận trong dữ liệu dự án hệ thống Aladdin.</p>
            </article>
            <article className="info-card">
              <p className="tile-meta">Khu vực</p>
              <h2>{city.city}</h2>
              <p>{city.info}</p>
            </article>
          </div>

          <div className="tile-grid">
            {brandSummary.map((item) => (
              <article key={item.brand} className="info-card">
                <p className="tile-meta">Thương hiệu</p>
                <h2>{item.brand}</h2>
                <p>{item.count} cơ sở</p>
              </article>
            ))}
          </div>

          <div className="city-project-table-wrap">
            <table className="city-project-table">
              <caption>Danh sách cơ sở tại {city.city}</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thương hiệu</th>
                  <th>Địa chỉ</th>
                  <th>Năm khai trương</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={`${restaurant.index}-${restaurant.brand}-${restaurant.address}`}>
                    <td>{restaurant.index}</td>
                    <td>{restaurant.brand.replace(/ \*\(đã dừng\)\*/g, ' (đã dừng)')}</td>
                    <td>{restaurant.address}</td>
                    <td>{restaurant.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tile-grid">
            {cityPresence.map((item) => (
              <ButtonLink
                key={item.slug}
                href={`/${locale}/thanh-pho/${item.slug}`}
                variant={item.slug === slug ? 'primary' : 'secondary'}
                className="city-nav-button"
              >
                {item.city}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
