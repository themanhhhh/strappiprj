import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import CareersPage from '../careers/page';

type TuyenDungPageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: TuyenDungPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'careersPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/tuyen-dung'),
    openGraph: {locale: getOpenGraphLocale(locale), url: `/${locale}/tuyen-dung`},
  };
}

export default CareersPage;
