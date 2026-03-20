import {HeroBanner} from '@/components/aladdin/hero-banner';
import {BrandGrid} from '@/components/aladdin/brand-grid';
import {EcosystemBrands} from '@/components/aladdin/ecosystem-brands';
import {AboutPresence} from '@/components/aladdin/about-presence';
import {PackagedProducts} from '@/components/aladdin/packaged-products';
import {CsrSection} from '@/components/aladdin/csr-section';
import {ButtonLink} from '@/components/button-link';
import {NewsShowcase} from '@/components/news-showcase';
import {Header} from '@/components/header';
import {homepageContent} from '@/lib/site';
import {getProjects, getPosts, getHeroSlides, getHomepage} from '@/lib/strapi/queries';
import type {Locale} from '@/i18n/routing';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type HomePageProps = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;
  const content = homepageContent[locale as keyof typeof homepageContent] ?? homepageContent.vi;

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
      : content.brands.map((b) => ({...b, slug: undefined, coverUrl: null, logoUrl: null}));

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
        title={locale === 'vi' ? 'Thương hiệu thuộc hệ sinh thái' : 'Ecosystem Brands'}
        description={content.brandSectionLead}
        brands={brandItems}
      />

      <AboutPresence locale={locale} />

      <BrandGrid
        locale={locale}
        title={strapiHomepage?.brandSectionTitle ?? content.brandSectionTitle}
        brands={brandItems}
      />

      <PackagedProducts locale={locale} />

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
                {locale === 'vi' ? 'Thương hiệu Nhà tuyển dụng' : 'Employer Brand'}
              </p>
              <h3>{strapiHomepage?.careersBlock?.title ?? content.careers.title}</h3>
              <p>{strapiHomepage?.careersBlock?.description ?? content.careers.description}</p>
              <ul className="detail-list">
                {(strapiHomepage?.careersBlock?.highlights ?? content.careers.highlights).map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="button-row">
                <ButtonLink href={`/${locale}/careers`} variant="primary">
                  {locale === 'vi' ? 'Khám phá cơ hội' : 'Explore careers'}
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
