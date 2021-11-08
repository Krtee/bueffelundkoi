/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n:{
    defaultLocale: 'de',
    locales: ['en', 'de'],
    localeDetection: false,
  },
}
