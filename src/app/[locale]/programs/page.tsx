'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { HiLanguage, HiComputerDesktop, HiLightBulb, HiHeart, HiGlobeAlt, HiClock, HiUserGroup } from 'react-icons/hi2';

const programs = [
  {
    key: 'spoken_english',
    icon: HiLanguage,
    num: '01',
    accentBg: 'bg-brand-red',
    accentLight: 'bg-white/15',
    accentBorder: 'border-white/25',
    accentText: 'text-brand-red',
    detailKey: 'spoken_english_detail',
    eligibilityKey: 'spoken_english_eligibility',
    scheduleKey: 'spoken_english_schedule',
  },
  {
    key: 'it_skills',
    icon: HiComputerDesktop,
    num: '02',
    accentBg: 'bg-brand-teal',
    accentLight: 'bg-white/15',
    accentBorder: 'border-white/25',
    accentText: 'text-brand-teal',
    detailKey: 'it_detail',
    eligibilityKey: 'it_eligibility',
    scheduleKey: 'it_schedule',
  },
  {
    key: 'philosophy',
    icon: HiLightBulb,
    num: '03',
    accentBg: 'bg-brand-red',
    accentLight: 'bg-white/15',
    accentBorder: 'border-white/25',
    accentText: 'text-brand-red',
    detailKey: 'philosophy_detail',
    eligibilityKey: 'philosophy_eligibility',
    scheduleKey: 'philosophy_schedule',
  },
  {
    key: 'food_thought',
    icon: HiHeart,
    num: '04',
    accentBg: 'bg-brand-teal',
    accentLight: 'bg-white/15',
    accentBorder: 'border-white/25',
    accentText: 'text-brand-teal',
    detailKey: 'food_thought_detail',
    eligibilityKey: 'food_thought_eligibility',
    scheduleKey: 'food_thought_schedule',
  },
  {
    key: 'skype_english',
    icon: HiGlobeAlt,
    num: '05',
    accentBg: 'bg-brand-red',
    accentLight: 'bg-white/15',
    accentBorder: 'border-white/25',
    accentText: 'text-brand-red',
    detailKey: 'online_english_detail',
    eligibilityKey: 'online_english_eligibility',
    scheduleKey: 'online_english_schedule',
  },
];

export default function ProgramsPage() {
  const t = useTranslations('programs_page');
  const pt = useTranslations('programs_section');

  return (
    <>
      {/* Page Hero */}
      <section className="pt-16" >
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                {pt('tag')}
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{pt('title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{pt('subtitle')}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Programs list */}
      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="space-y-6">
            {programs.map((program, index) => (
              <AnimatedSection key={program.key} delay={index * 0.06}>
                <motion.div
                  className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl overflow-hidden hover:border-white/35 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid lg:grid-cols-12">
                    {/* Left accent panel */}
                    <div className={`lg:col-span-3 ${program.accentBg} p-8 md:p-10 flex flex-col justify-center`}>
                      <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                        <program.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-white/50 text-xs font-bold tracking-widest mb-2">{program.num}</span>
                      <h2 className="font-heading font-bold text-white text-xl leading-tight">
                        {pt(program.key as any)}
                      </h2>
                    </div>

                    {/* Right details */}
                    <div className="lg:col-span-9 p-8 md:p-10">
                      <p className="text-white/70 leading-relaxed mb-7 text-sm md:text-base">
                        {t(program.detailKey as any)}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className={`flex items-start gap-3.5 p-4 ${program.accentLight} border ${program.accentBorder} rounded-xl`}>
                          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 shadow-xs">
                            <HiUserGroup className={`w-4.5 h-4.5 ${program.accentText}`} />
                          </div>
                          <div>
                            <p className="text-xs font-heading font-bold text-white uppercase tracking-wide mb-0.5">{t('eligibility')}</p>
                            <p className="text-xs text-white/70 leading-relaxed">{t(program.eligibilityKey as any)}</p>
                          </div>
                        </div>
                        <div className={`flex items-start gap-3.5 p-4 ${program.accentLight} border ${program.accentBorder} rounded-xl`}>
                          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 shadow-xs">
                            <HiClock className={`w-4.5 h-4.5 ${program.accentText}`} />
                          </div>
                          <div>
                            <p className="text-xs font-heading font-bold text-white uppercase tracking-wide mb-0.5">{t('schedule')}</p>
                            <p className="text-xs text-white/70 leading-relaxed">{t(program.scheduleKey as any)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
