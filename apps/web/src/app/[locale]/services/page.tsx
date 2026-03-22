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
    title: locale === 'vi' ? 'Dịch vụ — ALADDIN JSC' : 'Services — ALADDIN JSC',
    description: locale === 'vi'
      ? 'Khám phá các dịch vụ thi công, thiết kế và vận hành chuỗi nhà hàng chuyên nghiệp của ALADDIN JSC.'
      : 'Explore ALADDIN JSC professional F&B fit-out, design and operations services.',
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
        eyebrow={locale === 'vi' ? 'Dịch Vụ' : 'What We Do'}
        title={locale === 'vi' ? 'Giải pháp toàn diện từ thiết kế đến vận hành.' : 'End-to-end solutions from design to operations.'}
        description={locale === 'vi'
          ? 'Chúng tôi quản lý mọi giai đoạn — từ tư vấn ý tưởng đến bàn giao vận hành chuỗi nhà hàng.'
          : 'We manage every phase — from concept consulting to operational handover of F&B chains.'}
      />

      {/* ── Services Grid — Overview ── */}
      <ServicesGrid
        heading={locale === 'vi' ? 'DỊCH VỤ CỦA CHÚNG TÔI' : 'OUR SERVICES'}
        items={[
          {
            icon: <IconPMCM />,
            title: locale === 'vi' ? 'Quản Lý Dự Án' : 'PMCM',
            subtitle: locale === 'vi' ? 'Quản lý & Giám sát Thi công' : 'Project Management & Construction Management',
            description: locale === 'vi'
              ? 'Chúng tôi quản lý toàn bộ quá trình từ ý tưởng đến bàn giao — phối hợp tất cả các bộ phận để đảm bảo chất lượng, kiểm soát chi phí và tiến độ.'
              : 'We manage every phase from concept to completion — coordinating all disciplines to ensure quality, cost control, and on-time delivery.',
          },
          {
            icon: <IconFitOut />,
            title: locale === 'vi' ? 'Thi Công Nhà Hàng' : 'Restaurant Fit-Out',
            subtitle: locale === 'vi' ? 'Hoàn thiện không gian F&B' : 'Full F&B Space Execution',
            description: locale === 'vi'
              ? 'Gói thi công toàn diện từ mặt tiền, bếp đến khu vực hậu trường — đảm bảo khai trương đúng tiến độ và vận hành hiệu quả.'
              : 'Full execution package for front-of-house, kitchen and back-of-house coordination — built for operational readiness.',
          },
          {
            icon: <IconDesign />,
            title: locale === 'vi' ? 'Thiết Kế Nội Thất' : 'Interior Design',
            subtitle: locale === 'vi' ? 'Sáng tạo & thẩm mỹ không gian' : 'Creative & Aesthetic Spaces',
            description: locale === 'vi'
              ? 'Triết lý thiết kế tập trung vào sự cân bằng và chi tiết — từng vật liệu, texture và ánh sáng được lựa chọn kỹ để phản ánh bản sắc thương hiệu.'
              : 'Design philosophy focused on balance and detail — every material, texture, and lighting element thoughtfully selected to reflect the brand identity.',
          },
          {
            icon: <IconMEP />,
            title: locale === 'vi' ? 'Phối Hợp MEP' : 'MEP Coordination',
            subtitle: locale === 'vi' ? 'Kỹ thuật cơ điện & hệ thống' : 'Mechanical, Electrical & Plumbing',
            description: locale === 'vi'
              ? 'Phối hợp kỹ thuật toàn diện giữa kết cấu, HVAC, hệ thống thoát nước, chiếu sáng và vị trí thiết bị bếp — giảm thiểu xung đột trước khi thi công.'
              : 'Technical alignment across structure, HVAC, plumbing, lighting and equipment positions — reducing clashes before site execution.',
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
                    {locale === 'vi' ? 'Xem chi tiết' : 'Learn more'}
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
