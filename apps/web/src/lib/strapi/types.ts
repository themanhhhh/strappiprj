/**
 * TypeScript types matching Strapi v5 REST API response format.
 */

// ─── Strapi v5 response wrappers ─────────────────────────────────────────────

export type StrapiDocument<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
};

export type StrapiListResponse<T> = {
  data: StrapiDocument<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: StrapiDocument<T>;
  meta: Record<string, unknown>;
};

export type StrapiImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
};

export type StrapiImage = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  url: string;
};

// ─── Project ──────────────────────────────────────────────────────────────────

export type StrapiProject = {
  title: string;
  slug: string;
  description: string;
  meta: string;
  category: string;
  location: string;
  year: string;
  area: string;
  challenge: string;
  solution: string;
  outcome: string;
  cover: StrapiImage | null;
  logo: StrapiImage | null;
  gallery: StrapiImage[];
  services: StrapiDocument<StrapiService>[];
};

// ─── Service ──────────────────────────────────────────────────────────────────

export type StrapiService = {
  title: string;
  slug: string;
  description: string;
  meta: string;
  index: string;
  deliverables: string;
  process: string;
  cover: StrapiImage | null;
  projects: StrapiDocument<StrapiProject>[];
};

// ─── Post ─────────────────────────────────────────────────────────────────────

export type StrapiPost = {
  title: string;
  slug: string;
  description: string;
  meta: string;
  intro: string;
  content: string;
  cover: StrapiImage | null;
  category: StrapiDocument<StrapiPostCategory> | null;
};

export type StrapiPostCategory = {
  name: string;
  slug: string;
};

// ─── Job ──────────────────────────────────────────────────────────────────────

export type StrapiJob = {
  title: string;
  slug: string;
  description: string;
  meta: string;
  location: string;
  jobType: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  department: StrapiDocument<StrapiDepartment> | null;
};

export type StrapiDepartment = {
  name: string;
  slug: string;
};

// ─── Hero Slide ───────────────────────────────────────────────────────────────

export type StrapiHeroSlide = {
  title: string;
  eyebrow: string | null;
  description: string | null;
  imageLabel: string | null;
  order: number;
  stats: any; // Mảng JSON gồm {value, label}
  cover: StrapiImage | null;
  /** Danh sách trang hiển thị slide. ["all"] = tất cả trang. Ví dụ: ["home","services"] */
  pages: string[] | null;
};

// ─── Homepage ─────────────────────────────────────────────────────────────────

export type StrapiHomepage = {
  brandSectionTitle: string | null;
  brandSectionLead: string | null;
  socialTitle: string | null;
  socialLead: string | null;
  socialStories: any; // Mảng JSON gồm {title, description}
  careersTitle: string | null;
  careersLead: string | null;
  careersBlock: any; // JSON object gồm {title, description, highlights}
  newsTitle: string | null;
  newsLead: string | null;
  ctaLabel: string | null;
  ctaTitle: string | null;
  ctaDescription: string | null;
  ctaPrimary: string | null;
  ctaSecondary: string | null;
};

// ─── Site Setting ─────────────────────────────────────────────────────────────

export type StrapiSiteSetting = {
  chatEnabled: boolean;
};

