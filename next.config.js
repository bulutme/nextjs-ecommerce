/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "source.unsplash.com",
        protocol: "https",
        pathname: "/**",
        port: "",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
