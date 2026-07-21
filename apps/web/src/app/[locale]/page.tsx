import type {Metadata} from 'next';
import {HeroBanner} from '@/components/aladdin/hero-banner';
import {BrandGrid} from '@/components/aladdin/brand-grid';
import {EcosystemBrands} from '@/components/aladdin/ecosystem-brands';
import {AboutPresence} from '@/components/aladdin/about-presence';
import {CsrSection} from '@/components/aladdin/csr-section';
import {ButtonLink} from '@/components/button-link';
import {NewsShowcase} from '@/components/news-showcase';
import {Header} from '@/components/header';
import {homepageContent} from '@/lib/site';
import {getProjectFallbackImage} from '@/lib/catalog';
import {getProjects, getPosts, getHeroSlides, getHomepage} from '@/lib/strapi/queries';
import type {Locale} from '@/i18n/routing';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

const fallbackBrandAssets = [
  {
    slug: 'long-wang',
    logoUrl: '/images/fallback/logo/images.jfif',
    coverUrl: getProjectFallbackImage('long-wang'),
  },
  {
    slug: 'tian-long',
    logoUrl: '/images/fallback/logo/images (1).jfif',
    coverUrl: getProjectFallbackImage('tian-long'),
  },
  {
    slug: 'bo-to-quan-moc',
    logoUrl: '/images/fallback/logo/duong-ban-750x468.png',
    coverUrl: getProjectFallbackImage('bo-to-quan-moc'),
  },
  {
    slug: 'g-master',
    logoUrl: '/images/fallback/logo/1778650433_6a040d4150dd9.png',
    coverUrl: getProjectFallbackImage('g-master'),
  },
  {
    slug: 'com-nieu-hai-su',
    logoUrl: '/images/fallback/logo/com-nieu-hai-su_waon.png',
    coverUrl: getProjectFallbackImage('com-nieu-hai-su'),
  },
  {
    slug: 'khen-nuong-sapa',
    logoUrl: null,
    coverUrl: getProjectFallbackImage('khen-nuong-sapa'),
  },
] as const;

type HomePageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});

  return {
    title: t('metadataTitle'),
    description: t('metadataDescription'),
    alternates: getLocalizedAlternates(locale),
    openGraph: {
      locale: getOpenGraphLocale(locale),
      url: `/${locale}`,
    },
  };
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  const content = homepageContent[locale as keyof typeof homepageContent] ?? homepageContent.vi;
  const normalizeHomepageText = (value: string | null | undefined, fallback: string) =>
    (value ?? fallback)
      .replace(/6 thương hiệu Aladdin/g, '8 thương hiệu Aladdin')
      .replace(/Aladdin\.,JSC/g, 'hệ thống Aladdin');

  // ── Fetch từ Strapi ───────────────────────────────────────────
  const [strapiProjects, strapiPosts, strapiHeroSlides, strapiHomepage] = await Promise.all([
    getProjects(locale),
    getPosts(locale),
    getHeroSlides(locale, 'home'),
    getHomepage(locale),
  ]);

  // Build brands: Strapi projects → brand cards (tối đa 6)
  const brandItems =
    strapiProjects.length > 0
      ? strapiProjects.slice(0, 6).map((p) => ({
          name: p.title,
          tag: p.category ?? p.meta ?? '',
          description: p.description ?? '',
          slug: p.slug,
          coverUrl: p.cover?.url
            ? p.cover.url.startsWith('http') ? p.cover.url : `${STRAPI_URL}${p.cover.url}`
            : null,
          logoUrl: p.logo?.url
            ? p.logo.url.startsWith('http') ? p.logo.url : `${STRAPI_URL}${p.logo.url}`
            : null,
        }))
      : content.brands.map((brand, index) => ({
          ...brand,
          slug: fallbackBrandAssets[index]?.slug,
          coverUrl: fallbackBrandAssets[index]?.coverUrl ?? null,
          logoUrl: fallbackBrandAssets[index]?.logoUrl ?? null,
        }));

  // Build news items: Strapi posts → news showcase (tối đa 5)
  const newsItems =
    strapiPosts.length > 0
      ? strapiPosts.slice(0, 5).map((p) => ({
          category: p.meta ?? p.category?.name ?? '',
          title: p.title,
          description: p.description ?? '',
          slug: p.slug,
          date: p.publishedAt ?? null,
          coverUrl: p.cover?.url
            ? p.cover.url.startsWith('http') ? p.cover.url : `${STRAPI_URL}${p.cover.url}`
            : null,
        }))
      : content.featuredNews.map((n) => ({...n, slug: undefined, date: null, coverUrl: null}));

  // Build hero slides: Strapi slides
  const heroSlidesData =
    strapiHeroSlides.length > 0
      ? strapiHeroSlides.map((slide) => ({
          eyebrow: slide.eyebrow ?? '',
          title: slide.title,
          description: slide.description ?? '',
          imageLabel: slide.imageLabel ?? '',
          imageUrl: slide.cover?.url
            ? slide.cover.url.startsWith('http') ? slide.cover.url : `${STRAPI_URL}${slide.cover.url}`
            : undefined,
          stats: Array.isArray(slide.stats) ? slide.stats : [],
        }))
      : content.heroSlides;

  return (
    <>
      {/* hero-header-page wraps the custom overlay header and the hero */}
      <div className="hero-header-page" style={{ position: 'relative' }}>
        <Header locale={locale as Locale} transparent />
        <HeroBanner
          locale={locale}
          slides={heroSlidesData}
          ctaText={content.ctaPrimary}
        />
      </div>

      <EcosystemBrands
        locale={locale}
        title={t('ecosystemTitle')}
        description={content.brandSectionLead}
        brands={brandItems}
      />

      <AboutPresence locale={locale} />

      <BrandGrid
        locale={locale}
        title={normalizeHomepageText(strapiHomepage?.brandSectionTitle, content.brandSectionTitle)}
        brands={brandItems}
      />

      <CsrSection
        locale={locale}
        title={strapiHomepage?.socialTitle ?? content.socialTitle}
        description={strapiHomepage?.socialLead ?? content.socialLead}
        stories={strapiHomepage?.socialStories ?? content.socialStories}
      />

      <section className="aladdin-section bg-sector-overlay">
        <div className="shell recruitment-grid">
          <div className="recruitment-copy">
            <h2 className="section-title-left">{strapiHomepage?.careersTitle ?? content.careersTitle}</h2>
            <p className="section-desc-left">{strapiHomepage?.careersLead ?? content.careersLead}</p>
            <div className="panel recruitment-panel">
              <p className="meta-kicker">
                {t('teamLabel')}
              </p>
              <h3>{strapiHomepage?.careersBlock?.title ?? content.careers.title}</h3>
              <p>{strapiHomepage?.careersBlock?.description ?? content.careers.description}</p>
              <ul className="detail-list">
                {(strapiHomepage?.careersBlock?.highlights ?? content.careers.highlights).map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="button-row">
                <ButtonLink href={locale === 'vi' ? `/${locale}/tuyen-dung` : `/${locale}/careers`} variant="primary">
                  {t('exploreCareers')}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="news-stack">
            <h2 className="section-title-left">{strapiHomepage?.newsTitle ?? content.newsTitle}</h2>
            <p className="section-desc-left">{strapiHomepage?.newsLead ?? content.newsLead}</p>
            <NewsShowcase locale={locale} items={newsItems} />
          </div>
        </div>
      </section>
    </>
  );
}
