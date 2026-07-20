import type {JSX} from 'react';
import {Header} from '@/components/header';
import {useLocale} from 'next-intl';
import type {Locale} from '@/i18n/routing';
import Image from 'next/image';
import {SlideshowBackground} from '@/components/slideshow-background';
import {fallbackBannerImage} from '@/lib/catalog';

export type PageHeroSlide = {
  imageUrl?: string | null;
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
              src={fallbackBannerImage}
              alt={title}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Image
              src={fallbackBannerImage}
              alt={title}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className="hero-gradient-overlay" style={{zIndex: 1, position: 'relative'}} />
        </div>
        <div className="shell" style={{position: 'relative', zIndex: 2}}>
          <div className="aladdin-hero-content">
            <p className="hero-eyebrow">{eyebrow}</p>
            <h1 className="hero-title">{title}</h1>
            <p className="hero-desc">{description}</p>
            {actions ? <div className="hero-actions">{actions}</div> : null}
            {aside ? <div className="hero-actions" style={{marginTop: 32}}>{aside}</div> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
