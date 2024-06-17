module.exports = {
  transpilePackages: ["@repo/core-_domain"],
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};
