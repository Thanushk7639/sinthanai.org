'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { getHeroImages } from '@/lib/images';
import type { MediaItem } from '@/lib/images';

export default function ImageSlider() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const INTERVAL = 5000;

  useEffect(() => {
    setIsLoading(true);
    getHeroImages()
      .then((fetchedImages) => {
        const valid = fetchedImages.filter((i) => i.url?.length > 0);
        if (valid.length > 0) setImages(valid.slice(0, 6));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Auto-play + progress bar
  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;
    setProgress(0);
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
    }, 40);

    const slideTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [images.length, isAutoPlaying, currentIndex]);

  const goToPrev = useCallback(() => {
    setIsAutoPlaying(false);
    setProgress(0);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setProgress(0);
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="relative w-full px-10">
        <div className="relative w-full aspect-[16/7] rounded-[2rem] overflow-hidden bg-white/10 animate-pulse shadow-xl" />
      </div>
    );
  }

  if (images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: 0.3 }}
      className="relative w-full"
    >
      {/* Outer wrapper with side padding to expose arrow buttons outside the frame */}
      <div className="relative px-12 sm:px-14">

        {/* ── Left arrow — floats outside the card ── */}
        {images.length > 1 && (
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                       w-10 h-10 sm:w-11 sm:h-11
                       rounded-full bg-white border border-neutral-200
                       shadow-lg flex items-center justify-center
                       text-brand-ink hover:bg-brand-ink hover:text-white hover:border-brand-ink
                       transition-all duration-200"
            aria-label="Previous slide"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* ── Slide card ── */}
        <div
          className="relative w-full aspect-[16/7] sm:aspect-[16/6] lg:aspect-[16/5]
                     rounded-[2rem] overflow-hidden bg-white/10
                     shadow-2xl border border-white/20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority={currentIndex === 0}
                unoptimized={images[currentIndex].url.startsWith('http')}
              />
            </motion.div>
          </AnimatePresence>

          {/* Soft vignette on left & right edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(to_right,rgba(0,0,0,0.2),transparent)] rounded-l-[2rem]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(to_left,rgba(0,0,0,0.2),transparent)] rounded-r-[2rem]" />

          {/* Dot indicators + progress bar pinned to bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-0 inset-x-0 pb-4 flex flex-col items-center gap-2.5 z-10">
              {/* Progress bar for current slide */}
              <div className="w-24 h-0.5 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${isAutoPlaying ? progress : 100}%` }}
                />
              </div>

              {/* Dot nav */}
              <div className="flex gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-white w-5 h-1.5'
                        : 'bg-white/40 hover:bg-white/70 w-1.5 h-1.5'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Slide counter chip — top right */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/30 text-white text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full z-10 backdrop-blur-sm">
              {currentIndex + 1}&thinsp;/&thinsp;{images.length}
            </div>
          )}
        </div>

        {/* ── Right arrow — floats outside the card ── */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                       w-10 h-10 sm:w-11 sm:h-11
                       rounded-full bg-white border border-neutral-200
                       shadow-lg flex items-center justify-center
                       text-brand-ink hover:bg-brand-ink hover:text-white hover:border-brand-ink
                       transition-all duration-200"
            aria-label="Next slide"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
