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
    info: 'Thủ đô Hà Nội — thị trường trọng điểm phía Bắc với hàng chục nhà hàng thuộc hệ sinh thái Aladdin, phục vụ hàng nghìn thực khách mỗi ngày.',
    infoEn: 'Hanoi capital — a key northern market with dozens of Aladdin restaurants serving thousands of diners daily.',
  },
  {
    id: '02',
    city: 'Hải Phòng',
    cityEn: 'Hai Phong',
    x: '56%',
    y: '23%',
    info: 'Thành phố Hải Phòng — cửa ngõ kinh tế vùng biển phía Bắc, nơi Aladdin xây dựng điểm đến ẩm thực đặc trưng cho người dân địa phương.',
    infoEn: "Hai Phong — the northern coast's economic gateway, where Aladdin has established signature dining destinations.",
  },
  {
    id: '03',
    city: 'Đà Nẵng',
    cityEn: 'Da Nang',
    x: '60%',
    y: '53%',
    info: 'Thành phố Đà Nẵng — trung tâm miền Trung năng động, nơi Aladdin mang ẩm thực đặc sắc phục vụ cả thực khách địa phương lẫn du lịch.',
    infoEn: 'Da Nang — the vibrant central city where Aladdin brings signature cuisine to both locals and tourists.',
  },
  {
    id: '04',
    city: 'Hồ Chí Minh',
    cityEn: 'Ho Chi Minh City',
    x: '51%',
    y: '80%',
    info: 'TP. Hồ Chí Minh — đầu tàu kinh tế cả nước và thị trường lớn nhất của Aladdin với hệ thống nhà hàng phủ khắp các trung tâm thương mại lớn.',
    infoEn: "Ho Chi Minh City — the nation's economic hub and Aladdin's largest market, with restaurants across major commercial centers.",
  },
  {
    id: '05',
    city: 'Cần Thơ',
    cityEn: 'Can Tho',
    x: '49%',
    y: '82%',
    info: 'Thành phố Cần Thơ — trung tâm đồng bằng sông Cửu Long, nơi Aladdin mở rộng hệ sinh thái ẩm thực đến miền Tây Nam Bộ.',
    infoEn: "Can Tho — the heart of the Mekong Delta, where Aladdin expands its culinary ecosystem to the region.",
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
          <h2 className="about-presence-title">ALADDIN JSC</h2>
          <div className="about-presence-intro-body">
            <p>
              {locale === 'vi'
                ? <>Aladdin JSC là <strong>đơn vị tiên phong trong lĩnh vực F&B</strong> tại Việt Nam, vận hành hệ sinh thái chuỗi nhà hàng đa thương hiệu gồm Long Wang, Tian Long, Bò Tơ Quán Mộc, G.Master, Hải Sư và Khèn Nướng Sapa. Kết hợp giữa <strong>ẩm thực chất lượng</strong> và <strong>không gian ấm cúng</strong>, Aladdin tạo nên những bữa ăn đáng nhớ cho mọi thực khách.</>
                : <>Aladdin JSC is a <strong>pioneering F&B enterprise</strong> in Vietnam, operating a multi-brand restaurant chain ecosystem. Combining <strong>quality cuisine</strong> with <strong>welcoming spaces</strong>, Aladdin creates memorable dining experiences.</>}
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
