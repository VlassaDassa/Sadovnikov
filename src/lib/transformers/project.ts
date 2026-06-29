// lib/transformers/project.ts
import { Prisma } from '@prisma/client';
import { IProject, IStackTooltip } from '@/interfaces/general';



export function transformTooltip(data: unknown): IStackTooltip | null {
    if (!data || typeof data !== 'object') return null;
    const obj = data as Record<string, unknown>;
    if (typeof obj.id === 'number' && typeof obj.title === 'string' && typeof obj.text === 'string') {
        return {
            id: obj.id,
            title: obj.title,
            text: obj.text,
        };
    }
    return null;
}


// Тип для того, что возвращает Prisma с нужными include
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

export function transformProject(project: PrismaProject): IProject {
    return {
        id: project.id,
        category: project.category,
        name: project.name,
        shortDescrition: project.shortDescription,
        previewDescription: project.previewDescription,
        date: project.date,
        developmentTime: project.developmentTime,
        gitHubLink: project.githubLink || '',     
        demoLink: project.demoLink || '',
        numberTeam: project.numberTeam,
        teamType: project.teamType,

        images: project.images.map(img => ({
            id: img.id,
            image: img.image,
            main: img.main,
        })),

        stack: project.stack.map(item => ({
            id: item.id,
            name: item.name,
            icon: item.icon,
            tooltip: transformTooltip(item.tooltip) ?? undefined,
        })),

        description: project.description.map(desc => ({
            id: desc.id,
            title: desc.title,
            icon: desc.icon,
            content: desc.content,
        })),


        metrics: project.metrics.map(m => ({
            id: m.id,
            icon: m.icon,
            title: m.title,
            text: m.text,
            current: m.current,
            max: m.max,
            type: m.type as 'score' | 'time',
        })),

        commits: project.commits.map(c => ({
            id: c.id,
            name: c.name,
            date: c.date,
            text: c.text,
        })),
    };
}