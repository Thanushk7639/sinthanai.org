'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiPaperAirplane, HiArrowRight } from 'react-icons/hi2';

export default function VolunteerPage() {
  const t = useTranslations('volunteer_page');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    gender: '',
    googleMeetId: '',
    ageGroup: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:admin@sinthanai.org?subject=Volunteer Sign Up&body=${encodeURIComponent(
      `Full Name: ${formData.fullName}\nAddress: ${formData.address}\nGender: ${formData.gender}\nGoogle Meet ID: ${formData.googleMeetId}\nAge Group: ${formData.ageGroup}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="pt-16">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-white/25 text-white/80 mb-5">
                {t('tag')}
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h1 className="text-h1 text-white mb-4">{t('hero_title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={0.14}>
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                {t('hero_subtitle')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Letter Content */}
      <section className="section-padding bg-white/[0.08]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <motion.div
                className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Letter Header */}
                <div className="flex justify-between items-start mb-8 text-white/60 text-sm">
                  <div>
                    <p className="font-semibold text-white">{t('letter_heading')}</p>
                  </div>
                  <div className="text-right">
                    <p>{t('letter_date')}</p>
                  </div>
                </div>

                {/* Greeting */}
                <p className="text-white text-lg mb-6 font-medium">
                  {t('letter_greeting')}
                </p>

                {/* Letter Body */}
                <div className="space-y-5 text-white/80 leading-relaxed">
                  <p className="text-justify">
                    {t('letter_intro')}
                  </p>
                  <p className="text-justify">
                    {t('letter_purpose')}
                  </p>
                  <p className="text-justify">
                    {t('letter_privacy')}
                  </p>
                  <p className="text-justify">
                    {t('letter_platform')}
                  </p>
                  <p className="text-justify">
                    {t('letter_benefit')}
                  </p>
                </div>

              {/* Sign Up Section */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-white font-heading font-bold text-lg mb-3">
                  {t('signup_title')}:
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  {t('signup_instruction')}{' '}
                  <a href="mailto:admin@sinthanai.org" className="text-white font-semibold underline hover:text-brand-teal transition-colors">
                    {t('signup_email')}
                  </a>
                  . {t('signup_response')}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1.5 block">{t('name')}:</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-brand-teal"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1.5 block">{t('address')}:</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-brand-teal"
                      placeholder="Enter your address"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1.5 block">{t('gender')}:</label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white/80 focus:outline-none focus:border-brand-teal"
                    >
                      <option value="" className="bg-brand-ink">Select Gender</option>
                      <option value="Male" className="bg-brand-ink">Male</option>
                      <option value="Female" className="bg-brand-ink">Female</option>
                      <option value="Other" className="bg-brand-ink">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1.5 block">{t('google_meet_id')}:</label>
                    <input
                      type="text"
                      required
                      value={formData.googleMeetId}
                      onChange={(e) => setFormData({ ...formData, googleMeetId: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-brand-teal"
                      placeholder="Enter your Google Meet ID"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1.5 block">{t('age_group')}:</label>
                    <div className="flex flex-wrap gap-4 pt-1">
                      {['15-25', '26-35', '36-45', 'Above 45'].map((age, idx) => (
                        <label key={age} className="flex items-center gap-2 text-white/80 cursor-pointer">
                          <input
                            type="radio"
                            name="ageGroup"
                            required
                            value={age}
                            checked={formData.ageGroup === age}
                            onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                            className="w-4 h-4 accent-brand-teal"
                          />
                          {idx + 1}) {age}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full sm:w-auto btn-primary justify-center"
                  >
                    <HiPaperAirplane className="w-4 h-4" />
                    {t('submit')}
                    <HiArrowRight className="w-4 h-4" />
                  </button>
                  {submitted && (
                    <p className="text-brand-teal text-sm mt-3">
                      Your email client will open to send the application.
                    </p>
                  )}
                </form>
              </div>

                {/* Closing */}
                <div className="mt-10 pt-6 border-t border-white/20 text-right text-white/80">
                  <p className="mb-2">{t('closing')}</p>
                  <p className="font-semibold text-white">{t('board')}</p>
                  <p>{t('foundation')}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}