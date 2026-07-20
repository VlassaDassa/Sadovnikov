'use server';

import {
    Prisma,
} from '@prisma/client';

import {
    revalidatePath,
} from 'next/cache';

import {
    z,
} from 'zod';

import prisma from '@/lib/prisma';

import { requireAdmin } from '@/lib/auth/admin';

import {
    getGithubCommits,
} from '@/lib/evolution/getGithubCommits';

import {
    generateEvolutionWithGigaChat,
} from '@/lib/evolution/generateEvolutionWithGigaChat';

import {
    evolutionDraftSchema,
} from '@/lib/evolution/schemas';

import type {
    EvolutionActionResult,
    IEvolutionDraftItem,
    IEvolutionGenerationResult,
} from '@/interfaces/evolution';

const generateInputSchema =
    z.object({
        projectId:
            z
                .number()
                .int()
                .positive(),

        githubLink:
            z
                .string()
                .trim()
                .url(),
    });

const projectIdSchema =
    z
        .number()
        .int()
        .positive();

function getErrorMessage(
    error: unknown,
): string {
    return error instanceof Error
        ? error.message
        : 'Unknown Evolution error';
}

function normalizeGithubLink(
    value: string,
): string {
    return value
        .trim()
        .replace(
            /\.git$/i,
            '',
        )
        .replace(
            /\/+$/,
            '',
        );
}

export async function generateEvolutionDraft(
    projectId: number,
    githubLink: string,
): Promise<
    EvolutionActionResult<
        IEvolutionGenerationResult
    >
> {
    try {
        await requireAdmin();

        const input =
            generateInputSchema.parse({
                projectId,
                githubLink,
            });

        const normalizedGithubLink =
            normalizeGithubLink(
                input.githubLink,
            );

        const project =
            await prisma.project
                .findUnique({
                    where: {
                        id:
                            input.projectId,
                    },

                    select: {
                        id: true,
                        name: true,
                        shortDescription:
                            true,
                        previewDescription:
                            true,
                    },
                });

        if (!project) {
            throw new Error(
                'Project not found',
            );
        }

        const githubResult =
            await getGithubCommits(
                normalizedGithubLink,
            );

        const draft =
            await generateEvolutionWithGigaChat({
                project: {
                    name:
                        project.name,

                    shortDescription:
                        project
                            .shortDescription,

                    previewDescription:
                        project
                            .previewDescription,
                },

                repository:
                    normalizedGithubLink,

                commits:
                    githubResult.commits,
            });

        const generatedAt =
            new Date();

        await prisma.project.update({
            where: {
                id:
                    input.projectId,
            },

            data: {
                githubLink:
                    normalizedGithubLink,

                evolutionDraft:
                    draft as unknown as
                        Prisma.InputJsonValue,

                evolutionGeneratedAt:
                    generatedAt,
            },
        });

        return {
            success: true,

            data: {
                draft,

                generatedAt:
                    generatedAt
                        .toISOString(),

                totalCommits:
                    githubResult
                        .totalCommits,

                analyzedCommits:
                    githubResult
                        .commits
                        .length,
            },
        };
    } catch (error) {
        console.error(
            'Failed to generate Evolution',
            error,
        );

        return {
            success: false,
            error:
                getErrorMessage(
                    error,
                ),
        };
    }
}

export async function saveEvolutionDraft(
    projectId: number,
    rawDraft: unknown,
): Promise<
    EvolutionActionResult<
        IEvolutionDraftItem[]
    >
> {
    try {
        await requireAdmin();

        const validProjectId =
            projectIdSchema.parse(
                projectId,
            );

        const draft =
            evolutionDraftSchema.parse(
                rawDraft,
            );

        const projectExists =
            await prisma.project
                .count({
                    where: {
                        id:
                            validProjectId,
                    },
                });

        if (!projectExists) {
            throw new Error(
                'Project not found',
            );
        }

        await prisma.project.update({
            where: {
                id:
                    validProjectId,
            },

            data: {
                evolutionDraft:
                    draft as unknown as
                        Prisma.InputJsonValue,
            },
        });

        return {
            success: true,
            data:
                draft,
        };
    } catch (error) {
        console.error(
            'Failed to save Evolution draft',
            error,
        );

        return {
            success: false,
            error:
                getErrorMessage(
                    error,
                ),
        };
    }
}

export async function publishEvolution(
    projectId: number,
    rawDraft: unknown,
): Promise<
    EvolutionActionResult<{
        publishedCount: number;
    }>
> {
    try {
        await requireAdmin();

        const validProjectId =
            projectIdSchema.parse(
                projectId,
            );

        const draft =
            evolutionDraftSchema.parse(
                rawDraft,
            );

        await prisma.$transaction(
            async (
                transaction,
            ) => {
                const project =
                    await transaction
                        .project
                        .findUnique({
                            where: {
                                id:
                                    validProjectId,
                            },

                            select: {
                                id: true,
                            },
                        });

                if (!project) {
                    throw new Error(
                        'Project not found',
                    );
                }

                await transaction
                    .commit
                    .deleteMany({
                        where: {
                            projectId:
                                validProjectId,
                        },
                    });

                await transaction
                    .commit
                    .createMany({
                        data:
                            draft.map(
                                (
                                    item,
                                    index,
                                ) => ({
                                    projectId:
                                        validProjectId,

                                    name:
                                        item.name,

                                    date:
                                        item.date,

                                    text:
                                        item.text,

                                    order:
                                        index,
                                }),
                            ),
                    });

                await transaction
                    .project
                    .update({
                        where: {
                            id:
                                validProjectId,
                        },

                        data: {
                            evolutionDraft:
                                Prisma.DbNull,
                        },
                    });
            },
        );

        revalidatePath(
            '/',
            'layout',
        );

        return {
            success: true,

            data: {
                publishedCount:
                    draft.length,
            },
        };
    } catch (error) {
        console.error(
            'Failed to publish Evolution',
            error,
        );

        return {
            success: false,
            error:
                getErrorMessage(
                    error,
                ),
        };
    }
}