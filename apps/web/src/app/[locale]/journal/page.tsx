import type {Metadata} from 'next';
import {PageHero} from '@/components/page-hero';
import {getPosts, getHeroSlides} from '@/lib/strapi/queries';
import {posts as catalogPosts} from '@/lib/catalog';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type JournalPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: JournalPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Tin tức — Trung tâm kiến thức' : 'Journal — Knowledge Base',
    description: locale === 'vi'
      ? 'Cập nhật tin tức, kiến thức và góc nhìn chuyên sâu về ngành F&B từ đội ngũ ALADDIN JSC.'
      : 'Stay updated with F&B industry news, insights and expert knowledge from the ALADDIN JSC team.',
  };
}

function formatDate(dateStr: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default async function JournalPage({params}: JournalPageProps) {
  const {locale} = await params;

  const [strapiPosts, heroSlides] = await Promise.all([
    getPosts(locale),
    getHeroSlides(locale, 'journal'),
  ]);
  const slides = heroSlides.map((s) => ({
    imageUrl: s.cover?.url ? (s.cover.url.startsWith('http') ? s.cover.url : `${STRAPI_URL}${s.cover.url}`) : null,
  }));
  const displayPosts =
    strapiPosts.length > 0
      ? strapiPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.publishedAt ?? null,
          coverUrl: p.cover?.url
            ? p.cover.url.startsWith('http') ? p.cover.url : `${STRAPI_URL}${p.cover.url}`
            : null,
        }))
      : catalogPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: null,
          coverUrl: null,
        }));

  return (
    <>
      <PageHero
        slides={slides}
        eyebrow={locale === 'vi' ? 'Trung tâm tin tức' : 'Knowledge Base'}
        title={locale === 'vi' ? 'Tin tức hệ sinh thái ALADDIN JSC' : 'ALADDIN JSC Ecosystem News'}
        description={locale === 'vi'
          ? 'Cập nhật tin tức, sự kiện và câu chuyện mới nhất từ hệ sinh thái nhà hàng Aladdin.'
          : 'Latest news, events and stories from the Aladdin restaurant ecosystem.'}
      />

      <section className="section-block">
        <div className="shell">
          <div className="news-card-grid">
            {displayPosts.map((post) => (
              <a
                key={post.slug}
                href={`/${locale}/journal/${post.slug}`}
                className="news-card"
              >
                <div className="news-card-img-wrap">
                  {post.coverUrl ? (
                    <img
                      src={post.coverUrl}
                      alt={post.title}
                      className="news-card-img"
                    />
                  ) : (
                    <div className="news-card-img-placeholder" />
                  )}
                </div>
                <div className="news-card-body">
                  {post.date && (
                    <p className="news-card-date">{formatDate(post.date, locale)}</p>
                  )}
                  <h3 className="news-card-title">{post.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
