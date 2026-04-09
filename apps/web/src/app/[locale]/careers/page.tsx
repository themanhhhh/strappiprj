import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {SectionIntro} from '@/components/section-intro';
import {Header} from '@/components/header';
import {SlideshowBackground} from '@/components/slideshow-background';
import {getJobs, getHeroSlides} from '@/lib/strapi/queries';
import {jobs as catalogJobs} from '@/lib/catalog';
import type {Locale} from '@/i18n/routing';

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
      <div className="hero-header-page careers-hero-page" style={{position: 'relative'}}>
        <Header locale={locale as Locale} transparent />

        <section className="careers-hero">
          <div className="careers-hero-media">
            {slides.length > 0 ? <SlideshowBackground slides={slides} /> : null}
            <div className="careers-hero-overlay" />
          </div>
        </section>
      </div>

      <section className="section-block careers-intro-section">
        <div className="shell careers-intro-grid">
          <div>
            <SectionIntro
              index="09"
              title={locale === 'vi' ? 'Làm việc cùng hệ thống đang tăng trưởng' : 'Work inside a growing operating system'}
              description={locale === 'vi' ? 'Các vị trí tuyển dụng được trình bày theo ngôn ngữ doanh nghiệp rõ ràng, tập trung vào vai trò, kỳ vọng và giá trị công việc thay vì các thẻ demo chung chung.' : 'Open roles are presented with a clearer corporate structure focused on scope, expectations, and the value of the work.'}
            />
          </div>

          <div className="careers-intro-note panel">
            <p className="meta-kicker">{locale === 'vi' ? 'Cách tiếp cận' : 'Approach'}</p>
            <h3>{locale === 'vi' ? 'Tuyển đúng người cho đúng giai đoạn mở rộng.' : 'Hiring the right people for the right stage of growth.'}</h3>
            <p>
              {locale === 'vi'
                ? 'Mỗi vai trò đều cần khả năng thực thi, phối hợp đội nhóm và thích nghi với nhịp độ triển khai của một hệ thống đa thương hiệu.'
                : 'Each role requires execution strength, collaborative discipline, and the ability to move with a multi-brand operating pace.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section-block careers-openings-section" id="careers-openings">
        <div className="shell">
          <SectionIntro
            index="09"
            title={locale === 'vi' ? 'Vị trí đang mở' : 'Open roles'}
            description={locale === 'vi' ? 'Danh sách vị trí được rút gọn để dễ quét, đồng thời giữ cảm giác chỉn chu và nhất quán với ngôn ngữ thiết kế toàn site.' : 'Each opening is presented in a compact, easier-to-scan format while staying consistent with the site’s visual language.'}
          />
          <div className="careers-role-list">
            {displayJobs.map((role, index) => (
              <article key={role.slug} className="careers-role-card">
                <div className="careers-role-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="careers-role-main">
                  <p className="careers-role-meta">{role.meta}</p>
                  <h3>{role.title}</h3>
                </div>
                <p className="careers-role-desc">{role.description}</p>
               
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
