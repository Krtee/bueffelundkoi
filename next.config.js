/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@heroui/system','@heroui/react'],
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
