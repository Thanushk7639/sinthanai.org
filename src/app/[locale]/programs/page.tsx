'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiCheckCircle } from 'react-icons/hi2';
import { programsDetail } from '@/lib/programs';

function ProgramCard({ program, index, isExpanded, onToggle }: { program: typeof programsDetail[0]; index: number; isExpanded: boolean; onToggle: () => void }) {
  
  return (
    <AnimatedSection delay={index * 0.08}>
      <motion.div
        id={program.id}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-white/35 transition-all duration-300 scroll-mt-24"
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
                onClick={onToggle}
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setExpandedId(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

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
            {programsDetail.map((program, index) => (
              <ProgramCard 
                key={program.id} 
                program={program} 
                index={index} 
                isExpanded={expandedId === program.id}
                onToggle={() => setExpandedId(expandedId === program.id ? null : program.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}