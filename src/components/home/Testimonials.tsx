'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi2';
import { getCommentsImages } from '@/lib/images';

const testimonials = [
  {
    quote: 'Sinthanai Foundation transformed my life. The English program gave me the confidence to pursue higher education and achieve my dreams.',
    name: 'Priya Krishnan',
    role: 'Graduate, 2023 Batch',
  },
  {
    quote: 'The IT skills training opened up new career opportunities I never thought possible. The teachers are incredibly dedicated and supportive.',
    name: 'Suresh Kumar',
    role: 'IT Skills Graduate, 2022',
  },
  {
    quote: 'As a volunteer teaching English online, I have been deeply moved by the students\' determination to learn. This foundation is doing remarkable work.',
    name: 'Sarah Thompson',
    role: 'Online English Volunteer, UK',
  },
  {
    quote: 'The philosophy program expanded my thinking in ways I never imagined. It taught me to question, analyze, and understand the world around me.',
    name: 'Kavitha Rajan',
    role: 'Philosophy Program Participant',
  },
];

const avatarColors = ['bg-brand-red', 'bg-brand-teal', 'bg-brand-ink', 'bg-brand-red'];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);
  const [commentImageUrls, setCommentImageUrls] = useState<string[]>([]);

  useEffect(() => {
    getCommentsImages().then((imgs) => {
      setCommentImageUrls(imgs.map((img) => img.url));
    });
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const avatarUrl = commentImageUrls.length > 0 ? commentImageUrls[current % commentImageUrls.length] : '';
  const currentTestimonial = testimonials[current];

  return (
    <section className="py-10 md:py-12 bg-brand-red">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/20 text-white/80 mb-3">
            {t('tag')}
          </span>
          <h2 className="text-h2 text-white">{t('title')}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Card */}
          <div className="relative bg-white/[0.05] border border-white/[0.10] rounded-2xl p-6 md:p-8">

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <div className="min-h-[140px] flex items-start">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="text-xl md:text-2xl text-white leading-relaxed text-center w-full"
                >
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-white/[0.08]"
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={currentTestimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-full ${avatarColors[current % avatarColors.length]} flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0`}>
                    {currentTestimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-heading font-bold text-white">{currentTestimonial.name}</p>
                  <p className="text-brand-teal-light text-sm">{currentTestimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              aria-label="Previous"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-brand-red w-8' : 'bg-white/25 hover:bg-white/40 w-1.5'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              aria-label="Next"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
