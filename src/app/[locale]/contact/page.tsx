'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiMapPin, HiPhone, HiEnvelope, HiClock, HiPaperAirplane, HiArrowRight, HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const contactInfo = [
  { key: 'address', icon: HiMapPin, valueKey: 'address_value', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-red' },
  { key: 'phone', icon: HiPhone, value: '+94 81 292 2016', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-teal' },
  { key: 'email_label', icon: HiEnvelope, value: 'admin@sinthanai.org', href: 'mailto:admin@sinthanai.org', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-red' },
  { key: 'hours', icon: HiClock, valueKey: 'hours_value', bg: 'bg-white/15', border: 'border-white/25', iconColor: 'text-brand-teal' },
] as const;

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook', bg: 'hover:bg-brand-ink' },
  { icon: FaTwitter, href: '#', label: 'Twitter', bg: 'hover:bg-brand-teal' },
  { icon: FaInstagram, href: '#', label: 'Instagram', bg: 'hover:bg-brand-red' },
  { icon: FaYoutube, href: '#', label: 'YouTube', bg: 'hover:bg-brand-red' },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactPage() {
  const t = useTranslations('contact_page');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    }
  };

  const isSubmitting = status.type === 'loading';

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

                {/* Status Messages */}
                {status.type === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 rounded-xl bg-green-500/20 border border-green-500/30 flex items-start gap-3"
                  >
                    <HiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-green-300 text-sm">{status.message}</p>
                  </motion.div>
                )}

                {status.type === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-3"
                  >
                    <HiXCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{status.message}</p>
                  </motion.div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                        {t('name')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your full name"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                      {t('subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="How can we help?"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold text-white mb-2 block uppercase tracking-wide">
                      {t('message')}
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Your message..."
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane className="w-4 h-4" />
                        {t('send')}
                        <HiArrowRight className="w-4 h-4" />
                      </>
                    )}
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