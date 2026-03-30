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
    title: locale === 'vi' ? 'Du an - MAESTRO' : 'Projects - MAESTRO',
    description:
      locale === 'vi'
        ? 'Kham pha cac du an duoc MAESTRO thuc hien trong linh vuc construction, interior fit-out va joinery voi muc do hoan thien cao va tinh dong bo ro net.'
        : 'Explore projects delivered by MAESTRO across construction, interior fit-out, and joinery with a high standard of finish and coordination.',
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
        eyebrow={locale === 'vi' ? 'Du an' : 'Projects'}
        title={
          locale === 'vi'
            ? 'Nhung cong trinh phan anh nang luc thuc thi, su chi tiet va chat luong hoan thien cua MAESTRO'
            : 'Projects that reflect MAESTRO\'s execution capability, precision, and finishing quality'
        }
        description={
          locale === 'vi'
            ? 'Moi du an la mot qua trinh can doi giua ky thuat, vat lieu, tien do va trai nghiem khong gian. Day la noi MAESTRO trinh bay nhung cong trinh duoc hoan thanh voi su dong bo tu concept den handover.'
            : 'Each project balances technical discipline, material quality, programme control, and spatial experience. This is where MAESTRO presents work delivered with consistency from concept through handover.'
        }
        aside={
          <ul className="detail-list">
            {locale === 'vi' ? (
              <>
                <li>Construction va fit-out duoc dieu phoi dong bo.</li>
                <li>Chat luong hoan thien duoc kiem soat o tung chi tiet.</li>
                <li>Joinery, vat lieu va ky thuat duoc can doi trong mot he thong thuc thi thong nhat.</li>
              </>
            ) : (
              <>
                <li>Construction and fit-out delivered through coordinated execution.</li>
                <li>Finishing quality controlled at the level of detail.</li>
                <li>Joinery, materiality, and technical systems aligned within one delivery framework.</li>
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
