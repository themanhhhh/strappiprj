import type {Metadata} from 'next';
import Image from 'next/image';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides} from '@/lib/strapi/queries';

type ServicesPageProps = {
  params: Promise<{locale: string}>;
};

type Capability = {
  index: string;
  title: string;
  description: string;
  image: string;
};

type ProcessStep = {
  index: string;
  title: string;
  scope: string;
  timeline: string;
  owner: string;
};

export async function generateMetadata({params}: ServicesPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Năng lực thi công - New Sky' : 'Capabilities - New Sky',
    description: locale === 'vi'
      ? '5 năng lực cốt lõi, xưởng Inox 3.000m2 và quy trình thi công 6 bước của New Sky.'
      : 'New Sky core capabilities, 3,000sqm stainless-steel workshop, and six-step construction process.',
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

const viCapabilities: Capability[] = [
  {
    index: '01',
    title: 'Thiết kế nội thất',
    description: 'Triển khai bản vẽ kiến trúc + nội thất từ ý tưởng ban đầu đến chi tiết thi công, phù hợp định vị thương hiệu chủ nhà hàng.',
    image: '/images/image1.png',
  },
  {
    index: '02',
    title: 'Cơ điện',
    description: 'Hệ thống điện, nước cấp, nước thải, thông gió, hút khói và phối hợp tiêu chuẩn PCCC cho nhà hàng, bao gồm yêu cầu của BQL trung tâm thương mại khi cần.',
    image: '/images/image2.png',
  },
  {
    index: '03',
    title: 'Inox bếp công nghiệp',
    description: 'Bàn Inox, giá kệ, tủ bếp, bồn rửa và hệ thống thiết bị bếp được sản xuất trực tiếp tại xưởng Inox 3.000m2 nội bộ.',
    image: '/images/image3.png',
  },
  {
    index: '04',
    title: 'Xây dựng',
    description: 'Cải tạo mặt bằng nhà phố, dựng vách ngăn và hoàn thiện sàn - tường - trần theo bản vẽ thiết kế.',
    image: '/images/image4.png',
  },
  {
    index: '05',
    title: 'Lắp đặt + bàn giao vận hành',
    description: 'Lắp đặt thiết bị, chạy thử, nghiệm thu, bàn giao hồ sơ kỹ thuật và hỗ trợ vận hành 30 ngày đầu sau khai trương.',
    image: '/images/image5.png',
  },
];

const enCapabilities: Capability[] = [
  {
    index: '01',
    title: 'Interior Design',
    description: 'Architecture and interior drawings from initial concept to construction details, aligned with each restaurant brand position.',
    image: '/images/image1.png',
  },
  {
    index: '02',
    title: 'MEP Systems',
    description: 'Electrical, water supply, wastewater, ventilation, smoke extraction, and fire-safety coordination, including mall management requirements when needed.',
    image: '/images/image2.png',
  },
  {
    index: '03',
    title: 'Industrial Kitchen Stainless Steel',
    description: 'Stainless-steel tables, shelves, cabinets, sinks, and kitchen equipment systems produced directly at New Sky\'s 3,000sqm in-house workshop.',
    image: '/images/image3.png',
  },
  {
    index: '04',
    title: 'Construction',
    description: 'Site renovation, partition works, and floor - wall - ceiling finishes executed according to approved construction drawings.',
    image: '/images/image4.png',
  },
  {
    index: '05',
    title: 'Installation + Operational Handover',
    description: 'Equipment installation, testing, acceptance, technical document handover, and 30-day initial operational support after opening.',
    image: '/images/image5.png',
  },
];

const viProcess: ProcessStep[] = [
  {index: '01', title: 'Khảo sát', scope: 'Đo đạc mặt bằng, ghi nhận hạ tầng điện, nước, thoát thải và yêu cầu BQL tòa nhà nếu là TTTM.', timeline: '3-7 ngày', owner: 'Đội thiết kế + giám sát'},
  {index: '02', title: 'Thiết kế', scope: 'Ý tưởng ban đầu và bản vẽ chi tiết: kiến trúc, nội thất, cơ điện, Inox bếp. Điều chỉnh đến khi khách hàng duyệt.', timeline: '7-14 ngày', owner: 'Đội thiết kế'},
  {index: '03', title: 'Báo giá + hợp đồng', scope: 'Bóc tách khối lượng vật tư, nhân công, thời gian và thiết bị; lên báo giá chi tiết, ký hợp đồng và tạm ứng.', timeline: '3-5 ngày', owner: 'Đội thiết kế + kế toán'},
  {index: '04', title: 'Sản xuất tại xưởng', scope: 'Sản xuất Inox và đồ furniture nội thất tại xưởng Hà Đông, song song chuẩn bị vật tư xây dựng và cơ điện.', timeline: '4-6 ngày', owner: 'Đội thi công xưởng'},
  {index: '05', title: 'Lắp đặt công trường', scope: 'Vận chuyển, lắp đặt Inox, cơ điện, thi công xây dựng hoàn thiện và chạy thử thiết bị.', timeline: '3-5 ngày', owner: 'Đội thi công + giám sát'},
  {index: '06', title: 'Bàn giao + bảo hành', scope: 'Nghiệm thu, bàn giao hồ sơ kỹ thuật, đào tạo vận hành ban đầu và bảo hành 12 tháng cho hạng mục Inox và lắp đặt.', timeline: 'Sau khai trương', owner: 'Toàn đội'},
];

const enProcess: ProcessStep[] = [
  {index: '01', title: 'Survey', scope: 'Measure the site, record electrical, water, and drainage conditions, and review landlord requirements for mall projects.', timeline: '3-7 days', owner: 'Design + supervision teams'},
  {index: '02', title: 'Design', scope: 'Initial concept and detailed drawings across architecture, interiors, MEP, and kitchen stainless steel, adjusted until approval.', timeline: '7-14 days', owner: 'Design team'},
  {index: '03', title: 'Quotation + Contract', scope: 'Break down materials, labour, timeline, and equipment; prepare detailed quotation, sign contract, and collect deposit.', timeline: '3-5 days', owner: 'Design + accounting teams'},
  {index: '04', title: 'Workshop Production', scope: 'Produce stainless-steel and furniture items at the Ha Dong workshop while preparing construction and MEP materials in parallel.', timeline: '4-6 days', owner: 'Workshop team'},
  {index: '05', title: 'Site Installation', scope: 'Transport and install stainless steel, MEP, and construction finishes, then test equipment on site.', timeline: '3-5 days', owner: 'Construction + supervision teams'},
  {index: '06', title: 'Handover + Warranty', scope: 'Acceptance, technical document handover, initial operation training, and 12-month warranty for stainless-steel and installation works.', timeline: 'After opening', owner: 'Full team'},
];

export default async function ServicesPage({params}: ServicesPageProps) {
  const {locale} = await params;
  const isVi = locale === 'vi';
  const capabilities = isVi ? viCapabilities : enCapabilities;
  const process = isVi ? viProcess : enProcess;
  const heroSlides = await getHeroSlides(locale, 'services');
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url
      ? s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`
      : null,
  }));

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={isVi ? 'Năng lực thi công' : 'Capabilities'}
        title={isVi ? 'Thiết kế + thi công nhà hàng trọn gói từ ý tưởng đến ngày khai trương.' : 'End-to-end restaurant design and construction from concept to opening day.'}
        description={isVi
          ? 'New Sky tổ chức 5 hạng mục năng lực cốt lõi trong một đầu mối duy nhất, kết hợp xưởng Inox 3.000m2 và quy trình thi công 6 bước để kiểm soát tiến độ, chất lượng và bàn giao vận hành.'
          : 'New Sky organizes five core capabilities under one accountable partner, combining a 3,000sqm stainless-steel workshop and a six-step construction process to control programme, quality, and handover.'}
      />

      <section className="services-overview-band">
        <div className="shell services-overview-shell">
          <div className="services-overview-intro">
            <p className="services-overview-kicker">{isVi ? '5 năng lực cốt lõi' : '5 core capabilities'}</p>
            <h2>{isVi ? 'Một hệ năng lực phục vụ toàn bộ vòng đời triển khai nhà hàng.' : 'A capability system for the full restaurant delivery lifecycle.'}</h2>
            <p>
              {isVi
                ? 'Từ bản vẽ thiết kế, cơ điện, Inox bếp công nghiệp, xây dựng đến lắp đặt và bàn giao vận hành, New Sky kiểm soát toàn bộ quá trình bằng một đội ngũ thống nhất.'
                : 'From design drawings, MEP, industrial kitchen stainless steel, and construction through installation and operational handover, New Sky controls the full process through one integrated team.'}
            </p>
          </div>

          <div className="capability-grid">
            {capabilities.map((item) => (
              <article key={item.index} className="capability-card">
                <div className="capability-media">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="capability-copy">
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="factory-section">
        <div className="shell factory-grid">
          <div className="factory-copy">
            <p className="services-overview-kicker">{isVi ? 'Bước chuyển dịch 2026' : '2026 capability shift'}</p>
            <h2>{isVi ? 'Xưởng sản xuất Inox 3.000m2 tại Hà Đông, Hà Nội' : '3,000sqm stainless-steel workshop in Ha Dong, Hanoi'}</h2>
            <p>
              {isVi
                ? 'Xưởng Inox riêng giúp New Sky chủ động hoàn toàn từ thiết kế đến sản xuất Inox bếp, không phụ thuộc gia công ngoài như trước. Đây là nền tảng để rút ngắn tiến độ thi công gấp 2-3 lần và kiểm soát chất lượng ngay từ khâu cắt CNC, chấn, hàn đến đóng gói và lắp đặt.'
                : 'The in-house workshop gives New Sky full control from design to kitchen stainless-steel fabrication instead of relying on outside fabricators. This is the foundation for shortening delivery timelines by 2-3 times and controlling quality from CNC cutting, bending, and welding through packing and installation.'}
            </p>
          </div>
          <div className="factory-stats">
            <div><strong>3.000m2</strong><span>{isVi ? 'Tổng quy mô xưởng và bãi tập kết' : 'Total workshop and staging area'}</span></div>
            <div><strong>1.000m2</strong><span>{isVi ? 'Khu xưởng sản xuất' : 'Production workshop'}</span></div>
            <div><strong>2.000m2</strong><span>{isVi ? 'Bãi tập kết' : 'Staging area'}</span></div>
            <div><strong>2-3x</strong><span>{isVi ? 'Rút ngắn tiến độ so với thuê gia công ngoài' : 'Faster than outsourced fabrication'}</span></div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="shell">
          <div className="services-overview-intro process-intro">
            <p className="services-overview-kicker">{isVi ? 'Quy trình thi công 6 bước' : 'Six-step construction process'}</p>
            <h2>{isVi ? 'Từ khảo sát đến bàn giao, mỗi bước có phạm vi, thời gian và người phụ trách rõ ràng.' : 'From survey to handover, every step has clear scope, timing, and ownership.'}</h2>
            <p>
              {isVi
                ? 'Quy trình này được hình thành từ 10 năm thi công 100+ dự án nhà hàng, cân bằng giữa rút ngắn tiến độ, đảm bảo chất lượng và minh bạch chi phí trước khi ký hợp đồng.'
                : 'This process is shaped by 10 years and 100+ restaurant projects, balancing shorter timelines, quality control, and cost transparency before contract signing.'}
            </p>
          </div>

          <div className="process-grid">
            {process.map((step) => (
              <article key={step.index} className="process-card">
                <span className="process-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.scope}</p>
                <dl>
                  <div><dt>{isVi ? 'Thời gian' : 'Timeline'}</dt><dd>{step.timeline}</dd></div>
                  <div><dt>{isVi ? 'Phụ trách' : 'Owner'}</dt><dd>{step.owner}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .services-overview-band {
          padding: clamp(72px, 9vw, 120px) 0;
          background: linear-gradient(180deg, #f6f2eb 0%, #fbfaf7 100%);
        }

        .services-overview-shell,
        .process-section .shell {
          display: grid;
          gap: clamp(36px, 5vw, 64px);
        }

        .services-overview-intro {
          max-width: 860px;
          display: grid;
          gap: 18px;
        }

        .services-overview-kicker {
          margin: 0;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a7a58;
          font-weight: 700;
        }

        .services-overview-intro h2,
        .factory-copy h2 {
          margin: 0;
          max-width: 18ch;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 0.98;
          color: #111;
        }

        .services-overview-intro p,
        .factory-copy p {
          margin: 0;
          max-width: 68ch;
          color: rgba(17, 17, 17, 0.68);
          line-height: 1.8;
        }

        .capability-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }

        .capability-card {
          grid-column: span 2;
          background: #fff;
          border: 1px solid rgba(17, 17, 17, 0.08);
          display: grid;
        }

        .capability-card:nth-child(4),
        .capability-card:nth-child(5) {
          grid-column: span 3;
        }

        .capability-media {
          aspect-ratio: 4 / 3;
          position: relative;
          overflow: hidden;
          background: #e8e4df;
        }

        .capability-media img {
          object-fit: cover;
        }

        .capability-copy {
          padding: clamp(24px, 3vw, 34px);
          display: grid;
          gap: 12px;
        }

        .capability-copy span,
        .process-index {
          color: #8a7a58;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .capability-copy h3,
        .process-card h3 {
          margin: 0;
          color: #111;
          font-size: clamp(22px, 2vw, 30px);
          line-height: 1.1;
        }

        .capability-copy p,
        .process-card p {
          margin: 0;
          color: rgba(17, 17, 17, 0.68);
          line-height: 1.75;
        }

        .factory-section {
          padding: clamp(72px, 9vw, 120px) 0;
          background: #151515;
          color: #fff;
        }

        .factory-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(36px, 6vw, 80px);
          align-items: start;
        }

        .factory-copy h2,
        .factory-copy p {
          color: #fff;
        }

        .factory-copy p {
          color: rgba(255, 255, 255, 0.72);
          margin-top: 24px;
        }

        .factory-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .factory-stats div {
          min-height: 170px;
          background: #151515;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }

        .factory-stats strong {
          color: #c87941;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1;
        }

        .factory-stats span {
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.55;
        }

        .process-section {
          padding: clamp(72px, 9vw, 120px) 0;
          background: #fbfaf7;
        }

        .process-intro h2 {
          max-width: 22ch;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .process-card {
          background: #fff;
          border: 1px solid rgba(17, 17, 17, 0.08);
          padding: clamp(24px, 3vw, 34px);
          display: grid;
          gap: 14px;
        }

        .process-card dl {
          display: grid;
          gap: 10px;
          margin: 10px 0 0;
        }

        .process-card dl div {
          border-top: 1px solid rgba(17, 17, 17, 0.08);
          padding-top: 10px;
        }

        .process-card dt {
          color: #8a7a58;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .process-card dd {
          margin: 4px 0 0;
          color: #111;
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .capability-card,
          .capability-card:nth-child(4),
          .capability-card:nth-child(5) {
            grid-column: span 3;
          }

          .factory-grid,
          .process-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .capability-grid,
          .factory-grid,
          .factory-stats,
          .process-grid {
            grid-template-columns: 1fr;
          }

          .capability-card,
          .capability-card:nth-child(4),
          .capability-card:nth-child(5) {
            grid-column: auto;
          }

          .services-overview-intro h2,
          .factory-copy h2 {
            max-width: none;
          }

          .factory-stats div {
            min-height: 140px;
          }
        }
      `}</style>
    </>
  );
}
