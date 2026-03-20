'use client';

import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
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
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const getLocaleUrl = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const pathWithoutLocale = pathname.replace(new RegExp(`^\\/${locale}`), '');
    return `/${targetLocale}${pathWithoutLocale === '' ? '' : pathWithoutLocale}`;
  };

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
            <span className="brand-mark">ALADDIN JSC</span>
            <span className="brand-meta">Tinh Hoa Ẩm Thực</span>
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
            <div className="desktop-locale-switch">
              <Link href={getLocaleUrl('vi')} className={locale === 'vi' ? 'active' : ''}>Vi</Link>
              <span className="separator">|</span>
              <Link href={getLocaleUrl('en')} className={locale === 'en' ? 'active' : ''}>En</Link>
            </div>
          </nav>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="hamburger-toggle mobile-only"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        </button>

        {/* Mobile Fullscreen Overlay */}
        <div className={`fullscreen-overlay ${isOpen ? 'overlay-open' : ''}`}>
          <div className="overlay-content">
            <button
              type="button"
              className="overlay-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              &times;
            </button>

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
              <div className="overlay-locale">
                <Link href={getLocaleUrl('vi')} className={locale === 'vi' ? 'active' : ''}>Vi</Link>
                <span className="separator">|</span>
                <Link href={getLocaleUrl('en')} className={locale === 'en' ? 'active' : ''}>En</Link>
              </div>

              <ButtonLink href={`/${locale}/contact`} variant="primary" className="overlay-cta" onClick={() => setIsOpen(false)}>
                Liên hệ
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
        <span className="brand-mark">ALADDIN JSC</span>
        <span className="brand-meta">Tinh Hoa Ẩm Thực</span>
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

      <div className="desktop-locale-switch">
        <Link href={getLocaleUrl('vi')} className={locale === 'vi' ? 'active' : ''}>Vi</Link>
        <span className="separator">|</span>
        <Link href={getLocaleUrl('en')} className={locale === 'en' ? 'active' : ''}>En</Link>
      </div>

      <ButtonLink href={`/${locale}/contact`} variant="primary" className="desktop-cta-btn">
        Liên hệ
      </ButtonLink>

      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        className="hamburger-toggle mobile-only"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Mobile Fullscreen Overlay */}
      <div className={`fullscreen-overlay ${isOpen ? 'overlay-open' : ''}`}>
        <div className="overlay-content">
          <button
            type="button"
            className="overlay-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          >
            &times;
          </button>

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
            <div className="overlay-locale">
              <Link href={getLocaleUrl('vi')} className={locale === 'vi' ? 'active' : ''}>Vi</Link>
              <span className="separator">|</span>
              <Link href={getLocaleUrl('en')} className={locale === 'en' ? 'active' : ''}>En</Link>
            </div>

            <ButtonLink href={`/${locale}/contact`} variant="primary" className="overlay-cta" onClick={() => setIsOpen(false)}>
              Liên hệ
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
