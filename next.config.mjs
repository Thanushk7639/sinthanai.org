import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  optimizeFonts: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sinthanai.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'sinthanai-assets.rvdtechsolutions.com' },
      { protocol: 'https', hostname: 'pub-cebc9e73438146788fb6fd8ce134426b.r2.dev' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
};

export default withNextIntl(nextConfig);
