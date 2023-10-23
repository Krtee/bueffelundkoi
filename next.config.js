/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  i18n:{
    defaultLocale: 'de',
    locales: ['en', 'de'],
    localeDetection: true
    },
  images: {
    minimumCacheTTL: 3600,
    formats: ["image/webp"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  }
}
