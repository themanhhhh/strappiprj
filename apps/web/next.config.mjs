import createNextIntlPlugin from 'next-intl/plugin';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const appDir = dirname(fileURLToPath(import.meta.url));
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiHost = strapiUrl ? new URL(strapiUrl).hostname : undefined;
const strapiMediaHost = strapiHost?.endsWith('.strapiapp.com')
  ? strapiHost.replace('.strapiapp.com', '.media.strapiapp.com')
  : undefined;

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

if (strapiHost && strapiHost !== 'localhost') {
  remotePatterns.push({
    protocol: 'https',
    hostname: strapiHost,
  });
}

export default withNextIntl({
  output: 'standalone',
  outputFileTracingRoot: appDir,
  images: {
    remotePatterns,
  },
});
