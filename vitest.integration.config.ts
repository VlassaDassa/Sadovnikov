import path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';



export default defineConfig({
    plugins: [ tsconfigPaths() ],
    resolve: {
        alias: {
            'server-only': path.resolve(
                __dirname,
                'tests/mocks/server-only.ts',
            )
        }
    },
    test: {
        environment: "node",
        setupFiles: [
            "./tests/integration/setup.ts",
        ],
        include: [
            "tests/integration/**/*.test.ts",
        ],
        fileParallelism: false,
        pool: "forks",
        clearMocks: true,
        restoreMocks: true,
        testTimeout: 30000,
        hookTimeout: 30000,
    },
})