/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
