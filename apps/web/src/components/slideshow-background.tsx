'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';

type Slide = {
  imageUrl?: string | null;
};

type Props = {
  slides: Slide[];
};

export function SlideshowBackground({slides}: Props) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length]);

  return (
    <>
      {slides.map((slide, i) =>
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
