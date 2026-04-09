import Image from 'next/image';
import {ButtonLink} from '@/components/button-link';

type CsrSectionProps = {
  locale: string;
  title: string;
  description: string;
  stories: Array<{
    title: string;
    description: string;
  }>;
};

export function CsrSection({locale, title, description, stories}: CsrSectionProps) {
  const csrImages = ['/images/bg-about.png', '/images/bg-sector.jpg', '/images/map.png'];

  return (
    <section className="aladdin-section csr-section-bg">
      <div className="shell">
        <div className="csr-header">
          <h2 className="section-title-left">{title}</h2>
          <p className="section-desc-left">{description}</p>
        </div>
        
        <div className="aladdin-csr-grid">
          {stories.map((story, index) => (
            <div key={story.title} className="csr-card">
              <div className="csr-image">
                <Image
                  src={csrImages[index % csrImages.length]}
                  alt={story.title}
                  fill
                  className="csr-image-media"
                />
              </div>
              <div className="csr-content">
                <h3 className="csr-title">{story.title}</h3>
                <p className="csr-desc">{story.description}</p>
                <ButtonLink href={`/${locale}/about`} variant="secondary" className="csr-link">
                  {locale === 'vi' ? 'Chi tiết' : 'Details'}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
