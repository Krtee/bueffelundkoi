/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
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
  },
  async headers() {
    return [
      {
        source: '/booking/:path*',
        headers: [
          {
            key: 'disable-google-cache',
            value: 'true',
          }
        ],
      },
    ]
  },
}
