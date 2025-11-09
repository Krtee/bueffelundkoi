/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  i18n:{
    defaultLocale: 'de',
    locales: ['en', 'de'],
    },
  images: {
    minimumCacheTTL: 3600,
    formats: ["image/webp"],
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
