import type {Metadata} from 'next';
import {locales, type Locale} from '@/i18n/routing';

export const siteUrl = 'https://newskyfnb.vn';

export function getLocalizedPath(locale: string, path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getLocalizedAlternates(locale: string, path = ''): Metadata['alternates'] {
  const languages = Object.fromEntries(
    locales.map((entry) => [entry, getLocalizedPath(entry, path)]),
  ) as Record<Locale, string>;

  return {
    canonical: getLocalizedPath(locale, path),
    languages: {
      ...languages,
      'x-default': getLocalizedPath('vi', path),
    },
  };
}

export function getOpenGraphLocale(locale: string) {
  return locale === 'vi' ? 'vi_VN' : 'en_US';
}
