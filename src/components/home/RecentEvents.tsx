'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { HiCalendarDays, HiMapPin, HiArrowRight, HiClock } from 'react-icons/hi2';
import { getFolderImages } from '@/lib/images';
import { events } from '@/lib/events';

export default function RecentEvents() {
  const t = useTranslations('events_section');
  const [eventImages, setEventImages] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadImages() {
      const results: Record<string, string> = {};
      await Promise.all(
        events.filter((e) => e.galleryFolder).map(async (event) => {
          const images = await getFolderImages(event.galleryFolder);
          if (images.length > 0) results[event.id] = images[0].url;
        })
      );
      setEventImages(results);
    }
    loadImages();
  }, []);

  return (
    <section className="py-10 md:py-12 bg-brand-bg">
      <div className="container-custom">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 md:mb-8">
          <div>
            <AnimatedSection>
              <span className="badge mb-3">{t('tag')}</span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="text-h2 text-white">{t('title')}</h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.12} direction="right">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border-2 border-white/50 px-4 py-2 rounded-full hover:bg-white/20 hover:border-white transition-all duration-200"
            >
              {t('view_all')}
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {events.slice(0, 3).map((event, index) => {
            const imageUrl = eventImages[event.id] || '';
            return (
              <AnimatedSection key={event.id} delay={index * 0.08}>
                <Link href={`/events#${event.id}`} className="block h-full">
                  <motion.div
                    className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl overflow-hidden flex flex-col h-full group hover:bg-white/22 hover:border-white/45 transition-all duration-300"
                    whileHover={{ y: -4, boxShadow: '0 16px 48px -8px rgba(0,0,0,0.25)' }}
                    transition={{ duration: 0.25 }}
                  >
                    {imageUrl ? (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-brand-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                          <HiCalendarDays className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          <span className="text-xs font-semibold text-white">{event.date}</span>
                        </div>
                      </div>
                    ) : (
                      <div className={`h-1.5 ${event.accentBg}`} />
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      {!imageUrl && (
                        <div className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
                          <HiCalendarDays className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                          {event.date}
                        </div>
                      )}

                      <h3 className="font-heading font-bold text-white text-base mb-2 leading-tight group-hover:text-white/80 transition-colors duration-200 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed flex-grow line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/60">
                        <div className="flex items-center gap-1">
                          <HiMapPin className="w-3 h-3 text-white/70 flex-shrink-0" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <HiClock className="w-3 h-3 text-white/70 flex-shrink-0" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}