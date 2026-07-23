'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
import {ButtonLink} from '@/components/button-link';

type FullscreenMenuProps = {
  items: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  locale: string;
  transparent?: boolean;
};

export function FullscreenMenu({items, locale, transparent = false}: FullscreenMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const contactHref = locale === 'vi' ? `/${locale}/lien-he` : `/${locale}/contact`;
  const ctaLabel = locale === 'vi' ? 'Liên hệ New Sky' : 'Contact New Sky';

  // Lắng nghe sự kiện scroll để đổi màu/ẩn hiện header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;
      setIsScrolled(scrolled);
      
      // Update parent header directly for sticky positioning
      const headerEl = document.querySelector('.site-header-transparent');
      if (headerEl) {
        if (scrolled) {
          headerEl.classList.add('header-scrolled');
          
          // Hide when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
            // Scrolling down & past 150px
            headerEl.classList.add('header-hidden');
          } else {
            // Scrolling up
            headerEl.classList.remove('header-hidden');
          }
        } else {
          headerEl.classList.remove('header-scrolled');
          headerEl.classList.remove('header-hidden');
        }
      }
      
      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
    };
    
    // Gọi ngay lần đầu để set state đúng khi reload trang đang ở giữa
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Khóa scroll body khi menu đang mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Split items: first half left, second half right
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);

  if (transparent) {
    // ── Split-nav layout: nav-left | LOGO | nav-right ──
    return (
      <>
        <div className="header-split">
          <nav className="header-nav-left">
            {leftItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="desktop-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href={`/${locale}`} className="header-brand-center">
            <Image
              src="/images/logo.png"
              alt="New Sky"
              width={350}
              height={61}
              priority
              className="brand-logo-image brand-logo-image-center"
            />
          </Link>

          <nav className="header-nav-right">
            {rightItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="desktop-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="hamburger-toggle mobile-only"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
        >
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        </button>

        {/* Mobile Fullscreen Overlay */}
        <div id="mobile-navigation-menu" className={`fullscreen-overlay ${isOpen ? 'overlay-open' : ''}`}>
          <div className="overlay-content">
            <Link href={`/${locale}`} className="overlay-brand" onClick={() => setIsOpen(false)}>
              <Image src="/images/logo.png" alt="New Sky" width={220} height={52} priority />
            </Link>
            <nav className="overlay-nav">
              {items.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="overlay-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="overlay-bottom">
              <ButtonLink href={contactHref} variant="primary" className="overlay-cta" onClick={() => setIsOpen(false)}>
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Default layout: LOGO | nav + locale + CTA ──
  return (
    <div className="aladdin-nav-wrapper">
      <Link href={`/${locale}`} className="brand">
        <Image
          src="/images/logo.png"
          alt="New Sky"
          width={220}
          height={52}
          priority
          className="brand-logo-image"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        {items.map((item) => (
          <Link
            key={item.key}
            href={`/${locale}${item.href}`}
            className="desktop-nav-link"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <ButtonLink href={contactHref} variant="primary" className="desktop-cta-btn">
        {ctaLabel}
      </ButtonLink>

      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
          className="hamburger-toggle mobile-only"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Mobile Fullscreen Overlay */}
      <div id="mobile-navigation-menu" className={`fullscreen-overlay ${isOpen ? 'overlay-open' : ''}`}>
        <div className="overlay-content">
          <Link href={`/${locale}`} className="overlay-brand" onClick={() => setIsOpen(false)}>
            <Image src="/images/logo.png" alt="New Sky" width={220} height={52} priority />
          </Link>
          <nav className="overlay-nav">
            {items.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="overlay-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="overlay-bottom">
            <ButtonLink href={contactHref} variant="primary" className="overlay-cta" onClick={() => setIsOpen(false)}>
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
