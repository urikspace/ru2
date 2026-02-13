"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images: string[];          // <-- filenames go here when used
  intervalMs?: number;       // default 6000
  alt?: string;
  priority?: boolean;
};

export default function RU2Slideshow({
  images,
  intervalMs = 6000,
  alt = "Slideshow image",
  priority = false,
}: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (safeImages.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      // Fade out
      setFading(true);

      // After fade-out, advance and fade back in
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % safeImages.length);
        setFading(false);
      }, 280);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [intervalMs, safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        No images found.
      </div>
    );
  }

  const src = safeImages[index];

  return (
    <div className="relative h-full w-full">
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
      />
    </div>
  );
}
