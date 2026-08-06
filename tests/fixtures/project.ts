import type { IProject } from '@/interfaces/general';


export function makeProject(overrides: Partial<IProject> = {}): IProject {
    return {
        id: 1,
        category: 'Web',
        images: [
            {
                id: 1,
                image: '/static/project.webp',
                main: true
            }
        ],
        teamType: 'Solo',
        numberTeam: 1,
        name: 'Test project',
        shortDescription: 'Short description',
        previewDescription: 'Preview description',
        previewDescriptionRu: 'Описание для превью',
        stack: [
            {
                id: 1,
                name: 'Next.js',
                icon: '/static/next.svg',
                tooltip: {
                    id: 1,
                    title: 'Title',
                    titleRu: 'Заголовок',
                    text: 'Text',
                    textRu: 'Текст'
                }
            }
        ],
        
        keyFeatures: [
            {
                id: 1,
                title: 'Title',
                titleRu: 'Заголовок',
                text: 'Text',
                textRu: 'Текст',
                icon: '/static/feature.svg',
                photo: '/static/feature.webp'

            }
        ],
        description: [
            {
                id: 1,
                title: "Description title",
                titleRu: "Description title ru",
                icon: "/static/description.svg",
                content: "Description content",
                contentRu: "Description content ru",
            },
        ],
        metrics: [
            {
                id: 1,
                icon: "/static/metric.svg",
                title: "Metric title",
                titleRu: "Metric title ru",
                text: "Metric text",
                textRu: "Metric text ru",
                current: "8.5",
                max: 10,
                type: "score",
            },
        ],
        commits: [
            {
                id: 1,
                name: "Commit one",
                nameRu: "Commit one ru",
                date: "January 2026",
                dateRu: "January 2026 ru",
                text: "Commit text",
                textRu: "Commit text ru",
                order: 0,
            },
            {
                id: 2,
                name: "Commit two",
                nameRu: "Commit two ru",
                date: "February 2026",
                dateRu: "February 2026 ru",
                text: "Commit text two",
                textRu: "Commit text two ru",
                order: 1,
            },
        ],
        developmentTime: "2 months",
        developmentTimeRu: "2 months ru",
        date: "2026",
        gitHubLink: "https://github.com/example/project",
        demoLink: "https://example.com",
        ...overrides,
    }
}