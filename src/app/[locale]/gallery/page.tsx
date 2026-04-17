'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiPlayCircle, HiXMark, HiPhoto, HiArrowLeft } from 'react-icons/hi2';
import {
  getGallerySections,
  getAllGalleryVideos,
  type GallerySection,
  type MediaItem,
} from '@/lib/images';

let globalGalleryCache: {
  sections: GallerySection[];
  videos: MediaItem[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000;

function useGalleryCache() {
  const [sections, setSections] = useState<GallerySection[]>(globalGalleryCache?.sections || []);
  const [videos, setVideos] = useState<MediaItem[]>(globalGalleryCache?.videos || []);
  const [loading, setLoading] = useState(!globalGalleryCache);

  useEffect(() => {
    const now = Date.now();
    
    if (globalGalleryCache && (now - globalGalleryCache.timestamp) < CACHE_DURATION) {
      setSections(globalGalleryCache.sections);
      setVideos(globalGalleryCache.videos);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all([getGallerySections(), getAllGalleryVideos()]).then(([sectionsData, videosData]) => {
      globalGalleryCache = {
        sections: sectionsData,
        videos: videosData,
        timestamp: now
      };
      setSections(sectionsData);
      setVideos(videosData);
      setLoading(false);
    });
  }, []);

  return { sections, videos, loading };
}

const BATCH_SIZE = 12;

function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  sizes,
  loading,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return (
      <div className={`${className} bg-white/[0.08] flex items-center justify-center`}>
        <HiPhoto className="w-8 h-8 text-white/70" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      loading={loading}
      onError={() => setErrored(true)}
    />
  );
}

function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const goPrev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : c)), []);
  const goNext = useCallback(() => setCurrent((c) => (c < items.length - 1 ? c + 1 : c)), [items.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, goPrev, goNext]);

  const item = items[current];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/15 rounded-full text-white text-xs font-medium">
        {current + 1} / {items.length}
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
      >
        <HiXMark className="w-5 h-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            disabled={current === 0}
            className="absolute left-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            disabled={current === items.length - 1}
            className="absolute right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      <div
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item?.mimeType.startsWith('video/') ? (
          <video src={item.url} controls className="w-full h-full object-contain rounded-xl" autoPlay />
        ) : (
          <ImageWithFallback
            src={item.url}
            alt={item?.name || 'Gallery image'}
            fill
            className="object-contain rounded-xl"
            sizes="90vw"
          />
        )}
      </div>
    </div>
  );
}

