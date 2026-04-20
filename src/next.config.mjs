// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Говорит Next.js соберать статический SPA
  distDir: './dist', // Указываем ту же папку для сборки, что и в Vite
  sassOptions: {
        includePaths: ['./src'],  // ← чтобы Next.js видел твои токены
    },
};

export default nextConfig;