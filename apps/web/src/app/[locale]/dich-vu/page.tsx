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
    description: 'Dịch vụ New Sky đồng hành cùng nhà đầu tư nhà hàng từ mặt bằng, thiết kế, thi công, bếp inox, nội thất đến biển hiệu.',
    alternates: getLocalizedAlternates(locale, '/dich-vu'),
  };
}

export default async function ServicesHubPage({params}: ServicesHubPageProps) {
  const {locale} = await params;

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ New Sky"
        title="Dịch vụ đồng hành cùng nhà đầu tư nhà hàng"
        description="New Sky triển khai các hạng mục trọng yếu để chủ đầu tư có một đầu mối rõ trách nhiệm từ mặt bằng đến ngày quán vận hành."
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
