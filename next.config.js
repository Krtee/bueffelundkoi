/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n:{
    defaultLocale: 'de',
    locales: ['en', 'de'],
    },
  transpilePackages: ['@heroui/system'],
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

  experimental: {
    // This glob pattern tells the file tracer to include ALL files ('**/*') 
    // inside the specified node_modules folder for ALL routes ('/**/').
    outputFileTracingIncludes: {
      '/**/node_modules/@heroui/system': ['**/*'],
    },
  },
}
