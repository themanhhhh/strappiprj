import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/routing';
import {jobs, posts, projects, services} from '@/lib/catalog';
import {getLocalizedPath, siteUrl} from '@/lib/seo';
import {viServiceHubPaths} from '@/lib/routes';

const staticPathsByLocale = {
  vi: [
    '',
    '/ve-chung-toi',
    '/tac-gia/luu-sy',
    '/dich-vu',
    ...Object.values(viServiceHubPaths),
    '/du-an',
    '/blog',
    '/xuong-inox-bep-cong-nghiep-ha-dong',
    '/thi-cong-bep-fnb-tphcm',
    '/faq',
    '/lien-he',
  ],
  en: ['', '/about', '/services', '/projects', '/journal', '/careers', '/contact'],
} as const;

function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPathsByLocale[locale]) {
      entries.push({
        url: absoluteUrl(getLocalizedPath(locale, path)),
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }

    for (const service of services) {
      entries.push({
        url: absoluteUrl(getLocalizedPath(locale, `/services/${service.slug}`)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const project of projects) {
      entries.push({
        url: absoluteUrl(getLocalizedPath(locale, `/projects/${project.slug}`)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const post of posts) {
      entries.push({
        url: absoluteUrl(getLocalizedPath(locale, `/journal/${post.slug}`)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    for (const job of jobs) {
      entries.push({
        url: absoluteUrl(getLocalizedPath(locale, `/careers/${job.slug}`)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.4,
      });
    }
  }

  return entries;
}
