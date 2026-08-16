import { describe, expect, it } from 'vitest';

import {
    transformLocalizedTooltip,
    transformProject,
    transformRawProject,
    transformRawTooltip,
    transformTooltip,
} from "./project";



function makeRawProject() {
    return {
        id: 1,
        category: "Web",
        name: "Project",
        githubLink: null,
        demoLink: null,
        shortDescription: "Short",
        previewDescription: "Preview",
        previewDescriptionRu: "Preview ru",
        date: "2026",
        developmentTime: "Two months",
        developmentTimeRu: "Two months ru",
        numberTeam: 1,
        teamType: "Solo",
        images: [
            {
                id: 1,
                image: "/image.webp",
                main: true,
                projectId: 1,
            },
        ],
        keyFeatures: [
            {
                id: 1,
                projectId: 1,
                title: "Feature",
                titleRu: "Feature ru",
                text: "Text",
                textRu: "Text ru",
                icon: "/icon.svg",
                photo: "/photo.webp",
            },
        ],
        stack: [
            {
                id: 1,
                projectId: 1,
                name: "Next.js",
                icon: "/next.svg",
                tooltip: {
                    id: 1,
                    title: "Tooltip",
                    titleRu: "Tooltip ru",
                    text: "Tooltip text",
                    textRu: "Tooltip text ru",
                },
            },
        ],
        description: [
            {
                id: 1,
                projectId: 1,
                title: "Description",
                titleRu: "Description ru",
                icon: "/description.svg",
                content: "Content",
                contentRu: "Content ru",
            },
        ],
        metrics: [
            {
                id: 1,
                projectId: 1,
                icon: "/metric.svg",
                title: "Metric",
                titleRu: "Metric ru",
                text: "Metric text",
                textRu: "Metric text ru",
                current: 8,
                max: 10,
                type: "score",
            },
        ],
        commits: [
            {
                id: 1,
                projectId: 1,
                name: "Commit",
                nameRu: "Commit ru",
                date: "January 2026",
                dateRu: "January 2026 ru",
                text: "Commit text",
                textRu: "Commit text ru",
                order: 0,
            },
        ],
    }
}


describe('tooltip transformers', () => {
    it('returns null for invalid input', () => {
        expect(transformTooltip(null)).toBeNull()
        expect(transformTooltip({})).toBeNull()
        expect(
            transformTooltip({
                id: '1',
                title: 'Title',
                text: 'Text'
            })
        ).toBeNull()
    })

    it('normalizes optional localized fields', () => {
        expect(
            transformRawTooltip({
                id: 1,
                title: 'Title',
                text: 'Text'
            })
        ).toEqual({
            id: 1,
            title: 'Title',
            titleRu: '',
            text: 'Text',
            textRu: ''
        })
    })

    it('localizes a tooltip', () => {
        const result =
            transformLocalizedTooltip(
                {
                    id: 1,
                    title: 'Title en',
                    titleRu: 'Title ru',
                    text: 'Text en',
                    textRu: 'Text ru',
                },
                'ru',
            )

        expect(result).toEqual({
            id: 1,
            title: 'Title ru',
            titleRu: 'Title ru',
            text: 'Text ru',
            textRu: 'Text ru',
        })
    })
})


describe('project transformers', () => {
    it('creates a editable project', () => {
        const result = transformRawProject(makeRawProject() as never)

        expect(result.gitHubLink).toBe('')
        expect(result.demoLink).toBe('')
        expect(result.keyFeatures[0]).toMatchObject({
            titleRu: 'Feature ru',
            textRu: 'Text ru',
        })
        expect(result.commits[0]).toMatchObject({
            nameRu: 'Commit ru',
            textRu: 'Commit text ru',
            order: 0
        })
    })

    it('creates an English public project', () => {
        const result = transformProject(
            makeRawProject() as never,
            'en'
        )

        expect(result.previewDescription).toBe('Preview')
        expect(result.keyFeatures[0].text).toBe('Text')
        expect(result.metrics[0].title).toBe('Metric')
    })

    it('creates a localized public project', () => {
        const result = transformProject(
            makeRawProject() as never, 'ru'
        )

        expect(result.previewDescription).toBe('Preview ru')
        expect(result.keyFeatures[0].text).toBe('Text ru')
        expect(result.metrics[0].title).toBe('Metric ru')
        expect(result.commits[0].name).toBe('Commit ru')
    })
})