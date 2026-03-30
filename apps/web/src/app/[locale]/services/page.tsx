import type {Metadata} from 'next';
import Link from 'next/link';
import {PageHero} from '@/components/page-hero';
import {CtaStrip} from '@/components/cta-strip';
import {ServicesGrid, IconFitOut, IconRenovation, IconMEP, IconDesign, IconPMCM, IconJoinery} from '@/components/services-grid';
import {getServices, getHeroSlides} from '@/lib/strapi/queries';
import {services as catalogServices} from '@/lib/catalog';

type ServicesPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: ServicesPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Dich vu - MAESTRO' : 'Services - MAESTRO',
    description: locale === 'vi'
      ? 'Kham pha cac dich vu construction, fit-out, joinery va dieu phoi ky thuat duoc MAESTRO trien khai voi su chinh xac va tinh dong bo cao.'
      : 'Explore MAESTRO construction, fit-out, joinery, and technical coordination services delivered with precision and consistency.',
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export default async function ServicesPage({params}: ServicesPageProps) {
  const {locale} = await params;

  const [strapiServices, heroSlides] = await Promise.all([
    getServices(locale),
    getHeroSlides(locale, 'services'),
  ]);

  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url
      ? s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`
      : null,
  }));

  const displayServices =
    strapiServices.length > 0
      ? strapiServices.map((s, i) => ({
          slug: s.slug,
          title: s.title,
          description: s.description ?? '',
          meta: s.meta ?? '',
          index: s.index ?? String(i + 1).padStart(2, '0'),
          coverUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
          deliverables: [] as string[],
        }))
      : catalogServices.map((s) => ({
          slug: s.slug,
          title: s.title,
          description: s.description,
          meta: s.meta,
          index: s.index,
          coverUrl: null as string | null,
          deliverables: s.deliverables,
        }));

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={locale === 'vi' ? 'Dich vu' : 'What We Do'}
        title={locale === 'vi' ? 'Nhung nang luc duoc xay dung de dua du an tu y tuong den giai doan ban giao.' : 'Capabilities built to carry a project from concept through handover.'}
        description={locale === 'vi'
          ? 'MAESTRO cung cap mot he thong dich vu lien ket giua construction, fit-out, joinery va giam sat thi cong, nham dam bao chat luong, tien do va tinh dong bo cua tung hang muc.'
          : 'MAESTRO provides an integrated service structure across construction, fit-out, joinery, and site supervision to secure quality, timing, and coordination at every stage.'}
      />

      {/* ── Services Grid — Overview ── */}
      <ServicesGrid
        heading={locale === 'vi' ? 'DICH VU CUA CHUNG TOI' : 'OUR SERVICES'}
        items={[
          {
            icon: <IconPMCM />,
            title: locale === 'vi' ? 'Quan ly du an' : 'PMCM',
            subtitle: locale === 'vi' ? 'Project Management & Construction Management' : 'Project Management & Construction Management',
            description: locale === 'vi'
              ? 'Tu lap ke hoach den giam sat thi cong, MAESTRO dieu phoi cac bo mon, kiem soat chat luong, tien do va cac diem giao cat ky thuat de du an van hanh mach lac tu dau den cuoi.'
              : 'From planning through site supervision, MAESTRO coordinates disciplines, controls quality and programme, and manages technical interfaces with disciplined consistency.',
          },
          {
            icon: <IconFitOut />,
            title: locale === 'vi' ? 'Interior fit-out' : 'Interior Fit-Out',
            subtitle: locale === 'vi' ? 'Thi cong va hoan thien khong gian noi that' : 'Interior execution and finishing',
            description: locale === 'vi'
              ? 'Chung toi trien khai cac hang muc fit-out voi muc do hoan thien cao, tu khong gian cong cong den khu vuc chuc nang, nham dat duoc su can doi giua tham my, do ben va tinh san sang dua vao van hanh.'
              : 'We deliver interior fit-out packages with a high standard of finish, balancing aesthetics, durability, and operational readiness across public and functional spaces.',
          },
          {
            icon: <IconDesign />,
            title: locale === 'vi' ? 'Thiet ke noi that' : 'Interior Design',
            subtitle: locale === 'vi' ? 'Khong gian duoc dinh hinh boi vat lieu, ti le va anh sang' : 'Spaces shaped by material, proportion, and light',
            description: locale === 'vi'
              ? 'Ngon ngu thiet ke cua MAESTRO huong den su tiet che va tinh chinh. Moi be mat, ty le, vat lieu va anh sang deu duoc lua chon de phan anh dung tinh than cua khong gian.'
              : 'MAESTRO approaches interior design with restraint and precision. Every surface, proportion, material, and lighting decision is shaped to reflect the intended character of the space.',
          },
          {
            icon: <IconMEP />,
            title: locale === 'vi' ? 'Phoi hop MEP' : 'MEP Coordination',
            subtitle: locale === 'vi' ? 'Mechanical, Electrical & Plumbing' : 'Mechanical, Electrical & Plumbing',
            description: locale === 'vi'
              ? 'Su dong bo ky thuat duoc xu ly ngay tu dau thong qua viec can doi ket cau, HVAC, cap thoat nuoc, chieu sang va thiet bi, giam thieu xung dot truoc khi dua ra cong truong.'
              : 'Technical coordination is resolved early through alignment between structure, HVAC, plumbing, lighting, and equipment positions, reducing clashes before site execution begins.',
          },
        ]}
      />

      {/* ── Services Alternating Sections ── */}
      <div className="svc-list">
        {displayServices.map((service, i) => {
          const isEven = i % 2 === 0;
          return (
            <section key={service.slug} className={`svc-row ${isEven ? 'svc-row--light' : 'svc-row--dark'}`}>
              <div className="svc-row-inner shell">
                {/* Image / Placeholder side */}
                <div className={`svc-media ${isEven ? 'svc-media--left' : 'svc-media--right'}`}>
                  {service.coverUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={service.coverUrl} alt={service.title} className="svc-img" />
                    </>
                  ) : (
                    <div className="svc-img-placeholder">
                      <span className="svc-index-bg">{service.index}</span>
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className={`svc-content ${isEven ? 'svc-content--right' : 'svc-content--left'}`}>
                  <span className="svc-index">{service.index}</span>
                  <p className="svc-meta">{service.meta}</p>
                  <h2 className="svc-title">{service.title}</h2>
                  <p className="svc-desc">{service.description}</p>
                  {service.deliverables.length > 0 && (
                    <ul className="svc-deliverables">
                      {service.deliverables.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                  <Link href={`/${locale}/services/${service.slug}`} className="svc-link">
                    {locale === 'vi' ? 'Xem chi tiet' : 'Learn more'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA ── */}
      {/* <section className="section-block">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Hợp tác với chúng tôi' : 'Work with us'}
            title={locale === 'vi' ? 'Sẵn sàng khởi động dự án của bạn?' : 'Ready to start your project?'}
            description={locale === 'vi'
              ? 'Liên hệ đội ngũ tư vấn của chúng tôi để nhận đánh giá nhu cầu và tư vấn giải pháp phù hợp nhất.'
              : 'Contact our advisory team to receive a needs assessment and the most suitable solution.'}
            primary={{label: locale === 'vi' ? 'Đặt lịch tư vấn' : 'Book a consultation', href: `/${locale}/contact`}}
            secondary={{label: locale === 'vi' ? 'Xem dự án' : 'View projects', href: `/${locale}/projects`}}
          />
        </div>
      </section> */}

      <style>{`
        /* ── Services list ───────────────────────────── */
        .svc-list {
          width: 100%;
        }

        .svc-row {
          padding: 0;
          overflow: hidden;
        }

        .svc-row--light {
          background: #fafafa;
          color: #1B1718;
        }

        .svc-row--dark {
          background: var(--surface-dark, #1B1718);
          color: #fff;
        }

        .svc-row-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          align-items: stretch;
          padding: 0;
          max-width: 100%;
        }

        /* ── Media (image) side ──────────────────────── */
        .svc-media {
          position: relative;
          overflow: hidden;
        }

        .svc-media--right {
          order: 2;
        }

        .svc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .svc-img-placeholder {
          width: 100%;
          height: 100%;
          min-height: 400px;
          background: linear-gradient(135deg, #2a2626 0%, #1a1212 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .svc-row--light .svc-img-placeholder {
          background: linear-gradient(135deg, #e8e4e0 0%, #d0ccc8 100%);
        }

        .svc-index-bg {
          font-family: var(--font-roboto, sans-serif);
          font-size: clamp(120px, 18vw, 220px);
          font-weight: 900;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          user-select: none;
          letter-spacing: -0.05em;
          position: absolute;
          bottom: -0.1em;
          right: -0.05em;
        }

        .svc-row--light .svc-index-bg {
          color: rgba(0,0,0,0.05);
        }

        /* ── Content side ────────────────────────────── */
        .svc-content {
          padding: clamp(48px, 6vw, 100px) clamp(32px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .svc-content--left {
          order: 1;
        }

        .svc-index {
          font-family: var(--font-roboto, monospace);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          opacity: 0.35;
          text-transform: uppercase;
        }

        .svc-meta {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.55;
          margin: 0;
        }

        .svc-title {
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 4px 0 0;
        }

        .svc-desc {
          font-size: 16px;
          line-height: 1.7;
          opacity: 0.75;
          max-width: 500px;
          margin: 0;
        }

        .svc-deliverables {
          list-style: none;
          padding: 0;
          margin: 8px 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .svc-deliverables li {
          font-size: 14px;
          line-height: 1.5;
          opacity: 0.75;
          padding-left: 16px;
          position: relative;
        }

        .svc-deliverables li::before {
          content: '—';
          position: absolute;
          left: 0;
          opacity: 0.5;
        }

        .svc-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          margin-top: 12px;
          transition: gap 0.2s ease, opacity 0.2s;
        }

        .svc-row--dark .svc-link {
          color: #fff;
        }

        .svc-row--light .svc-link {
          color: var(--surface-dark, #1B1718);
        }

        .svc-link:hover {
          gap: 16px;
          opacity: 0.7;
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 768px) {
          .svc-row-inner {
            grid-template-columns: 1fr;
          }
          .svc-media--right { order: 0; }
          .svc-content--left { order: 1; }
          .svc-img-placeholder { min-height: 260px; }
        }
      `}</style>
    </>
  );
}
