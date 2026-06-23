import type {Metadata} from 'next';
import {PageHero} from '@/components/page-hero';
import {BrandList, type BrandItem} from '@/components/brand-list';
import {getProjects, getHeroSlides} from '@/lib/strapi/queries';
import {projects as catalogProjects} from '@/lib/catalog';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type ProjectsPageProps = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string}>;
};

export async function generateMetadata({params}: ProjectsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'projectsPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/projects'),
    openGraph: {
      locale: getOpenGraphLocale(locale),
      url: `/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({params}: ProjectsPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'projectsPage'});
  const asideItems = t.raw('hero.aside') as string[];

  // Fetch tất cả projects và hero slides từ Strapi
  const [strapiProjects, heroSlides] = await Promise.all([
    getProjects(locale),
    getHeroSlides(locale, 'projects'),
  ]);
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));

  // Chuyển Strapi data → BrandItem format
  let displayItems: BrandItem[];
  let brands: string[] | null = null;

  if (strapiProjects.length > 0) {
    displayItems = strapiProjects.map((p) => {
      const cover = p.cover?.url
        ? p.cover.url.startsWith('http') ? p.cover.url : `${STRAPI_URL}${p.cover.url}`
        : null;
      return {
        slug: p.slug,
        title: p.title,
        description: p.description ?? '',
        meta: p.meta ?? p.category ?? '',
        brand: p.category ?? '',
        coverUrl: cover,
        publishedAt: p.year ? `${p.year}-01-01` : null,
      };
    });

    // Build danh sách brands (categories) từ Strapi data
    const uniqueBrands = Array.from(
      new Set(
        strapiProjects
          .map((p) => p.category)
          .filter((c): c is string => Boolean(c)),
      ),
    ).sort();
    brands = uniqueBrands.length > 0 ? uniqueBrands : null;
  } else {
    // Fallback catalog
    displayItems = catalogProjects.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      meta: p.meta,
      brand: p.category,
      coverUrl: null,
      publishedAt: p.year ? `${p.year}-01-01` : null,
    }));

    // Unique categories từ catalog
    const uniqueBrands = Array.from(
      new Set(catalogProjects.map((p) => p.category).filter(Boolean)),
    ).sort();
    brands = uniqueBrands.length > 0 ? uniqueBrands : null;
  }

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
        aside={
          <ul className="detail-list">
            {asideItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        }
      />

      <section className="section-block">
        <div className="shell">
          <BrandList
            locale={locale}
            items={displayItems}
            brands={brands}
          />
        </div>
      </section>

      
    </>
  );
}
