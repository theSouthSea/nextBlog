/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ["img1.sycdn.imooc.com"],
  },
};

// export default nextConfig;
const removeImports = require("next-remove-imports")();
// module.exports = removeImports({});
module.exports = removeImports(nextConfig);

