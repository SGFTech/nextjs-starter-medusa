const { withStoreConfig } = require("./store-config")
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);
const store = require("./store.config.json")
module.exports = {
	reactStrictMode: true,
};
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  runtimeCaching,
});
const nextConfig = withStoreConfig({
  
  features: store.features,
  
})

module.exports = withNextIntl(withPWA({...nextConfig,experimental: {
  serverActions: true,
},reactStrictMode: true,
images: {
  domains: [
    "medusa-public-images.s3.eu-west-1.amazonaws.com",
    "localhost",
    "medusa-server-testing.s3.amazonaws.com",
    "cdn.shopify.com"
  ],
}, staticPageGenerationTimeout:2000,
reactStrictMode: true,

/*typescript: {
  ignoreBuildErrors: true,
},*/
eslint: {
  ignoreDuringBuilds: true,
},...(process.env.NODE_ENV === 'production' && {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})}))

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
