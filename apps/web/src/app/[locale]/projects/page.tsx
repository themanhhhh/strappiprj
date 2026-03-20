import {Suspense} from 'react';
import type {Metadata} from 'next';
import {CtaStrip} from '@/components/cta-strip';
import {PageHero} from '@/components/page-hero';
import {BrandList, type BrandItem} from '@/components/brand-list';
import {getProjects, getHeroSlides} from '@/lib/strapi/queries';
import {getStrapiImageUrl} from '@/lib/strapi/queries';
import {projects as catalogProjects} from '@/lib/catalog';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type ProjectsPageProps = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string}>;
};

export async function generateMetadata({params}: ProjectsPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Hệ sinh thái thương hiệu — ALADDIN JSC' : 'Brand Ecosystem — ALADDIN JSC',
    description:
      locale === 'vi'
        ? 'Khám phá các chuỗi nhà hàng trong hệ sinh thái F&B của ALADDIN JSC — từ lẩu đến BBQ, từ Việt Nam đến quốc tế.'
        : 'Explore the restaurant chain brands in the ALADDIN JSC F&B ecosystem.',
  };
}

export default async function ProjectsPage({params}: ProjectsPageProps) {
  const {locale} = await params;

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
        eyebrow={locale === 'vi' ? 'Hệ sinh thái thương hiệu' : 'Brand Ecosystem'}
        title={
          locale === 'vi'
            ? 'Các chuỗi nhà hàng trong hệ sinh thái ALADDIN JSC'
            : 'Restaurant chains in the ALADDIN JSC ecosystem'
        }
        description={
          locale === 'vi'
            ? 'Từ lẩu Hồng Kông đến BBQ Nhật Bản — chúng tôi xây dựng, vận hành và nhân rộng các thương hiệu F&B chất lượng cao.'
            : 'From Hong Kong hotpot to Japanese BBQ — we build, operate and scale premium F&B brands.'
        }
        aside={
          <ul className="detail-list">
            {locale === 'vi' ? (
              <>
                <li>Chuỗi nhà hàng đa thương hiệu.</li>
                <li>Vận hành chuyên nghiệp từ A-Z.</li>
                <li>Nhân rộng toàn quốc.</li>
              </>
            ) : (
              <>
                <li>Multi-brand restaurant chains.</li>
                <li>Full A-Z professional operations.</li>
                <li>National rollout capability.</li>
              </>
            )}
          </ul>
        }
      />

      <section className="section-block">
        <div className="shell">
          <Suspense fallback={<div style={{height: 120}} />}>
            <BrandList
              locale={locale}
              items={displayItems}
              brands={brands}
            />
          </Suspense>
        </div>
      </section>

      
    </>
  );
}
