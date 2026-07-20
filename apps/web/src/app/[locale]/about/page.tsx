import type {Metadata} from 'next';
import Image from 'next/image';
import {ButtonLink} from '@/components/button-link';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides} from '@/lib/strapi/queries';
import {getLocalizedAlternates, getOpenGraphLocale, siteUrl} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type AboutPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: AboutPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'aboutPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/about'),
    openGraph: {
      locale: getOpenGraphLocale(locale),
      url: `/${locale}/about`,
    },
  };
}

const viStats = [
  {value: '10 năm', label: 'Đồng hành cùng hệ thống Aladdin'},
  {value: 'Gần 160', label: 'Nhà hàng đã triển khai'},
  {value: '16 ngày', label: 'Từ nhận mặt bằng đến khai trương dự án 84 Ngọc Khánh'},
  {value: '3.000m²', label: 'Xưởng tự sản xuất tại Thượng Hồng, Hưng Yên'},
];

const enStats = [
  {value: '10 years', label: 'Working alongside the Aladdin system'},
  {value: 'Nearly 160', label: 'Restaurants delivered'},
  {value: '16 days', label: 'From site handover to opening at 84 Ngoc Khanh'},
  {value: '3,000sqm', label: 'In-house workshop in Ha Dong, Hanoi'},
];

const viProofPoints = [
  {
    label: 'Minh chứng tiến độ',
    body: 'New Sky lấy tiến độ làm một lợi thế cạnh tranh quan trọng. Dự án tổ hợp Bò Tơ Quán Mộc + Long Wang tại 84 Ngọc Khánh, Ba Đình, Hà Nội, quy mô 1.260m², được triển khai từ nhận mặt bằng đến khai trương trong 16 ngày.',
  },
  {
    label: 'Minh chứng chất lượng',
    body: 'Chất lượng được xây dựng từ kinh nghiệm thực chiến qua gần 160 nhà hàng. Mỗi dự án được kiểm soát từ thiết kế, vật tư, sản xuất, lắp đặt đến nghiệm thu để hạn chế sửa chữa lớn sau bàn giao.',
  },
  {
    label: 'Minh chứng niềm tin',
    body: 'Niềm tin của khách hàng đến từ bằng chứng cụ thể: 10 năm đồng hành cùng 8 thương hiệu thuộc hệ thống Aladdin gồm Bò Tơ Quán Mộc, Tian Long, Long Wang, G.Master, Cơm Niêu Hải Sư, Khèn Nướng Sapa, Cuốn An Vũ và Cảo Vương.',
  },
];

const enProofPoints = [
  {
    label: 'Programme Proof',
    body: 'New Sky treats speed as a core competitive advantage. The combined Bo To Quan Moc + Long Wang project at 84 Ngoc Khanh, Ba Dinh, Hanoi, covering 1,260sqm, was delivered from site handover to opening in 16 days.',
  },
  {
    label: 'Quality Proof',
    body: 'Quality is built from hands-on experience across more than 100 restaurant projects over 10 years. Each project is controlled from design, materials, production, and installation through to acceptance to reduce major post-handover rework.',
  },
  {
    label: 'Trust Proof',
    body: 'Customer trust is built on concrete proof: 10 years working with the Aladdin system, from its early stage to a multi-brand ecosystem with hundreds of outlets.',
  },
];

const viCapabilities = [
  {
    label: 'Thiết kế',
    body: 'Triển khai ý tưởng, mặt bằng công năng và bản vẽ kỹ thuật phù hợp với định vị thương hiệu nhà hàng.',
    image: '/images/image1.png',
  },
  {
    label: 'Nội thất',
    body: 'Sản xuất và lắp đặt hạng mục nội thất nhà hàng tại xưởng để đồng bộ giữa thiết kế và thi công.',
    image: '/images/image2.png',
  },
  {
    label: 'Cơ điện',
    body: 'Điều phối hệ thống điện, cấp thoát nước, thông gió, hút khói và các yêu cầu kỹ thuật liên quan cho nhà hàng.',
    image: '/images/image3.png',
  },
  {
    label: 'Inox bếp công nghiệp',
    body: 'Bàn inox, giá kệ, tủ bếp, bồn rửa và các hạng mục inox bếp công nghiệp được sản xuất tại xưởng Thượng Hồng, Hưng Yên.',
    image: '/images/image4.png',
  },
  {
    label: 'Xây dựng',
    body: 'Tổ chức cải tạo mặt bằng, dựng vách ngăn và hoàn thiện sàn, tường, trần theo bản vẽ đã duyệt.',
    image: '/images/image5.png',
  },
  {
    label: 'Biển hiệu',
    body: 'Sản xuất chữ inox, biển hiệu UV và pano để đồng bộ nhận diện mặt tiền, không gian và điểm chạm thương hiệu.',
    image: '/images/image5.png',
  },
];

