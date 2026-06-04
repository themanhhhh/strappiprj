import type {Metadata} from 'next';
import Image from 'next/image';
import {ButtonLink} from '@/components/button-link';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides} from '@/lib/strapi/queries';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type AboutPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: AboutPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Giới thiệu New Sky' : 'About New Sky',
    description:
      locale === 'vi'
        ? 'New Sky là đối tác thiết kế và thi công nhà hàng trọn gói cho chủ nhà hàng, chuỗi F&B và dự án khách sạn tại Việt Nam.'
        : 'New Sky is a design-and-build partner for restaurants, F&B chains, and hospitality projects in Vietnam.',
  };
}

const viStats = [
  {value: '10 năm', label: 'Đồng hành cùng hệ thống chuỗi nhà hàng của Aladdin.,JSC'},
  {value: '100+', label: 'Dự án nhà hàng đã thi công trên cả 3 miền'},
  {value: '16 ngày', label: 'Từ nhận mặt bằng đến khai trương dự án 84 Ngọc Khánh'},
  {value: '3.000m2', label: 'Xưởng sản xuất Inox tại Hà Đông, Hà Nội'},
];

const enStats = [
  {value: '10 years', label: 'Working alongside Aladdin.,JSC restaurant chains'},
  {value: '100+', label: 'Restaurant projects delivered across Vietnam'},
  {value: '16 days', label: 'From site handover to opening at 84 Ngoc Khanh'},
  {value: '3,000sqm', label: 'Stainless-steel production workshop in Ha Dong, Hanoi'},
];

const viCommitments = [
  {
    label: 'Cam kết tiến độ',
    body: 'New Sky lấy tiến độ làm một lợi thế cạnh tranh quan trọng. Dự án tổ hợp Bò Tơ Quán Mộc + Long Wang tại 84 Ngọc Khánh, Ba Đình, Hà Nội, quy mô 1.260m2, được triển khai từ nhận mặt bằng đến khai trương trong 16 ngày.',
  },
  {
    label: 'Cam kết chất lượng',
    body: 'Chất lượng được xây dựng từ kinh nghiệm thực chiến qua 100+ dự án nhà hàng trong 10 năm. Mỗi dự án được kiểm soát từ thiết kế, vật tư, sản xuất, lắp đặt đến nghiệm thu để hạn chế tối đa sửa chữa lớn sau bàn giao.',
  },
  {
    label: 'Cam kết niềm tin',
    body: 'Niềm tin của khách hàng đến từ bằng chứng cụ thể: 10 năm đồng hành cùng hệ thống chuỗi nhà hàng của Aladdin.,JSC, từ giai đoạn khởi đầu đến khi hệ thống phát triển thành nhiều thương hiệu và hàng trăm cơ sở.',
  },
];

const enCommitments = [
  {
    label: 'Programme Commitment',
    body: 'New Sky treats speed as a core competitive advantage. The combined Bo To Quan Moc + Long Wang project at 84 Ngoc Khanh, Ba Dinh, Hanoi, covering 1,260sqm, was delivered from site handover to opening in 16 days.',
  },
  {
    label: 'Quality Commitment',
    body: 'Quality is built from hands-on experience across more than 100 restaurant projects over 10 years. Each project is controlled from design, materials, production, and installation through to acceptance to reduce major post-handover rework.',
  },
  {
    label: 'Trust Commitment',
    body: 'Customer trust is built on concrete proof: 10 years working with the Aladdin.,JSC restaurant-chain system, from its early stage to a multi-brand ecosystem with hundreds of outlets.',
  },
];

const viCapabilities = [
  {
    label: 'Thiết kế nội thất',
    body: 'Triển khai ý tưởng, kiến trúc, nội thất và bản vẽ thi công phù hợp với định vị thương hiệu.',
    image: '/images/image1.png',
  },
  {
    label: 'Cơ điện',
    body: 'Hệ thống điện, cấp thoát nước, thông gió, hút khói và phối hợp tiêu chuẩn PCCC.',
    image: '/images/image2.png',
  },
  {
    label: 'Inox bếp công nghiệp',
    body: 'Bàn Inox, giá kệ, bồn rửa, tủ bếp và hệ thống thiết bị bếp được sản xuất tại xưởng riêng.',
    image: '/images/image3.png',
  },
  {
    label: 'Xây dựng và cải tạo',
    body: 'Xử lý mặt bằng nhà phố, trung tâm thương mại, khách sạn hoặc dự án lưu trú.',
    image: '/images/image4.png',
  },
  {
    label: 'Lắp đặt và bàn giao vận hành',
    body: 'Lắp đặt thiết bị, chạy thử, nghiệm thu, bàn giao hồ sơ kỹ thuật và hỗ trợ vận hành ban đầu.',
    image: '/images/image5.png',
  },
];

