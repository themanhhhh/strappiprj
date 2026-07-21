import type {MetadataRoute} from 'next';
import {cityPresence} from '@/lib/city-presence';
import {jobs, posts, projects, services} from '@/lib/catalog';
import {getLocalizedPath, siteUrl} from '@/lib/seo';
import {viServiceHubPaths} from '@/lib/routes';

const staticPaths = [
  '',
  '/ve-chung-toi',
  '/tac-gia/luu-sy',
  '/dich-vu',
  ...Object.values(viServiceHubPaths),
  '/du-an',
  '/tin-tuc',
  '/tuyen-dung',
  '/xuong-inox-bep-cong-nghiep-ha-dong',
  '/thi-cong-bep-fnb-tphcm',
  '/faq',
  '/lien-he',
  ...cityPresence.map((city) => `/thanh-pho/${city.slug}`),
] as const;

function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({
      url: absoluteUrl(getLocalizedPath('vi', path)),
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
    });
  }

  for (const service of services) {
    entries.push({
      url: absoluteUrl(getLocalizedPath('vi', `/dich-vu/${service.slug}`)),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const project of projects) {
    entries.push({
      url: absoluteUrl(getLocalizedPath('vi', `/du-an/${project.slug}`)),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const post of posts) {
    entries.push({
        url: absoluteUrl(getLocalizedPath('vi', `/tin-tuc/${post.slug}`)),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
  }

  for (const job of jobs) {
    entries.push({
      url: absoluteUrl(getLocalizedPath('vi', `/tuyen-dung/${job.slug}`)),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    });
  }

  return entries;
}