function SectionCard({
  section,
  allImagesRef,
}: {
  section: GallerySection;
  allImagesRef: React.MutableRefObject<MediaItem[]>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = section.items.filter((i) => i.mimeType.startsWith('image/'));
  const coverItem = section.coverImage || images[0];
  const coverUrl = coverItem?.url || '';
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const openLightbox = (idx: number) => {
    allImagesRef.current = images;
    setLightboxIndex(idx);
  };

  return (
    <div className="col-span-1">
      <div
        onClick={() => { setExpanded(!expanded); setVisibleCount(BATCH_SIZE); }}
        className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl overflow-hidden cursor-pointer hover:border-white/35 hover:shadow-md transition-all duration-200 group"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <ImageWithFallback
            src={coverUrl}
            alt={section.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 bg-white/15 rounded-xl px-2.5 py-1 flex items-center gap-1.5">
            <HiPhoto className="w-3.5 h-3.5 text-white/70" />
            <span className="text-xs font-semibold text-white">{images.length}</span>
          </div>
        </div>
        <div className="px-4 py-3.5">
          <h3 className="font-heading font-bold text-white text-sm leading-snug">{section.name}</h3>
        </div>
      </div>

      {expanded && (
        <div style={{ overflow: 'hidden' }}>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 pt-3 pb-2">
            {visibleImages.map((item, idx) => (
              <div
                key={item.id}
                className="aspect-square relative overflow-hidden rounded-xl cursor-pointer group/img"
                onClick={(e) => { e.stopPropagation(); openLightbox(idx); }}
              >
                <ImageWithFallback
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover group-hover/img:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-ink/0 group-hover/img:bg-brand-ink/20 transition-colors duration-200 rounded-xl" />
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center py-3">
              <button
                onClick={(e) => { e.stopPropagation(); setVisibleCount((c) => c + BATCH_SIZE); }}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-white/[0.08] border border-white/20 text-white hover:bg-white/20 transition-colors"
              >
                Show more ({images.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox items={allImagesRef.current} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}

export default function GalleryPage() {
  const t = useTranslations('gallery_page');
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventFolder = searchParams.get('event');
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const allImagesRef = useRef<MediaItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoLightboxIndex, setVideoLightboxIndex] = useState<number | null>(null);
  
  const { sections, videos, loading } = useGalleryCache();

  const eventFolderMap: Record<string, string> = {
    'graduation-2024': 'Graduation Ceremony 2023',
    'philosophy-2024': 'Graduation Ceremony 2020',
    'environmental-2024': 'International Enviornmental Day 2023',
    'graduation-2023': 'Graduation Ceremony 2021',
    'philosophy-2023': 'Certificate Awarding of Rapid Learning Programmes - 2020',
    'youth-2023': 'Interactive English Session',
    'environmental-2023': 'Centre for Social Concern – 23-04-18',
  };

  const filteredSection = eventFolder && eventFolderMap[eventFolder]
    ? sections.find(
        (s) => {
          const sectionName = s.name.trim();
          const folderName = eventFolderMap[eventFolder].trim();
          return sectionName.toLowerCase().includes(folderName.toLowerCase()) ||
                 folderName.toLowerCase().includes(sectionName.toLowerCase());
        }
      ) || null
    : null;

  const handleBackToGallery = () => {
    const locale = window.location.pathname.split('/')[1] || 'en';
    router.push(`/${locale}/gallery`);
  };

  if (loading) {
    return (
      <section className="pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-white/20 rounded-full mb-5" />
            <div className="h-12 w-96 bg-white/20 rounded-lg mb-4" />
          </div>
        </div>
      </section>
    );
  }

  if (filteredSection) {
    const images = filteredSection.items.filter((i) => i.mimeType.startsWith('image/'));
    
    return (
      <>
        <section className="pt-16">
          <div className="container-custom py-20 md:py-28">
            <button
              onClick={handleBackToGallery}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span>Back to Gallery</span>
            </button>
            <h1 className="text-h1 text-white mb-4 mt-4">{filteredSection.name}</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
              {images.length} photos from this event
            </p>
          </div>
        </section>

        <section className="section-padding bg-white/[0.08]">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="aspect-square relative overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => { 
                    allImagesRef.current = images; 
                    setLightboxIndex(idx); 
                  }}
                >
                  <ImageWithFallback
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors duration-200" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {lightboxIndex !== null && (
          <Lightbox items={allImagesRef.current} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </>
    );
  }

  return (
    <>
      <section className="pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
              Gallery
            </span>
            <h1 className="text-h1 text-white mb-4">{t('title')}</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              Moments of learning, growth, and community from Sinthanai Foundation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="flex gap-2 mb-10 p-1 bg-white/20 border border-white/20 rounded-xl w-fit">
            {(['photos', 'videos'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? 'bg-brand-ink text-white shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t(tab)}
              </button>
            ))}
          </div>

          {activeTab === 'photos' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sections.map((section) => (
                <SectionCard key={section.path} section={section} allImagesRef={allImagesRef} />
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            videos.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <HiPlayCircle className="w-8 h-8 text-white/70" />
                </div>
                <p className="font-heading font-bold text-white">No videos available</p>
                <p className="text-sm text-white/70 mt-1">Check back soon for video content.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl overflow-hidden cursor-pointer hover:border-white/35 hover:shadow-md transition-all duration-200 group"
                    onClick={() => setVideoLightboxIndex(index)}
                  >
                    <div className="aspect-video relative bg-brand-ink flex items-center justify-center">
                      <HiPlayCircle className="w-14 h-14 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <div className="px-4 py-3.5">
                      <h3 className="font-heading font-bold text-white text-sm leading-snug">{video.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {videoLightboxIndex !== null && (
        <Lightbox items={videos} initialIndex={videoLightboxIndex} onClose={() => setVideoLightboxIndex(null)} />
      )}
    </>
  );
}