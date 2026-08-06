module.exports = {
    ci: {
        collect: {
            startServerCommand: 'dotenv -e .env.test -- pnpm start',
            startServerReadyPattern: 'Ready',
            url: [
                'http://127.0.0.1:3000/',
                'http://127.0.0.1:3000/ru'
            ],
            numberOfRuns: 3,
            settings: {
                preset: 'desktop'
            }
        },
        assert: {
            assertions: {
                'categories:accessibility': [
                    'error',
                    {
                        minScore: 0.9
                    }
                ],
                'categories:best-practices': [
                    'error',
                    {
                        minScore: 0.9
                    }
                ],
                'categories:seo': [
                    'error',
                    {
                        minScore: 0.9
                    }
                ],
                'categories:performance': [
                    'warn',
                    {
                        minScore: 0.75
                    }
                ],
                'largest-contentful-paint': [
                    'warn',
                    {
                        maxNumericValue: 3000
                    }
                ],
                'cumulative-layout-shift': [
                    'error',
                    {
                        maxNumericValue: 0.1
                    }
                ]
            },
        },

        upload: {
            target: 'filesystem',
            outputDir: '.lighthouseci'
        }
    }
}