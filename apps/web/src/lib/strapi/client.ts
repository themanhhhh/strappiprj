/**
 * Strapi REST API Client
 * Wraps Next.js fetch with auth headers, caching and error handling.
 * Supports Strapi v5 array-style populate params.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

export type StrapiError = {
  status: number;
  name: string;
  message: string;
  details?: unknown;
};

type ParamValue = string | number | boolean | undefined;

type FetchOptions = {
  /** Next.js cache strategy */
  next?: NextFetchRequestConfig;
  /**
   * Query params. Supports both scalar values and arrays.
   * Arrays are serialised as populate[0]=x&populate[1]=y (Strapi v5 format).
   */
  params?: Record<string, ParamValue | ParamValue[]>;
};

function buildUrl(path: string, params?: FetchOptions['params']): string {
  const url = new URL(`${STRAPI_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;

      if (Array.isArray(value)) {
        // Strapi v5 format: populate[0]=cover&populate[1]=services
        value.forEach((v, i) => {
          if (v !== undefined) {
            url.searchParams.append(`${key}[${i}]`, String(v));
          }
        });
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function strapiGet<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = buildUrl(path, options.params);

  // In dev, always fetch fresh. In prod, use ISR revalidation.
  const isDev = process.env.NODE_ENV === 'development';
  const fetchInit: RequestInit = {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...(isDev
      ? {cache: 'no-store'}
      : {next: options.next ?? {revalidate: 60}}),
  };

  const res = await fetch(url, fetchInit);

  if (!res.ok) {
    const errorData = (await res.json().catch(() => ({}))) as {
      error?: StrapiError;
    };
    throw new Error(
      errorData.error?.message ?? `Strapi API error: ${res.status}`,
    );
  }

  return res.json() as Promise<T>;
}
