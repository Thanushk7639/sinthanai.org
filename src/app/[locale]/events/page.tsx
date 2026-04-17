'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendarDays, HiMapPin, HiCamera, HiArrowRight, HiXMark, HiPhoto } from 'react-icons/hi2';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getGallerySections, type GallerySection, type MediaItem } from '@/lib/images';

const pastEvents = [
  {
    id: 'graduation-2024',
    title: 'Graduation Ceremony 2024',
    date: 'December 20, 2024',
    location: 'Kotagala, Sri Lanka',
    description: "Celebrating our students' achievements and milestones at our annual graduation ceremony.",
    galleryFolder: 'Graduation Ceremony 2023',
    accentBg: 'bg-brand-red',
  },
  {
    id: 'philosophy-2024',
    title: 'International Philosophy Day 2024',
    date: 'November 21, 2024',
    location: 'Kotagala, Sri Lanka',
    description: 'Exploring philosophical thinking in contemporary society with engaging discussions and activities.',
    galleryFolder: 'Graduation Ceremony 2020',
    accentBg: 'bg-brand-ink',
  },
  {
    id: 'environmental-2024',
    title: 'Environmental Day 2024',
    date: 'June 5, 2024',
    location: 'Kotagala, Sri Lanka',
    description: 'Community engagement event promoting environmental awareness and sustainable practices.',
    galleryFolder: 'International Enviornmental Day 2023',
    accentBg: 'bg-brand-teal',
  },
  {
    id: 'graduation-2023',
    title: 'Graduation Ceremony 2023',
    date: 'January 13, 2024',
    location: 'Kotagala, Sri Lanka',
    description: 'Celebration of the 2023 batch graduates with certificate distribution and cultural performances.',
    galleryFolder: 'Graduation Ceremony 2021',
    accentBg: 'bg-brand-red',
  },
  {
    id: 'philosophy-2023',
    title: 'International Philosophy Day 2023',
    date: 'November 16, 2023',
    location: 'Kotagala, Sri Lanka',
    description: 'Annual celebration of intellectual development through philosophy, discussions, and contemplative activities.',
    galleryFolder: 'Certificate Awarding of Rapid Learning Programmes - 2020',
    accentBg: 'bg-brand-ink',
  },
  {
    id: 'youth-2023',
    title: 'International Youth Day 2023',
    date: 'August 12, 2023',
    location: 'Kotagala, Sri Lanka',
    description: 'Event addressing contemporary youth challenges with panel discussions and interactive workshops.',
    galleryFolder: 'Interactive English Session',
    accentBg: 'bg-brand-teal',
  },
  {
    id: 'environmental-2023',
    title: 'Environmental Day 2023',
    date: 'June 5, 2023',
    location: 'Kotagala, Sri Lanka',
    description: 'Community march with environmental advocacy materials and awareness campaign.',
    galleryFolder: 'Centre for Social Concern – 23-04-18',
    accentBg: 'bg-brand-teal',
  },
];

type EventImagesMap = Record<string, MediaItem[]>;

let globalEventImagesCache: EventImagesMap | null = null;
let cacheLoadingPromise: Promise<void> | null = null;

function useEventImagesCache() {
  const [isLoaded, setIsLoaded] = useState(!!globalEventImagesCache);
  const [eventImages, setEventImages] = useState<EventImagesMap>(globalEventImagesCache || {});

  useEffect(() => {
    if (globalEventImagesCache) {
      setIsLoaded(true);
      setEventImages(globalEventImagesCache);
      return;
    }

    if (!cacheLoadingPromise) {
      cacheLoadingPromise = getGallerySections().then((sections: GallerySection[]) => {
        const imageMap: EventImagesMap = {};
        
        pastEvents.forEach((event) => {
          const matchingSection = sections.find(
            (s) => {
              const sectionName = s.name.trim();
              const folderName = event.galleryFolder.trim();
              return sectionName.toLowerCase().includes(folderName.toLowerCase()) ||
                     folderName.toLowerCase().includes(sectionName.toLowerCase());
            }
          );
          if (matchingSection) {
            const images = matchingSection.items.filter((i) => i.mimeType.startsWith('image/'));
            imageMap[event.id] = images.slice(0, 2);
          }
        });
        
        globalEventImagesCache = imageMap;
        setEventImages(imageMap);
        setIsLoaded(true);
      });
    }

    cacheLoadingPromise.then(() => {
      if (globalEventImagesCache) {
        setEventImages(globalEventImagesCache);
        setIsLoaded(true);
      }
    });
  }, []);

  return { eventImages, isLoaded };
}

