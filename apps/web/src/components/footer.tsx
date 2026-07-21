import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site';
import type {Locale} from '@/i18n/routing';
import {getNavPath} from '@/lib/routes';

type FooterProps = {
  locale: Locale;
};

export async function Footer({locale}: FooterProps) {
  const t = await getTranslations({locale, namespace: 'footer'});
  const nav = await getTranslations({locale, namespace: 'nav'});

  return (
    <footer className="site-footer section-dark" style={{ padding: '64px 0', borderTop: '0' }}>
      <div className="shell footer-top">
        <div className="footer-brand">
          <p className="footer-label" style={{ color: 'var(--accent-safety)' }}>{t('brand')}</p>
          <p>{t('brandDescription')}</p>
        </div>

        <div className="footer-office-grid">
          {siteConfig.offices.map((office) => (
            <div key={office.label} className="footer-col">
              <p className="footer-label">{office.label}</p>
              <p>{office.address}</p>
              <p><a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a></p>
              <p><a href={`mailto:${office.email}`}>{office.email}</a></p>
            </div>
          ))}
        </div>
      </div>

      <div className="shell footer-bottom">
        <div className="footer-col">
          <p className="footer-label">{t('menu')}</p>
          <div className="footer-nav">
            {siteConfig.navigation.map((item) => (
              <Link key={item.key} href={`/${locale}${getNavPath(item.key, locale, item.href)}`}>
                {nav(item.key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <p className="footer-label">{t('social')}</p>
          <div className="social-nav">
            {siteConfig.socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <p className="footer-label">{t('office')}</p>
          <p>{siteConfig.offices[0].address}</p>
        </div>
      </div>
    </footer>
  );
}
