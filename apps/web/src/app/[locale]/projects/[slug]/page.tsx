import {notFound} from 'next/navigation';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {getProjectBySlug, getProjects, getHeroSlides} from '@/lib/strapi/queries';
import {getProject, getService, projects as catalogProjects} from '@/lib/catalog';
import {Header} from '@/components/header';
import Image from 'next/image';
import {ProjectGallery} from '@/components/project-gallery';
import {HeroBanner} from '@/components/aladdin/hero-banner';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type ProjectDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const strapiProjects = await getProjects('vi');
  if (strapiProjects.length > 0) {
    return strapiProjects.map((p) => ({slug: p.slug}));
  }
  return catalogProjects.map((project) => ({slug: project.slug}));
}

export default async function ProjectDetailPage({params}: ProjectDetailPageProps) {
  const {locale, slug} = await params;

  // Try fetching from Strapi first
  let projectData = null;
  const strapiProject = await getProjectBySlug(slug, locale);

  if (strapiProject) {
    projectData = {
      title: strapiProject.title,
      category: strapiProject.category,
      location: strapiProject.location,
      year: strapiProject.year,
      area: strapiProject.area,
      challenge: strapiProject.challenge,
      solution: strapiProject.solution,
      outcome: strapiProject.outcome,
      coverUrl: strapiProject.cover?.url
        ? strapiProject.cover.url.startsWith('http') ? strapiProject.cover.url : `${STRAPI_URL}${strapiProject.cover.url}`
        : null,
      galleryUrls: strapiProject.gallery?.map(img => img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`) || [],
      relatedServices: strapiProject.services ?? [],
    };
  } else {
    const catalogData = getProject(slug);
    if (!catalogData) notFound();
    projectData = {
      title: catalogData.title,
      category: catalogData.category,
      location: catalogData.location,
      year: catalogData.year,
      area: catalogData.area,
      challenge: catalogData.challenge,
      solution: catalogData.solution,
      outcome: catalogData.outcome,
      coverUrl: null,
      galleryUrls: [],
      relatedServices: catalogData.serviceSlugs.map(s => getService(s)).filter(Boolean) as any[],
    };
  }

  const p = projectData;

  // 0. Giả định lấy banner (nếu có config từ CMS "all" hoặc "projects")
  const strapiHeroSlides = await getHeroSlides(locale, 'projects');
  const heroSlidesData = strapiHeroSlides.map((slide) => ({
    eyebrow: slide.eyebrow ?? '',
    title: slide.title,
    description: slide.description ?? '',
    imageUrl: slide.cover?.url
      ? slide.cover.url.startsWith('http') ? slide.cover.url : `${STRAPI_URL}${slide.cover.url}`
      : undefined,
  }));

  return (
    <div className="project-detail-page maestro-project-page">
      {/* 1. Custom Hero: Render HeroBanner if data exists, else fallback to project cover */}
      {heroSlidesData.length > 0 ? (
        <div className="hero-header-page" style={{ position: 'relative' }}>
          <Header locale={locale as any} transparent />
          <HeroBanner
            locale={locale}
            slides={heroSlidesData}
            ctaText={locale === 'vi' ? 'Khám phá' : 'Explore'}
          />
        </div>
      ) : (
        <div className="project-hero-maestro hero-header-page" style={{ position: 'relative' }}>
          <Header locale={locale as any} transparent />
          <div className="project-hero-bg-maestro">
            {p.coverUrl ? (
              <Image src={p.coverUrl} alt={p.title} fill priority style={{objectFit: 'cover'}} />
            ) : (
              <div className="project-hero-bg-fallback-maestro" />
            )}
            {/* Removed overlay to match Maestro look */}
          </div>
        </div>
      )}

      <div className="project-content-wrapper">
        <div className="shell">
          <div className="project-details-column-maestro">
            {/* Main Info Box */}
            <div className="project-header-maestro">
              <h1 className="project-title-maestro">{p.title}</h1>
              <p className="project-subtitle-maestro">
                {p.solution ? p.solution : p.category} {/* Use solution or category as subtitle */}
              </p>
            </div>

            <div className="project-details-row-maestro">
              {/* 2. Metadata Table */}
              <div className="project-meta-table-container">
                <table className="project-meta-table">
                  <tbody>
                    <tr className="project-meta-row">
                      <td className="project-meta-label-maestro">LOCATION</td>
                      <td className="project-meta-value-maestro">{p.location || '—'}</td>
                    </tr>
                    <tr className="project-meta-row">
                      <td className="project-meta-label-maestro">SCOPE</td>
                      <td className="project-meta-value-maestro">{p.area || '—'}</td>
                    </tr>
                    <tr className="project-meta-row">
                      <td className="project-meta-label-maestro">YEAR</td>
                      <td className="project-meta-value-maestro">{p.year || '—'}</td>
                    </tr>
                    <tr className="project-meta-row">
                      <td className="project-meta-label-maestro">SUB-SECTOR</td>
                      <td className="project-meta-value-maestro">{p.category || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3. Text Content */}
              <div className="project-text-maestro">
                {(p.challenge || p.solution || p.outcome) && (
                  <>
                    {p.challenge && <div dangerouslySetInnerHTML={{__html: p.challenge}} />}
                    {p.outcome && <div dangerouslySetInnerHTML={{__html: p.outcome}} />}
                  </>
                )}
                {/* If no challenge or outcome is present, display it nicely */}
                {(!p.challenge && !p.outcome && p.solution) && (
                   <div><p>{p.solution}</p></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Gallery */}
      {p.galleryUrls && p.galleryUrls.length > 0 && (
        <section className="project-gallery-section section-block">
          <div className="shell">
            <ProjectGallery images={p.galleryUrls} title={p.title} />
          </div>
        </section>
      )}

      {/* 5. Related Services / CTA -> Mimicking Related Projects */}
      {p.relatedServices.length > 0 && (
        <section className="related-services-maestro">
          <div className="shell">
            <h2 className="related-projects-title-maestro">
              {locale === 'vi' ? 'Dịch vụ liên quan' : 'Related Services'}
            </h2>
            <div className="related-projects-grid-maestro">
              {p.relatedServices.map((service) => (
                <div key={service.slug} className="related-project-card-maestro">
                   <div className="news-card-body">
                    <h3>{service.title}</h3>
                    <p style={{fontSize: '1rem', color: '#666'}}>
                      {service.description}
                    </p>
                    <div className="related-project-links">
                      <ButtonLink href={`/${locale}/services/${service.slug}`} variant="ghost" style={{ borderBottom: '1px solid #c5a059', borderRadius: 0, paddingBottom: 2 }}>
                        {locale === 'vi' ? 'Chi tiết' : 'Details'}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