const enCapabilities = [
  {
    label: 'Interior Design',
    body: 'Concept, architecture, interior design, and construction drawings aligned with each brand position.',
    image: '/images/image1.png',
  },
  {
    label: 'MEP Systems',
    body: 'Electrical, water supply and drainage, ventilation, smoke extraction, and coordination with fire-safety standards.',
    image: '/images/image2.png',
  },
  {
    label: 'Industrial Kitchen Stainless Steel',
    body: 'Stainless-steel tables, shelves, sinks, cabinets, and kitchen equipment systems produced at New Sky\'s own workshop.',
    image: '/images/image3.png',
  },
  {
    label: 'Construction and Renovation',
    body: 'Site works for townhouses, shopping malls, hotels, and hospitality projects.',
    image: '/images/image4.png',
  },
  {
    label: 'Installation and Operational Handover',
    body: 'Equipment installation, testing, acceptance, technical document handover, and initial operational support.',
    image: '/images/image5.png',
  },
];

const viFactoryBenefits = [
  'Chủ động sản xuất thiết bị bếp Inox công nghiệp.',
  'Rút ngắn tiến độ so với việc thuê gia công ngoài.',
  'Kiểm soát đồng bộ chất lượng từ sản xuất đến lắp đặt.',
  'Đáp ứng cùng lúc nhiều dự án chuỗi, nhà hàng quy mô lớn và dự án khách sạn - lưu trú.',
];

const enFactoryBenefits = [
  'Proactive production of industrial stainless-steel kitchen equipment.',
  'Shorter timelines compared with outsourced fabrication.',
  'Consistent quality control from production through installation.',
  'Capacity to support multiple chain, large restaurant, and hospitality projects at the same time.',
];

const viDirectorProfile = [
  'Ông Lưu Văn Sỹ là Giám đốc Công ty TNHH Xây Dựng và Thực Phẩm New Sky, người định hướng năng lực thiết kế và thi công trọn gói cho các dự án nhà hàng, chuỗi F&B và khách sạn - lưu trú tại Việt Nam.',
  'Với kinh nghiệm đồng hành cùng hệ thống chuỗi nhà hàng của Aladdin.,JSC, ông tập trung xây dựng New Sky theo hướng thực thi nhanh, kiểm soát chất lượng chặt chẽ và phát triển năng lực sản xuất nội bộ, đặc biệt là hệ thống bếp Inox công nghiệp.',
];

const enDirectorProfile = [
  'Mr. Luu Van Sy is the Director of New Sky Construction and Food Co., Ltd., leading the company\'s design-and-build capability for restaurants, F&B chains, and hospitality projects in Vietnam.',
  'With experience working alongside the Aladdin.,JSC restaurant-chain system, he focuses on building New Sky around fast execution, strict quality control, and stronger in-house production capability, especially for industrial stainless-steel kitchen systems.',
];