const enCapabilities = [
  {
    label: 'Design',
    body: 'Concept, functional layout, and technical drawings aligned with each restaurant brand position.',
    image: '/images/image1.png',
  },
  {
    label: 'Interiors',
    body: 'Production and installation of restaurant interior items through New Sky\'s workshop for stronger design-to-build consistency.',
    image: '/images/image2.png',
  },
  {
    label: 'MEP Systems',
    body: 'Coordination of electrical, water supply, drainage, ventilation, smoke extraction, and related restaurant technical requirements.',
    image: '/images/image3.png',
  },
  {
    label: 'Industrial Kitchen Stainless Steel',
    body: 'Stainless-steel tables, shelves, cabinets, sinks, and kitchen items produced at the Ha Dong workshop.',
    image: '/images/image4.png',
  },
  {
    label: 'Construction',
    body: 'Coordination of site renovation, partitions, and floor, wall, and ceiling finishes according to approved drawings.',
    image: '/images/image5.png',
  },
  {
    label: 'Signage',
    body: 'Production of stainless-steel lettering, UV signage, and pano signage to align frontage, space, and brand touchpoints.',
    image: '/images/image5.png',
  },
];

const viFactoryBenefits = [
  'Chủ động sản xuất inox bếp công nghiệp.',
  'Chủ động sản xuất hạng mục nội thất nhà hàng.',
  'Chủ động sản xuất chữ inox, biển hiệu UV và pano.',
  'Phục vụ cả gói tổng thầu nhà hàng F&B và nhu cầu sản phẩm rời.',
];

const enFactoryBenefits = [
  'In-house production of industrial kitchen stainless steel.',
  'In-house production of restaurant interior items.',
  'In-house production of stainless-steel lettering, UV signage, and pano signage.',
  'Support for both restaurant F&B general contracting and standalone product needs.',
];

const viDirectorProfile = [
  'Ông Lưu Văn Sỹ là Giám đốc Công ty TNHH Xây Dựng và Thực Phẩm New Sky, người định hướng năng lực thiết kế và thi công trọn gói cho các dự án nhà hàng và chuỗi F&B tại Việt Nam.',
  'Với kinh nghiệm đồng hành cùng hệ thống Aladdin, ông tập trung xây dựng New Sky theo hướng thực thi nhanh, kiểm soát chất lượng chặt chẽ và phát triển năng lực sản xuất nội bộ cho nội thất, inox bếp và biển hiệu.',
];

const enDirectorProfile = [
  'Mr. Luu Van Sy is the Director of New Sky Construction and Food Co., Ltd., leading the company\'s design and construction capability for restaurants and F&B chains in Vietnam.',
  'With experience working alongside the Aladdin system, he focuses on building New Sky around fast execution, strict quality control, and stronger in-house production for interiors, kitchen stainless steel, and signage.',
];

