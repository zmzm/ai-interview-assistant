/** @type {import('next').NextConfig} */
const pathPrefix = "/interview-assistant"

const nextConfig = {
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
