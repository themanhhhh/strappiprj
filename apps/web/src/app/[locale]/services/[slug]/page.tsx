import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {InfoCard} from '@/components/info-card';
import {PageHero} from '@/components/page-hero';
import {SectionIntro} from '@/components/section-intro';
import {getServiceBySlug, getServices} from '@/lib/strapi/queries';
import {getProject, getService, services as catalogServices} from '@/lib/catalog';

type ServiceDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const strapiServices = await getServices('vi');
  if (strapiServices.length > 0) {
    return strapiServices.map((s) => ({slug: s.slug}));
  }
  return catalogServices.map((s) => ({slug: s.slug}));
}

export async function generateMetadata({params}: ServiceDetailPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const strapiService = await getServiceBySlug(slug, locale);
  const catalogService = strapiService ? null : getService(slug);

  const title = strapiService?.title ?? catalogService?.title ?? slug;
  const description = strapiService?.description ?? catalogService?.description ?? '';

  return {
    title: locale === 'vi' ? `${title} — Dịch vụ` : `${title} — Service`,
    description,
    openGraph: {title, description},
  };
}

/** Split a multiline text string into array items */
function toList(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.replace(/^[-–•]\s*/, '').trim())
    .filter(Boolean);
}

export default async function ServiceDetailPage({params}: ServiceDetailPageProps) {
  const {locale, slug} = await params;
  const strapiService = await getServiceBySlug(slug, locale);

  if (strapiService) {
    const deliverables = toList(strapiService.deliverables);
    const processList = toList(strapiService.process);
    const relatedProjects = strapiService.projects ?? [];

    return (
      <>
        <PageHero
          eyebrow={strapiService.meta ?? ''}
          title={strapiService.title}
          description={strapiService.description ?? ''}
          actions={
            <div className="button-row">
              <ButtonLink href={`/${locale}/contact`} variant="primary">
                {locale === 'vi' ? 'Yêu cầu dịch vụ' : 'Request this service'}
              </ButtonLink>
              <ButtonLink href={`/${locale}/services`} variant="secondary">
                {locale === 'vi' ? 'Xem tất cả dịch vụ' : 'Back to services'}
              </ButtonLink>
            </div>
          }
          aside={
            processList.length > 0 ? (
              <ul className="detail-list">
                {processList.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            ) : undefined
          }
        />

        {deliverables.length > 0 && (
          <section className="section-block">
            <div className="shell">
              <SectionIntro
                index={strapiService.index ?? ''}
                title={locale === 'vi' ? 'Hạng mục thực hiện' : 'Service deliverables'}
                description={
                  locale === 'vi'
                    ? 'Chi tiết các hạng mục triển khai trong gói dịch vụ này.'
                    : 'Detailed scope items and execution value for this service.'
                }
              />
              <div className="tile-grid">
                {deliverables.map((item, index) => (
                  <InfoCard
                    key={item}
                    index={`0${index + 1}`}
                    title={item}
                    description={strapiService.description ?? ''}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className="section-block">
            <div className="shell">
              <SectionIntro
                index="11"
                title={locale === 'vi' ? 'Dự án sử dụng dịch vụ này' : 'Related projects'}
                description={
                  locale === 'vi'
                    ? 'Các dự án thực tế đã triển khai dịch vụ này.'
                    : 'Case studies that prove execution capability for this service.'
                }
              />
              <div className="tile-grid">
                {relatedProjects.map((project) => (
                  <div key={project.slug} className="page-stack">
                    <InfoCard
                      meta={project.meta ?? project.category ?? ''}
                      title={project.title}
                      description={project.description ?? ''}
                      tone="accent"
                    />
                    <ButtonLink href={`/${locale}/projects/${project.slug}`} variant="ghost">
                      {locale === 'vi' ? 'Xem dự án' : 'View case study'}
                    </ButtonLink>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-block bg-sector-overlay">
          <div className="shell">
            <CtaStrip
              label={locale === 'vi' ? 'Tư vấn dịch vụ' : 'Service enquiry'}
              title={locale === 'vi' ? 'Sẵn sàng triển khai dự án của bạn?' : 'Ready to scope your project?'}
              description={
                locale === 'vi'
                  ? 'Liên hệ ngay để nhận tư vấn chuyên sâu và báo giá phù hợp với nhu cầu.'
                  : 'Get in touch for a tailored consultation and project quotation.'
              }
              primary={{
                label: locale === 'vi' ? 'Đặt lịch tư vấn' : 'Book consultation',
                href: `/${locale}/contact`,
              }}
              secondary={{
                label: locale === 'vi' ? 'Xem tất cả dịch vụ' : 'See all services',
                href: `/${locale}/services`,
              }}
            />
          </div>
        </section>
      </>
    );
  }

  // ── Fallback: catalog data ──────────────────────────────────────────────────
  const catalogService = getService(slug);
  if (!catalogService) notFound();

  const relatedProjects = catalogService.relatedProjectSlugs
    .map((projectSlug) => getProject(projectSlug))
    .filter((entry) => entry !== undefined);

  return (
    <>
      <PageHero
        eyebrow={catalogService.meta}
        title={catalogService.title}
        description={catalogService.description}
        actions={
          <div className="button-row">
            <ButtonLink href={`/${locale}/contact`} variant="primary">
              {locale === 'vi' ? 'Yêu cầu dịch vụ' : 'Request this service'}
            </ButtonLink>
            <ButtonLink href={`/${locale}/services`} variant="secondary">
              {locale === 'vi' ? 'Xem tất cả dịch vụ' : 'Back to services'}
            </ButtonLink>
          </div>
        }
        aside={
          <ul className="detail-list">
            {catalogService.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        }
      />

      <section className="section-block">
        <div className="shell">
          <SectionIntro
            index={catalogService.index}
            title={locale === 'vi' ? 'Hạng mục thực hiện' : 'Service deliverables'}
            description={locale === 'vi'
              ? 'Chi tiết các hạng mục triển khai trong gói dịch vụ này.'
              : 'The detail page expands each service into clear scope items and execution value.'}
          />
          <div className="tile-grid">
            {catalogService.deliverables.map((item, index) => (
              <InfoCard
                key={item}
                index={`0${index + 1}`}
                title={item}
                description={catalogService.description}
              />
            ))}
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section-block">
          <div className="shell">
            <SectionIntro
              index="11"
              title={locale === 'vi' ? 'Dự án sử dụng dịch vụ này' : 'Related projects'}
              description={locale === 'vi'
                ? 'Các dự án thực tế đã triển khai dịch vụ này.'
                : 'Service detail pages should point directly to case studies that prove execution capability.'}
            />
            <div className="tile-grid">
              {relatedProjects.map((project) => (
                <div key={project.slug} className="page-stack">
                  <InfoCard
                    meta={project.meta}
                    title={project.title}
                    description={project.description}
                    tone="accent"
                  />
                  <ButtonLink href={`/${locale}/projects/${project.slug}`} variant="ghost">
                    {locale === 'vi' ? 'Xem dự án' : 'View case study'}
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-block bg-sector-overlay">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Tư vấn dịch vụ' : 'Service enquiry'}
            title={locale === 'vi' ? 'Sẵn sàng triển khai dự án của bạn?' : 'Move from service detail into a scoped discussion.'}
            description={locale === 'vi'
              ? 'Liên hệ ngay để nhận tư vấn và báo giá phù hợp.'
              : 'This is the handoff point from capability explanation to business enquiry.'}
            primary={{label: locale === 'vi' ? 'Đặt lịch tư vấn' : 'Book consultation', href: `/${locale}/contact`}}
            secondary={{label: locale === 'vi' ? 'Xem tất cả dịch vụ' : 'See all services', href: `/${locale}/services`}}
          />
        </div>
      </section>
    </>
  );
}
