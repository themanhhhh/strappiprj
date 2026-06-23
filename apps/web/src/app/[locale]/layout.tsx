import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Footer} from '@/components/footer';
import {Header} from '@/components/header';
import {locales, type Locale} from '@/i18n/routing';
import {ChatWidget} from '@/components/chat-widget';
import {FixedHotlineCta} from '@/components/fixed-hotline-cta';
import {getSiteSetting} from '@/lib/strapi/queries';
import {siteUrl} from '@/lib/seo';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, siteSetting] = await Promise.all([
    import(`@/messages/${locale}.json`).then((m) => m.default),
    getSiteSetting(),
  ]);
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'New Sky',
    legalName: 'Công ty TNHH Xây Dựng và Thực Phẩm New Sky',
    url: siteUrl,
    telephone: '0906790333',
    email: 'syluu.newsky@gmail.com',
    description: locale === 'vi'
      ? 'Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt, với xưởng tự sản xuất nội thất, inox bếp và biển hiệu.'
      : 'Design and construction partner for F&B restaurants in Vietnam, with in-house interiors, kitchen stainless steel, and signage production.',
    areaServed: 'Vietnam',
    knowsAbout: [
      'Thiết kế nhà hàng F&B',
      'Thi công nhà hàng F&B',
      'Inox bếp công nghiệp',
      'Nội thất nhà hàng',
      'Biển hiệu nhà hàng',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '0906790333',
        email: 'syluu.newsky@gmail.com',
        contactType: 'sales',
        areaServed: 'VN',
        availableLanguage: ['vi', 'en'],
      },
    ],
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd)}}
      />
      <div className="page-frame maestro-locale-frame">
        <Header locale={locale as Locale} />
        <main className="page-main">{children}</main>
        <Footer locale={locale as Locale} />
        <ChatWidget enabled={siteSetting.chatEnabled} />
        <FixedHotlineCta />
      </div>
    </NextIntlClientProvider>
  );
}
