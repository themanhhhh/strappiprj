import type {Metadata} from 'next';
import Link from 'next/link';
import {Header} from '@/components/header';
import {SlideshowBackground} from '@/components/slideshow-background';
import type {Locale} from '@/i18n/routing';
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
      ? 'Nhung cau chuyen ve du an, craftsmanship va nang luc thi cong duoc bien tap theo tinh than chi tiet, tiet che va cao cap cua MAESTRO.'
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
      title: 'Nhung cau chuyen ve thi cong va noi that duoc bien tap voi su tiet che, chinh xac va tinh than cao cap.',
      description:
        'Tu project updates den joinery, vat lieu va nang luc delivery, moi bai viet duoc trinh bay nhu mot an pham thuong hieu: ro rang, tinh te va giau tinh hinh anh.',
      introLabel: 'Tinh than editorial cua MAESTRO',
      introTitle: 'Noi dung duoc xay dung de phan anh nang luc, su chi tiet va chat luong thuc thi cua MAESTRO.',
      introBody:
        'Journal la noi MAESTRO chia se nhung cap nhat ve du an, quy trinh che tac, chat luong hoan thien va cac goc nhin thi truong lien quan den construction, fit-out va interior delivery.',
      featureLabel: 'Bai viet noi bat',
      listLabel: 'Tat ca bai viet',
      articleCount: 'bai viet',
      readMore: 'Doc tiep',
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
      <div className="hero-header-page journal-index-hero-maestro">
        <Header locale={locale as Locale} transparent />
        <div className="journal-index-hero-media-maestro">
          {slides.length > 0 ? (
            <SlideshowBackground slides={slides} />
          ) : heroImage ? (
            <div
              className="journal-index-hero-fallback-maestro"
              style={{backgroundImage: `url(${heroImage})`}}
            />
          ) : null}
        </div>
        <div className="journal-index-hero-overlay-maestro" />

        <div className="shell journal-index-hero-shell-maestro">
          <p className="journal-index-eyebrow-maestro">{copy.eyebrow}</p>
          <h1 className="journal-index-title-maestro">{copy.title}</h1>
          <p className="journal-index-description-maestro">{copy.description}</p>

          <div className="journal-index-meta-row-maestro">
            <span>{String(displayPosts.length).padStart(2, '0')} {copy.articleCount}</span>
            <span>Editorial format</span>
            <span>Crafted presentation</span>
          </div>
        </div>
      </div>

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
