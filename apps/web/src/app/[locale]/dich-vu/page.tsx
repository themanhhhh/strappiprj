import type {Metadata} from 'next';
import Link from 'next/link';
import {PageHero} from '@/components/page-hero';
import {serviceHubs} from '@/lib/service-hubs';
import {getLocalizedAlternates} from '@/lib/seo';

type ServicesHubPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: ServicesHubPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: 'Dịch vụ thiết kế và thi công nhà hàng - New Sky',
    description: '4 hub dịch vụ của New Sky: thiết kế thi công nhà hàng trọn gói, bếp công nghiệp inox, biển hiệu F&B và nội thất F&B.',
    alternates: getLocalizedAlternates(locale, '/dich-vu'),
  };
}

export default async function ServicesHubPage({params}: ServicesHubPageProps) {
  const {locale} = await params;

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ New Sky"
        title="4 hub dịch vụ cho nhà hàng F&B"
        description="New Sky tổ chức dịch vụ theo 4 hub SEO chính, trong đó gói thiết kế thi công nhà hàng trọn gói là trụ định vị ưu tiên cao nhất."
      />
      <section className="section-block">
        <div className="shell tile-grid">
          {serviceHubs.map((hub, index) => (
            <Link key={hub.slug} href={`/${locale}/dich-vu/${hub.slug}`} className="info-card">
              <p className="tile-meta">{String(index + 1).padStart(2, '0')} / {hub.keyword}</p>
              <h2>{hub.title}</h2>
              <p>{hub.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
