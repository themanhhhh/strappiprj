import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {InfoCard} from '@/components/info-card';
import {PageHero} from '@/components/page-hero';
import {SectionIntro} from '@/components/section-intro';
import {getJobs, getHeroSlides} from '@/lib/strapi/queries';
import {jobs as catalogJobs} from '@/lib/catalog';

type CareersPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: CareersPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Tuyển dụng — Đội ngũ ALADDIN JSC' : 'Careers — Join ALADDIN JSC',
    description: locale === 'vi'
      ? 'Khám phá các vị trí tuyển dụng tại ALADDIN JSC. Phát triển con người cùng tốc độ mở rộng hệ thống.'
      : 'Explore open positions at ALADDIN JSC and grow with our expanding F&B ecosystem.',
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export default async function CareersPage({params}: CareersPageProps) {
  const {locale} = await params;

  // Fetch từ Strapi; nếu Strapi chưa có data thì fallback về catalog
  const [strapiJobs, heroSlides] = await Promise.all([
    getJobs(locale),
    getHeroSlides(locale, 'careers'),
  ]);
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));
  const displayJobs =
    strapiJobs.length > 0
      ? strapiJobs.map((j) => ({
          slug: j.slug,
          title: j.title,
          description: j.description,
          meta: j.meta ?? j.jobType ?? '',
        }))
      : catalogJobs.map((j) => ({
          slug: j.slug,
          title: j.title,
          description: j.description,
          meta: j.meta,
        }));

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={locale === 'vi' ? 'Tuyển Dụng' : 'Careers'}
        title={locale === 'vi' ? 'Phát triển con người cùng tốc độ mở rộng hệ thống.' : 'Recruitment pages now inherit the same visual discipline.'}
        description={locale === 'vi' ? 'Khu vực tuyển dụng cũng được thiết kế liền mạch, đồng nhất với chất lượng dự án thay vì tách biệt như một trang nội bộ xa lạ.' : 'This makes the HR section feel like part of the same system instead of a disconnected microsite.'}
      />

      <section className="section-block">
        <div className="shell">
          <SectionIntro
            index="09"
            title={locale === 'vi' ? 'Vị trí đang mở' : 'Open role cards'}
            description={locale === 'vi' ? 'Danh sách công việc hiển thị như các thẻ thông tin đa dụng, tập trung vào mô tả súc tích và thuộc tính rõ ràng.' : 'Job listings can be rendered as reusable cards with technical metadata and concise description.'}
          />
          <div className="tile-grid">
            {displayJobs.map((role) => (
              <div key={role.slug} className="page-stack">
                <InfoCard meta={role.meta} title={role.title} description={role.description} />
                <ButtonLink href={`/${locale}/careers/${role.slug}`} variant="ghost">
                  {locale === 'vi' ? 'Xem vị trí' : 'View role'}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
