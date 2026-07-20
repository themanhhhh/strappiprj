import createNextIntlPlugin from 'next-intl/plugin';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const appDir = dirname(fileURLToPath(import.meta.url));
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
  {
    protocol: 'https',
    hostname: 'res.cloudinary.com',
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
  outputFileTracingRoot: appDir,
  images: {
    remotePatterns,
  },
});
