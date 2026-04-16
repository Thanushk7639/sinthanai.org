'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { HiArrowRight } from 'react-icons/hi2';
import ImageSlider from './ImageSlider';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="pt-16">
      {/* Top announcement bar */}
      <div className="border-b border-white/10 bg-black/10">
        <div className="container-custom py-2.5">
          <p className="text-center text-xs text-white/70 font-body">
            <span className="text-white font-semibold">500+ students</span> empowered across Hill Country, Sri Lanka &mdash; Join our mission today
          </p>
        </div>
      </div>

      <div className="container-custom pt-6 pb-3">
        <div className="max-w-5xl mx-auto text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-white/20 text-white border border-white/30 mb-3">
              The Centre for Expansion of the Mind
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {t('title').toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
            className="text-lg text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Empowering communities through Knowledge, Skills and critical thinking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.24 }}
            className="flex justify-center items-center"
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full bg-white text-[#0D2B4E] hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              Our Programs
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <ImageSlider />
      </div>
    </section>
  );
}
