/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n:{
    defaultLocale: 'de',
    locales: ['en', 'de'],
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
