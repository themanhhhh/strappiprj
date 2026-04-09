import type {Metadata} from 'next';
import Link from 'next/link';
import {PageHero} from '@/components/page-hero';
import {ServicesGrid, IconFitOut, IconMEP, IconDesign, IconPMCM} from '@/components/services-grid';
import {getServices, getHeroSlides} from '@/lib/strapi/queries';
import {services as catalogServices} from '@/lib/catalog';

type ServicesPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: ServicesPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Dịch vụ - MAESTRO' : 'Services - MAESTRO',
    description: locale === 'vi'
      ? 'Khám phá các dịch vụ construction, fit-out, joinery va điều phối kỹ thuật được MAESTRO triển khai với sự chính xác và tính đồng bộ cao.'
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
        eyebrow={locale === 'vi' ? 'Dịch vụ' : 'What We Do'}
        title={locale === 'vi' ? 'Những năng lực được xây dựng để đưa dự án từ ý tưởng đến giai đoạn bàn giao.' : 'Capabilities built to carry a project from concept through handover.'}
        description={locale === 'vi'
          ? 'MAESTRO cung cấp một hệ thống dịch vụ liên kết giữa construction, fit-out, joinery và giám sát thi công, nhằm đảm bảo chất lượng, tiến độ và tính đồng bộ của từng hạng mục.'
          : 'MAESTRO provides an integrated service structure across construction, fit-out, joinery, and site supervision to secure quality, timing, and coordination at every stage.'}
      />

      <section className="services-overview-band">
        <div className="shell services-overview-shell">
          <div className="services-overview-intro">
            <p className="services-overview-kicker">{locale === 'vi' ? 'Năng lực cốt lõi' : 'Core capabilities'}</p>
            <h2>{locale === 'vi' ? 'Một hệ dịch vụ được tổ chức để giữ chất lượng và tính đồng bộ ở mọi giai đoạn.' : 'A service system organized to protect quality and coordination at every stage.'}</h2>
            <p>
              {locale === 'vi'
                ? 'Thay vì trình bày dịch vụ như các hạng mục rời rạc, trang này nhóm chúng thành một cấu trúc vận hành rõ ràng: quản lý, thiết kế, thi công và phối hợp kỹ thuật.'
                : 'Rather than listing services as isolated items, this page frames them as a coordinated operating structure across management, design, execution, and technical integration.'}
            </p>
          </div>

          <ServicesGrid
            heading={locale === 'vi' ? 'Dịch vụ cốt lõi' : 'Core Services'}
            items={[
              {
                icon: <IconPMCM />,
                title: locale === 'vi' ? 'Quản lý dự án' : 'PMCM',
                subtitle: locale === 'vi' ? 'Project Management & Construction Management' : 'Project Management & Construction Management',
                description: locale === 'vi'
                  ? 'Điều phối tổng thể giữa tiến độ, chất lượng, ngân sách và các bộ môn kỹ thuật để dự án vận hành mạch lạc từ đầu đến cuối.'
                  : 'Overall coordination across programme, quality, budget, and technical disciplines from briefing through handover.',
              },
              {
                icon: <IconFitOut />,
                title: locale === 'vi' ? 'Interior fit-out' : 'Interior Fit-Out',
                subtitle: locale === 'vi' ? 'Thi công và hoàn thiện nội thất' : 'Interior execution and finishing',
                description: locale === 'vi'
                  ? 'Triển khai fit-out với mức độ hoàn thiện cao, cân bằng giữa thẩm mỹ, độ bền và tính sẵn sàng vận hành.'
                  : 'High-standard fit-out delivery balancing finish quality, durability, and operational readiness.',
              },
              {
                icon: <IconDesign />,
                title: locale === 'vi' ? 'Thiết kế nội thất' : 'Interior Design',
                subtitle: locale === 'vi' ? 'Vật liệu, tỷ lệ và ánh sáng' : 'Material, proportion, and light',
                description: locale === 'vi'
                  ? 'Định hình không gian bằng ngôn ngữ tiết chế, chú trọng vật liệu, tỷ lệ và sắc độ hoàn thiện.'
                  : 'Spaces shaped with restraint through material language, proportion, and tonal refinement.',
              },
              {
                icon: <IconMEP />,
                title: locale === 'vi' ? 'Phối hợp MEP' : 'MEP Coordination',
                subtitle: locale === 'vi' ? 'Mechanical, Electrical & Plumbing' : 'Mechanical, Electrical & Plumbing',
                description: locale === 'vi'
                  ? 'Kiểm soát giao cắt kỹ thuật sớm để giảm xung đột và tăng độ chính xác trước khi triển khai ngoài công trường.'
                  : 'Early coordination of technical interfaces to reduce clashes and improve site accuracy before execution begins.',
              },
            ]}
          />
        </div>
      </section>

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

      <style>{`
        .services-overview-band {
          padding: clamp(72px, 9vw, 120px) 0 clamp(36px, 5vw, 56px);
          background: linear-gradient(180deg, #f6f2eb 0%, #fbfaf7 100%);
        }

        .services-overview-shell {
          display: grid;
          gap: 40px;
        }

        .services-overview-intro {
          max-width: 820px;
          display: grid;
          gap: 18px;
        }

        .services-overview-kicker {
          margin: 0;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a7a58;
        }

        .services-overview-intro h2 {
          margin: 0;
          max-width: 16ch;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 0.98;
          color: #111;
        }

        .services-overview-intro p:last-child {
          margin: 0;
          max-width: 64ch;
          color: rgba(17, 17, 17, 0.68);
          line-height: 1.8;
        }

        /* ── Services list ───────────────────────────── */
        .svc-list {
          width: 100%;
          padding: 0 0 clamp(72px, 9vw, 120px);
          background: #fbfaf7;
        }

        .svc-row {
          padding: clamp(18px, 2vw, 26px) 0;
        }

        .svc-row-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 560px;
          align-items: stretch;
          padding: 0;
          max-width: var(--shell-width);
          background: #fff;
          border: 1px solid rgba(17, 17, 17, 0.08);
          overflow: hidden;
        }

        .svc-row--dark .svc-row-inner {
          background: #151515;
          border-color: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        /* ── Media (image) side ──────────────────────── */
        .svc-media {
          position: relative;
          overflow: hidden;
          background: #ece8e1;
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
          background: linear-gradient(135deg, #f0ebe3 0%, #ddd4c7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .svc-row--dark .svc-img-placeholder {
          background: linear-gradient(135deg, #292522 0%, #171311 100%);
        }

        .svc-index-bg {
          font-family: var(--font-editorial);
          font-size: clamp(120px, 18vw, 220px);
          font-weight: 600;
          color: rgba(17, 17, 17, 0.06);
          line-height: 1;
          user-select: none;
          letter-spacing: -0.05em;
          position: absolute;
          bottom: -0.1em;
          right: -0.05em;
        }

        .svc-row--dark .svc-index-bg {
          color: rgba(255, 255, 255, 0.05);
        }

        /* ── Content side ────────────────────────────── */
        .svc-content {
          padding: clamp(44px, 6vw, 88px) clamp(28px, 4.5vw, 72px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        .svc-content--left {
          order: 1;
        }

        .svc-index {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          opacity: 0.42;
          text-transform: uppercase;
        }

        .svc-meta {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a7a58;
          margin: 0;
        }

        .svc-row--dark .svc-meta {
          color: rgba(255, 255, 255, 0.64);
        }

        .svc-title {
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 600;
          line-height: 1.02;
          margin: 4px 0 0;
          color: inherit;
        }

        .svc-desc {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(17, 17, 17, 0.68);
          max-width: 56ch;
          margin: 0;
        }

        .svc-row--dark .svc-desc {
          color: rgba(255, 255, 255, 0.74);
        }

        .svc-deliverables {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .svc-deliverables li {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(17, 17, 17, 0.66);
          padding-left: 18px;
          position: relative;
        }

        .svc-row--dark .svc-deliverables li {
          color: rgba(255, 255, 255, 0.7);
        }

        .svc-deliverables li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.72em;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #8a7a58;
        }

        .svc-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          margin-top: 18px;
          transition: gap 0.2s ease, opacity 0.2s;
        }

        .svc-row--dark .svc-link {
          color: #fff;
        }

        .svc-row--light .svc-link {
          color: #111;
        }

        .svc-link:hover {
          gap: 14px;
          opacity: 0.7;
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 1024px) {
          .svc-row-inner {
            min-height: 0;
          }

          .svc-content {
            padding: 40px 32px;
          }
        }

        @media (max-width: 768px) {
          .svc-row-inner {
            grid-template-columns: 1fr;
          }

          .svc-media--right { order: 0; }
          .svc-content--left { order: 1; }
          .svc-img,
          .svc-img-placeholder {
            min-height: 280px;
          }

          .services-overview-intro h2 {
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
