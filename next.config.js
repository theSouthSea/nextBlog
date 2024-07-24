const withMDX = require("@next/mdx")();
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // reactStrictMode: true,
  images: {
    domains: ["img1.sycdn.imooc.com"],
  },
};

// export default nextConfig;
const removeImports = require("next-remove-imports")();
// module.exports = removeImports({});
module.exports = removeImports(withMDX(nextConfig));

