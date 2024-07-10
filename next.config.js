/** @type {import('next').NextConfig} */
const nextConfig = {};

// export default nextConfig;
const removeImports = require("next-remove-imports")();
// module.exports = removeImports({});
module.exports = removeImports(nextConfig);
