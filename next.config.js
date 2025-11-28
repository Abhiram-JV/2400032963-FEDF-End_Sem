/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  basePath: '/2400032963-FEDF-End_Sem',
  assetPrefix: '/2400032963-FEDF-End_Sem/',
  images: {
    unoptimized: true
  },
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig