// Трансформер нужен, чтобы привести тип к существующему интерфейсу, если у поля есть (include)-поля,
// т.е, если поле является другой таблицей/внешний ключ

import { Prisma } from '@prisma/client';

import { getLocalizedText } from '@/i18n/getLocalizedText';
import { AppLocale } from '@/i18n/routing';
import { IProject, IStackTooltip } from '@/interfaces/general';



export function transformTooltip(data: unknown): IStackTooltip | null {
    if (!data || typeof data !== 'object') {
        return null
    }

    const obj = data as Record<string, unknown>

    if (
        typeof obj.id !== 'number' ||
        typeof obj.title !== 'string' ||
        typeof obj.text !== 'string'
    ) {
        return null
    }

    return {
        id: obj.id,
        title: obj.title,
        titleRu: typeof obj.titleRu === 'string' ? obj.titleRu : '',
        text: obj.text,
        textRu: typeof obj.textRu === 'string' ? obj.textRu : '',
    }
}

export function transformRawTooltip(data: unknown): IStackTooltip | null {
    if (!data || typeof data !== 'object') {
        return null
    }

    const obj = data as Record<string, unknown>

    if (
        typeof obj.id !== 'number' ||
        typeof obj.title !== 'string' ||
        typeof obj.text !== 'string'
    ) {
        return null
    }

    return {
        id: obj.id,
        title: obj.title,
        titleRu: typeof obj.titleRu === 'string' ? obj.titleRu : '',
        text: obj.text,
        textRu: typeof obj.textRu === 'string' ? obj.textRu : '',
    }
}

export function transformLocalizedTooltip(
    data: unknown,
    locale: AppLocale
): IStackTooltip | null {
    const tooltip = transformRawTooltip(data)

    if (!tooltip) {
        return null
    }

    return {
        id: tooltip.id,
        title: getLocalizedText(
            locale,
            tooltip.title,
            tooltip.titleRu
        ),
        titleRu: tooltip.titleRu,
        text: getLocalizedText(
            locale,
            tooltip.text,
            tooltip.textRu
        ),
        textRu: tooltip.textRu,
    }
}

type PrismaProject = Prisma.ProjectGetPayload<{
    include: {
        images: true;
        stack: true;
        description: true;
        metrics: true;
        commits: true;
        keyFeatures: true;
    };
}>;

export function transformProject(project: PrismaProject, locale: AppLocale='en'): IProject {
    return {
        id: project.id,
        category: project.category,
        name: project.name,
        gitHubLink: project.githubLink || '',
        demoLink: project.demoLink || '',

        shortDescription: getLocalizedText(
            locale,
            project.shortDescription,
            project.shortDescriptionRu
        ),

        previewDescription: getLocalizedText(
            locale,
            project.previewDescription,
            project.previewDescriptionRu
        ),

        date: project.date,

        developmentTime: getLocalizedText(
            locale,
            project.developmentTime,
            project.developmentTimeRu
        ),

        numberTeam: project.numberTeam,
        teamType: project.teamType,

        images: project.images.map(img => ({
            id: img.id,
            image: img.image,
            main: img.main,
        })),

        keyFeatures: project.keyFeatures?.map(f => ({
            id: f.id,
            title: getLocalizedText(
                locale,
                f.title,
                f.titleRu
            ),

            text: getLocalizedText(
                locale,
                f.text,
                f.textRu
            ),

            icon: f.icon,
            photo: f.photo,
        })) || [],

        stack: project.stack.map(item => ({
            id: item.id,
            name: item.name,
            icon: item.icon,
            tooltip: transformLocalizedTooltip(
                item.tooltip,
                locale
            ) ?? undefined,
        })),

        description: project.description.map(desc => ({
            id: desc.id,
            title: getLocalizedText(
                locale,
                desc.title,
                desc.titleRu
            ),

            icon: desc.icon,

            content: getLocalizedText(
                locale,
                desc.content,
                desc.contentRu
            ),
        })),


        metrics: project.metrics.map(m => ({
            id: m.id,
            icon: m.icon,

            title: getLocalizedText(
                locale,
                m.title,
                m.titleRu
            ),

            text: getLocalizedText(
                locale,
                m.text,
                m.textRu
            ),

            current: m.current,
            max: m.max,
            type: m.type as 'score' | 'time',
        })),

        commits: project.commits.map((commit) => ({
            id: commit.id,
            name: getLocalizedText(
                locale,
                commit.name,
                commit.nameRu
            ),
            date: commit.date,
            dateRu: commit.dateRu || '',
            text: getLocalizedText(
                locale,
                commit.text,
                commit.textRu
            ),
            order: commit.order
        })),
    };
}

export function transformRawProject(project: PrismaProject): IProject {
    return {
        id: project.id,
        category: project.category,
        name: project.name,

        shortDescription: project.shortDescription,
        shortDescriptionRu: project.shortDescriptionRu || '',

        previewDescription: project.previewDescription,
        previewDescriptionRu: project.previewDescriptionRu || '',

        date: project.date,

        developmentTime: project.developmentTime,
        developmentTimeRu: project.developmentTimeRu || '',

        gitHubLink: project.githubLink || '',     
        demoLink: project.demoLink || '',
        numberTeam: project.numberTeam,
        teamType: project.teamType,

        images: project.images.map(img => ({
            id: img.id,
            image: img.image,
            main: img.main,
        })),

        keyFeatures: project.keyFeatures?.map(f => ({
            id: f.id,
            title: f.title || '',
            titleRu: f.titleRu || '',

            text: f.text || '',
            textRu: f.textRu || '',

            icon: f.icon,
            photo: f.photo,
        })) || [],

        stack: project.stack.map(item => ({
            id: item.id,
            name: item.name,
            icon: item.icon,
            tooltip: transformRawTooltip(item.tooltip) ?? undefined,
        })),

        description: project.description.map(desc => ({
            id: desc.id,
            title: desc.title,
            titleRu: desc.titleRu || '',

            icon: desc.icon,

            content: desc.content,
            contentRu: desc.contentRu || ''
        })),


        metrics: project.metrics.map(m => ({
            id: m.id,
            icon: m.icon,

            title: m.title,
            titleRu: m.titleRu || '',

            text: m.text,
            textRu: m.textRu || '',

            current: m.current,
            max: m.max,
            type: m.type as 'score' | 'time',
        })),

        commits: project.commits.map((commit) => ({
            id: commit.id,
            name: commit.name,
            nameRu: commit.nameRu ?? '',
            date: commit.date,
            dateRu: commit.dateRu ?? '',
            text: commit.text,
            textRu: commit.textRu ?? '',
            order: commit.order
        })),
    };
}