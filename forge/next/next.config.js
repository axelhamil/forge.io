/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/core-domain"],
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

module.exports = nextConfig;
