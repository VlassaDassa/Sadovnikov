/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeCss: false,
    },
    // output: 'export',
    distDir: './dist',
    allowedDevOrigins: ['*'],
    sassOptions: {
        includePaths: ['./src'],
    },
    webpack: (config, { isServer }) => {
        // Фикс для порядка CSS
        if (!isServer) {
            const miniCssExtractPlugin = config.plugins.find(
                (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
            );
            
            if (miniCssExtractPlugin) {
                miniCssExtractPlugin.options.ignoreOrder = false;
            }
        }

        config.optimization = {
            ...config.optimization,
            splitChunks: {
                ...config.optimization.splitChunks,
                cacheGroups: {
                    ...config.optimization.splitChunks?.cacheGroups,
                    styles: {
                        name: 'styles',
                        test: /\.(css|scss)$/,
                        chunks: 'all',
                        enforce: true,
                        priority: 20,
                    },
                },
            },
        };

        return config;
    },
};

export default nextConfig;