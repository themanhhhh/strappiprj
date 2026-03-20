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
    title: locale === 'vi' ? 'Về Chúng Tôi — ALADDIN JSC' : 'About Us — ALADDIN JSC',
    description:
      locale === 'vi'
        ? 'Công ty Cổ phần Tầm nhìn Quốc tế Aladdin — đơn vị tiên phong trong lĩnh vực Culinary, vận hành hệ sinh thái chuỗi nhà hàng F&B chất lượng cao.'
        : 'Aladdin International Vision Joint Stock Company — a pioneering culinary enterprise operating a premium F&B restaurant chain ecosystem.',
  };
}

const viStats = [
  {value: '19+', label: 'Nhà hàng'},
  {value: '716+', label: 'Nhân viên'},
  {value: '6', label: 'Thương hiệu ẩm thực'},
  {value: '2028', label: 'Mục tiêu 300 nhà hàng'},
];

const enStats = [
  {value: '19+', label: 'Restaurants'},
  {value: '716+', label: 'Employees'},
  {value: '6', label: 'F&B Brands'},
  {value: '2028', label: 'Target: 300 restaurants'},
];

const viVmv = [
  {
    label: 'Tầm nhìn',
    body: 'Trở thành thương hiệu F&B hàng đầu tại Việt Nam, xây dựng một hệ sinh thái bền vững, đóng góp vào sự phát triển của nền văn hóa ẩm thực nước nhà.',
  },
  {
    label: 'Sứ mệnh',
    body: 'Mang lại những trải nghiệm hạnh phúc cho khách hàng thông qua những bữa ăn ngon, không gian thưởng thức ấm cúng và phong cách phục vụ tận tâm.',
  },
  {
    label: 'Giá trị cốt lõi',
    body: 'Tươi ngon — Sạch sẽ — Kiểm soát chất lượng — Quản trị chuyên nghiệp. Trân trọng từng khách hàng; Lấy khách hàng làm trọng tâm; Phục vụ bằng sự tử tế và chân thành.',
  },
];

const enVmv = [
  {
    label: 'Vision',
    body: 'Become the leading F&B brand in Vietnam, building a sustainable ecosystem that contributes to the development of Vietnamese culinary culture.',
  },
  {
    label: 'Mission',
    body: 'Deliver happiness to customers through delicious food, warm dining atmospheres and dedicated service, consistently placing customers at the center of every decision.',
  },
  {
    label: 'Core Values',
    body: 'Fresh — Clean — Quality Control — Professional Management. We value every customer, put customers at the center, and serve with kindness and sincerity.',
  },
];

const viTeam = [
  {
    name: 'Nguyễn Văn An',
    role: 'Tổng Giám Đốc',
    bio: 'Với hơn 20 năm kinh nghiệm trong ngành F&B, ông An là người dẫn dắt chiến lược phát triển của hệ sinh thái Aladdin tại Việt Nam và khu vực.',
  },
  {
    name: 'Trần Thị Bích',
    role: 'Giám Đốc Vận Hành',
    bio: 'Chuyên gia vận hành chuỗi nhà hàng với kinh nghiệm triển khai trên 50 điểm bán trên toàn quốc, đảm bảo chất lượng và tiêu chuẩn đồng nhất.',
  },
  {
    name: 'Lê Minh Cường',
    role: 'Giám Đốc Phát Triển Thương Hiệu',
    bio: 'Kiến trúc sư chiến lược thương hiệu cho chuỗi nhà hàng đa phong cách — từ hotpot cao cấp đến ẩm thực dân dã — trong hệ sinh thái Aladdin.',
  },
  {
    name: 'Phạm Hồng Dương',
    role: 'Giám Đốc Tài Chính',
    bio: 'Chuyên gia tài chính doanh nghiệp với nền tảng đầu tư và mở rộng chuỗi, dẫn dắt kế hoạch nhượng quyền và tăng trưởng vốn của Aladdin.',
  },
  {
    name: 'Ngô Thị Lan Anh',
    role: 'Giám Đốc Nhân Sự',
    bio: 'Xây dựng và phát triển đội ngũ hơn 700 nhân sự, tạo môi trường làm việc gắn kết với văn hóa Aladdin tại mọi thương hiệu trong hệ sinh thái.',
  },
  {
    name: 'Vũ Quang Hưng',
    role: 'Giám Đốc Marketing',
    bio: 'Chuyên gia marketing kỹ thuật số và xây dựng cộng đồng thương hiệu, tạo dựng nhận diện mạnh mẽ cho từng thương hiệu trong hệ sinh thái Aladdin.',
  },
];

