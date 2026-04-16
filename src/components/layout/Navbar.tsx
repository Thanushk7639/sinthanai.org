'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBars3, HiXMark, HiArrowRight } from 'react-icons/hi2';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/programs', key: 'programs' },
  { href: '/events', key: 'events' },
  { href: '/gallery', key: 'gallery' },
  { href: '/volunteer', key: 'volunteer' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '/en' || pathname === '/ta';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 py-0 ${
          scrolled
            ? 'shadow-lg'
            : ''
        }`}
        style={{ background: 'rgba(13,43,78,0.70)', backdropFilter: 'blur(16px)' }}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative flex-shrink-0" style={{ width: '400px', height: '60px' }}>
                <Image
                  src="/logo.png"
                  alt="Sinthanai Foundation"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium font-body transition-all duration-200 rounded-lg ${
                    isActive(link.href)
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(link.key)}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/donate"
                className="hidden sm:inline-flex items-center gap-2 bg-brand-red text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-red-dark transition-all duration-200 shadow-sm"
              >
                {t('donate')}
                <HiArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-brand-ink/30 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 lg:hidden shadow-xl flex flex-col border-l border-white/10"
              style={{ background: 'rgba(13,43,78,0.90)', backdropFilter: 'blur(20px)' }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <span className="font-heading font-bold text-base text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                >
                  <HiXMark className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                      isActive(link.href)
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {t(link.key)}
                    {isActive(link.href) && <HiArrowRight className="w-4 h-4" />}
                  </Link>
                ))}
              </div>

              <div className="p-5 border-t border-white/10">
                <Link
                  href="/donate"
                  className="btn-red w-full justify-center text-center"
                >
                  {t('donate')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
