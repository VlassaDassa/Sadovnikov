import { notFound } from "next/navigation";

import ClientPageWrapper from "./ClientPageWrapper";
import ErrorPage from '@/components/shared/ErrorPage';

import { transformProject } from '@/lib/transformers/project';
import prisma from '@/lib/prisma';
import { IProject } from '@/interfaces/general';


interface EditProjectProps {
    params: Promise<{ id: string }>;
}

async function EditProject({ params }: EditProjectProps) {
    const { id } = await params;
    const projectId = Number(id);
    let project: IProject | null = null

    try {
        const rawProject = await prisma.project.findUnique({
            where: {
                id: projectId
            },
            include: {
                images: true,
                stack: true,
                description: true,
                metrics: true,
                commits: true,
                keyFeatures: true,
            },
        })

        project = rawProject ? transformProject(rawProject) : null
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return <ErrorPage error={errorMessage} />
    }

    if (!project) {
        notFound();
    }

    return (
        <ClientPageWrapper project={project} />   
    )
}


export default EditProject;