/** @type {import('next').NextConfig} */
const nextConfig = {
  // react-beautiful-dnd doesn't work with StrictMode on
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // Vercel Blob stores product photos
      {
        protocol: 'https',
        hostname: 'raxvvhhchcocsmg2.public.blob.vercel-storage.com',
      },
    ],
  },
}

module.exports = nextConfig
