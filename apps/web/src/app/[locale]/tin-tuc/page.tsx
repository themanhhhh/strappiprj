import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import JournalPage from '../journal/page';

type TinTucPageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: TinTucPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'journalPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/tin-tuc'),
    openGraph: {locale: getOpenGraphLocale(locale), url: `/${locale}/tin-tuc`},
  };
}

export default JournalPage;
