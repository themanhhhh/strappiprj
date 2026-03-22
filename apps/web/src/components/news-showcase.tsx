type NewsItem = {
  category: string;
  title: string;
  description: string;
  slug?: string;
  date?: string | null;
  coverUrl?: string | null;
};

type NewsShowcaseProps = {
  locale: string;
  items: NewsItem[];
};

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

export function NewsShowcase({locale, items}: NewsShowcaseProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="news-card-grid">
      {items.map((item) => {
        const href = item.slug ? `/${locale}/journal/${item.slug}` : `/${locale}/journal`;
        return (
          <a key={item.slug ?? item.title} href={href} className="news-card">
            {/* Thumbnail */}
            <div className="news-card-img-wrap">
              {item.coverUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="news-card-img"
                  />
                </>
              ) : (
                <div className="news-card-img-placeholder" />
              )}
            </div>

            {/* Meta */}
            <div className="news-card-body">
              {item.date && (
                <p className="news-card-date">
                  {formatDate(item.date, locale)}
                </p>
              )}
              <h3 className="news-card-title">{item.title}</h3>
            </div>
          </a>
        );
      })}
    </div>
  );
}
