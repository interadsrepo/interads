/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@interads/ui', '@interads/hook', '@interads/table'],
}

module.exports = nextConfig
