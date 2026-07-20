'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {fallbackBannerImage} from '@/lib/catalog';

type Slide = {
  imageUrl?: string | null;
};

type Props = {
  slides: Slide[];
};

export function SlideshowBackground({slides}: Props) {
  const normalizedSlides = slides.length > 0
    ? slides.map((slide) => ({...slide, imageUrl: fallbackBannerImage}))
    : [{imageUrl: fallbackBannerImage}];
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (normalizedSlides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % normalizedSlides.length);
    }, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [normalizedSlides.length]);

  return (
    <>
      {normalizedSlides.map((slide, i) =>
        slide.imageUrl ? (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.9s ease',
            }}
          >
            <Image
              src={slide.imageUrl}
              alt=""
              fill
              priority={i === 0}
              style={{objectFit: 'cover'}}
            />
          </div>
        ) : null,
      )}
    </>
  );
}
