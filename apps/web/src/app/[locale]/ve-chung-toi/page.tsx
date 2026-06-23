import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import AboutPage from '../about/page';

type AliasPageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: AliasPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'aboutPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/ve-chung-toi'),
    openGraph: {locale: getOpenGraphLocale(locale), url: `/${locale}/ve-chung-toi`},
  };
}

export default AboutPage;
