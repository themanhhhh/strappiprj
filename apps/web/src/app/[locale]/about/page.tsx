import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides} from '@/lib/strapi/queries';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type AboutPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: AboutPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Ve chung toi - MAESTRO' : 'About Us - MAESTRO',
    description:
      locale === 'vi'
        ? 'MAESTRO la đơn vị hoạt động trong lĩnh vực construction, interior fit-out và joinery, theo đuổi sự chính xác, tinh đồng bộ và chất lượng hoàn thiện ở tiêu chuẩn cao.'
        : 'MAESTRO operates across construction, interior fit-out, and joinery with a focus on precision, coordination, and a high standard of finish.',
  };
}

const viStats = [
  {value: '54,000m2+', label: 'Nhà máy và năng lực sản xuất'},
  {value: '5', label: 'Thị trường hiện diện'},
  {value: 'End-to-end', label: 'Construction, fit-out và joinery'},
  {value: 'Premium', label: 'Tiêu chuẩn hoàn thiện'},
];

const enStats = [
  {value: '54,000m2+', label: 'Manufacturing footprint'},
  {value: '5', label: 'Active markets'},
  {value: 'End-to-end', label: 'Construction, fit-out, and joinery'},
  {value: 'Premium', label: 'Finishing standard'},
];

const viVmv = [
  {
    label: 'Tầm nhìn',
    body: 'Trở thành đối tác được tin cậy trong lĩnh vực construction, fit-out và joinery, được nhận diện bởi sự chính xác, chất lượng đồng bộ và giá trị thẩm mỹ bền vững.',
  },
  {
    label: 'Sứ mệnh',
    body: 'Kiến tạo những không gian được hoàn thiện với kỷ luật thi công cao, cân đối giữa công năng, độ bền, vật liệu và trải nghiệm không gian cho từng dự án.',
  },
  {
    label: 'Giá trị cốt lõi',
    body: 'Precision - Coordination - Craftsmanship - Accountability. Moi quyet dinh deu huong den chat luong thuc thi, tinh ro rang trong phoi hop va su chi tiet trong hoan thien.',
  },
];

const enVmv = [
  {
    label: 'Vision',
    body: 'To be a trusted name in construction, fit-out, and joinery, recognised for precision, consistency, and enduring design value.',
  },
  {
    label: 'Mission',
    body: 'To deliver spaces shaped by disciplined execution, balancing function, durability, materiality, and spatial experience in every project.',
  },
  {
    label: 'Core Values',
    body: 'Precision - Coordination - Craftsmanship - Accountability. Every decision is guided by execution quality, technical clarity, and attention to finish.',
  },
];

const viTeam = [
  {
    name: 'Nguyễn Văn An',
    role: 'Tổng Giám Đốc',
    bio: 'Định hướng chiến lược tổng thể cho MAESTRO, tập trung vào năng lực delivery, chất lượng thi công va sự mở rộng bền vững trong lĩnh vực construction va interior.',
  },
  {
    name: 'Trần Thị Bích',
    role: 'Giám Đốc Van Hanh',
    bio: 'Điều phối các hệ thống vận hành, quy trình và nguồn lực dự án nhằm duy trì tiến độ, sự đồng bộ và khả năng kiểm soát xuyên suốt công trường.',
  },
  {
    name: 'Lê Minh Cường',
    role: 'Giám Đốc Thiet Ke',
    bio: 'Định hình ngôn ngữ không gian thông qua tỉ lệ, vật liệu và ánh sáng, đảm bảo mỗi dự án đạt được sự cân đối giữa bản sắc thẩm mỹ và tính khả thi thi công.',
  },
  {
    name: 'Phạm Hồng Dương',
    role: 'Giám Đốc Tai Chinh',
    bio: 'Quản tri tài chính dự án và cấu trúc đầu tư với cách tiếp cận can thận, hỗ trợ việc đưa ra quyết định được neo trên hiệu quả và giá trị dài hạn.',
  },
  {
    name: 'Ngô Thị Lan Anh',
    role: 'Giám Đốc Nhân Sự',
    bio: 'Phát triển đội ngũ dựa trên tinh kỷ luật, khả năng phối hợp và trách nhiệm nghề nghiệp, tạo nên văn hóa làm việc rõ ràng và bền vững cho MAESTRO.',
  },
  {
    name: 'Vũ Quang Hưng',
    role: 'Giám Đốc Marketing',
    bio: 'Xay dung hinh anh thuong hieu MAESTRO thong qua ngon ngu bien tap, he thong truyen thong va cach ke chuyen nhan manh vao nang luc, du an va craftsmanship.',
  },
];

