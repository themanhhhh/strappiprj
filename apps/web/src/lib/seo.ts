import type {Metadata} from 'next';

export const siteUrl = 'https://newskyfnb.vn';

export function getLocalizedPath(locale: string, path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

export function getLocalizedAlternates(locale: string, path = ''): Metadata['alternates'] {
  return {
    canonical: getLocalizedPath(locale, path),
    languages: {
      'x-default': getLocalizedPath('vi', path),
      vi: getLocalizedPath('vi', path),
    },
  };
}

export function getOpenGraphLocale(locale: string) {
  return locale === 'vi' ? 'vi_VN' : 'en_US';
}
