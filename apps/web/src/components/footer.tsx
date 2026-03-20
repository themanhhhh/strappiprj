import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {siteConfig} from '@/lib/site';
import type {Locale} from '@/i18n/routing';

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
          <p className="footer-label" style={{ color: 'var(--accent-safety)' }}>ALADDIN JSC.,</p>
          <p>
            Tinh hoa ẩm thực - Gìn giữ và phát triển. 
            Mạng lưới nhà hàng, siêu thị thực phẩm với chất lượng hàng đầu.
          </p>
        </div>

        <div className="footer-office-grid">
          {siteConfig.offices.map((office) => (
            <div key={office.label} className="footer-col">
              <p className="footer-label">{office.label}</p>
              <p>{office.address}</p>
              <p>{office.phone}</p>
              <p>{office.email}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="shell footer-bottom">
        <div className="footer-col">
          <p className="footer-label">{t('menu')}</p>
          <div className="footer-nav">
            {siteConfig.navigation.map((item) => (
              <Link key={item.key} href={`/${locale}${item.href}`}>
                {nav(item.key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <p className="footer-label">{t('social')}</p>
          <div className="social-nav">
            {siteConfig.socialLinks.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
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
