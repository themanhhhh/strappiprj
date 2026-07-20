'use client';

import {useState} from 'react';
import Link from 'next/link';
import {cityPresence} from '@/lib/city-presence';

const locations = cityPresence;

type AboutPresenceProps = {
  locale: string;
};

export function AboutPresence({locale}: AboutPresenceProps) {
  const [activeId, setActiveId] = useState<string>('01');

  const activeLocation = locations.find((l) => l.id === activeId);

  return (
    <section className="about-presence-section">
      {/* ── Top intro text ── */}
      <div className="about-presence-top-bg">
        <div className="shell about-presence-intro">
        <p className="about-presence-eyebrow">
          {locale === 'vi' ? 'Về chúng tôi' : 'About us'}
        </p>
        <div className="about-presence-intro-grid">
          <h2 className="about-presence-title">NEW SKY</h2>
          <div className="about-presence-intro-body">
            <p>
              {locale === 'vi'
                ? <>New Sky là <strong>giải pháp đồng hành cùng nhà đầu tư nhà hàng</strong>, phục vụ chủ chuỗi, người dựng quán và doanh nghiệp F&B mở rộng hệ thống. Chúng tôi tập trung vào <strong>tiến độ, chất lượng và trách nhiệm một đầu mối</strong> từ mặt bằng đến bàn giao.</>
                : <>New Sky is a <strong>restaurant investor support solution</strong>, serving chain owners, restaurant opening teams, and F&B businesses expanding their systems. We focus on <strong>programme, quality, and single-point accountability</strong> from site planning through handover.</>}
            </p>
            <a href={`/${locale}/about`} className="about-presence-btn">
              {locale === 'vi' ? 'Xem thêm' : 'See more'}
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* ── Two-column: Map left | Info right ── */}
      <div className="about-presence-body">
        {/* Map column */}
        <div className="about-presence-map-col">
          <div className="about-presence-map">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/map.png"
              alt={locale === 'vi' ? 'Bản đồ Việt Nam khu vực New Sky phục vụ' : 'Vietnam map showing New Sky service areas'}
              className="about-presence-img"
            />

            {/* Pins: show every served city, highlight the selected one */}
            {locations.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <Link
                  key={loc.id}
                  href={`/${locale}/thanh-pho/${loc.slug}`}
                  className={`map-pin-html${isActive ? ' map-pin-active' : ''}`}
                  style={{left: loc.x, top: loc.y}}
                  aria-label={locale === 'vi' ? `Xem khu vực ${loc.city}` : `View ${loc.cityEn} area`}
                  onMouseEnter={() => setActiveId(loc.id)}
                  onFocus={() => setActiveId(loc.id)}
                >
                  {isActive ? <span className="map-pin-pulse" /> : null}
                  <span className="map-pin-dot" />
                  {isActive ? (
                    <span className="map-pin-connector">
                      <span className="map-pin-connector-line" />
                      <span className="map-pin-connector-label">
                        {locale === 'vi' ? loc.city : loc.cityEn}
                      </span>
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Info column */}
        <div className="about-presence-info-col">
          <div className="about-presence-city-info">
            <p className="about-presence-city-id">{activeLocation?.id}</p>
            <h3 className="about-presence-city-name">
              {locale === 'vi' ? activeLocation?.city : activeLocation?.cityEn}
            </h3>
            <div className="about-presence-city-rule" />
            <p className="about-presence-city-desc">
              {locale === 'vi' ? activeLocation?.info : activeLocation?.infoEn}
            </p>
            <Link href={`/${locale}/thanh-pho/${activeLocation?.slug ?? 'ha-noi'}`} className="about-presence-btn">
              {locale === 'vi' ? 'Xem cơ sở đã triển khai' : 'View delivered locations'}
            </Link>
          </div>

          {/* City tabs */}
          <div className="about-presence-city-tabs">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${locale}/thanh-pho/${loc.slug}`}
                className={`about-presence-city-tab${loc.id === activeId ? ' active' : ''}`}
                onMouseEnter={() => setActiveId(loc.id)}
                onFocus={() => setActiveId(loc.id)}
              >
                <span className="tab-num">{loc.id}</span>
                <span className="tab-city">
                  {locale === 'vi' ? loc.city : loc.cityEn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
