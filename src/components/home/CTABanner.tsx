'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { HiHeart, HiHandRaised, HiArrowRight } from 'react-icons/hi2';

const trustBadges = [
  'Registered NGO',
  'Tax Exempt Donations',
  'Transparent Operations',
  'UK Charity #1184062',
];

export default function CTABanner() {
  const t = useTranslations('cta');

  return (
    <section className="py-10 md:py-12 bg-white/[0.08]">
      <div className="container-custom">
        <div className="bg-brand-red rounded-2xl overflow-hidden">
          <div className="px-5 md:px-10 py-8 md:py-10 text-center">

            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 border border-white/30 mb-4">
                <HiHeart className="w-5 h-5 text-white" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <h2 className="text-h2 text-white mb-3">
                {t('title')}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <p className="text-base text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">
                {t('subtitle')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-white text-[#0D5A9E] hover:bg-white/90 transition-all duration-200 shadow-md"
                >
                  <HiHeart className="w-4 h-4" />
                  {t('donate')}
                  <HiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full border-2 border-white/50 text-white hover:border-white hover:bg-white/15 transition-all duration-200"
                >
                  <HiHandRaised className="w-4 h-4" />
                  {t('volunteer')}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.28}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                {trustBadges.map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