const enTeam = [
  {
    name: 'An Nguyen',
    role: 'Chief Executive Officer',
    bio: 'Leads MAESTRO\'s overall direction with a focus on delivery capability, execution quality, and long-term growth across construction and interiors.',
  },
  {
    name: 'Bich Tran',
    role: 'Chief Operations Officer',
    bio: 'Oversees operating systems, project resources, and site coordination to maintain programme discipline and consistency across delivery.',
  },
  {
    name: 'Cuong Le',
    role: 'Design Director',
    bio: 'Shapes spatial language through proportion, materiality, and light, ensuring each project balances design intent with construction reality.',
  },
  {
    name: 'Duong Pham',
    role: 'Chief Financial Officer',
    bio: 'Leads project finance and investment discipline with a measured approach anchored in efficiency, clarity, and long-term value.',
  },
  {
    name: 'Lan Anh Ngo',
    role: 'Human Resources Director',
    bio: 'Builds teams around discipline, coordination, and professional responsibility, strengthening MAESTRO\'s delivery culture over time.',
  },
  {
    name: 'Hung Vu',
    role: 'Marketing Director',
    bio: 'Develops MAESTRO\'s editorial and brand communication language with an emphasis on projects, capability, and craftsmanship.',
  },
];

export default async function AboutPage({params}: AboutPageProps) {
  const {locale} = await params;
  const stats = locale === 'vi' ? viStats : enStats;
  const vmv = locale === 'vi' ? viVmv : enVmv;
  const team = locale === 'vi' ? viTeam : enTeam;
  const heroSlides = await getHeroSlides(locale, 'about');
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={locale === 'vi' ? 'Về chúng tôi' : 'About Us'}
        title={locale === 'vi' ? 'MAESTRO' : 'MAESTRO'}
        description={locale === 'vi' ? 'CONSTRUCTION - INTERIOR FIT-OUT - JOINERY' : 'CONSTRUCTION - INTERIOR FIT-OUT - JOINERY'}
      />

      {/* ── Intro split ──────────────────────────────────────── */}
      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>
              {locale === 'vi'
                ? 'Một hệ thống thực thi được xây dựng trên sự chính xác, tính đồng bộ và chất lượng hoàn thiện'
                : 'A delivery system built on precision, coordination, and finishing quality'}
            </h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {locale === 'vi'
                ? 'MAESTRO hoat động trong các lĩnh vực construction, interior fit-out và joinery, mang đến những giải pháp được do may theo quy mô, tiêu chuẩn va yêu cầu vận hành của từng công trình.'
                : 'MAESTRO operates across construction, interior fit-out, and joinery, delivering solutions shaped around the scale, standards, and operational requirements of each project.'}
            </p>
            <p>
              {locale === 'vi'
                ? 'Từ nhà máy đến công trường, MAESTRO theo đuổi một hệ thống delivery rõ ràng, trong đó kỹ thuật, vật liệu, tiến độ và chất lượng được kết nối thành một quá trình thống nhất.'
                : 'From manufacturing to site delivery, MAESTRO follows a clear execution system in which technical coordination, materials, programme, and finishing quality are treated as one integrated process.'}
            </p>
            <p>
              {locale === 'vi'
                ? 'Mỗi dự án được tiếp cận với sự tiết chế trong ngôn ngữ thẩm mỹ và sự kỷ luật trong thi công, nhằm tạo ra những không gian bền vững, tinh tế và sẵn sàng đưa vào vận hành.'
                : 'Each project is approached with restraint in aesthetic language and discipline in execution, resulting in spaces that are durable, refined, and ready for operation.'}
            </p>
            <div className="button-row" style={{marginTop: '32px'}}>
              <ButtonLink href={`/${locale}/projects`} variant="primary">
                {locale === 'vi' ? 'Khám phá dự án' : 'Explore projects'}
              </ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="secondary">
                {locale === 'vi' ? 'Liên hệ chúng tôi' : 'Contact us'}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission / Core Values ───────────────────── */}
      <section className="about-vmv-section">
        <div className="shell">
          <ul className="about-vmv-list">
            {vmv.map((item) => (
              <li key={item.label} className="about-vmv-item">
                <h3 className="about-vmv-label">{item.label}</h3>
                <p className="about-vmv-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
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

      {/* ── History ───────────────────────────────────────────── */}
      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>{locale === 'vi' ? 'Các cột mốc phát triển' : 'Development Milestones'}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <div className="about-history-timeline">
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2024' : '2024'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Củng cố nền tảng thực thi' : 'Strengthening the delivery platform'}</h4>
                  <ul>
                    <li>{locale === 'vi' ? 'Hoàn thiện thêm năng lực điều phối giữa construction, fit-out va joinery.' : 'Expanded coordination capability across construction, fit-out, and joinery.'}</li>
                    <li>{locale === 'vi' ? 'Tăng cường quy trình kiểm soát chất lượng và hệ thống delivery tại công trường.' : 'Strengthened quality control procedures and site delivery systems.'}</li>
                    <li>{locale === 'vi' ? 'Định hình rõ hơn ngôn ngữ thương hiệu và tiêu chuẩn hoàn thiện của MAESTRO.' : 'Further defined the MAESTRO brand language and finishing standards.'}</li>
                  </ul>
                </div>
              </div>
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2025' : '2025'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Mở rộng quy mô và phạm vi hiện diện' : 'Expanding scale and regional presence'}</h4>
                  <p>{locale === 'vi' ? 'MAESTRO tiếp tục phát triển trên nền tảng sản xuất và delivery có tính đồng bộ cao:' : 'MAESTRO continues to grow on top of an increasingly integrated manufacturing and delivery platform:'}</p>
                  <div className="about-timeline-brands">
                    {['Singapore', 'Vietnam', 'UAE', 'UK', 'Saudi Arabia'].map((b, i) => (
                      <span key={i} className="about-timeline-brand-tag">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2028' : '2028'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Định hướng chiến lược' : 'Strategic Direction'}</h4>
                  <p>{locale === 'vi' ? 'Tiếp tục nâng cao tiêu chuẩn construction, fit-out va joinery thông qua việc đầu tư vào con người, quy trình, nhà máy và khả năng thực thi xuyên dự án.' : 'Continue elevating standards in construction, fit-out, and joinery through long-term investment in people, systems, manufacturing, and project-wide execution capability.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Team ────────────────────────────────────── */}
      <section className="about-team-section">
        <div className="shell">
          <div className="about-team-header">
            <h2>
              {locale === 'vi' ? 'Ban lãnh đạo va điều hành' : 'Executive Leadership and Management Team'}
            </h2>
            <p>
              {locale === 'vi'
                ? 'Đội ngũ điều hành định hinh chuẩn mực làm việc của MAESTRO thông qua sự kỷ luật, tính rõ ràng trong phối hợp và định hướng phát triển dài hạn.'
                : 'The leadership team shapes MAESTRO\'s working standards through discipline, coordination clarity, and long-term strategic direction.'}
            </p>
          </div>
          <div className="about-team-grid">
            {team.map((member) => (
              <div key={member.name} className="about-team-card">
                <div className="about-team-avatar">
                  <span>{member.name.charAt(0)}</span>
                </div>
                <h3 className="about-team-name">{member.name}</h3>
                <div className="about-team-divider" />
                <p className="about-team-role">{member.role}</p>
                <p className="about-team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
