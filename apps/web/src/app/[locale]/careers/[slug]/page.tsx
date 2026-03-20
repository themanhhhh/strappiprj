import {notFound} from 'next/navigation';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {InfoCard} from '@/components/info-card';
import {PageHero} from '@/components/page-hero';
import {SectionIntro} from '@/components/section-intro';
import {getJob, jobs} from '@/lib/catalog';

type JobDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({slug: job.slug}));
}

export default async function JobDetailPage({params}: JobDetailPageProps) {
  const {locale, slug} = await params;
  const job = getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={job.meta}
        title={job.title}
        description={job.description}
        actions={
          <div className="button-row">
            <ButtonLink href={`/${locale}/contact`} variant="primary">
              Apply via contact
            </ButtonLink>
            <ButtonLink href={`/${locale}/careers`} variant="secondary">
              Back to careers
            </ButtonLink>
          </div>
        }
        aside={
          <ul className="detail-list">
            <li>{job.location}</li>
            <li>{job.jobType}</li>
          </ul>
        }
      />

      <section className="section-block">
        <div className="shell">
          <SectionIntro
            index="16"
            title="Role details"
            description="Job detail pages need a structured split between responsibilities, requirements and benefits."
          />
          <div className="tile-grid">
            <InfoCard meta="Responsibilities" title="What you will do" description={job.responsibilities.join('. ')} />
            <InfoCard meta="Requirements" title="What you need" description={job.requirements.join('. ')} tone="accent" />
            <InfoCard meta="Benefits" title="What you get" description={job.benefits.join('. ')} tone="dark" />
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <CtaStrip
            label="Application CTA"
            title="Turn job interest into an application handoff."
            description="This CTA can later be replaced by apply URL or email fields from Strapi."
            primary={{label: 'Start application', href: `/${locale}/contact`}}
            secondary={{label: 'View all roles', href: `/${locale}/careers`}}
          />
        </div>
      </section>
    </>
  );
}

