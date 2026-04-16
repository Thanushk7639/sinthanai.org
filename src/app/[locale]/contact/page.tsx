'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { HiMapPin, HiPhone, HiEnvelope, HiClock, HiPaperAirplane, HiArrowRight } from 'react-icons/hi2';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const contactInfo = [
  { key: 'address', icon: HiMapPin, valueKey: 'address_value', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-red' },
  { key: 'phone', icon: HiPhone, value: '+94 81 292 2016', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-teal' },
  { key: 'email_label', icon: HiEnvelope, value: 'info@sinthanai.org', href: 'mailto:info@sinthanai.org', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-red' },
  { key: 'hours', icon: HiClock, valueKey: 'hours_value', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-teal' },
] as const;

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook', bg: 'hover:bg-brand-ink' },
  { icon: FaTwitter, href: '#', label: 'Twitter', bg: 'hover:bg-brand-teal' },
  { icon: FaInstagram, href: '#', label: 'Instagram', bg: 'hover:bg-brand-red' },
  { icon: FaYoutube, href: '#', label: 'YouTube', bg: 'hover:bg-brand-red' },
];

export default function ContactPage() {
  const t = useTranslations('contact_page');

  return (
    <>
      {/* Page Hero */}
      <section className="pt-16" >
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                Get in Touch
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{t('form_title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                Have a question, want to get involved, or just want to say hello? We&apos;d love to hear from you.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Form */}
            <AnimatedSection>
              <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8 md:p-10 h-full">
                <h2 className="text-h3 text-white mb-7">{t('form_title')}</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                        {t('name')}
                      </label>
                      <input type="text" className="input-field" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                        {t('email')}
                      </label>
                      <input type="email" className="input-field" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                      {t('subject')}
                    </label>
                    <input type="text" className="input-field" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                      {t('message')}
                    </label>
                    <textarea rows={6} className="input-field resize-none" placeholder="Your message..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <HiPaperAirplane className="w-4 h-4" />
                    {t('send')}
                    <HiArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Info */}
            <div className="flex flex-col gap-5">
              {/* Contact info cards */}
              <AnimatedSection delay={0.08}>
                <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8">
                  <h2 className="text-h3 text-white mb-7">{t('info_title')}</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {contactInfo.map((item) => (
                      <div key={item.key} className={`flex items-start gap-4 p-4 ${item.bg} border ${item.border} rounded-2xl`}>
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-xs">
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-heading font-bold text-white mb-0.5 uppercase tracking-wide">{t(item.key)}</p>
                          {'valueKey' in item ? (
                            <p className="text-xs text-white/70 leading-relaxed whitespace-pre-line">{t(item.valueKey)}</p>
                          ) : 'href' in item && item.href ? (
                            <a href={item.href} className="text-xs text-white/70 hover:text-brand-red transition-colors truncate block">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-xs text-white/70">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Social */}
              <AnimatedSection delay={0.14}>
                <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-7">
                  <h3 className="font-heading font-bold text-white text-base mb-4">{t('social')}</h3>
                  <div className="flex gap-2.5">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className={`w-10 h-10 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-transparent transition-all duration-200 ${social.bg}`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Map placeholder */}
              <AnimatedSection delay={0.2}>
                <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl overflow-hidden">
                  <div className="aspect-video bg-white/[0.08] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-2xl bg-brand-ink flex items-center justify-center mx-auto mb-3">
                        <HiMapPin className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-heading font-bold text-white text-sm">Panwila, Sri Lanka</p>
                      <p className="text-white/70 text-xs mt-1">Hill Country, Central Province</p>
                    </div>
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
