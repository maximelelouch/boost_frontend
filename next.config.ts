/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com', // On autorise ce domaine
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;