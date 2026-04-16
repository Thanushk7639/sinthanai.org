'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { HiHeart, HiCheckCircle, HiPhone, HiEnvelope, HiBuildingOffice, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

const recurringAmounts = [
  { amount: 25, key: 'recurring_25' },
  { amount: 50, key: 'recurring_50' },
  { amount: 100, key: 'recurring_100' },
  { amount: 250, key: 'recurring_250' },
];

const bankDetails = [
  { label: 'Account Name', value: 'Sinthanai Foundation' },
  { label: 'Account Number', value: '0034 1000 9241' },
  { label: 'Bank', value: 'Sampath Bank' },
  { label: 'Branch', value: 'Thimbirigasyaya' },
  { label: 'SWIFT Code', value: 'BSAMLKLX' },
];

export default function DonateSuccessPage() {
  const t = useTranslations('donate_success');

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-ink pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-16 h-16 rounded-full bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center mx-auto mb-6"
              >
                <HiCheckCircle className="w-8 h-8 text-brand-teal-light" />
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{t('title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed">{t('subtitle')}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom max-w-3xl">

          {/* Recurring donation */}
          <AnimatedSection>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8 md:p-10 mb-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
                  <HiHeart className="w-5 h-5 text-brand-red" />
                </div>
                <h2 className="font-heading font-bold text-white text-lg">{t('recurring_title')}</h2>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{t('recurring_desc')}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {recurringAmounts.map((item) => (
                  <a
                    key={item.amount}
                    href={`mailto:admin@sinthanai.org?subject=Recurring Donation Inquiry - £${item.amount}/month`}
                    className="text-center p-4 bg-white/[0.08] border border-white/20 rounded-xl hover:border-brand-red hover:bg-white/15 transition-all duration-200 group"
                  >
                    <div className="font-heading font-bold text-white text-xl group-hover:text-brand-red transition-colors">&pound;{item.amount}</div>
                    <div className="text-xs text-white/70 mt-0.5">/month</div>
                  </a>
                ))}
              </div>

              <div className="p-4 bg-white/[0.08] border border-white/20 rounded-xl">
                <p className="text-xs text-white/70">{t('recurring_note')}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Bank details */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8 md:p-10 mb-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
                  <HiBuildingOffice className="w-5 h-5 text-brand-teal" />
                </div>
                <h2 className="font-heading font-bold text-white text-lg">{t('bank_details_title')}</h2>
              </div>

              <h3 className="text-xs font-heading font-bold text-white uppercase tracking-wide mb-4">{t('srilankan_bank')}</h3>
              <div className="bg-white/[0.08] border border-white/20 rounded-2xl overflow-hidden mb-5">
                {bankDetails.map((detail, i) => (
                  <div key={detail.label} className={`flex justify-between px-5 py-3.5 text-sm ${i < bankDetails.length - 1 ? 'border-b border-white/20' : ''}`}>
                    <span className="text-white/70">{detail.label}</span>
                    <span className="font-semibold text-white">{detail.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/15 border border-white/25 rounded-xl">
                <p className="text-xs text-brand-red font-medium mb-1">{t('transparency_note')}</p>
                <p className="text-xs text-white/70">{t('transparency_instruction')}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact */}
          <AnimatedSection delay={0.15}>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8 md:p-10 mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center flex-shrink-0">
                  <HiPhone className="w-5 h-5 text-white/70" />
                </div>
                <h2 className="font-heading font-bold text-white text-lg">{t('contact_title')}</h2>
              </div>

              <div className="space-y-4">
                <a href="tel:+94512244946" className="flex items-center gap-4 p-4 bg-white/[0.08] border border-white/20 rounded-xl hover:border-white/35 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-white/20 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <HiPhone className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 mb-0.5">{t('phone_label')}</p>
                    <p className="text-sm font-semibold text-white group-hover:text-brand-red transition-colors">+94 (0) 512 244 946</p>
                  </div>
                </a>
                <a href="mailto:admin@sinthanai.org" className="flex items-center gap-4 p-4 bg-white/[0.08] border border-white/20 rounded-xl hover:border-white/35 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-white/20 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <HiEnvelope className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 mb-0.5">{t('email_label')}</p>
                    <p className="text-sm font-semibold text-white group-hover:text-brand-red transition-colors">admin@sinthanai.org</p>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Actions */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-primary justify-center">
                <HiCheckCircle className="w-4 h-4" />
                {t('done_btn')}
                <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/donate" className="btn-secondary justify-center">
                <HiArrowLeft className="w-4 h-4" />
                {t('back_btn')}
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <p className="text-center text-sm text-white/50 mt-8">{t('thank_you')}</p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
