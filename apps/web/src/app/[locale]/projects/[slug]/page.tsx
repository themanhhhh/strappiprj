import {notFound} from 'next/navigation';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {getProjectBySlug, getProjects} from '@/lib/strapi/queries';
import {getProject, getService, projects as catalogProjects} from '@/lib/catalog';
import {Header} from '@/components/header';
import Image from 'next/image';
import {ProjectGallery} from '@/components/project-gallery';

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

  return (
    <div className="project-detail-page">
      {/* 1. Custom Hero */}
      <div className="project-hero hero-header-page">
        <Header locale={locale as any} transparent />
        <div className="project-hero-bg">
          {p.coverUrl ? (
            <Image src={p.coverUrl} alt={p.title} fill priority style={{objectFit: 'cover'}} />
          ) : (
            <div className="project-hero-bg-fallback" />
          )}
          <div className="project-hero-overlay" />
        </div>
        <div className="project-hero-content shell">
          <h1 className="project-hero-title">{p.title}</h1>
          {p.category && <p className="project-hero-subtitle">{p.category}</p>}
        </div>
      </div>

      {/* 2. Metadata Strip */}
      <section className="project-meta-section">
        <div className="shell">
          <div className="project-meta-grid">
            <div className="project-meta-item">
              <span className="project-meta-label">LOCATION</span>
              <span className="project-meta-value">{p.location || '—'}</span>
            </div>
            <div className="project-meta-item">
              <span className="project-meta-label">SCOPE</span>
              <span className="project-meta-value">{p.area || '—'}</span>
            </div>
            <div className="project-meta-item">
              <span className="project-meta-label">YEAR</span>
              <span className="project-meta-value">{p.year || '—'}</span>
            </div>
            <div className="project-meta-item">
              <span className="project-meta-label">SUB-SECTOR</span>
              <span className="project-meta-value">{p.category || '—'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Text Content */}
      <section className="project-content-section section-block">
        <div className="shell project-content-grid">
          {(p.challenge || p.solution) && (
            <div className="project-text-column">
              {p.challenge && (
                <div className="project-text-block">
                  <p>{p.challenge}</p>
                </div>
              )}
              {p.solution && (
                <div className="project-text-block">
                  <p>{p.solution}</p>
                </div>
              )}
              {p.outcome && (
                <div className="project-text-block project-text-outcome">
                  <p>{p.outcome}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. Gallery */}
      {p.galleryUrls && p.galleryUrls.length > 0 && (
        <section className="project-gallery-section section-block">
          <div className="shell">
            <ProjectGallery images={p.galleryUrls} title={p.title} />
          </div>
        </section>
      )}

      {/* 5. Related Services / CTA */}
      {p.relatedServices.length > 0 && (
        <section className="section-block bg-muted">
          <div className="shell">
            <div className="related-projects-header">
              <h2 className="related-projects-title">
                {locale === 'vi' ? 'Dịch vụ liên quan' : 'Related Services'}
              </h2>
            </div>
            <div className="tile-grid">
              {p.relatedServices.map((service) => (
                <div key={service.slug} className="news-card">
                   <div className="news-card-body">
                    <h3 className="news-card-title">{service.title}</h3>
                    <p style={{fontSize: '14px', color: '#666', marginTop: '8px', lineHeight: 1.5}}>
                      {service.description}
                    </p>
                    <div style={{marginTop: '16px'}}>
                      <ButtonLink href={`/${locale}/services/${service.slug}`} variant="ghost">
                        {locale === 'vi' ? 'Xem dịch vụ' : 'View service'}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-block bg-sector-overlay">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Liên hệ dự án' : 'Project CTA'}
            title={locale === 'vi' ? 'Biến mối quan tâm thành yêu cầu tư vấn.' : 'Use case studies to turn interest into a scoped enquiry.'}
            description={locale === 'vi' ? 'Trang chi tiết kết thúc bằng liên kết từ bằng chứng dự án đến yêu cầu tư vấn.' : 'The detail page closes by linking project proof back to a consultation request.'}
            primary={{label: locale === 'vi' ? 'Yêu cầu báo giá' : 'Request quotation', href: `/${locale}/contact`}}
            secondary={{label: locale === 'vi' ? 'Xem danh sách' : 'Explore projects', href: `/${locale}/projects`}}
          />
        </div>
      </section>
    </div>
  );
}
