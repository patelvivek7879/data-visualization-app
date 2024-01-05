/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/dvt',
    experimental: {
        css: {
          removeAfterServerRender: true,
        },
      },
}

module.exports = nextConfig
