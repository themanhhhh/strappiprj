import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiMediaHost = strapiUrl ? new URL(strapiUrl).hostname.replace('.strapiapp.com', '.media.strapiapp.com') : undefined;

const remotePatterns = [
  {
    protocol: 'http',
    hostname: 'localhost',
  },
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
];

if (strapiMediaHost) {
  remotePatterns.push({
    protocol: 'https',
    hostname: strapiMediaHost,
  });
}

export default withNextIntl({
  output: 'standalone',
  images: {
    remotePatterns,
  },
});
