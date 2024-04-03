/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/core-domain"],
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};
