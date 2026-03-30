import type {Metadata} from 'next';
import Link from 'next/link';
import {PageHero} from '@/components/page-hero';
import {getHeroSlides, getPosts} from '@/lib/strapi/queries';
import {posts as catalogPosts} from '@/lib/catalog';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

type JournalPageProps = {
  params: Promise<{locale: string}>;
};

type DisplayPost = {
  slug: string;
  title: string;
  date: string | null;
  meta: string;
  description: string;
  intro: string;
  coverUrl: string | null;
};

export async function generateMetadata({params}: JournalPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === 'vi' ? 'Journal - Tin tuc va goc nhin tu MAESTRO' : 'Journal - Insights from MAESTRO',
    description: locale === 'vi'
      ? 'Những câu chuyện về dự án, craftsmanship và năng lực thi công được biên tập theo tinh thần chi tiết, tinh tế và cao cấp của MAESTRO.'
      : 'Project stories, craftsmanship, and execution insights presented with MAESTRO\'s refined and editorial point of view.',
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

function getCopy(locale: string) {
  if (locale === 'vi') {
    return {
      eyebrow: 'Journal',
      title: 'Những câu chuyện về thi công và nội thất được biên tập với sự tiết chế, chính xác và tinh thần cao cấp.',
      description:
        'Từ project updates đến joinery, vật liệu và năng lực delivery, mỗi bài viết được trình bày như một bản phẩm thương hiệu: rõ ràng, tinh tế và giàu tính hình ảnh.',
      introLabel: 'Tinh thần editorial của MAESTRO',
      introTitle: 'Nội dung được xây dựng để phản ánh năng lực, sự chi tiết và chất lượng thực thi của MAESTRO.',
      introBody:
        'Journal là nơi MAESTRO chia sẻ những cập nhật về dự án, quy trình chế tác, chất lượng hoàn thiện và các góc nhìn thị trường liên quan đến construction, fit-out và interior delivery.',
      featureLabel: 'Bài viết nổi bật',
      listLabel: 'Tất cả bài viết',
      articleCount: 'bài viết',
      readMore: 'Đọc tiếp',
    };
  }

  return {
    eyebrow: 'Journal',
    title: 'Stories on construction and interiors, shaped with a more refined editorial discipline.',
    description:
      'From project updates to joinery, materials, and execution capability, each story is presented like a brand publication: composed, spacious, and quietly confident.',
    introLabel: 'The MAESTRO editorial language',
    introTitle: 'Content designed to reflect MAESTRO through precision, restraint, and delivery excellence.',
    introBody:
      'The Journal brings together project stories, manufacturing quality, finishing standards, and market perspectives across construction, fit-out, joinery, and interior delivery.',
    featureLabel: 'Featured story',
    listLabel: 'All articles',
    articleCount: 'articles',
    readMore: 'Read more',
  };
}

function mapPosts(strapiPosts: Awaited<ReturnType<typeof getPosts>>): DisplayPost[] {
  if (strapiPosts.length > 0) {
    return strapiPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.publishedAt ?? null,
      meta: post.meta,
      description: post.description,
      intro: post.intro,
      coverUrl: post.cover?.url
        ? post.cover.url.startsWith('http')
          ? post.cover.url
          : `${STRAPI_URL}${post.cover.url}`
        : null,
    }));
  }

  return catalogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: null,
    meta: post.meta,
    description: post.description,
    intro: post.intro,
    coverUrl: null,
  }));
}

export default async function JournalPage({params}: JournalPageProps) {
  const {locale} = await params;

  const [strapiPosts, heroSlides] = await Promise.all([
    getPosts(locale),
    getHeroSlides(locale, 'journal'),
  ]);

  const displayPosts = mapPosts(strapiPosts);
  const copy = getCopy(locale);
  const slides = heroSlides
    .map((slide) => ({
      imageUrl: slide.cover?.url
        ? slide.cover.url.startsWith('http')
          ? slide.cover.url
          : `${STRAPI_URL}${slide.cover.url}`
        : null,
    }))
    .filter((slide) => slide.imageUrl);
  const heroImage = displayPosts[0]?.coverUrl ?? null;
  const [featuredPost, ...remainingPosts] = displayPosts;

  return (
    <div className="journal-index-maestro-page">
      <PageHero
        slides={slides}
        imageUrl={heroImage ?? undefined}
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <section className="journal-hero-summary-maestro">
        <div className="shell">
          <div className="journal-index-meta-row-maestro journal-index-meta-row-surface-maestro">
            <span>{String(displayPosts.length).padStart(2, '0')} {copy.articleCount}</span>
            <span>Editorial format</span>
            <span>Crafted presentation</span>
          </div>
        </div>
      </section>

      <section className="journal-index-intro-maestro">
        <div className="shell journal-index-intro-grid-maestro">
          <div>
            <p className="journal-index-section-kicker-maestro">{copy.introLabel}</p>
            <h2 className="journal-index-section-title-maestro">{copy.introTitle}</h2>
          </div>
          <p className="journal-index-intro-copy-maestro">{copy.introBody}</p>
        </div>
      </section>

      {featuredPost ? (
        <section className="journal-featured-maestro">
          <div className="shell journal-featured-grid-maestro">
            <div className="journal-featured-media-maestro">
              {featuredPost.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featuredPost.coverUrl} alt={featuredPost.title} className="journal-featured-image-maestro" />
              ) : (
                <div className="journal-featured-placeholder-maestro" />
              )}
            </div>

            <div className="journal-featured-content-maestro">
              <p className="journal-index-section-kicker-maestro">{copy.featureLabel}</p>
              <h2 className="journal-featured-title-maestro">{featuredPost.title}</h2>

              <div className="journal-featured-meta-maestro">
                {featuredPost.meta ? <span>{featuredPost.meta}</span> : null}
                {featuredPost.date ? <span>{formatDate(featuredPost.date, locale)}</span> : null}
              </div>

              <p className="journal-featured-summary-maestro">
                {featuredPost.intro || featuredPost.description}
              </p>

              <Link href={`/${locale}/journal/${featuredPost.slug}`} className="journal-featured-link-maestro">
                {copy.readMore}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="journal-listing-maestro">
        <div className="shell">
          <div className="journal-listing-header-maestro">
            <p className="journal-index-section-kicker-maestro">{copy.listLabel}</p>
          </div>

          <div className="journal-listing-grid-maestro">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/journal/${post.slug}`}
                className="journal-card-maestro"
              >
                <div className="journal-card-media-maestro">
                  {post.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverUrl} alt={post.title} className="journal-card-image-maestro" />
                  ) : (
                    <div className="journal-card-placeholder-maestro" />
                  )}
                </div>

                <div className="journal-card-content-maestro">
                  <div className="journal-card-meta-maestro">
                    {post.date ? <span>{formatDate(post.date, locale)}</span> : null}
                    {post.meta ? <span>{post.meta}</span> : null}
                  </div>

                  <h3 className="journal-card-title-maestro">{post.title}</h3>
                  <p className="journal-card-summary-maestro">{post.description || post.intro}</p>
                  <span className="journal-card-link-maestro">{copy.readMore}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
