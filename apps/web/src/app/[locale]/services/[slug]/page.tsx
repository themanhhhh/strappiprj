import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {InfoCard} from '@/components/info-card';
import {PageHero} from '@/components/page-hero';
import {SectionIntro} from '@/components/section-intro';
import {getServiceBySlug, getServices} from '@/lib/strapi/queries';
import {getProject, getService, services as catalogServices} from '@/lib/catalog';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import {locales} from '@/i18n/routing';

type ServiceDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const strapiServices = (await Promise.all(locales.map((locale) => getServices(locale)))).flat();
  if (strapiServices.length > 0) {
    return Array.from(new Set(strapiServices.map((s) => s.slug))).map((slug) => ({slug}));
  }
  return catalogServices.map((s) => ({slug: s.slug}));
}

export async function generateMetadata({params}: ServiceDetailPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const t = await getTranslations({locale, namespace: 'serviceDetail'});
  const strapiService = await getServiceBySlug(slug, locale);
  const catalogService = strapiService ? null : getService(slug);

  const title = strapiService?.title ?? catalogService?.title ?? slug;
  const description = strapiService?.description ?? catalogService?.description ?? '';

  const contentPath = locale === 'vi' ? '/dich-vu' : '/services';

  return {
    title: `${title} — ${t('metadataSuffix')}`,
    description,
    alternates: getLocalizedAlternates(locale, `${contentPath}/${slug}`),
    openGraph: {
      title,
      description,
      locale: getOpenGraphLocale(locale),
      url: `/${locale}${contentPath}/${slug}`,
    },
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
  const t = await getTranslations({locale, namespace: 'serviceDetail'});
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
                {t('actions.request')}
              </ButtonLink>
              <ButtonLink href={`/${locale}/services`} variant="secondary">
                {t('actions.back')}
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
                title={t('deliverables.title')}
                description={t('deliverables.description')}
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
                title={t('relatedProjects.title')}
                description={t('relatedProjects.description')}
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
                      {t('relatedProjects.view')}
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
              label={t('cta.label')}
              title={t('cta.title')}
              description={t('cta.description')}
              primary={{
                label: t('cta.primary'),
                href: `/${locale}/contact`,
              }}
              secondary={{
                label: t('cta.secondary'),
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
              {t('actions.request')}
            </ButtonLink>
            <ButtonLink href={`/${locale}/services`} variant="secondary">
              {t('actions.back')}
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
            title={t('deliverables.title')}
            description={t('deliverables.description')}
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
              title={t('relatedProjects.title')}
              description={t('relatedProjects.description')}
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
                    {t('relatedProjects.view')}
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
            label={t('cta.label')}
            title={t('cta.title')}
            description={t('cta.description')}
            primary={{label: t('cta.primary'), href: `/${locale}/contact`}}
            secondary={{label: t('cta.secondary'), href: `/${locale}/services`}}
          />
        </div>
      </section>
    </>
  );
}
