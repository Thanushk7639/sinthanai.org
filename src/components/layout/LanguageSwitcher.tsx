'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { HiGlobeAlt } from 'react-icons/hi2';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ta' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const nextLocale = locale === 'en' ? 'ta' : 'en';

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
      aria-label={`Switch to ${localeNames[nextLocale]}`}
    >
      <HiGlobeAlt className="w-4 h-4" />
      <span>{localeNames[nextLocale]}</span>
    </button>
  );
}
