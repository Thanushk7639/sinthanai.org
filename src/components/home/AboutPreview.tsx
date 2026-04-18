'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiRocketLaunch, HiLightBulb } from 'react-icons/hi2';
import { getAboutImages, type MediaItem } from '@/lib/images';

export default function AboutPreview() {
  const t = useTranslations('about_section');
  const [images, setImages] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAboutImages().then((imgs) => {
      if (imgs.length > 0) setImages(imgs);
    });
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  return (
    <section className="py-8 md:py-10 bg-brand-bg">
      <div className="container-custom">
        <div className={`grid gap-6 lg:gap-8 items-center ${images.length > 0 ? 'lg:grid-cols-2' : ''}`}>

          {/* Left: Text */}
          <div>
            <AnimatedSection>
              <span className="badge-red mb-2">{t('tag')}</span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-h2 text-white mb-2">
                {t('title')}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-body mb-3">
                {t('description')}
              </p>
            </AnimatedSection>

            <div className="space-y-2 mb-4">
              <AnimatedSection delay={0.2}>
                <div className="flex items-start gap-2.5 p-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl hover:bg-white/20 hover:border-white/40 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0">
                    <HiRocketLaunch className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm mb-0.5">{t('mission_title')}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{t('mission')}</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <div className="flex items-start gap-2.5 p-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl hover:bg-white/20 hover:border-white/40 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0">
                    <HiLightBulb className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm mb-0.5">{t('vision_title')}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{t('vision')}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {images.length > 0 && (
            <AnimatedSection direction="right" delay={0.15}>
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 border border-white/25 relative">
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentIndex ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Image
                        src={image.url}
                        alt={`Sinthanai Foundation - ${image.name}`}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  ))}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goToPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-all duration-200 z-10"
                        aria-label="Previous image"
                      >
                        <HiChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-all duration-200 z-10"
                        aria-label="Next image"
                      >
                        <HiChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentIndex
                              ? 'bg-brand-ink w-5'
                              : 'bg-neutral-300 w-1.5 hover:bg-neutral-400'
                          }`}
                          aria-label={`Slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
