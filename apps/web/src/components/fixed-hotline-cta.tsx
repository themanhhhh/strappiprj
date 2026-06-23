export function FixedHotlineCta() {
  return (
    <a className="fixed-hotline-cta" href="tel:0906790333" aria-label="Gọi New Sky qua hotline 0906 790 333">
      Hotline 0906 790 333
      <style>{`
        .fixed-hotline-cta {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 1100;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 18px;
          border-radius: 999px;
          background: var(--brand-navy, #004075);
          color: #fff;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 12px 32px rgba(0, 64, 117, 0.25);
        }
        .fixed-hotline-cta:hover,
        .fixed-hotline-cta:focus-visible {
          background: var(--brand-blue, #1A75BE);
        }
        @media (max-width: 640px) {
          .fixed-hotline-cta {
            right: 12px;
            bottom: 12px;
            left: 12px;
          }
        }
      `}</style>
    </a>
  );
}
