'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiLanguage, 
  HiComputerDesktop, 
  HiLightBulb, 
  HiHeart, 
  HiGlobeAlt,
  HiChevronDown,
  HiCheckCircle 
} from 'react-icons/hi2';

const programsData = [
  {
    id: 'language',
    title: 'Interactive Language Development',
    icon: HiLanguage,
    accentBg: 'bg-brand-red',
    accentText: 'text-white',
    accentHighlight: 'text-brand-teal-light',
    overview: 'Communication is a foundational skill for personal and professional success. This program focuses on developing strong language abilities through structured learning and interactive engagement.',
    whatWeDo: [
      'Training in English and Sinhala languages',
      'Vocabulary building and pronunciation improvement',
      'Group discussions, storytelling, and role-play',
      'Real-life communication scenarios',
    ],
    whyItMatters: 'Many students from underserved communities lack exposure to effective communication environments. This program ensures they gain the confidence and clarity required to express themselves in academic, professional, and social settings.',
    outcome: 'Participants become confident communicators, better prepared for higher education and workplace interactions.',
  },
  {
    id: 'it',
    title: 'IT & Digital Skills',
    icon: HiComputerDesktop,
    accentBg: 'bg-brand-teal',
    accentText: 'text-white',
    accentHighlight: 'text-brand-teal-light',
    overview: 'In today\'s digital world, technology literacy is essential. This program equips students with practical computer knowledge and digital skills required to succeed in modern careers.',
    whatWeDo: [
      'Basic computer training',
      'Internet and digital tool usage',
      'Introduction to office applications',
      'Digital communication and online collaboration',
    ],
    whyItMatters: 'Youth from plantation and rural communities often lack access to digital education. By bridging this gap, we ensure they are not left behind in an increasingly technology-driven world.',
    outcome: 'Participants gain essential digital competencies, enabling them to pursue higher education or enter the workforce with confidence.',
  },
  {
    id: 'philosophy',
    title: 'Philosophy & Critical Thinking',
    icon: HiLightBulb,
    accentBg: 'bg-brand-red',
    accentText: 'text-white',
    accentHighlight: 'text-brand-teal-light',
    overview: 'In a fast-paced world, individuals rarely get the opportunity to reflect on the deeper aspects of life. This program introduces participants to philosophical thinking and analytical reasoning.',
    whatWeDo: [
      'Exploration of fundamental questions about life, existence, and purpose',
      'Discussions based on scientific and philosophical content',
      'Critical thinking exercises',
      'Group debates and reflective sessions',
    ],
    whyItMatters: 'Modern life often pushes individuals into a cycle of competition without reflection. This program helps participants develop clarity of thought, self-awareness, and the ability to make informed decisions.',
    outcome: 'Participants develop independent thinking skills, intellectual curiosity, and a deeper understanding of life.',
  },
  {
    id: 'values',
    title: 'Value Education',
    icon: HiHeart,
    accentBg: 'bg-brand-teal',
    accentText: 'text-white',
    accentHighlight: 'text-brand-teal-light',
    overview: 'A strong society is built on strong values. This program focuses on instilling essential human values in young individuals at an early stage of life.',
    whatWeDo: [
      'Interactive sessions with teenagers',
      'Teaching empathy, respect, and responsibility',
      'Activities that promote ethical thinking',
      'Real-life examples and guided discussions',
    ],
    whyItMatters: 'In today\'s competitive world, core human values are often overlooked, leading to self-centered attitudes. This program nurtures responsible individuals who contribute positively to society.',
    outcome: 'Participants grow into compassionate, ethical, and socially responsible individuals.',
  },
  {
    id: 'online',
    title: 'Interactive Online English',
    icon: HiGlobeAlt,
    accentBg: 'bg-brand-red',
    accentText: 'text-white',
    accentHighlight: 'text-brand-teal-light',
    overview: 'This program connects students with global volunteers to practice spoken English through live, interactive sessions.',
    whatWeDo: [
      'Weekly online sessions (1 to 1.5 hours)',
      'Conversations with international volunteers',
      'Real-world speaking practice',
      'Flexible participation via Google Meet',
    ],
    keyFeatures: [
      'Global exposure to English-speaking environments',
      'Volunteers can choose video/audio participation',
      'Designed to overcome lack of real-world language exposure',
    ],
    whyItMatters: 'Students in underserved communities often lack opportunities to practice English in real-life contexts. This initiative bridges that gap by creating a global learning environment.',
    outcome: 'Students gain confidence in spoken English, improve fluency, and develop global communication skills.',
  },
];

function ProgramCard({ program, index }: { program: typeof programsData[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <AnimatedSection delay={index * 0.08}>
      <motion.div
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-white/35 transition-all duration-300"
        initial={false}
        animate={isExpanded ? { scale: 1.01 } : { scale: 1 }}
      >
        <div className="flex">
          <div className={`w-1.5 ${program.accentBg} flex-shrink-0`} />
          
          <div className="flex-1">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-xl ${program.accentBg} flex items-center justify-center flex-shrink-0`}>
                  <program.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-heading font-bold text-white text-lg md:text-xl leading-tight">
                  {program.title}
                </h2>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-semibold text-white mb-1">Overview</p>
                <p className="text-sm text-white/70 leading-relaxed">{program.overview}</p>
              </div>
              
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="space-y-5 pt-4 border-t border-white/15">
                      <div>
                        <p className="text-sm font-semibold text-white mb-2">What We Do</p>
                        <ul className="space-y-2">
                          {program.whatWeDo.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                              <HiCheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {program.keyFeatures && (
                        <div>
                          <p className="text-sm font-semibold text-white mb-2">Key Features</p>
                          <ul className="space-y-2">
                            {program.keyFeatures.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                <HiCheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="bg-white/5 rounded-xl p-4 border border-white/15">
                        <p className="text-xs font-bold text-white uppercase tracking-wide mb-2">Why It Matters</p>
                        <p className="text-sm text-white/70 leading-relaxed">{program.whyItMatters}</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <p className="text-xs font-bold text-white uppercase tracking-wide mb-2">Outcome</p>
                        <p className="text-sm text-white/80 leading-relaxed font-medium">{program.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-white hover:text-white/70 transition-all duration-200"
              >
                <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export default function ProgramsPage() {
  const t = useTranslations('programs_section');

  return (
    <>
      <section className="pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                {t('tag')}
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{t('title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                Empowering communities through knowledge, skills, and critical thinking. Explore our comprehensive programs designed to transform lives.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            {programsData.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}