const enTeam = [
  {
    name: 'An Nguyen',
    role: 'Chief Executive Officer',
    bio: 'With over 20 years in the F&B sector, An leads the strategic vision and ecosystem expansion of Aladdin across Vietnam and the region.',
  },
  {
    name: 'Bich Tran',
    role: 'Chief Operations Officer',
    bio: 'Restaurant chain operations expert with experience rolling out over 50 locations nationwide, ensuring uniform quality and standards.',
  },
  {
    name: 'Cuong Le',
    role: 'Brand Development Director',
    bio: 'Strategic architect of multi-concept restaurant brands — from premium hotpot to casual dining — within the Aladdin ecosystem.',
  },
  {
    name: 'Duong Pham',
    role: 'Chief Financial Officer',
    bio: 'Corporate finance expert with a background in investment and chain expansion, leading Aladdin\'s franchise plan and capital growth.',
  },
  {
    name: 'Lan Anh Ngo',
    role: 'Human Resources Director',
    bio: 'Builds and develops a team of over 700 staff, creating a cohesive work environment rooted in Aladdin culture across all brands.',
  },
  {
    name: 'Hung Vu',
    role: 'Marketing Director',
    bio: 'Digital marketing and brand community specialist, establishing strong identities for each brand within the Aladdin ecosystem.',
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
        eyebrow={locale === 'vi' ? 'Về Chúng Tôi' : 'About Us'}
        title={locale === 'vi' ? 'Công ty Cổ phần Tầm nhìn Quốc tế Aladdin' : 'Aladdin International Vision Joint Stock Company'}
        description={locale === 'vi' ? 'ĐƠN VỊ TIÊN PHONG TRONG LĨNH VỰC CULINARY' : 'PIONEERING ENTERPRISE IN THE CULINARY FIELD'}
      />

      {/* ── Intro split ──────────────────────────────────────── */}
      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>
              {locale === 'vi'
                ? 'Hệ sinh thái F&B được xây dựng trên nền tảng chất lượng và trải nghiệm'
                : 'Integrated F&B Ecosystem Built on Quality and Experience'}
            </h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {locale === 'vi'
                ? 'ALADDIN JSC vận hành một hệ sinh thái chuỗi nhà hàng đa thương hiệu gồm Long Wang, Tian Long, Bò Tơ Quán Mộc, G.Master, Hải Sư và Khèn Nướng Sapa — mỗi thương hiệu mang một bản sắc ẩm thực riêng biệt, kết nối thực khách với những trải nghiệm ăn uống chân thực và đáng nhớ.'
                : 'ALADDIN JSC operates a multi-brand restaurant chain ecosystem including Long Wang, Tian Long, Bò Tơ Quán Mộc, G.Master, Hải Sư and Khèn Nướng Sapa — each brand carrying a distinct culinary identity, connecting diners with authentic and memorable dining experiences.'}
            </p>
            <p>
              {locale === 'vi'
                ? 'Được thành lập với sứ mệnh mang lại những bữa ăn ngon, không gian thưởng thức ấm cúng và phong cách phục vụ tận tâm, chúng tôi không ngừng đặt khách hàng làm trọng tâm trong mọi quyết định kinh doanh.'
                : 'Founded with the mission of delivering delicious meals, warm dining atmospheres and dedicated service, we consistently place our customers at the center of every business decision.'}
            </p>
            <p>
              {locale === 'vi'
                ? 'Với mục tiêu chiến lược 300 nhà hàng trên toàn quốc vào năm 2028, Aladdin đang hiện thực hóa tầm nhìn trở thành thương hiệu F&B hàng đầu Việt Nam.'
                : 'With the strategic goal of 300 restaurants nationwide by 2028, Aladdin is realizing its vision of becoming Vietnam\'s leading F&B brand.'}
            </p>
            <div className="button-row" style={{marginTop: '32px'}}>
              <ButtonLink href={`/${locale}/projects`} variant="primary">
                {locale === 'vi' ? 'Khám phá thương hiệu' : 'Explore our brands'}
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
            <h2>{locale === 'vi' ? 'Lịch sử phát triển' : 'Development History'}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <div className="about-history-timeline">
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2024' : '2024'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Chuyển mình ngoạn mục' : 'Spectacular Transformation'}</h4>
                  <ul>
                    <li>{locale === 'vi' ? 'Bò Tơ Quán Mộc: Lột xác với không gian hiện đại, sang trọng.' : 'Bò Tơ Quán Mộc: Transformed with a modern, luxurious space.'}</li>
                    <li>{locale === 'vi' ? 'Long Wang: Khẳng định vị thế là thương hiệu lẩu hấp lớn nhất Việt Nam.' : 'Long Wang: Affirmed its position as the largest steam hotpot brand in Vietnam.'}</li>
                    <li>{locale === 'vi' ? 'Ra mắt Lẩu bò tươi Triều Châu Tian Long và thương hiệu Cơm Niêu Hải Sư.' : 'Launched Tian Long Fresh Beef Hotpot and Hải Sư Claypot Rice.'}</li>
                  </ul>
                </div>
              </div>
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2025' : '2025'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Hiện thực hóa tầm nhìn' : 'Realizing Our Vision'}</h4>
                  <p>{locale === 'vi' ? 'Mục tiêu 100 điểm chạm trên toàn quốc:' : 'Goal of 100 touchpoints nationwide:'}</p>
                  <div className="about-timeline-brands">
                    {['Long Wang: 42', 'Tian Long: 25', 'Bò Tơ Quán Mộc: 24', 'Cơm Niêu Hải Sư: 8', 'G.Master: 1'].map((b, i) => (
                      <span key={i} className="about-timeline-brand-tag">{b} {locale === 'vi' ? 'nhà hàng' : 'restaurants'}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2028' : '2028'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Mục tiêu chiến lược' : 'Strategic Target'}</h4>
                  <p>{locale === 'vi' ? 'Aladdin sở hữu 300 nhà hàng trên khắp Việt Nam — mở rộng hệ sinh thái đến mọi tỉnh thành, phủ rộng trải nghiệm ẩm thực Aladdin toàn quốc.' : 'Aladdin owns 300 restaurants across Vietnam — expanding the ecosystem to every province, bringing the Aladdin dining experience nationwide.'}</p>
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
              {locale === 'vi' ? 'Ban Lãnh Đạo & Điều Hành' : 'Executive Leadership and Management Team'}
            </h2>
            <p>
              {locale === 'vi'
                ? 'Đội ngũ lãnh đạo của Aladdin JSC — những con người định hình tầm nhìn và dẫn dắt sự phát triển của hệ sinh thái.'
                : "Introducing Aladdin JSC's leadership team responsible for strategic direction and ecosystem growth."}
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-block">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Hợp tác' : 'Partner with us'}
            title={
              locale === 'vi'
                ? 'Cùng xây dựng hệ sinh thái ẩm thực lớn mạnh'
                : 'Build a thriving culinary ecosystem together'
            }
            description={
              locale === 'vi'
                ? 'Tìm hiểu cơ hội hợp tác, nhượng quyền và đầu tư trong hệ sinh thái ALADDIN JSC.'
                : 'Explore partnership, franchise and investment opportunities within the ALADDIN JSC ecosystem.'
            }
            primary={{
              label: locale === 'vi' ? 'Xem thương hiệu' : 'View brands',
              href: `/${locale}/projects`,
            }}
            secondary={{
              label: locale === 'vi' ? 'Liên hệ ngay' : 'Contact us',
              href: `/${locale}/contact`,
            }}
          />
        </div>
      </section>
    </>
  );
}
