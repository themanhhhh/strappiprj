import createMiddleware from 'next-intl/middleware';
import {defaultLocale, locales, localePrefix} from '@/i18n/routing';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix
});

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};

