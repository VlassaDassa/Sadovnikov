import react from '@vitejs/plugin-react';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';


export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
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
        environment: 'jsdom',
        setupFiles: [
            './tests/setup.ts'
        ],
        include: [
            'src/**/*.test.ts',
            'src/**/*test.tsx',
            'tests/component/**/*.test.tsx'
        ],
        exclude: [
            'tests/server/**',
            'tests/integration/**',
            'tests/e2e/**'
        ],
        clearMocks: true,
        restoreMocks: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.{ts, tsx}'],
            exclude: [
                'src/**/*d.ts',
                'src/interfaces/**',
                'src/mockData/**',
                'src/app/**/layout.tsx',
                'src/app/**/loading.tsx',
                'src/app/**/not-found.tsx'
            ],
            thresholds: {
                lines: 70,
                functions: 70,
                statements: 70,
                branches: 60
            }
        }
    }
})