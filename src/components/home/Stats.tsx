'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCalendarDays, HiBookOpen, HiUserGroup } from 'react-icons/hi2';

const stats = [
  { key: 'students', value: '500+', icon: HiAcademicCap, accent: 'text-brand-red', bg: 'bg-brand-surface-2', border: 'border-brand-border' },
  { key: 'years', value: '8', icon: HiCalendarDays, accent: 'text-brand-teal', bg: 'bg-brand-surface-2', border: 'border-brand-border' },
  { key: 'programs', value: '5', icon: HiBookOpen, accent: 'text-brand-red', bg: 'bg-brand-surface-2', border: 'border-brand-border' },
  { key: 'volunteers', value: '50+', icon: HiUserGroup, accent: 'text-brand-teal', bg: 'bg-brand-surface-2', border: 'border-brand-border' },
] as const;

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="py-3 bg-brand-bg">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg p-3 flex items-center gap-2.5 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg md:text-xl font-heading font-bold text-white leading-none">
                  {stat.value}
                </div>
                <div className="text-[11px] text-white/70 font-body mt-0.5 font-medium">{t(stat.key)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
