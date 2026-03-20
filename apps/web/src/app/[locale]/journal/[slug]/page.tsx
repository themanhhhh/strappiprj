import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ButtonLink} from '@/components/button-link';
import {CtaStrip} from '@/components/cta-strip';
import {PageHero} from '@/components/page-hero';
import {getPostBySlug, getPosts} from '@/lib/strapi/queries';
import {getPost, posts as catalogPosts} from '@/lib/catalog';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type PostDetailPageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const strapiPosts = await getPosts('vi');
  if (strapiPosts.length > 0) {
    return strapiPosts.map((p) => ({slug: p.slug}));
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
    : undefined;

  return {
    title: `${title} — ALADDIN JSC`,
    description,
    openGraph: {
      title,
      description,
      ...(imageUrl ? {images: [{url: imageUrl}]} : {}),
    },
  };
}

export default async function PostDetailPage({params}: PostDetailPageProps) {
  const {locale, slug} = await params;
  const post = await getPostBySlug(slug, locale);

  if (post) {
    const coverUrl = post.cover?.url
      ? post.cover.url.startsWith('http') ? post.cover.url : `${STRAPI_URL}${post.cover.url}`
      : null;

    return (
      <>
        <PageHero
          eyebrow={post.meta ?? post.category?.name ?? ''}
          title={post.title}
          description={post.description ?? ''}
          actions={
            <div className="button-row">
              <ButtonLink href={`/${locale}/journal`} variant="secondary">
                {locale === 'vi' ? '← Quay lại tin tức' : '← Back to journal'}
              </ButtonLink>
            </div>
          }
        />

        {coverUrl && (
          <section className="section-block">
            <div className="shell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl}
                alt={post.cover?.alternativeText ?? post.title}
                style={{width: '100%', aspectRatio: '16/7', objectFit: 'cover', display: 'block', borderRadius: '4px'}}
              />
            </div>
          </section>
        )}

        {post.intro && (
          <section className="section-block">
            <div className="shell">
              <p className="post-intro" style={{fontSize: '1.125rem', lineHeight: '1.8', maxWidth: '72ch', opacity: 0.85}}>
                {post.intro}
              </p>
            </div>
          </section>
        )}

        {post.content && (
          <section className="section-block">
            <div className="shell">
              <div
                className="prose"
                style={{maxWidth: '72ch'}}
                dangerouslySetInnerHTML={{__html: post.content}}
              />
            </div>
          </section>
        )}

        <section className="section-block">
          <div className="shell">
            <CtaStrip
              label={locale === 'vi' ? 'Liên hệ' : 'Contact'}
              title={locale === 'vi' ? 'Bạn muốn trao đổi thêm?' : 'Want to discuss this further?'}
              description={locale === 'vi' ? 'Chúng tôi luôn sẵn sàng tư vấn trực tiếp cho dự án của bạn.' : 'We are always ready for a direct consultation on your project.'}
              primary={{label: locale === 'vi' ? 'Liên hệ ngay' : 'Contact us', href: `/${locale}/contact`}}
              secondary={{label: locale === 'vi' ? 'Xem dịch vụ' : 'View services', href: `/${locale}/services`}}
            />
          </div>
        </section>
      </>
    );
  }

  // Fallback to catalog
  const catalogPost = getPost(slug);
  if (!catalogPost) notFound();

  return (
    <>
      <PageHero
        eyebrow={catalogPost.meta}
        title={catalogPost.title}
        description={catalogPost.description}
        actions={
          <div className="button-row">
            <ButtonLink href={`/${locale}/journal`} variant="secondary">
              {locale === 'vi' ? '← Quay lại tin tức' : '← Back to journal'}
            </ButtonLink>
          </div>
        }
        aside={<p>{catalogPost.intro}</p>}
      />

      <section className="section-block">
        <div className="shell">
          <CtaStrip
            label={locale === 'vi' ? 'Liên hệ' : 'Contact'}
            title={locale === 'vi' ? 'Bạn muốn trao đổi thêm?' : 'Want to discuss this further?'}
            description={locale === 'vi' ? 'Chúng tôi luôn sẵn sàng tư vấn trực tiếp.' : 'We are always ready for a direct consultation.'}
            primary={{label: locale === 'vi' ? 'Liên hệ ngay' : 'Contact us', href: `/${locale}/contact`}}
            secondary={{label: locale === 'vi' ? 'Xem dịch vụ' : 'View services', href: `/${locale}/services`}}
          />
        </div>
      </section>
    </>
  );
}
