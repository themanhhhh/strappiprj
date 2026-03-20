import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import {FullscreenMenu} from '@/components/aladdin/fullscreen-menu';
import {localeLabels, type Locale} from '@/i18n/routing';
import {siteConfig} from '@/lib/site';

type HeaderProps = {
  locale: Locale;
  transparent?: boolean;
};

export async function Header({locale, transparent = false}: HeaderProps) {
  const t = await getTranslations({locale, namespace: 'nav'});
  const menuItems = siteConfig.navigation.map((item) => ({
    key: item.key,
    label: t(item.key),
    href: item.href
  }));

  const headerClass = transparent
    ? 'site-header site-header-transparent'
    : 'site-header';

  return (
    <header className={headerClass}>
      <div className="shell">
        <FullscreenMenu items={menuItems} locale={locale} transparent={transparent} />
      </div>
    </header>
  );
}
