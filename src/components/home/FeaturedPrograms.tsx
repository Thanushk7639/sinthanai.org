'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { programsDetail } from '@/lib/programs';

export default function FeaturedPrograms() {
  const t = useTranslations('programs_section');

  return (
    <section className="py-16 md:py-20 bg-brand-bg">
      <div className="container-custom">
        <div className="text-center mb-12">
          <AnimatedSection>
            <span className="badge-red mb-4">{t('tag')}</span>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="text-h2 text-white mb-4">{t('title')}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-body max-w-2xl mx-auto">{t('subtitle')}</p>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programsDetail.map((program, index) => (
            <AnimatedSection key={program.id} delay={index * 0.1}>
              <Link href={`/programs#${program.id}`} className="block h-full">
                <motion.div
                  className="h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 hover:bg-white/15 transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={`h-1 ${program.accentBg}`} />
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${program.accentBg} flex items-center justify-center flex-shrink-0`}>
                        <program.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-heading font-bold text-white group-hover:text-brand-teal transition-colors">
                        {program.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                      {program.overview}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span>Read More</span>
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-10 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-full hover:bg-brand-teal transition-colors duration-300"
            >
              <span>{t('view_all')}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}