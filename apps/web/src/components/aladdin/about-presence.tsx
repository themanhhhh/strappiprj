'use client';

import {useState} from 'react';

type Location = {
  id: string;
  city: string;
  cityEn: string;
  x: string; // % from left of map container
  y: string; // % from top of map container
  info: string;
  infoEn: string;
};

const locations: Location[] = [
  {
    id: '01',
    city: 'Hà Nội',
    cityEn: 'Hanoi',
    x: '50%',
    y: '25%',
    info: 'Hà Nội — khu vực trọng điểm phía Bắc, nơi New Sky đặt văn phòng đại diện và kết nối xưởng Inox 3.000m2 tại Hà Đông.',
    infoEn: 'Hanoi — New Sky\'s key northern base with a representative office and connection to the 3,000sqm stainless-steel workshop in Ha Dong.',
  },
  {
    id: '02',
    city: 'Hải Phòng',
    cityEn: 'Hai Phong',
    x: '56%',
    y: '23%',
    info: 'Hải Phòng — thị trường triển khai dự án F&B và chuỗi nhà hàng tại khu vực duyên hải phía Bắc.',
    infoEn: "Hai Phong — a northern coastal market for F&B and restaurant-chain project delivery.",
  },
  {
    id: '03',
    city: 'Đà Nẵng',
    cityEn: 'Da Nang',
    x: '60%',
    y: '53%',
    info: 'Đà Nẵng — điểm kết nối miền Trung trong mạng lưới triển khai dự án Bắc - Trung - Nam của New Sky.',
    infoEn: 'Da Nang — a central-region connection point in New Sky\'s nationwide delivery network.',
  },
  {
    id: '04',
    city: 'Hồ Chí Minh',
    cityEn: 'Ho Chi Minh City',
    x: '51%',
    y: '80%',
    info: 'TP. Hồ Chí Minh — văn phòng miền Nam của New Sky, phục vụ các dự án F&B, bán lẻ và lưu trú tại khu vực phía Nam.',
    infoEn: "Ho Chi Minh City — New Sky's southern office base for F&B, retail, and hospitality projects.",
  },
  {
    id: '05',
    city: 'Cần Thơ',
    cityEn: 'Can Tho',
    x: '49%',
    y: '82%',
    info: 'Cần Thơ — cửa ngõ Tây Nam Bộ trong mạng lưới phục vụ chủ đầu tư trên toàn quốc.',
    infoEn: "Can Tho — the Mekong Delta gateway within New Sky's nationwide investor service network.",
  },
];

type AboutPresenceProps = {
  locale: string;
};

export function AboutPresence({locale}: AboutPresenceProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

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
                ? <>New Sky là <strong>đối tác thiết kế + thi công nhà hàng trọn gói</strong> cho chủ nhà hàng Việt, phục vụ các dự án chuỗi F&B, nhà hàng độc lập và khách sạn - lưu trú trên cả 3 miền. Chúng tôi tập trung vào <strong>tiến độ, chất lượng và trách nhiệm một đầu mối</strong> từ thiết kế đến bàn giao vận hành.</>
                : <>New Sky is a <strong>design-and-build partner for restaurant owners in Vietnam</strong>, serving F&B chains, independent restaurants, and hospitality projects nationwide. We focus on <strong>programme, quality, and single-point accountability</strong> from design through operational handover.</>}
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
              alt="Vietnam Map"
              className="about-presence-img"
            />

            {/* Pins: only render the active one */}
            {locations.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <div
                  key={loc.id}
                  className={`map-pin-html${isActive ? ' map-pin-active' : ''}`}
                  style={{left: loc.x, top: loc.y}}
                  aria-hidden={!isActive}
                >
                  {isActive && (
                    <>
                      <div className="map-pin-pulse" />
                      <div className="map-pin-dot" />
                      {/* Line + label */}
                      <div className="map-pin-connector">
                        <span className="map-pin-connector-line" />
                        <span className="map-pin-connector-label">
                          {locale === 'vi' ? loc.city : loc.cityEn}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info column */}
        <div className="about-presence-info-col">
          {!activeId ? (
            <div className="about-presence-placeholder">
              <p className="about-presence-placeholder-text">
                {locale === 'vi'
                  ? 'Chọn một thành phố để xem chi tiết'
                  : 'Select a city to view details'}
              </p>
            </div>
          ) : (
            <div className="about-presence-city-info">
              <p className="about-presence-city-id">{activeLocation?.id}</p>
              <h3 className="about-presence-city-name">
                {locale === 'vi' ? activeLocation?.city : activeLocation?.cityEn}
              </h3>
              <div className="about-presence-city-rule" />
              <p className="about-presence-city-desc">
                {locale === 'vi' ? activeLocation?.info : activeLocation?.infoEn}
              </p>
            </div>
          )}

          {/* City tabs */}
          <div className="about-presence-city-tabs">
            {locations.map((loc) => (
              <button
                key={loc.id}
                className={`about-presence-city-tab${loc.id === activeId ? ' active' : ''}`}
                onClick={() => setActiveId(activeId === loc.id ? null : loc.id)}
              >
                <span className="tab-num">{loc.id}</span>
                <span className="tab-city">
                  {locale === 'vi' ? loc.city : loc.cityEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
