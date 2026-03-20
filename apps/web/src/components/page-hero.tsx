import type {ReactNode} from 'react';
import {Header} from '@/components/header';
import {useLocale} from 'next-intl';
import type {Locale} from '@/i18n/routing';
import Image from 'next/image';
import {SlideshowBackground} from '@/components/slideshow-background';

export type PageHeroSlide = {
  imageUrl?: string | null;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
  actions?: ReactNode;
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
              src={imageUrl}
              alt={title}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, #111, #222)' }} />
          )}
          <div className="hero-gradient-overlay" style={{zIndex: 1, position: 'relative'}} />
        </div>
      </section>
    </div>
  );
}
