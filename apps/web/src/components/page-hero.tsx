import type {JSX} from 'react';
import {Header} from '@/components/header';
import {useLocale} from 'next-intl';
import type {Locale} from '@/i18n/routing';
import Image from 'next/image';
import {SlideshowBackground} from '@/components/slideshow-background';
import {fallbackBannerImage} from '@/lib/catalog';

export type PageHeroSlide = {
  imageUrl?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: JSX.Element;
  actions?: JSX.Element;
  imageUrl?: string;
  /** Truyền danh sách slides để bật slideshow giống trang chủ */
  slides?: PageHeroSlide[];
};

export function PageHero({eyebrow, title, description, aside, actions, imageUrl, slides}: PageHeroProps) {
  const locale = useLocale() as Locale;

  const hasSlides = slides && slides.length > 0;
  const firstSlide = slides?.[0];
  const displayEyebrow = firstSlide?.eyebrow || eyebrow;
  const displayTitle = firstSlide?.title || title;
  const displayDescription = firstSlide?.description || description;

  return (
    <div className="hero-header-page" style={{ position: 'relative' }}>
      <Header locale={locale} transparent />

      <section className="aladdin-hero">
        <div className="aladdin-hero-background" style={{ zIndex: 0 }}>
          {hasSlides ? (
            /* Slideshow mode — giống trang chủ */
            <SlideshowBackground slides={slides} />
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={displayTitle}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Image
              src={fallbackBannerImage}
              alt={displayTitle}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className="hero-gradient-overlay" />
        </div>
        <div className="shell" style={{position: 'relative', zIndex: 2}}>
          <div className="aladdin-hero-content">
            <p className="hero-eyebrow">{displayEyebrow}</p>
            <h1 className="hero-title">{displayTitle}</h1>
            <p className="hero-desc">{displayDescription}</p>
            {actions ? <div className="hero-actions">{actions}</div> : null}
            {aside ? <div className="hero-actions" style={{marginTop: 32}}>{aside}</div> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
