import type {Locale} from '@/i18n/routing';

const localizedPaths: Record<string, Partial<Record<Locale, string>>> = {
  about: {vi: '/ve-chung-toi', en: '/about'},
  services: {vi: '/dich-vu', en: '/services'},
  projects: {vi: '/du-an', en: '/projects'},
  journal: {vi: '/blog', en: '/journal'},
  careers: {vi: '/careers', en: '/careers'},
  contact: {vi: '/lien-he', en: '/contact'},
};

export function getNavPath(key: string, locale: Locale, fallback: string) {
  return localizedPaths[key]?.[locale] ?? fallback;
}

export function withLocale(locale: string, path: string) {
  return `/${locale}${path === '/' ? '' : path}`;
}

export const viServiceHubPaths = {
  fullPackage: '/dich-vu/thiet-ke-thi-cong-nha-hang-tron-goi',
  kitchen: '/dich-vu/bep-cong-nghiep-inox',
  signage: '/dich-vu/bien-hieu-fnb',
  interiors: '/dich-vu/noi-that-fnb',
};
