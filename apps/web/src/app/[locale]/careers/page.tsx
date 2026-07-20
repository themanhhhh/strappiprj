import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {SectionIntro} from '@/components/section-intro';
import {Header} from '@/components/header';
import {SlideshowBackground} from '@/components/slideshow-background';
import {getJobs, getHeroSlides} from '@/lib/strapi/queries';
import {fallbackBannerImage, jobs as catalogJobs} from '@/lib/catalog';
import type {Locale} from '@/i18n/routing';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

type CareersPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: CareersPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'careersPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/careers'),
    openGraph: {
      locale: getOpenGraphLocale(locale),
      url: `/${locale}/careers`,
    },
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export default async function CareersPage({params}: CareersPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'careersPage'});

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
            <SlideshowBackground slides={slides.length > 0 ? slides : [{imageUrl: fallbackBannerImage}]} />
            <div className="careers-hero-overlay" />
          </div>
        </section>
      </div>

      <section className="section-block careers-intro-section">
        <div className="shell careers-intro-grid">
          <div>
            <SectionIntro
              index=""
              title={t('intro.title')}
              description={t('intro.description')}
            />
          </div>

          <div className="careers-intro-note panel">
            <p className="meta-kicker">{t('intro.approachLabel')}</p>
            <h3>{t('intro.approachTitle')}</h3>
            <p>
              {t('intro.approachBody')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-block careers-openings-section" id="careers-openings">
        <div className="shell">
          <SectionIntro
            index=""
            title={t('intro.openRolesTitle')}
            description={t('intro.openRolesDescription')}
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