export default async function AboutPage({params}: AboutPageProps) {
  const {locale} = await params;
  const isVi = locale === 'vi';
  const stats = isVi ? viStats : enStats;
  const commitments = isVi ? viCommitments : enCommitments;
  const capabilities = isVi ? viCapabilities : enCapabilities;
  const factoryBenefits = isVi ? viFactoryBenefits : enFactoryBenefits;
  const heroSlides = await getHeroSlides(locale, 'about');
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={isVi ? 'Giới thiệu New Sky' : 'About New Sky'}
        title={isVi ? 'Đối tác thiết kế và thi công trọn gói cho chủ nhà hàng Việt' : 'Design-and-build partner for restaurant owners in Vietnam'}
        description={isVi ? 'Thiết kế - thi công nhà hàng - cơ điện - bếp Inox công nghiệp - bàn giao vận hành' : 'Design - restaurant construction - MEP - industrial stainless-steel kitchens - operational handover'}
      />

      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>
              {isVi
                ? 'Một đầu mối duy nhất cho toàn bộ quá trình triển khai nhà hàng'
                : 'One accountable partner for the full restaurant delivery process'}
            </h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {isVi
                ? 'New Sky là đối tác chuyên thiết kế và thi công nhà hàng trọn gói, phục vụ chủ nhà hàng, chuỗi F&B và các dự án khách sạn - lưu trú tại Việt Nam. Với kinh nghiệm 10 năm đồng hành cùng hệ thống chuỗi nhà hàng của Aladdin.,JSC, New Sky đã tham gia thi công hơn 100 dự án nhà hàng trên cả 3 miền Bắc - Trung - Nam.'
                : 'New Sky is a specialist design-and-build partner for restaurant owners, F&B chains, and hospitality projects in Vietnam. With 10 years working alongside the Aladdin.,JSC restaurant-chain system, New Sky has delivered more than 100 restaurant projects across Northern, Central, and Southern Vietnam.'}
            </p>
            <p>
              {isVi
                ? 'Chúng tôi triển khai đồng bộ từ ý tưởng thiết kế, bản vẽ kỹ thuật, cơ điện, hệ thống bếp Inox công nghiệp, cải tạo mặt bằng, lắp đặt thiết bị đến bàn giao vận hành. Cách làm này giúp chủ đầu tư giảm thời gian phối hợp với nhiều nhà thầu, kiểm soát chất lượng tốt hơn và rút ngắn tiến độ khai trương.'
                : 'We coordinate concept design, technical drawings, MEP, industrial stainless-steel kitchen systems, site renovation, equipment installation, and operational handover. This approach helps investors reduce contractor coordination time, improve quality control, and shorten opening schedules.'}
            </p>
            <p>
              {isVi
                ? 'New Sky không lựa chọn cạnh tranh bằng giá rẻ nhất. Chúng tôi cạnh tranh bằng tiến độ, chất lượng và niềm tin được chứng minh qua các dự án thực tế.'
                : 'New Sky does not compete by being the cheapest. We compete through programme, quality, and trust proven by completed projects.'}
            </p>
            <div className="button-row" style={{marginTop: '32px'}}>
              <ButtonLink href={`/${locale}/projects`} variant="primary">
                {isVi ? 'Khám phá dự án' : 'Explore projects'}
              </ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="secondary">
                {isVi ? 'Liên hệ tư vấn' : 'Contact us'}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="about-leader-section">
        <div className="shell about-leader-card">
          <div className="about-leader-content">
            <div className="about-leader-portrait" aria-hidden="true">
              <span>LVS</span>
            </div>
            <div className="about-leader-copy">
              <div className="about-leader-heading">
                <span>{isVi ? 'Người đứng đầu' : 'Leadership'}</span>
                <h2>{isVi ? 'Giám đốc công ty' : 'Company Director'}</h2>
              </div>
              <div className="about-leader-signature about-leader-signature-top">
                <strong>{isVi ? 'Lưu Văn Sỹ' : 'Luu Van Sy'}</strong>
                <span>{isVi ? 'Giám đốc - Công ty TNHH Xây Dựng và Thực Phẩm New Sky' : 'Director - New Sky Construction and Food Co., Ltd.'}</span>
              </div>
              {(isVi ? viDirectorProfile : enDirectorProfile).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-vmv-section">
        <div className="shell">
          <ul className="about-vmv-list">
            {commitments.map((item) => (
              <li key={item.label} className="about-vmv-item">
                <h3 className="about-vmv-label">{item.label}</h3>
                <p className="about-vmv-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-stats-section">
        <div className="shell about-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat-item">
              <span className="about-stat-value">{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>{isVi ? 'Năng lực thi công trọn gói' : 'End-to-end delivery capability'}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <div className="about-history-timeline">
              {capabilities.map((item) => (
                <div key={item.label} className="about-timeline-item">
                  <div className="about-capability-image">
                    <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 100vw, 220px" />
                  </div>
                  <div className="about-timeline-content">
                    <h4>{item.label}</h4>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-team-section">
        <div className="shell">
          <div className="about-team-header">
            <h2>{isVi ? 'Xưởng sản xuất Inox 3.000m2' : '3,000sqm Stainless-Steel Workshop'}</h2>
            <p>
              {isVi
                ? 'Xưởng đặt tại Hà Đông, Hà Nội, bao gồm khu sản xuất và bãi tập kết, giúp New Sky chủ động hơn trong khâu sản xuất bếp Inox công nghiệp và kiểm soát chất lượng ngay từ cắt CNC, chấn, hàn đến đóng gói và lắp đặt.'
                : 'Located in Ha Dong, Hanoi, the workshop includes production and staging areas, giving New Sky greater control over industrial kitchen fabrication from CNC cutting, bending, and welding through to packing and installation.'}
            </p>
          </div>
          <div className="about-team-grid">
            {factoryBenefits.map((benefit, index) => (
              <div key={benefit} className="about-team-card">
                <div className="about-team-avatar">
                  <span>{index + 1}</span>
                </div>
                <h3 className="about-team-name">{isVi ? 'Lợi thế xưởng riêng' : 'Workshop Advantage'}</h3>
                <div className="about-team-divider" />
                <p className="about-team-bio">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>{isVi ? 'Lợi ích dành cho chủ đầu tư' : 'Benefits for investors'}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {isVi
                ? 'Khi lựa chọn New Sky, chủ đầu tư có thể làm việc với một đơn vị có khả năng triển khai đồng bộ từ thiết kế đến thi công và bàn giao. Điều này giúp dự án rõ trách nhiệm, giảm rủi ro chồng chéo giữa các nhà thầu, kiểm soát tiến độ tốt hơn và đảm bảo chất lượng đồng nhất trong toàn bộ quá trình triển khai.'
                : 'By choosing New Sky, investors work with one partner capable of coordinating design, construction, and handover. This clarifies responsibility, reduces overlap between contractors, improves programme control, and keeps quality consistent throughout the delivery process.'}
            </p>
            <p>
              <strong>{isVi ? 'New Sky - Đối tác thiết kế và thi công trọn gói cho chủ nhà hàng Việt.' : 'New Sky - Design-and-build partner for restaurant owners in Vietnam.'}</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
