'use client';

import Link from 'next/link';
import {useState} from 'react';
import {ButtonLink} from '@/components/button-link';

type MegaMenuProps = {
  items: Array<{
    key: string;
    label: string;
    href: string;
    eyebrow: string;
    title: string;
    description: string;
    columns: Array<{
      title: string;
      links: Array<{label: string; href: string; meta?: string}>;
    }>;
    featured: {
      title: string;
      description: string;
      href: string;
    };
  }>;
  locale: string;
};

export function MegaMenu({items, locale}: MegaMenuProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <nav
      className="main-nav mega-nav"
      aria-label="Main navigation"
      onMouseLeave={() => setOpenKey(null)}
    >
      {items.map((item) => {
        const isOpen = openKey === item.key;

        return (
          <div
            key={item.key}
            className={`mega-item${isOpen ? ' mega-item-open' : ''}`}
            onMouseEnter={() => setOpenKey(item.key)}
            onFocus={() => setOpenKey(item.key)}
          >
            <Link href={`/${locale}${item.href}`} className="mega-trigger">
              {item.label}
            </Link>

            <div className="mega-panel" aria-hidden={!isOpen}>
              <div className="mega-panel-inner">
                <div className="mega-intro">
                  <p className="meta-kicker">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="mega-columns">
                  {item.columns.map((column) => (
                    <div key={column.title} className="mega-column">
                      <p className="footer-label">{column.title}</p>
                      <div className="mega-links">
                        {column.links.map((link) => (
                          <Link key={link.label} href={`/${locale}${link.href}`}>
                            <span>{link.label}</span>
                            {link.meta ? <small>{link.meta}</small> : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mega-feature">
                  <p className="footer-label">Featured</p>
                  <h4>{item.featured.title}</h4>
                  <p>{item.featured.description}</p>
                  <ButtonLink href={`/${locale}${item.featured.href}`} variant="ghost">
                    Open section
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

