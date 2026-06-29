// lib/transformers/project.ts
import { Prisma } from '@prisma/client';
import { IProject } from '@/interfaces/general';

// Тип для проекта с любым набором включённых полей
type ProjectWithIncludes = Prisma.ProjectGetPayload<{
    include?: {
        images?: boolean;
        stack?: boolean;
        description?: boolean;
        keyFeatures?: boolean;
        metrics?: boolean;
        commits?: boolean;
    };
}>;

export function transformProject(project: ProjectWithIncludes): IProject {
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
        
        images: project.images?.map(img => ({
            id: img.id,
            image: img.image,
            main: img.main,
        })) || [],
        
        stack: project.stack?.map(item => ({
            id: item.id,
            name: item.name,
            icon: item.icon,
            tooltip: item.tooltip,
        })) || [],
        
        description: project.description?.map(desc => ({
            id: desc.id,
            title: desc.title,
            icon: desc.icon,
            content: desc.content,
        })) || [],
        
        keyFeatures: project.keyFeatures?.map(f => ({
            id: f.id,
            title: f.title,
            text: f.text,
            icon: f.icon,
            photo: f.photo,
        })) || [],
        
        metrics: project.metrics?.map(m => ({
            id: m.id,
            icon: m.icon,
            title: m.title,
            text: m.text,
            current: m.current,
            max: m.max,
            type: m.type as 'score' | 'time',
        })) || [],
        
        commits: project.commits?.map(c => ({
            id: c.id,
            name: c.name,
            date: c.date,
            text: c.text,
        })) || [],
    };
}