import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {defaultLocale, locales, localePrefix} from '@/i18n/routing';

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix
});

const viRedirects: Record<string, string> = {
  '/vi/about': '/vi/ve-chung-toi',
  '/vi/services': '/vi/dich-vu',
  '/vi/projects': '/vi/du-an',
  '/vi/blog': '/vi/tin-tuc',
  '/vi/journal': '/vi/tin-tuc',
  '/vi/careers': '/vi/tuyen-dung',
  '/vi/contact': '/vi/lien-he',
};

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = `/vi${pathname.replace(/^\/en/, '')}`;
    return NextResponse.redirect(url, 302);
  }

  for (const [from, to] of Object.entries(viRedirects)) {
    const shouldRedirectNested = from === '/vi/projects' || from === '/vi/journal' || from === '/vi/careers';
    if (pathname === from || (shouldRedirectNested && pathname.startsWith(`${from}/`))) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(from, to);
      return NextResponse.redirect(url, 301);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
