/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 100,
  basePath: process.env.NEXT_PUBLIC_CONTEXT_PATH,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL_API+process.env.NEXT_PUBLIC_CONTEXT_PATH,
    LOCAL_API: process.env.NEXT_PUBLIC_BASE_URL_API+process.env.NEXT_PUBLIC_CONTEXT_PATH+'/api',
    CONTEXT:process.env.NEXT_PUBLIC_CONTEXT_PATH,
    CHECK_JWT_EXPIRE: process.env.CHECK_JWT_EXPIRE,
    SECURE_COOKIE: process.env.SECURE_COOKIE,
    SITE_TITLE: process.env.SITE_TITLE || "Website Name",
    SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || "Website Description",
    BACKEND_API_URL: process.env.NEXT_BACKEND_API_URL
 
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: process.env.NEXT_PUBLIC_BASEPATH,
  //       destination: '/',
  //     },
  //   ]
  // },
};

module.exports = nextConfig;
