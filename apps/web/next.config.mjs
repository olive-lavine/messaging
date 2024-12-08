/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '54321',
      },
    ],
  },
};

export default nextConfig;
