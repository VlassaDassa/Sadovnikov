import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';


export default defineConfig({
    plugins: [
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            'server-only': path.resolve(
                __dirname,
                'tests/mocks/server-only.ts'
            )
        }
    },
    test: {
        environment: 'nide',
        setupFiles: ['./tests/server/setup.ts'],
        include: ['tests/server/**/*.test.ts'],
        clearMocks: true,
        restoreMocks: true,
        testTimeout: 30000,
        hookTimeout: 30000
    }
})