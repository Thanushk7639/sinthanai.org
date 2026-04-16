import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';

export const metadata = {
  title: {
    default: 'Sinthanai Foundation — The Centre for Expansion of the Mind',
    template: '%s | Sinthanai Foundation',
  },
  description:
    "Sinthanai Foundation is a registered charity dedicated to empowering communities through education in Sri Lanka's hill country. Programs include English, IT skills, philosophy, and more.",
  keywords: ['education', 'charity', 'Sri Lanka', 'Panwila', 'foundation', 'volunteer', 'donate'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sinthanai.org',
    siteName: 'Sinthanai Foundation',
    title: 'Sinthanai Foundation — The Centre for Expansion of the Mind',
    description: "Empowering communities through education in Sri Lanka's hill country.",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} style={{ background: 'linear-gradient(160deg, #0D2B4E 0%, #1E86C8 60%, #4FAEE0 100%)', minHeight: '100%' }}>
      <body className="min-h-screen flex flex-col" style={{ background: 'transparent' }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
