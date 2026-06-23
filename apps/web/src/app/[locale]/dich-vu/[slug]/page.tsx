import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ButtonLink} from '@/components/button-link';
import {PageHero} from '@/components/page-hero';
import {getServiceHub, serviceHubs} from '@/lib/service-hubs';
import {getLocalizedAlternates, siteUrl} from '@/lib/seo';

type ServiceHubDetailProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return serviceHubs.map((hub) => ({slug: hub.slug}));
}

export async function generateMetadata({params}: ServiceHubDetailProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const hub = getServiceHub(slug);
  if (!hub) return {};

  return {
    title: `${hub.title} - New Sky`,
    description: hub.description,
    alternates: getLocalizedAlternates(locale, `/dich-vu/${slug}`),
  };
}

export default async function ServiceHubDetailPage({params}: ServiceHubDetailProps) {
  const {locale, slug} = await params;
  const hub = getServiceHub(slug);
  if (!hub) notFound();

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: hub.title,
    description: hub.description,
    provider: {
      '@type': 'Organization',
      name: 'New Sky',
      url: siteUrl,
    },
    areaServed: 'Vietnam',
    serviceType: hub.keyword,
    url: `${siteUrl}/${locale}/dich-vu/${hub.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${siteUrl}/${locale}`},
      {'@type': 'ListItem', position: 2, name: 'Dịch vụ', item: `${siteUrl}/${locale}/dich-vu`},
      {'@type': 'ListItem', position: 3, name: hub.title, item: `${siteUrl}/${locale}/dich-vu/${hub.slug}`},
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}} />
      <PageHero
        eyebrow="Dịch vụ New Sky"
        title={hub.title}
        description={hub.description}
        actions={
          <div className="button-row">
            <ButtonLink href={`/${locale}/lien-he`} variant="primary">Trao đổi nhu cầu</ButtonLink>
            <ButtonLink href={`/${locale}/du-an`} variant="secondary">Xem dự án</ButtonLink>
          </div>
        }
      />
      <section className="section-block">
        <div className="shell">
          <div className="tile-grid">
            {hub.scope.map((item, index) => (
              <article key={item} className="info-card">
                <p className="tile-meta">{String(index + 1).padStart(2, '0')}</p>
                <h2>{item}</h2>
                <p>Hạng mục thuộc phạm vi {hub.title.toLowerCase()} của New Sky.</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
