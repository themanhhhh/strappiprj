import {ContactFormUi} from '@/components/contact-form-ui';
import {InfoCard} from '@/components/info-card';
import {PageHero} from '@/components/page-hero';
import {SectionIntro} from '@/components/section-intro';
import {getHeroSlides} from '@/lib/strapi/queries';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type ContactPageProps = {
  params: Promise<{locale: string}>;
};

export default async function ContactPage({params}: ContactPageProps) {
  const {locale} = await params;
  const heroSlides = await getHeroSlides(locale, 'contact');
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));
  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={locale === 'vi' ? 'Tiếp nhận thông tin' : 'Lead Capture'}
        title={locale === 'vi' ? 'Sẵn sàng tư vấn thi công trực tiếp.' : 'The contact page now has a real UI shell for enquiries.'}
        description={locale === 'vi' ? 'Tất cả các trường thông tin, biểu mẫu và nhãn dán đều được thiết kế chuẩn mực sẵn sàng cho việc ghi nhận lịch hẹn.' : 'Form fields, labels, spacing and supporting information are standardized so integration can focus on behavior later.'}
      />

      <section className="section-block bg-sector-overlay">
        <div className="shell">

          <ContactFormUi locale={locale} />
        </div>
      </section>
    </>
  );
}
