'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { HiUserGroup, HiAcademicCap, HiHeart, HiLightBulb, HiShieldCheck, HiCheckCircle, HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { getFolderImages } from '@/lib/images';

const timeline = [
  { year: '2018', event: 'Sinthanai Foundation established and registered in UK' },
  { year: '2019', event: 'First batch of students enrolled in Panwila' },
  { year: '2020', event: 'Launched online English program with global volunteers' },
  { year: '2021', event: 'Expanded to IT skills and digital literacy training' },
  { year: '2022', event: 'Partnership with BBC Active for educational materials' },
  { year: '2023', event: 'International Philosophy Day celebration launched' },
  { year: '2024', event: 'Over 500 students empowered, new programs introduced' },
];

const values = [
  { key: 'inclusion', icon: HiUserGroup, bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-red', iconBg: 'bg-brand-red' },
  { key: 'excellence', icon: HiAcademicCap, bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-teal', iconBg: 'bg-brand-teal' },
  { key: 'community', icon: HiHeart, bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-red', iconBg: 'bg-brand-red' },
  { key: 'innovation', icon: HiLightBulb, bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-teal', iconBg: 'bg-brand-teal' },
] as const;

export default function AboutPage() {
  const t = useTranslations('about_page');
  const [aboutImage1, setAboutImage1] = useState('');
  const [aboutImage2, setAboutImage2] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    getFolderImages('about').then((images) => {
      if (images.length > 0) setAboutImage1(images[0].url);
      if (images.length > 1) setAboutImage2(images[1].url);
    });
  }, []);

  return (
    <>
      <section className="pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                {t('story_tag')}
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-5">{t('story_title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{t('story_p1')}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.18}>
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-full hover:bg-brand-red-dark transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isExpanded ? t('read_less') : t('read_more')}
                {isExpanded ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
              </motion.button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isExpanded && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden bg-white/[0.05]"
          >
            <div className="container-custom py-10 md:py-14">
              <div className="max-w-4xl mx-auto space-y-6">
                <AnimatedSection>
                  <p className="text-body mb-4">{t('story_p2')}</p>
                </AnimatedSection>
                <AnimatedSection delay={0.05}>
                  <p className="text-body mb-6">{t('story_p3')}</p>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-6">
                    <h3 className="font-heading font-bold text-white text-xl mb-3">{t('story_aim_title')}</h3>
                    <p className="text-white/80 leading-relaxed">{t('story_aim')}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <p className="text-body">{t('story_elaboration')}</p>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <p className="text-body">{t('story_disparity')}</p>
                </AnimatedSection>
                <AnimatedSection delay={0.25}>
                  <p className="text-body">{t('story_comparison')}</p>
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <p className="text-body">{t('story_intention')}</p>
                </AnimatedSection>
                <AnimatedSection delay={0.35}>
                  <p className="text-body">{t('story_science')}</p>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                  <p className="text-body mb-8">{t('story_dedication')}</p>
                </AnimatedSection>

                <div className="text-center">
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/25 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('read_less')}
                    <HiChevronUp className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className={`${isExpanded ? '' : 'section-padding'} bg-white/[0.08]`}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection>
                <p className="text-body mb-5">{t('story_p2')}</p>
              </AnimatedSection>
              <AnimatedSection delay={0.08}>
                <p className="text-body mb-8">{t('story_p3')}</p>
              </AnimatedSection>
              <AnimatedSection delay={0.14}>
                <div className="grid grid-cols-2 gap-4">
                  {['500+ Students', '8 Years', '5 Programs', 'UK & SL Registered'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <HiCheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0" />
                      <span className="text-sm font-semibold text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="right">
              {aboutImage1 ? (
                <div className="relative">
                  <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 shadow-lg bg-white/20 flex items-center justify-center">
                    <Image
                      src={aboutImage1}
                      alt="Sinthanai Foundation"
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {aboutImage2 && (
                    <div className="absolute -bottom-5 -right-4 w-1/3 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white/20">
                      <Image
                        src={aboutImage2}
                        alt="Sinthanai Foundation activities"
                        fill
                        className="object-contain p-1"
                        sizes="180px"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-[4/3] rounded-3xl bg-white/20 border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-brand-red flex items-center justify-center">
                      <span className="text-white font-heading font-bold text-3xl">S</span>
                    </div>
                    <p className="text-white font-heading font-bold text-lg">Sinthanai Foundation</p>
                    <p className="text-white/70 text-sm mt-1">Since 2018</p>
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="badge mb-4">{t('timeline_title')}</span>
              <h2 className="text-h2 text-white mt-3">{t('timeline_title')}</h2>
            </div>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, index) => (
              <AnimatedSection key={item.year} delay={index * 0.05}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-brand-red text-white flex items-center justify-center font-heading font-bold text-xs text-center leading-tight flex-shrink-0">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-px h-8 bg-brand-border mt-1 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center" style={{ minHeight: '3.5rem' }}>
                    <p className="text-white font-body text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <AnimatedSection>
              <span className="badge-red mb-4">{t('values_tag')}</span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="text-h2 text-white mt-3">{t('values_title')}</h2>
            </AnimatedSection>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <AnimatedSection key={value.key} delay={index * 0.08}>
                <motion.div
                  className={`${value.bg} border ${value.border} rounded-2xl p-7 text-center hover:shadow-md transition-all duration-200`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-14 h-14 rounded-2xl ${value.iconBg} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2">
                    {t(`value_${value.key}`)}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t(`value_${value.key}_desc`)}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-h2 text-white text-center mb-12">{t('registration_title')}</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {[
              { key: 'registration_uk', numKey: 'registration_uk_number' },
              { key: 'registration_sl', numKey: 'registration_sl_number' },
            ].map((reg, i) => (
              <AnimatedSection key={reg.key} delay={i * 0.1}>
                <div className="bg-white/[0.08] border border-white/[0.10] rounded-2xl p-8 text-center hover:bg-white/[0.08] transition-colors duration-200">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/20 flex items-center justify-center mx-auto mb-4">
                    <HiShieldCheck className="w-6 h-6 text-brand-teal-light" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-base mb-1">{t(reg.key as any)}</h3>
                  <p className="text-brand-teal-light font-heading font-bold">{t(reg.numKey as any)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}