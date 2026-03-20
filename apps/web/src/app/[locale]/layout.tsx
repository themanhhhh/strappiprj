import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Footer} from '@/components/footer';
import {Header} from '@/components/header';
import {locales, type Locale} from '@/i18n/routing';
import {Roboto} from 'next/font/google';
import {ChatWidget} from '@/components/chat-widget';
import {getSiteSetting} from '@/lib/strapi/queries';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-roboto',
});

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`page-frame ${roboto.variable}`}>
        <Header locale={locale as Locale} />
        <main className="page-main">{children}</main>
        <Footer locale={locale as Locale} />
        <ChatWidget enabled={siteSetting.chatEnabled} />
      </div>
    </NextIntlClientProvider>
  );
}