export default async function AboutPage({params}: AboutPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'aboutPage'});
  const isVi = locale === 'vi';
  const stats = isVi ? viStats : enStats;
  const proofPoints = isVi ? viProofPoints : enProofPoints;
  const capabilities = isVi ? viCapabilities : enCapabilities;
  const factoryBenefits = isVi ? viFactoryBenefits : enFactoryBenefits;
  const heroSlides = await getHeroSlides(locale, 'about');
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lưu Văn Sỹ',
    jobTitle: 'Cố vấn kinh doanh nhà hàng — Giám đốc New Sky',
    worksFor: {
      '@type': 'Organization',
      name: 'New Sky',
      url: siteUrl,
    },
  };
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}} />
      <PageHero
        slides={slides}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>{t('introTitle')}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {isVi
                ? 'New Sky là giải pháp đồng hành cùng nhà đầu tư nhà hàng, phục vụ chủ chuỗi nhà hàng Việt Nam quy mô 3 đến hơn 50 cơ sở, người dựng quán F&B và doanh nghiệp F&B mở rộng chuỗi. Với kinh nghiệm đồng hành cùng hệ thống Aladdin, New Sky đã tham gia triển khai gần 160 nhà hàng.'
                : 'New Sky is a specialist design and construction partner for restaurant owners, F&B chains, and F&B businesses expanding in Vietnam. With 10 years working alongside the Aladdin system, New Sky has delivered more than 100 restaurant projects.'}
            </p>
            <p>
              {isVi
                ? 'Chúng tôi triển khai đồng bộ 6 năng lực: thiết kế, nội thất, cơ điện, inox bếp, xây dựng và biển hiệu; sau đó tổ chức lắp đặt, bàn giao và bảo trì. Cơ điện và xây dựng được điều phối qua thầu phụ, các phần còn lại do New Sky tự làm.'
                : 'We coordinate 6 capabilities: design, interiors, MEP, kitchen stainless steel, construction, and signage, followed by installation, handover, and maintenance. MEP and construction are coordinated through subcontractors, while the remaining scopes are handled in-house.'}
            </p>
            <p>
              {isVi
                ? 'New Sky không lựa chọn cạnh tranh bằng giá rẻ nhất. Chúng tôi cạnh tranh bằng tiến độ, chất lượng và niềm tin được chứng minh qua các dự án thực tế.'
                : 'New Sky does not compete by being the cheapest. We compete through programme, quality, and trust proven by completed projects.'}
            </p>
            <div className="button-row" style={{marginTop: '32px'}}>
              <ButtonLink href={`/${locale}/projects`} variant="primary">
                  {t('projectsCta')}
              </ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="secondary">
                  {t('contactCta')}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="about-leader-section">
        <div className="shell about-leader-card">
          <div className="about-leader-content">
            <div className="about-leader-portrait">
              <Image
                src="/images/giamdocpic.png"
                alt={isVi ? 'Ông Lưu Văn Sỹ - Giám đốc New Sky' : 'Mr. Luu Van Sy - Director of New Sky'}
                fill
                sizes="(max-width: 768px) 260px, 280px"
                priority={false}
              />
            </div>
            <div className="about-leader-copy">
              <div className="about-leader-heading">
                 <span>{t('leaderLabel')}</span>
                 <h2>{t('leaderTitle')}</h2>
              </div>
              <div className="about-leader-signature about-leader-signature-top">
                <strong>{t('directorName')}</strong>
                <span>{t('directorRole')}</span>
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
            {proofPoints.map((item) => (
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
            <h2>{t('capabilitiesTitle')}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <div className="about-history-flow">
              {capabilities.map((item) => (
                <div key={item.label} className="about-flow-item">
                  <div className="about-capability-image">
                    <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 100vw, 220px" />
                  </div>
                  <div className="about-flow-content">
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
            <h2>{t('factoryTitle')}</h2>
            <p>
              {isVi
                ? 'Xưởng đặt tại Thượng Hồng, Hưng Yên, giúp New Sky chủ động sản xuất nội thất, inox bếp công nghiệp và biển hiệu cho dự án nhà hàng F&B cũng như nhu cầu sản phẩm rời.'
                : 'Located in Ha Dong, Hanoi, the workshop helps New Sky produce interiors, industrial kitchen stainless steel, and signage for restaurant F&B projects as well as standalone product needs.'}
            </p>
          </div>
          <div className="about-team-grid">
            {factoryBenefits.map((benefit, index) => (
              <div key={benefit} className="about-team-card">
                <div className="about-team-avatar">
                  <span>{index + 1}</span>
                </div>
                <h3 className="about-team-name">{t('factoryCardTitle')}</h3>
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
            <h2>{t('benefitsTitle')}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {isVi
                ? 'Khi lựa chọn New Sky, chủ đầu tư có thể làm việc với một đầu mối tổng thầu chuyên nhà hàng, có lịch sử dự án rõ ràng và năng lực tự sản xuất các hạng mục trọng yếu. Điều này giúp dự án rõ trách nhiệm, giảm rủi ro chồng chéo giữa các nhà thầu và kiểm soát chất lượng đồng nhất hơn trong quá trình triển khai.'
                : 'By choosing New Sky, investors work with one restaurant-focused contractor with clear project history and in-house production for key scopes. This clarifies responsibility, reduces overlap between contractors, and keeps quality more consistent throughout delivery.'}
            </p>
            <p>
              <strong>{t('finalLine')}</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
