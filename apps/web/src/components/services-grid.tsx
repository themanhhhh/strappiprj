import type {ReactNode} from 'react';

export type ServiceItem = {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description: string;
};

type ServicesGridProps = {
  heading?: string;
  items: ServiceItem[];
};

export function ServicesGrid({heading = 'OUR SERVICES', items}: ServicesGridProps) {
  return (
    <section className="sg-section">
      <div className="sg-shell">
        <h2 className="sg-heading">{heading}</h2>
        <div className="sg-card">
          <div className="sg-grid" style={{gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`}}>
            {items.map((item, i) => (
              <div key={i} className={`sg-item ${i < items.length - 1 ? 'sg-item--divider' : ''}`}>
                <div className="sg-icon">{item.icon ?? <FallbackIcon />}</div>
                <h3 className="sg-title">{item.title}</h3>
                {item.subtitle && <p className="sg-subtitle">({item.subtitle})</p>}
                <p className="sg-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .sg-section {
          background: transparent;
          padding: 0;
        }
        .sg-shell {
          max-width: none;
          margin: 0;
          padding: 0;
        }
        .sg-heading {
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8a7a58;
          margin: 0 0 22px;
        }
        .sg-card {
          border: 1px solid rgba(17, 17, 17, 0.08);
          border-radius: 0;
          background: #fff;
          overflow: hidden;
        }
        .sg-grid {
          display: grid;
        }
        .sg-item {
          padding: clamp(28px, 3.5vw, 40px) clamp(22px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .sg-item--divider {
          border-right: 1px solid rgba(17, 17, 17, 0.08);
        }
        .sg-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          flex-shrink: 0;
        }
        .sg-icon svg { width: 100%; height: 100%; }
        .sg-title {
          font-size: clamp(22px, 2vw, 28px);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.08;
          color: #111;
          margin: 0;
        }
        .sg-subtitle {
          font-size: 11px;
          color: #8a7a58;
          margin: 0;
          line-height: 1.5;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-style: normal;
        }
        .sg-desc {
          font-size: 14px;
          line-height: 1.75;
          color: rgba(17, 17, 17, 0.66);
          margin: 2px 0 0;
        }
        @media (max-width: 900px) {
          .sg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sg-item--divider { border-right: none; }
          .sg-item:nth-child(odd) { border-right: 1px solid rgba(17, 17, 17, 0.08); }
          .sg-item:nth-child(-n+2) { border-bottom: 1px solid rgba(17, 17, 17, 0.08); }
        }
        @media (max-width: 540px) {
          .sg-grid { grid-template-columns: 1fr !important; }
          .sg-item:nth-child(odd) { border-right: none; }
          .sg-item:not(:last-child) { border-bottom: 1px solid rgba(17, 17, 17, 0.08); }
        }
      `}</style>
    </section>
  );
}

/* ─── Built-in sample icons ──────────────────────────────── */

/** Thi công nhà hàng — fork + building */
export function IconFitOut() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Building outline */}
      <rect x="8" y="26" width="48" height="30" rx="1.5" />
      <path d="M4 26 32 8l28 18" />
      {/* Door */}
      <rect x="25" y="40" width="14" height="16" rx="1" />
      {/* Windows */}
      <rect x="12" y="34" width="10" height="8" rx="1" />
      <rect x="42" y="34" width="10" height="8" rx="1" />
      {/* Fork */}
      <line x1="30" y1="14" x2="30" y2="22" />
      <line x1="34" y1="14" x2="34" y2="22" />
      <path d="M28 14v4a4 4 0 0 0 8 0v-4" />
    </svg>
  );
}

/** Cải tạo — búa + cờ lê */
export function IconRenovation() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Hammer */}
      <path d="M10 54 36 28" />
      <rect x="34" y="12" width="18" height="18" rx="2" transform="rotate(45 34 12)" />
      <path d="M36 26l6-6" />
      {/* Wrench */}
      <path d="M40 40a8 8 0 0 1 8-8 8 8 0 0 1 0 16" />
      <path d="M44 48l-10 10" strokeWidth="2.5" />
      <circle cx="42" cy="42" r="3" />
    </svg>
  );
}

/** MEP Coordination — ống + sấm sét */
export function IconMEP() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Pipes horizontal */}
      <line x1="8" y1="22" x2="56" y2="22" />
      <line x1="8" y1="32" x2="28" y2="32" />
      <line x1="40" y1="32" x2="56" y2="32" />
      {/* Elbow connector */}
      <path d="M28 32 Q28 44 40 44" />
      <line x1="40" y1="44" x2="56" y2="44" />
      {/* Valve circles */}
      <circle cx="20" cy="22" r="4" />
      <circle cx="48" cy="32" r="4" />
      {/* Lightning bolt */}
      <path d="M34 8 28 20h8l-6 14" />
    </svg>
  );
}

/** Thiết kế nội thất — thước + bút chì */
export function IconDesign() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Drawing board */}
      <rect x="10" y="10" width="40" height="36" rx="2" />
      {/* Lines on board */}
      <line x1="18" y1="22" x2="46" y2="22" />
      <line x1="18" y1="30" x2="40" y2="30" />
      <line x1="18" y1="38" x2="34" y2="38" />
      {/* Ruler on side */}
      <rect x="52" y="10" width="6" height="36" rx="1" />
      <line x1="52" y1="18" x2="55" y2="18" />
      <line x1="52" y1="26" x2="55" y2="26" />
      <line x1="52" y1="34" x2="55" y2="34" />
      {/* Pencil */}
      <path d="M20 52l4-8 8 8-8 4z" />
      <line x1="24" y1="44" x2="46" y2="22" />
    </svg>
  );
}

/** Quản lý dự án — clipboard + checklist */
export function IconPMCM() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Clipboard */}
      <rect x="12" y="14" width="40" height="46" rx="2" />
      <path d="M24 14v-4a4 4 0 0 1 8 0v4" />
      <rect x="20" y="10" width="24" height="8" rx="1" />
      {/* Checklist items */}
      <polyline points="20,30 24,34 34,24" strokeWidth="2" />
      <line x1="38" y1="30" x2="46" y2="30" />
      <polyline points="20,44 24,48 34,38" strokeWidth="2" />
      <line x1="38" y1="44" x2="46" y2="44" />
    </svg>
  );
}

/** Joinery / Nội thất gỗ — cabinet */
export function IconJoinery() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* Cabinet body */}
      <rect x="8" y="12" width="48" height="44" rx="1.5" />
      {/* Middle shelf line */}
      <line x1="8" y1="34" x2="56" y2="34" />
      {/* Center vertical divider */}
      <line x1="32" y1="12" x2="32" y2="56" />
      {/* Door handles */}
      <circle cx="27" cy="24" r="2" />
      <circle cx="37" cy="24" r="2" />
      <circle cx="27" cy="46" r="2" />
      <circle cx="37" cy="46" r="2" />
      {/* Feet */}
      <line x1="14" y1="56" x2="14" y2="60" />
      <line x1="50" y1="56" x2="50" y2="60" />
    </svg>
  );
}

function FallbackIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#b5892a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="20" width="48" height="36" rx="2" />
      <path d="M8 28h48M20 20V12a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v8" />
    </svg>
  );
}
