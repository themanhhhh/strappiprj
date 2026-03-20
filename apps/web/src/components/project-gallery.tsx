'use client';

import {useState} from 'react';
import Image from 'next/image';

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({images, title}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="project-gallery-container">
      {/* Main active image */}
      <div className="project-gallery-main">
        <img
          src={images[activeIndex]}
          alt={`${title} gallery image ${activeIndex + 1}`}
          className="project-gallery-main-img"
        />
        {images.length > 1 && (
          <>
            <button
              className="gallery-nav-btn gallery-nav-prev"
              onClick={() => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="gallery-nav-btn gallery-nav-next"
              onClick={() => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div className="project-gallery-thumbnails">
          {images.map((url, i) => (
            <button
              key={i}
              className={`gallery-thumb-btn ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={url} alt={`Thumbnail ${i + 1}`} className="gallery-thumb-img" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