function EventCard({
  event,
  index,
  onExpand,
  isLoaded,
}: {
  event: typeof pastEvents[0];
  index: number;
  onExpand: (event: typeof pastEvents[0]) => void;
  isLoaded: boolean;
}) {
  const accentTextClass = event.accentBg === 'bg-brand-red'

  return (
    <AnimatedSection delay={index * 0.05}>
      <motion.div
        className="bg-white/[0.08] border border-white/20 rounded-2xl overflow-hidden hover:border-white/35 hover:shadow-md transition-all duration-300 cursor-pointer group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        onClick={() => onExpand(event)}
      >
        <div className="flex">
          <div className={`w-1.5 ${event.accentBg} flex-shrink-0`} />
          <div className="p-6 flex-1">
            <h3 className="font-heading font-bold text-white text-base mb-2 leading-tight group-hover:text-white/80 transition-colors">
              {event.title}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
              <span className="flex items-center gap-1.5 text-xs text-white/70">
                <HiCalendarDays className={`w-3.5 h-3.5 ${accentTextClass} flex-shrink-0`} />
                {event.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/70">
                <HiMapPin className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                {event.location}
              </span>
            </div>
            <div className={`flex items-center gap-2 ${accentTextClass} text-sm font-medium group-hover:gap-3 transition-all`}>
              <HiCamera className="w-4 h-4" />
              <span>{isLoaded ? 'View Photos' : 'Loading...'}</span>
              <HiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

function ExpandedEventModal({
  event,
  onClose,
  images,
}: {
  event: typeof pastEvents[0];
  onClose: () => void;
  images: MediaItem[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-brand-ink to-[#0a1929] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <HiXMark className="w-5 h-5 text-white" />
        </button>

        <div className={`h-2 ${event.accentBg}`} />

        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl ${event.accentBg} flex items-center justify-center flex-shrink-0`}>
              <HiCalendarDays className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-xl mb-1">{event.title}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <HiCalendarDays className="w-4 h-4" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiMapPin className="w-4 h-4" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-8">{event.description}</p>

          <div className="mb-8">
            <h4 className="text-white font-heading font-semibold mb-4 flex items-center gap-2">
              <HiCamera className="w-5 h-5 text-brand-teal" />
              Event Photos
            </h4>
            
            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {images.map((img, i) => (
                  <motion.div
                    key={img.id || i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5"
                  >
                    <Image
                      src={img.url}
                      alt={img.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="aspect-[2/1] rounded-xl bg-white/5 flex items-center justify-center">
                <div className="text-center">
                  <HiPhoto className="w-10 h-10 text-white/30 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">No photos available</p>
                </div>
              </div>
            )}
          </div>

            <Link
              href={`/gallery?event=${event.id}`}
              className={`inline-flex items-center gap-2 px-6 py-3 ${event.accentBg} text-white font-semibold rounded-full hover:opacity-80 transition-all duration-200`}
            >
              <HiCamera className="w-5 h-5" />
              View More Images
              <HiArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EventsPage() {
  const t = useTranslations('events_page');
  const [selectedEvent, setSelectedEvent] = useState<typeof pastEvents[0] | null>(null);
  const { eventImages, isLoaded } = useEventImagesCache();

  const handleEventClick = useCallback((event: typeof pastEvents[0]) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <>
      <section className="pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                Events
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{t('past')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                Explore our past events celebrating education, culture and community across Kotagala.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/[0.08]">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-h3 text-white mb-6">{t('upcoming')}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center mx-auto mb-4">
                <HiCalendarDays className="w-7 h-7 text-brand-teal" />
              </div>
              <p className="font-heading font-bold text-white text-base mb-1">{t('no_upcoming')}</p>
              <p className="text-sm text-white/70">Check back soon for upcoming events and programs.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-h3 text-white">{t('past')}</h2>
              <span className="badge">{pastEvents.length} Events</span>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {pastEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onExpand={handleEventClick}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <ExpandedEventModal
            event={selectedEvent}
            onClose={handleCloseModal}
            images={eventImages[selectedEvent.id] || []}
          />
        )}
      </AnimatePresence>
    </>
  );
}