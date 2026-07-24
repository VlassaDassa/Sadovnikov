import { notFound } from "next/navigation";

import ClientPageWrapper from "./ClientPageWrapper";
import ErrorPage from "@/components/shared/ErrorPage";

import { transformRawProject } from "@/lib/transformers/project";
import { evolutionDraftSchema } from "@/lib/evolution/schemas";
import prisma from "@/lib/prisma";
import type { IProject } from "@/interfaces/general";
import type { IEvolutionDraftItem } from "@/interfaces/evolution";





interface EditProjectProps {
    params: Promise<{
        id: string;
    }>;
}

async function EditProject({ params }: EditProjectProps) {
    const { id } = await params;

    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        notFound();
    }

    let project: IProject | null = null;

    let initialEvolutionDraft: IEvolutionDraftItem[] = [];

    let initialEvolutionGeneratedAt: string | null = null;

    try {
        const rawProject = await prisma.project.findUnique({
            where: {
                id: projectId,
            },

            include: {
                images: true,

                stack: true,

                description: true,

                metrics: true,

                commits: {
                    orderBy: [
                        {
                            order: "asc",
                        },
                        {
                            id: "asc",
                        },
                    ],
                },

                keyFeatures: true,
            },
        });

        if (rawProject) {
            project = transformRawProject(rawProject);

            const parsedDraft = evolutionDraftSchema.safeParse(
                rawProject.evolutionDraft,
            );

            if (parsedDraft.success) {
                initialEvolutionDraft = parsedDraft.data;
            }

            initialEvolutionGeneratedAt =
                rawProject.evolutionGeneratedAt?.toISOString() ?? null;
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        return <ErrorPage error={errorMessage} />;
    }

    if (!project) {
        notFound();
    }

    return (
        <ClientPageWrapper
            project={project}
            initialEvolutionDraft={initialEvolutionDraft}
            initialEvolutionGeneratedAt={initialEvolutionGeneratedAt}
        />
    );
}

export default EditProject;
