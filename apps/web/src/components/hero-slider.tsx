'use client';

import {useEffect, useState} from 'react';
import {ButtonLink} from '@/components/button-link';

type HeroSliderProps = {
  locale: string;
  slides: Array<{
    eyebrow: string;
    title: string;
    description: string;
    imageLabel: string;
    stats: Array<{value: string; label: string}>;
  }>;
  primaryCta: string;
  secondaryCta: string;
};

export function HeroSlider({locale, slides, primaryCta, secondaryCta}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero corporate-hero">
      <div className="shell corporate-hero-grid">
        <div className="hero-stage">
          <div className="hero-stage-copy">
            <p className="eyebrow">{activeSlide.eyebrow}</p>
            <h1>{activeSlide.title}</h1>
            <p className="hero-lead">{activeSlide.description}</p>
            <div className="button-row">
              <ButtonLink href={`/${locale}/contact`} variant="primary">
                {primaryCta}
              </ButtonLink>
              <ButtonLink href={`/${locale}/projects`} variant="secondary">
                {secondaryCta}
              </ButtonLink>
            </div>
          </div>

          <div className="slider-controls">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`slider-dot${index === activeIndex ? ' slider-dot-active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hero-sidewall">
          <div className="hero-visual">
            <p className="meta-kicker">Featured frame</p>
            <h3>{activeSlide.imageLabel}</h3>
          </div>
          {activeSlide.stats.map((item) => (
            <article key={item.label} className="hero-stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

