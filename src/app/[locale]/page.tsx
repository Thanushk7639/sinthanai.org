import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import AboutPreview from '@/components/home/AboutPreview';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Testimonials from '@/components/home/Testimonials';
import RecentEvents from '@/components/home/RecentEvents';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <FeaturedPrograms />
      <Testimonials />
      <RecentEvents />
      <CTABanner />
    </>
  );
}
