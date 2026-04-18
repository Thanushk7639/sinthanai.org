'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi2';
import { getCommentsImages } from '@/lib/images';

const testimonials = [
  {
    quote: 'I successfully completed my diploma course at Sinthanai Foundation, which greatly improved my English language skills. The course enhanced my speaking, writing, and communication abilities. I appreciate the supportive teaching and structured learning environment provided.',
    name: 'Karunakaran Vinoditha',
    role: '2022 Batch',
  },
  {
    quote: 'The IT knowledge provided by Sinthanai Foundation to me was more than adequate for my university studies and it also equates many years of experiential knowledge of my work colleagues.',
    name: 'Manikavel Dinushan',
    role: '2023 Batch',
  },
  {
    quote: 'I was born and raised over 18 years in an area which is predominantly populated by Sinhalese, yet I could not speak their language, but you made me speak Sinhala in 10 months. So a big heartfelt THANK YOU Sinthanai Foundation.',
    name: 'Jegan Bieula',
    role: '2024 Batch',
  },
  {
    quote: 'I volunteered with this organization in Sri Lanka in 2019, teaching students while I was traveling, and it was a great experience. The school does an amazing job providing kids with quality education through a strong and well-organized program. I\'ve stayed involved by setting up yearly English sessions with colleagues from companies I\'ve worked for in the Netherlands, which has been really rewarding. Communication is always clear and smooth, the students and teachers are very polite, the organization is well organised. I\'d definitely recommend getting involved!',
    name: 'Caren Wegdam',
    role: 'Volunteer - Netherlands',
  },
  {
    quote: 'The philosophy program expanded my thinking in ways I never imagined. It taught me to question, analyze, and understand the world around me.',
    name: 'Vinith Kumar',
    role: '2023 Batch',
  },
];

const avatarColors = ['bg-brand-red', 'bg-brand-teal', 'bg-brand-ink', 'bg-brand-red', 'bg-brand-teal'];

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
