// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  distDir: './dist',
  sassOptions: {
        includePaths: ['./src'],  
    },
};

export default nextConfig;