import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import ProjectsPage from '../projects/page';

type AliasPageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: AliasPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'projectsPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/du-an'),
    openGraph: {locale: getOpenGraphLocale(locale), url: `/${locale}/du-an`},
  };
}

export default ProjectsPage;
