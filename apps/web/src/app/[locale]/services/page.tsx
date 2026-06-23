import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides} from '@/lib/strapi/queries';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';

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
  const t = await getTranslations({locale, namespace: 'servicesPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/services'),
    openGraph: {
      locale: getOpenGraphLocale(locale),
      url: `/${locale}/services`,
    },
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type FactoryStat = {
  value: string;
  label: string;
};

export default async function ServicesPage({params}: ServicesPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'servicesPage'});
  const capabilities = t.raw('capabilities') as Capability[];
  const factoryStats = t.raw('factory.stats') as FactoryStat[];
  const process = t.raw('process') as ProcessStep[];
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
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <section className="services-overview-band">
        <div className="shell services-overview-shell">
          <div className="services-overview-intro">
            <p className="services-overview-kicker">{t('capabilitiesIntro.eyebrow')}</p>
            <h2>{t('capabilitiesIntro.title')}</h2>
            <p>{t('capabilitiesIntro.description')}</p>
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
            <p className="services-overview-kicker">{t('factory.eyebrow')}</p>
            <h2>{t('factory.title')}</h2>
            <p>{t('factory.description')}</p>
          </div>
          <div className="factory-stats">
            {factoryStats.map((stat) => (
              <div key={stat.value + stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="shell">
          <div className="services-overview-intro process-intro">
            <p className="services-overview-kicker">{t('processIntro.eyebrow')}</p>
            <h2>{t('processIntro.title')}</h2>
            <p>{t('processIntro.description')}</p>
          </div>

          <div className="process-grid">
            {process.map((step) => (
              <article key={step.index} className="process-card">
                <span className="process-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.scope}</p>
                <dl>
                  <div><dt>{t('processLabels.timeline')}</dt><dd>{step.timeline}</dd></div>
                  <div><dt>{t('processLabels.owner')}</dt><dd>{step.owner}</dd></div>
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
          color: var(--brand-blue);
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
          color: var(--brand-blue);
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
          color: var(--brand-gold);
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
          color: var(--brand-blue);
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
