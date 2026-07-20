import {ContactFormUi} from '@/components/contact-form-ui';
import type {Metadata} from 'next';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides} from '@/lib/strapi/queries';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type ContactPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: ContactPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contactPage'});

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/contact'),
    openGraph: {
      locale: getOpenGraphLocale(locale),
      url: `/${locale}/contact`,
    },
  };
}

export default async function ContactPage({params}: ContactPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contactPage'});
  const heroSlides = await getHeroSlides(locale, 'contact');
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));
  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <section className="section-block bg-sector-overlay">
        <div className="shell">
          <div className="tile-grid" style={{marginBottom: '32px'}}>
            {siteConfig.offices.map((office) => (
              <article key={office.label} className="info-card">
                <p className="tile-meta">{office.label}</p>
                <h2>{office.address}</h2>
                <p><a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a></p>
                <p><a href={`mailto:${office.email}`}>{office.email}</a></p>
              </article>
            ))}
          </div>

          <ContactFormUi locale={locale} />
        </div>
      </section>
    </>
  );
}
