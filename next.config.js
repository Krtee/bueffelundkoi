const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  transpilePackages: ["@heroui/react", "@heroui/sytem"],
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
