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
        ? 'MAESTRO la don vi hoat dong trong linh vuc construction, interior fit-out va joinery, theo duoi su chinh xac, tinh dong bo va chat luong hoan thien o tieu chuan cao.'
        : 'MAESTRO operates across construction, interior fit-out, and joinery with a focus on precision, coordination, and a high standard of finish.',
  };
}

const viStats = [
  {value: '54,000m2+', label: 'Nha may va nang luc san xuat'},
  {value: '5', label: 'Thi truong hien dien'},
  {value: 'End-to-end', label: 'Construction, fit-out va joinery'},
  {value: 'Premium', label: 'Tieu chuan hoan thien'},
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
    body: 'Tro thanh doi tac duoc tin cay trong linh vuc construction, fit-out va joinery, duoc nhan dien boi su tinh chinh, chat luong dong bo va gia tri tham my ben vung.',
  },
  {
    label: 'Sứ mệnh',
    body: 'Kien tao nhung khong gian duoc hoan thien voi ky luat thuc thi cao, can doi giua cong nang, do ben, vat lieu va trai nghiem khong gian cho tung du an.',
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
    bio: 'Dinh huong chien luoc tong the cho MAESTRO, tap trung vao nang luc delivery, chat luong thuc thi va su mo rong ben vung trong linh vuc construction va interior.',
  },
  {
    name: 'Trần Thị Bích',
    role: 'Giam Doc Van Hanh',
    bio: 'Dieu phoi cac he thong van hanh, quy trinh va nguon luc du an nham duy tri tien do, su dong bo va kha nang kiem soat xuyen suot cong truong.',
  },
  {
    name: 'Lê Minh Cường',
    role: 'Giam Doc Thiet Ke',
    bio: 'Dinh hinh ngon ngu khong gian thong qua ti le, vat lieu va anh sang, dam bao moi du an dat duoc su can doi giua ban sac tham my va tinh kha thi thi cong.',
  },
  {
    name: 'Phạm Hồng Dương',
    role: 'Giam Doc Tai Chinh',
    bio: 'Quan tri tai chinh du an va cau truc dau tu voi cach tiep can can trong, ho tro viec dua ra quyet dinh duoc neo tren hieu qua va gia tri dai han.',
  },
  {
    name: 'Ngô Thị Lan Anh',
    role: 'Giam Doc Nhan Su',
    bio: 'Phat trien doi ngu dua tren tinh ky luat, kha nang phoi hop va trach nhiem nghe nghiep, tao nen van hoa lam viec ro rang va ben vung cho MAESTRO.',
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
        eyebrow={locale === 'vi' ? 'Ve chung toi' : 'About Us'}
        title={locale === 'vi' ? 'MAESTRO' : 'MAESTRO'}
        description={locale === 'vi' ? 'CONSTRUCTION - INTERIOR FIT-OUT - JOINERY' : 'CONSTRUCTION - INTERIOR FIT-OUT - JOINERY'}
      />

      {/* ── Intro split ──────────────────────────────────────── */}
      <section className="about-intro-section">
        <div className="shell about-split-row">
          <div className="about-split-title">
            <h2>
              {locale === 'vi'
                ? 'Mot he thong thuc thi duoc xay dung tren su chinh xac, tinh dong bo va chat luong hoan thien'
                : 'A delivery system built on precision, coordination, and finishing quality'}
            </h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <p>
              {locale === 'vi'
                ? 'MAESTRO hoat dong trong cac linh vuc construction, interior fit-out va joinery, mang den nhung giai phap duoc do may theo quy mo, tieu chuan va yeu cau van hanh cua tung cong trinh.'
                : 'MAESTRO operates across construction, interior fit-out, and joinery, delivering solutions shaped around the scale, standards, and operational requirements of each project.'}
            </p>
            <p>
              {locale === 'vi'
                ? 'Tu nha may den cong truong, MAESTRO theo duoi mot he thong delivery ro rang, trong do ky thuat, vat lieu, tien do va chat luong duoc ket noi thanh mot qua trinh thong nhat.'
                : 'From manufacturing to site delivery, MAESTRO follows a clear execution system in which technical coordination, materials, programme, and finishing quality are treated as one integrated process.'}
            </p>
            <p>
              {locale === 'vi'
                ? 'Moi du an duoc tiep can voi su tiet che trong ngon ngu tham my va su ky luat trong thi cong, nham tao ra nhung khong gian ben vung, tinh te va san sang dua vao van hanh.'
                : 'Each project is approached with restraint in aesthetic language and discipline in execution, resulting in spaces that are durable, refined, and ready for operation.'}
            </p>
            <div className="button-row" style={{marginTop: '32px'}}>
              <ButtonLink href={`/${locale}/projects`} variant="primary">
                {locale === 'vi' ? 'Kham pha du an' : 'Explore projects'}
              </ButtonLink>
              <ButtonLink href={`/${locale}/contact`} variant="secondary">
                {locale === 'vi' ? 'Lien he chung toi' : 'Contact us'}
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
            <h2>{locale === 'vi' ? 'Cac cot moc phat trien' : 'Development Milestones'}</h2>
            <div className="about-split-rule" />
          </div>
          <div className="about-split-body">
            <div className="about-history-timeline">
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2024' : '2024'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Cung co nen tang thuc thi' : 'Strengthening the delivery platform'}</h4>
                  <ul>
                    <li>{locale === 'vi' ? 'Hoan thien them nang luc dieu phoi giua construction, fit-out va joinery.' : 'Expanded coordination capability across construction, fit-out, and joinery.'}</li>
                    <li>{locale === 'vi' ? 'Tang cuong quy trinh kiem soat chat luong va he thong delivery tai cong truong.' : 'Strengthened quality control procedures and site delivery systems.'}</li>
                    <li>{locale === 'vi' ? 'Dinh hinh ro hon ngon ngu thuong hieu va tieu chuan hoan thien cua MAESTRO.' : 'Further defined the MAESTRO brand language and finishing standards.'}</li>
                  </ul>
                </div>
              </div>
              <div className="about-timeline-item">
                <span className="about-timeline-year">{locale === 'vi' ? '2025' : '2025'}</span>
                <div className="about-timeline-content">
                  <h4>{locale === 'vi' ? 'Mo rong quy mo va pham vi hien dien' : 'Expanding scale and regional presence'}</h4>
                  <p>{locale === 'vi' ? 'MAESTRO tiep tuc phat trien tren nen tang san xuat va delivery co tinh dong bo cao:' : 'MAESTRO continues to grow on top of an increasingly integrated manufacturing and delivery platform:'}</p>
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
                  <h4>{locale === 'vi' ? 'Dinh huong chien luoc' : 'Strategic Direction'}</h4>
                  <p>{locale === 'vi' ? 'Tiep tuc nang cao tieu chuan construction, fit-out va joinery thong qua viec dau tu vao con nguoi, quy trinh, nha may va kha nang thuc thi xuyen du an.' : 'Continue elevating standards in construction, fit-out, and joinery through long-term investment in people, systems, manufacturing, and project-wide execution capability.'}</p>
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
              {locale === 'vi' ? 'Ban lanh dao va dieu hanh' : 'Executive Leadership and Management Team'}
            </h2>
            <p>
              {locale === 'vi'
                ? 'Doi ngu dieu hanh dinh hinh chuan muc lam viec cua MAESTRO thong qua su ky luat, tinh ro rang trong phoi hop va dinh huong phat trien dai han.'
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-block">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Hop tac' : 'Partner with us'}
            title={
              locale === 'vi'
                ? 'Cung trao doi ve nhung du an can su chinh xac va nang luc thuc thi dong bo'
                : 'Discuss projects that call for precision and coordinated delivery'
            }
            description={
              locale === 'vi'
                ? 'Lien he voi MAESTRO de trao doi ve construction, fit-out, joinery va nhung giai phap hoan thien duoc do may theo yeu cau cua tung cong trinh.'
                : 'Contact MAESTRO to discuss construction, fit-out, joinery, and finishing solutions tailored to the needs of each project.'
            }
            primary={{
              label: locale === 'vi' ? 'Xem du an' : 'View projects',
              href: `/${locale}/projects`,
            }}
            secondary={{
              label: locale === 'vi' ? 'Lien he ngay' : 'Contact us',
              href: `/${locale}/contact`,
            }}
          />
        </div>
      </section>
    </>
  );
}
