/**
 * Strapi query helpers
 * High-level functions to fetch data from Strapi REST API.
 * Uses Strapi v5 array-style populate: populate[0]=cover&populate[1]=services
 * Falls back gracefully when Strapi is unreachable.
 */

import {strapiGet} from './client';
import type {
  StrapiListResponse,
  StrapiSingleResponse,
  StrapiProject,
  StrapiService,
  StrapiPost,
  StrapiJob,
  StrapiHeroSlide,
  StrapiDocument,
  StrapiSiteSetting,
} from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

/** Returns the full URL for a Strapi image */
export function getStrapiImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── Hero Slides ─────────────────────────────────────────────────────────────

export async function getHeroSlides(
  locale = 'vi',
  pageKey?: string,
): Promise<StrapiDocument<StrapiHeroSlide>[]> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiHeroSlide>>(
      '/api/hero-slides',
      {
        params: {
          locale,
          populate: ['cover'],
          sort: 'order:asc',
          'pagination[pageSize]': 10,
        },
        next: {revalidate: 60},
      },
    );
    const all = res.data ?? [];
    if (!pageKey) return all;
    // Lọc: slide có pages=["all"] hoặc pages chứa pageKey (hoặc pages null/empty = all)
    return all.filter((slide) => {
      const pages = slide.pages;
      if (!pages || pages.length === 0) return true;
      return pages.includes('all') || pages.includes(pageKey);
    });
  } catch {
    return [];
  }
}

// ─── Projects ──────────────────────────────────────────────────────────────

export async function getProjects(
  locale = 'vi',
  category?: string,
): Promise<StrapiDocument<StrapiProject>[]> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiProject>>(
      '/api/projects',
      {
        params: {
          locale,
          populate: ['cover', 'logo', 'services'],
          'pagination[pageSize]': 100,
          sort: 'year:desc',
          // Filter by category if provided
          ...(category ? {'filters[category][$eqi]': category} : {}),
        },
        next: {revalidate: 60},
      },
    );
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
  locale = 'vi',
): Promise<StrapiDocument<StrapiProject> | null> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiProject>>(
      '/api/projects',
      {
        params: {
          locale,
          'filters[slug][$eq]': slug,
          populate: ['cover', 'logo', 'gallery', 'services'],
        },
        next: {revalidate: 60},
      },
    );
    return res.data?.[0] ?? null;
  } catch {
    return null;
  }
}

// ─── Services ──────────────────────────────────────────────────────────────

export async function getServices(
  locale = 'vi',
): Promise<StrapiDocument<StrapiService>[]> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiService>>(
      '/api/services',
      {
        params: {
          locale,
          populate: ['cover'],
          'pagination[pageSize]': 50,
          sort: 'index:asc',
        },
        next: {revalidate: 60},
      },
    );
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getServiceBySlug(
  slug: string,
  locale = 'vi',
): Promise<StrapiDocument<StrapiService> | null> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiService>>(
      '/api/services',
      {
        params: {
          locale,
          'filters[slug][$eq]': slug,
          populate: ['projects', 'projects.cover'],
        },
        next: {revalidate: 60},
      },
    );
    return res.data?.[0] ?? null;
  } catch {
    return null;
  }
}

// ─── Posts ─────────────────────────────────────────────────────────────────

export async function getPosts(
  locale = 'vi',
): Promise<StrapiDocument<StrapiPost>[]> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiPost>>('/api/posts', {
      params: {
        locale,
        populate: ['cover', 'category'],
        'pagination[pageSize]': 50,
        sort: 'publishedAt:desc',
      },
      next: {revalidate: 60},
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  locale = 'vi',
): Promise<StrapiDocument<StrapiPost> | null> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiPost>>('/api/posts', {
      params: {
        locale,
        'filters[slug][$eq]': slug,
        populate: ['cover', 'category'],
      },
      next: {revalidate: 60},
    });
    return res.data?.[0] ?? null;
  } catch {
    return null;
  }
}

// ─── Jobs ──────────────────────────────────────────────────────────────────

export async function getJobs(
  locale = 'vi',
): Promise<StrapiDocument<StrapiJob>[]> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiJob>>('/api/jobs', {
      params: {
        locale,
        populate: ['department'],
        'pagination[pageSize]': 50,
        sort: 'publishedAt:desc',
      },
      next: {revalidate: 60},
    });
    return res.data ?? [];
  } catch {
    return [];
  }
}

export async function getJobBySlug(
  slug: string,
  locale = 'vi',
): Promise<StrapiDocument<StrapiJob> | null> {
  try {
    const res = await strapiGet<StrapiListResponse<StrapiJob>>('/api/jobs', {
      params: {
        locale,
        'filters[slug][$eq]': slug,
        populate: ['department'],
      },
      next: {revalidate: 60},
    });
    return res.data?.[0] ?? null;
  } catch {
    return null;
  }
}

// ─── Homepage ────────────────────────────────────────────────────────────────

export async function getHomepage(
  locale = 'vi',
): Promise<StrapiDocument<import('./types').StrapiHomepage> | null> {
  try {
    const res = await strapiGet<StrapiSingleResponse<import('./types').StrapiHomepage>>(
      '/api/homepage',
      {
        params: {
          locale,
        },
        next: {revalidate: 60},
      },
    );
    return res.data ?? null;
  } catch {
    return null;
  }
}

// ─── Site Setting ─────────────────────────────────────────────────────────────

export async function getSiteSetting(): Promise<StrapiSiteSetting> {
  try {
    const res = await strapiGet<StrapiSingleResponse<StrapiSiteSetting>>(
      '/api/site-setting',
      {next: {revalidate: 30}},
    );
    return res.data ?? {chatEnabled: true};
  } catch {
    // Fallback: hiện chat nếu CMS không phản hồi
    return {chatEnabled: true};
  }
}

