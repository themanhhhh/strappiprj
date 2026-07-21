import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {CtaStrip} from '@/components/cta-strip';
import {Header} from '@/components/header';
import {SlideshowBackground} from '@/components/slideshow-background';
import type {Locale} from '@/i18n/routing';
import {locales} from '@/i18n/routing';
import {getHeroSlides, getPostBySlug, getPosts} from '@/lib/strapi/queries';
import {fallbackBannerImage, getPost, posts as catalogPosts} from '@/lib/catalog';
import {getLocalizedAlternates, getOpenGraphLocale} from '@/lib/seo';
import {getTranslations} from 'next-intl/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type PostDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

function isHiddenSamplePost(post: {slug?: string; title?: string} | null | undefined) {
  return Boolean(post?.slug?.includes('chuan-bi') || post?.title?.includes('Chuẩn bị'));
}

export async function generateStaticParams() {
  const strapiPosts = (await Promise.all(locales.map((locale) => getPosts(locale)))).flat();
  const visibleStrapiPosts = strapiPosts.filter((post) => !isHiddenSamplePost(post));
  if (visibleStrapiPosts.length > 0) {
    return Array.from(new Set(visibleStrapiPosts.map((p) => p.slug))).map((slug) => ({slug}));
  }
  return catalogPosts.map((p) => ({slug: p.slug}));
}

export async function generateMetadata({params}: PostDetailPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = await getPostBySlug(slug, locale);
  const catalogPost = post ? null : getPost(slug);
  const title = post?.title ?? catalogPost?.title ?? slug;
  const description = post?.description ?? catalogPost?.description ?? '';
  const imageUrl = post?.cover?.url
    ? post.cover.url.startsWith('http') ? post.cover.url : `${STRAPI_URL}${post.cover.url}`
    : fallbackBannerImage;

  const contentPath = locale === 'vi' ? '/tin-tuc' : '/journal';

  return {
    title: `${title} — New Sky`,
    description,
    alternates: getLocalizedAlternates(locale, `${contentPath}/${slug}`),
    openGraph: {
      title,
      description,
      locale: getOpenGraphLocale(locale),
      url: `/${locale}${contentPath}/${slug}`,
      ...(imageUrl ? {images: [{url: imageUrl}]} : {}),
    },
  };
}

export default async function PostDetailPage({params}: PostDetailPageProps) {
  const {locale, slug} = await params;
  const t = await getTranslations({locale, namespace: 'journalDetail'});
  const [post, detailHeroSlides, allStrapiPosts] = await Promise.all([
    getPostBySlug(slug, locale),
    getHeroSlides(locale, 'journal'),
    getPosts(locale),
  ]);
  const catalogPost = post ? null : getPost(slug);
  const targetPost = post || catalogPost;

  if (!targetPost || isHiddenSamplePost(targetPost)) notFound();

  // Determine cover URL
  let coverUrl = null;
  if ('cover' in targetPost && targetPost.cover?.url) { // Strapi Post
    coverUrl = targetPost.cover.url.startsWith('http') ? targetPost.cover.url : `${STRAPI_URL}${targetPost.cover.url}`;
  } 

  const heroSlides = detailHeroSlides
    .map((slide) => ({
      imageUrl: slide.cover?.url
        ? slide.cover.url.startsWith('http')
          ? slide.cover.url
          : `${STRAPI_URL}${slide.cover.url}`
        : null,
    }))
    .filter((slide) => slide.imageUrl);

  // Fetch related posts (latest 2 excluding current)
  let relatedPosts = allStrapiPosts
    .filter((p) => p.slug !== slug && !isHiddenSamplePost(p))
    .slice(0, 2)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      date: p.publishedAt,
      coverUrl: p.cover?.url
        ? p.cover.url.startsWith('http') ? p.cover.url : `${STRAPI_URL}${p.cover.url}`
        : null,
    }));

  if (relatedPosts.length === 0) {
    relatedPosts = catalogPosts
      .filter((p) => p.slug !== slug)
      .slice(0, 2)
      .map((p) => ({
        title: p.title,
        slug: p.slug,
        date: new Date().toISOString(), // Mock date for catalog posts if any
        coverUrl: fallbackBannerImage,
      }));
  }

  let eyebrowMeta = '';
  if (post) {
    eyebrowMeta = post.meta ?? post.category?.name ?? '';
  } else if (catalogPost) {
    eyebrowMeta = catalogPost.meta ?? (catalogPost as any).category?.name ?? '';
  }

  const publishedLabel = post?.publishedAt
    ? new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <div className="journal-detail-page maestro-project-page journal-article-maestro-page">
      <div className="journal-hero-maestro hero-header-page">
        <Header locale={locale as Locale} transparent />
        <div className="journal-hero-bg-maestro">
          {heroSlides.length > 0 ? (
            <SlideshowBackground slides={heroSlides} />
          ) : coverUrl ? (
            <Image src={fallbackBannerImage} alt={targetPost.title} fill priority style={{objectFit: 'cover'}} />
          ) : (
            <Image src={fallbackBannerImage} alt={targetPost.title} fill priority style={{objectFit: 'cover'}} />
          )}
          <div className="journal-hero-overlay-maestro" />
        </div>
        
      </div>

      <section className="journal-article-intro-band-maestro">
        <div className="shell journal-article-intro-grid-maestro">
          <div>
            <p className="journal-index-section-kicker-maestro">
              {t('overview')}
            </p>
          </div>
          <p className="journal-intro-maestro">{targetPost.intro || targetPost.description}</p>
        </div>
      </section>

      <div className="journal-content-wrapper-maestro">
        {'content' in targetPost && targetPost.content ? (
          <div
            className="journal-body-maestro"
            dangerouslySetInnerHTML={{__html: targetPost.content}}
          />
        ) : (
          <div className="journal-body-maestro">
            <p>{targetPost.description}</p>
          </div>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="related-news-section-maestro">
          <div className="shell">
            <div className="related-news-header-maestro">
              <p className="journal-index-section-kicker-maestro">
                 {t('relatedLabel')}
              </p>
              <h2 className="related-news-title-maestro">
                 {t('relatedTitle')}
              </h2>
            </div>
            <div className="journal-related-grid-maestro">
              {relatedPosts.map((rp) => (
                <article key={rp.slug} className="journal-related-card-maestro">
                  <div className="journal-related-media-maestro">
                    {rp.coverUrl ? (
                      <Image src={rp.coverUrl} alt={rp.title} fill style={{objectFit: 'cover'}} />
                    ) : (
                      <div className="journal-related-placeholder-maestro" />
                    )}
                  </div>
                  <div className="journal-related-content-maestro">
                    {rp.date && (
                      <p className="journal-related-date-maestro">
                        {new Date(rp.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                    )}
                    <h3 className="journal-related-title-maestro">{rp.title}</h3>
                    <Link href={`/${locale}/${locale === 'vi' ? 'tin-tuc' : 'journal'}/${rp.slug}`} className="journal-card-link-maestro">
                      {t('readMore')}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
