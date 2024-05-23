/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'https://encrypted-tbn0.gstatic.com',
      // },
    ],
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'bcrypt'];
  //   return config;
  // },
};

export default nextConfig;
