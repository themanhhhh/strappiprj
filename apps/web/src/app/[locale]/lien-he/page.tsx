import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getLocalizedAlternates, getOpenGraphLocale, siteUrl} from '@/lib/seo';
import {siteConfig} from '@/lib/site';
import ContactPage from '../contact/page';

type AliasPageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: AliasPageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contactPage'});
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: getLocalizedAlternates(locale, '/lien-he'),
    openGraph: {locale: getOpenGraphLocale(locale), url: `/${locale}/lien-he`},
  };
}

export default async function LienHePage(props: AliasPageProps) {
  const {locale} = await props.params;
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'New Sky',
    legalName: 'Công ty TNHH Xây Dựng và Thực Phẩm New Sky',
    url: `${siteUrl}/${locale}/lien-he`,
    telephone: '+84906790333',
    email: 'syluu.newsky@gmail.com',
    areaServed: 'Vietnam',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84906790333',
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['vi', 'en'],
    },
    department: siteConfig.offices.map((office) => ({
      '@type': 'LocalBusiness',
      name: office.label,
      address: office.address,
      telephone: '+84906790333',
      email: office.email,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(localBusinessJsonLd)}} />
      <ContactPage {...props} />
    </>
  );
}
