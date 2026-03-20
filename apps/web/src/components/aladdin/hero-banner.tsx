'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';

type Slide = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
};

type HeroBannerProps = {
  locale: string;
  slides: Slide[];
  ctaText: string;
};

export function HeroBanner({slides}: HeroBannerProps) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 7000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="aladdin-hero" style={{backgroundColor: '#000', position: 'relative', overflow: 'hidden'}}>
      {/* Background layers */}
      <div className="hs-backgrounds">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="hs-bg-layer"
            style={{opacity: i === active ? 1 : 0}}
          >
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt={slide.title || 'Hero slide'}
                fill
                priority={i === 0}
                style={{objectFit: 'cover'}}
              />
            )}
          </div>
        ))}
        <div className="hero-gradient-overlay" />
      </div>

      {/* Content layers */}
      <div className="hs-contents shell">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="aladdin-hero-content hs-content-layer"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? 'translateY(0)' : 'translateY(24px)',
              pointerEvents: i === active ? 'auto' : 'none',
            }}
          >
            {slide.eyebrow && <p className="hero-eyebrow">{slide.eyebrow}</p>}
            {slide.title && <h1 className="hero-title">{slide.title}</h1>}
            {slide.description && <p className="hero-desc">{slide.description}</p>}
          </div>
        ))}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="aladdin-hero-dots" style={{position: 'relative', zIndex: 10}}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === active ? 'active' : ''}`}
              onClick={() => {
                setActive(i);
                startAuto();
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <style>{`
        .hs-backgrounds {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hs-bg-layer {
          position: absolute;
          inset: 0;
          transition: opacity 0.8s ease;
        }
        .hs-contents {
          position: relative;
          z-index: 2;
        }
        .hs-content-layer {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        /* Stack content layers */
        .hs-contents {
          display: grid;
        }
        .hs-contents > .hs-content-layer {
          grid-area: 1 / 1;
        }
      `}</style>
    </section>
  );
}
