import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {InfoCard} from '@/components/info-card';
import {PageHero} from '@/components/page-hero';
import {SectionIntro} from '@/components/section-intro';
import {getJob, jobs} from '@/lib/catalog';
import {getJobBySlug, getJobs} from '@/lib/strapi/queries';
import {locales} from '@/i18n/routing';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';

type JobDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

type JobDetail = {
  title: string;
  description: string;
  meta: string;
  location: string;
  jobType: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

function toList(value: string | null | undefined) {
  return (value ?? '')
    .split('\n')
    .map((item) => item.replace(/^[-–•]\s*/, '').trim())
    .filter(Boolean);
}

function mapJobType(value: string) {
  return value === 'full-time' ? 'Toàn thời gian' : value;
}

export async function generateStaticParams() {
  const cmsJobs = (await Promise.all(locales.map((locale) => getJobs(locale)))).flat();
  return Array.from(new Set([...jobs.map((job) => job.slug), ...cmsJobs.map((job) => job.slug)])).map((slug) => ({slug}));
}

export async function generateMetadata({params}: JobDetailPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const cmsJob = await getJobBySlug(slug, locale);
  const job = cmsJob ?? getJob(slug);
  const title = job?.title ?? slug;
  const description = job?.description ?? '';

  return {
    title: `${title} - New Sky`,
    description,
    alternates: getLocalizedAlternates(locale, `/careers/${slug}`),
    openGraph: {
      title,
      description,
      locale: getOpenGraphLocale(locale),
      url: `/${locale}/careers/${slug}`,
    },
  };
}

export default async function JobDetailPage({params}: JobDetailPageProps) {
  const {locale, slug} = await params;
  const cmsJob = await getJobBySlug(slug, locale);
  const fallbackJob = getJob(slug);
  const job: JobDetail | undefined = cmsJob
    ? {
        title: cmsJob.title,
        description: cmsJob.description ?? '',
        meta: cmsJob.meta ?? cmsJob.department?.name ?? '',
        location: cmsJob.location ?? '',
        jobType: mapJobType(cmsJob.jobType ?? ''),
        responsibilities: toList(cmsJob.responsibilities),
        requirements: toList(cmsJob.requirements),
        benefits: toList(cmsJob.benefits),
      }
    : fallbackJob;

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
            <ButtonLink href={locale === 'vi' ? `/${locale}/lien-he` : `/${locale}/contact`} variant="primary">
              {locale === 'vi' ? 'Liên hệ ứng tuyển' : 'Apply via contact'}
            </ButtonLink>
            <ButtonLink href={locale === 'vi' ? `/${locale}/tuyen-dung` : `/${locale}/careers`} variant="secondary">
              {locale === 'vi' ? 'Quay lại tuyển dụng' : 'Back to careers'}
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
            title={locale === 'vi' ? 'Thông tin vị trí' : 'Role details'}
            description={locale === 'vi' ? 'Các nhóm thông tin chính gồm trách nhiệm, yêu cầu và quyền lợi.' : 'Responsibilities, requirements and benefits.'}
          />
          <div className="tile-grid">
            <InfoCard meta={locale === 'vi' ? 'Trách nhiệm' : 'Responsibilities'} title={locale === 'vi' ? 'Công việc chính' : 'What you will do'} description={job.responsibilities.join('. ')} />
            <InfoCard meta={locale === 'vi' ? 'Yêu cầu' : 'Requirements'} title={locale === 'vi' ? 'Điều kiện phù hợp' : 'What you need'} description={job.requirements.join('. ')} tone="accent" />
            <InfoCard meta={locale === 'vi' ? 'Quyền lợi' : 'Benefits'} title={locale === 'vi' ? 'Bạn nhận được gì' : 'What you get'} description={job.benefits.join('. ')} tone="dark" />
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Ứng tuyển' : 'Application'}
            title={locale === 'vi' ? 'Muốn trao đổi thêm về vị trí này?' : 'Interested in this role?'}
            description={locale === 'vi' ? 'Gửi thông tin liên hệ để New Sky phản hồi bước tiếp theo.' : 'Send your contact details so New Sky can respond with next steps.'}
            primary={{label: locale === 'vi' ? 'Liên hệ ứng tuyển' : 'Start application', href: locale === 'vi' ? `/${locale}/lien-he` : `/${locale}/contact`}}
            secondary={{label: locale === 'vi' ? 'Xem tất cả vị trí' : 'View all roles', href: locale === 'vi' ? `/${locale}/tuyen-dung` : `/${locale}/careers`}}
          />
        </div>
      </section>
    </>
  );
}
