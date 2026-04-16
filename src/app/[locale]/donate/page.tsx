'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import {
  HiBookOpen, HiLanguage, HiAcademicCap, HiComputerDesktop,
  HiShieldCheck, HiHeart, HiArrowRight, HiCheckCircle,
} from 'react-icons/hi2';

const amounts = [25, 50, 100, 250];

const impactItems = [
  { amount: 25, key: 'impact_25', icon: HiBookOpen, bg: 'bg-white/15', border: 'border-white/25', iconBg: 'bg-brand-red' },
  { amount: 50, key: 'impact_50', icon: HiLanguage, bg: 'bg-white/15', border: 'border-white/25', iconBg: 'bg-brand-teal' },
  { amount: 100, key: 'impact_100', icon: HiAcademicCap, bg: 'bg-white/15', border: 'border-white/25', iconBg: 'bg-brand-ink' },
  { amount: 250, key: 'impact_250', icon: HiComputerDesktop, bg: 'bg-white/15', border: 'border-white/25', iconBg: 'bg-brand-red' },
];

const allocation = [
  { key: 'allocation_programs', percent: 65, color: 'bg-brand-red', label: 'Programs' },
  { key: 'allocation_materials', percent: 20, color: 'bg-brand-teal', label: 'Materials' },
  { key: 'allocation_infrastructure', percent: 10, color: 'bg-brand-red', label: 'Infrastructure' },
  { key: 'allocation_admin', percent: 5, color: 'bg-brand-border-dark', label: 'Admin' },
];

export default function DonatePage() {
  const t = useTranslations('donate_page');
  const router = useRouter();
  const params = useParams();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');

  const displayAmount = customAmount ? Number(customAmount) : selectedAmount;
  const locale = params.locale as string;

  const handleDonate = () => {
    const amount = customAmount ? Number(customAmount) : selectedAmount;
    const queryParams = new URLSearchParams({
      amount: amount.toString(),
      frequency,
    });
    router.push(`/${locale}/donate/success?${queryParams.toString()}`);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="pt-16" >
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                {t('impact_tag')}
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{t('impact_title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                Every pound you give directly funds education and opportunity for young people in Sri Lanka&apos;s hill country.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Impact grid */}
      <section className="py-14 bg-white/[0.08] border-b border-white/20">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactItems.map((item, index) => (
              <AnimatedSection key={item.key} delay={index * 0.07}>
                <motion.div
                  className={`${item.bg} border ${item.border} rounded-2xl p-6 text-center hover:shadow-md transition-all duration-200`}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-heading font-bold text-white text-2xl mb-1.5">&pound;{item.amount}</div>
                  <p className="text-xs text-white/70 leading-relaxed">{t(item.key as any)}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Donation form + info */}
      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Form — wider column */}
            <AnimatedSection className="lg:col-span-3">
              <div className="bg-white/[0.08] border border-white/20 rounded-3xl p-8 md:p-10">
                <h2 className="text-h3 text-white mb-7">{t('form_title')}</h2>

                {/* Frequency toggle */}
                <div className="flex gap-2 p-1 bg-white/20 border border-white/20 rounded-xl mb-7">
                  {(['one_time', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setFrequency(freq)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        frequency === freq
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {t(freq)}
                    </button>
                  ))}
                </div>

                {/* Preset amounts */}
                <p className="text-xs font-heading font-bold text-white mb-3 uppercase tracking-wide">{t('amount')}</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                      className={`py-3 rounded-xl font-heading font-bold text-sm transition-all duration-200 border-2 ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white/20 text-white border-white/20 hover:border-white/35'
                      }`}
                    >
                      &pound;{amount}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="mb-7">
                  <label className="text-xs font-heading font-bold text-white mb-2 block uppercase tracking-wide">{t('custom')}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 font-semibold text-sm">&pound;</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="input-field pl-8"
                    />
                  </div>
                </div>

                <button
                  onClick={handleDonate}
                  className="w-full btn-red justify-center text-base py-4"
                >
                  <HiHeart className="w-5 h-5" />
                  {t('donate_btn')} &mdash; &pound;{displayAmount}
                  {frequency === 'monthly' && '/mo'}
                  <HiArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-white/50 mt-4 flex items-center justify-center gap-1.5">
                  <HiShieldCheck className="w-3.5 h-3.5" />
                  {t('secure')}
                </p>
              </div>
            </AnimatedSection>

            {/* Info column */}
            <div className="lg:col-span-2 space-y-5">
              {/* Gift Aid */}
              <AnimatedSection delay={0.1}>
                <div className="bg-brand-ink rounded-2xl p-7 text-white">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-teal-light font-heading font-bold text-sm">+25%</span>
                    </div>
                    <h3 className="font-heading font-bold text-white text-base leading-tight pt-1.5">{t('gift_aid_title')}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{t('gift_aid_desc')}</p>
                </div>
              </AnimatedSection>

              {/* Fund allocation */}
              <AnimatedSection delay={0.15}>
                <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-7">
                  <h3 className="font-heading font-bold text-white text-base mb-5">{t('allocation_title')}</h3>
                  <div className="space-y-4">
                    {allocation.map((item) => (
                      <div key={item.key}>
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="text-white">{t(item.key as any)}</span>
                          <span className="text-white/70">{item.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${item.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Trust badges */}
              <AnimatedSection delay={0.2}>
                <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-6">
                  <div className="space-y-2.5">
                    {['UK Registered Charity #1184062', 'Sri Lanka Registered GA 3459', 'Secure Payment Processing', 'Full Financial Transparency'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs text-white font-medium">
                        <HiCheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
