'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { HiLanguage, HiComputerDesktop, HiLightBulb, HiHeart, HiGlobeAlt, HiArrowRight } from 'react-icons/hi2';

const programs = [
  { key: 'spoken_english', icon: HiLanguage, num: '01', accentBg: 'bg-brand-red', accentLight: 'bg-white/15', accentText: 'text-white' },
  { key: 'it_skills', icon: HiComputerDesktop, num: '02', accentBg: 'bg-brand-teal', accentLight: 'bg-white/15', accentText: 'text-white' },
  { key: 'philosophy', icon: HiLightBulb, num: '03', accentBg: 'bg-brand-red', accentLight: 'bg-white/15', accentText: 'text-white' },
  { key: 'food_thought', icon: HiHeart, num: '04', accentBg: 'bg-brand-teal', accentLight: 'bg-white/15', accentText: 'text-white' },
  { key: 'skype_english', icon: HiGlobeAlt, num: '05', accentBg: 'bg-brand-red', accentLight: 'bg-white/15', accentText: 'text-white' },
] as const;

export default function FeaturedPrograms() {
  const t = useTranslations('programs_section');

  return (
    <section className="py-10 md:py-12 bg-brand-bg">
      <div className="container-custom">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 md:mb-8">
          <div>
            <AnimatedSection>
              <span className="badge-red mb-2">{t('tag')}</span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="text-h2 text-white">{t('title')}</h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.12} direction="right">
            <p className="text-body max-w-sm md:text-right">{t('subtitle')}</p>
          </AnimatedSection>
        </div>

        {/* Programs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {programs.map((program, index) => (
            <AnimatedSection key={program.key} delay={index * 0.07}>
              <motion.div
                className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-5 flex flex-col h-full group cursor-default hover:bg-white/22 hover:border-white/45 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${program.accentBg} flex items-center justify-center`}>
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-heading font-bold text-white/40 tracking-widest">{program.num}</span>
                </div>

                <h3 className="font-heading font-bold text-white text-lg mb-3 leading-tight group-hover:text-white/80 transition-colors duration-200">
                  {t(program.key)}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed flex-grow">
                  {t(`${program.key}_desc`)}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Learn more</span>
                  <HiArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}

          {/* View All card */}
          <AnimatedSection delay={programs.length * 0.07}>
            <Link href="/programs" className="block h-full">
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-7 flex flex-col items-center justify-center text-center h-full min-h-[220px] group cursor-pointer hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-14 h-14 rounded-2xl border-2 border-white/30 flex items-center justify-center mb-4 group-hover:border-white group-hover:bg-white/20 transition-all duration-300">
                  <HiArrowRight className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-2">{t('view_all')}</h3>
                <p className="text-white/60 text-sm">Explore all our programs</p>
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
