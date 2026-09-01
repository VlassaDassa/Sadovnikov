"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { isManageUpload, isProjectManageUpload } from "@/lib/uploads/paths";
import { deleteManagedUpload } from "@/lib/uploads/deleteUpload";
import path from "node:path";
import { rm } from "node:fs/promises";

import prisma from "@/lib/prisma";
import { IProject } from "@/interfaces/general";
import { transformRawProject } from "@/lib/transformers/project";
import { requireAdmin } from "@/lib/auth/admin";
import { uploadConfig } from "@/lib/uploads/config";

const MIN_DATABASE_INTEGER = -2_147_483_648;
const MAX_DATABASE_INTEGER = 2_147_483_647;

type StoredImage = {
    id: number;
    image: string;
    main: boolean;
};

type StoredStackItem = {
    id: number;
    name: string;
    icon: string;
    tooltip: Prisma.JsonValue | null;
};

type StoredKeyFeature = {
    id: number;
    title: string;
    titleRu: string | null;
    text: string;
    textRu: string | null;
    icon: string;
    photo: string;
};

type StoredDescription = {
    id: number;
    title: string;
    titleRu: string | null;
    icon: string;
    content: string;
    contentRu: string | null;
};

type StoredMetric = {
    id: number;
    icon: string;
    title: string;
    titleRu: string | null;
    text: string;
    textRu: string | null;
    current: number;
    max: number;
    type: string;
};

type StoredCommit = {
    id: number;
    name: string;
    nameRu: string | null;
    date: string;
    dateRu: string | null;
    text: string;
    textRu: string | null;
    order: number;
};

function assertUniqueIds(items: Array<{ id: number }>, name: string): void {
    if (new Set(items.map((item) => item.id)).size !== items.length) {
        throw new Error(`Duplicate ${name} ids are not allowed`);
    }
}

function getCreateId(id: number): number | undefined {
    return Number.isInteger(id) &&
        id >= MIN_DATABASE_INTEGER &&
        id <= MAX_DATABASE_INTEGER
        ? id
        : undefined;
}

function normalizeNullable(value: string | undefined): string | null {
    return value ?? null;
}

function normalizeTooltip(
    tooltip: IProject["stack"][number]["tooltip"],
): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
    return tooltip ? JSON.parse(JSON.stringify(tooltip)) : Prisma.DbNull;
}

function areEqualJson(
    current: Prisma.JsonValue | null,
    next: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput,
): boolean {
    if (next === Prisma.DbNull) {
        return current === null;
    }

    return JSON.stringify(current) === JSON.stringify(next);
}

function getRemovedIds<T extends { id: number }>(
    current: T[],
    next: Array<{ id: number }>,
): number[] {
    const nextIds = new Set(next.map((item) => item.id));

    return current
        .filter((item) => !nextIds.has(item.id))
        .map((item) => item.id);
}

async function syncImages(
    tx: Prisma.TransactionClient,
    projectId: number,
    current: StoredImage[],
    next: IProject["images"],
): Promise<void> {
    const currentById = new Map(current.map((item) => [item.id, item]));
    const removedIds = getRemovedIds(current, next);

    if (removedIds.length > 0) {
        await tx.projectImage.deleteMany({
            where: { projectId, id: { in: removedIds } },
        });
    }

    for (const image of next) {
        const previous = currentById.get(image.id);

        if (!previous) {
            await tx.projectImage.create({
                data: {
                    id: getCreateId(image.id),
                    projectId,
                    image: image.image,
                    main: image.main,
                },
            });
        } else if (
            previous.image !== image.image ||
            previous.main !== image.main
        ) {
            await tx.projectImage.update({
                where: { id: image.id },
                data: { image: image.image, main: image.main },
            });
        }
    }
}

async function syncStackItems(
    tx: Prisma.TransactionClient,
    projectId: number,
    current: StoredStackItem[],
    next: IProject["stack"],
): Promise<void> {
    const currentById = new Map(current.map((item) => [item.id, item]));
    const removedIds = getRemovedIds(current, next);

    if (removedIds.length > 0) {
        await tx.stackItem.deleteMany({
            where: { projectId, id: { in: removedIds } },
        });
    }

    for (const item of next) {
        const previous = currentById.get(item.id);
        const tooltip = normalizeTooltip(item.tooltip);

        if (!previous) {
            await tx.stackItem.create({
                data: {
                    id: getCreateId(item.id),
                    projectId,
                    name: item.name,
                    icon: item.icon,
                    tooltip,
                },
            });
        } else if (
            previous.name !== item.name ||
            previous.icon !== item.icon ||
            !areEqualJson(previous.tooltip, tooltip)
        ) {
            await tx.stackItem.update({
                where: { id: item.id },
                data: { name: item.name, icon: item.icon, tooltip },
            });
        }
    }
}

async function syncKeyFeatures(
    tx: Prisma.TransactionClient,
    projectId: number,
    current: StoredKeyFeature[],
    next: IProject["keyFeatures"],
): Promise<void> {
    const currentById = new Map(current.map((item) => [item.id, item]));
    const removedIds = getRemovedIds(current, next);

    if (removedIds.length > 0) {
        await tx.keyFeature.deleteMany({
            where: { projectId, id: { in: removedIds } },
        });
    }

    for (const feature of next) {
        const previous = currentById.get(feature.id);
        const data = {
            title: feature.title,
            titleRu: normalizeNullable(feature.titleRu),
            text: feature.text,
            textRu: normalizeNullable(feature.textRu),
            icon: feature.icon,
            photo: feature.photo,
        };

        if (!previous) {
            await tx.keyFeature.create({
                data: { id: getCreateId(feature.id), projectId, ...data },
            });
        } else if (
            previous.title !== data.title ||
            previous.titleRu !== data.titleRu ||
            previous.text !== data.text ||
            previous.textRu !== data.textRu ||
            previous.icon !== data.icon ||
            previous.photo !== data.photo
        ) {
            await tx.keyFeature.update({ where: { id: feature.id }, data });
        }
    }
}

async function syncDescriptions(
    tx: Prisma.TransactionClient,
    projectId: number,
    current: StoredDescription[],
    next: IProject["description"],
): Promise<void> {
    const currentById = new Map(current.map((item) => [item.id, item]));
    const removedIds = getRemovedIds(current, next);

    if (removedIds.length > 0) {
        await tx.descriptionBlock.deleteMany({
            where: { projectId, id: { in: removedIds } },
        });
    }

    for (const description of next) {
        const previous = currentById.get(description.id);
        const data = {
            title: description.title,
            titleRu: normalizeNullable(description.titleRu),
            icon: description.icon,
            content: description.content,
            contentRu: normalizeNullable(description.contentRu),
        };

        if (!previous) {
            await tx.descriptionBlock.create({
                data: { id: getCreateId(description.id), projectId, ...data },
            });
        } else if (
            previous.title !== data.title ||
            previous.titleRu !== data.titleRu ||
            previous.icon !== data.icon ||
            previous.content !== data.content ||
            previous.contentRu !== data.contentRu
        ) {
            await tx.descriptionBlock.update({
                where: { id: description.id },
                data,
            });
        }
    }
}

async function syncMetrics(
    tx: Prisma.TransactionClient,
    projectId: number,
    current: StoredMetric[],
    next: IProject["metrics"],
): Promise<void> {
    const currentById = new Map(current.map((item) => [item.id, item]));
    const removedIds = getRemovedIds(current, next);

    if (removedIds.length > 0) {
        await tx.metric.deleteMany({
            where: { projectId, id: { in: removedIds } },
        });
    }

    for (const metric of next) {
        const previous = currentById.get(metric.id);
        const data = {
            icon: metric.icon,
            title: metric.title,
            titleRu: normalizeNullable(metric.titleRu),
            text: metric.text,
            textRu: normalizeNullable(metric.textRu),
            current:
                typeof metric.current === "string"
                    ? parseFloat(metric.current)
                    : metric.current,
            max: metric.max,
            type: metric.type,
        };

        if (!previous) {
            await tx.metric.create({
                data: { id: getCreateId(metric.id), projectId, ...data },
            });
        } else if (
            previous.icon !== data.icon ||
            previous.title !== data.title ||
            previous.titleRu !== data.titleRu ||
            previous.text !== data.text ||
            previous.textRu !== data.textRu ||
            previous.current !== data.current ||
            previous.max !== data.max ||
            previous.type !== data.type
        ) {
            await tx.metric.update({ where: { id: metric.id }, data });
        }
    }
}

async function syncCommits(
    tx: Prisma.TransactionClient,
    projectId: number,
    current: StoredCommit[],
    next: IProject["commits"],
): Promise<void> {
    const currentById = new Map(current.map((item) => [item.id, item]));
    const removedIds = getRemovedIds(current, next);

    if (removedIds.length > 0) {
        await tx.commit.deleteMany({
            where: { projectId, id: { in: removedIds } },
        });
    }

    for (const [index, commit] of next.entries()) {
        const previous = currentById.get(commit.id);
        const data = {
            name: commit.name,
            nameRu: normalizeNullable(commit.nameRu),
            date: commit.date,
            dateRu: normalizeNullable(commit.dateRu),
            text: commit.text,
            textRu: normalizeNullable(commit.textRu),
            order: index,
        };

        if (!previous) {
            await tx.commit.create({
                data: { id: getCreateId(commit.id), projectId, ...data },
            });
        } else if (
            previous.name !== data.name ||
            previous.nameRu !== data.nameRu ||
            previous.date !== data.date ||
            previous.dateRu !== data.dateRu ||
            previous.text !== data.text ||
            previous.textRu !== data.textRu ||
            previous.order !== data.order
        ) {
            await tx.commit.update({ where: { id: commit.id }, data });
        }
    }
}

export async function createProject(projectData: IProject) {
    await requireAdmin();

    try {
        const newProject = await prisma.project.create({
            data: {
                category: projectData.category,
                name: projectData.name,

                shortDescription: projectData.shortDescription,

                previewDescription: projectData.previewDescription,
                previewDescriptionRu: projectData.previewDescriptionRu,

                date: projectData.date,

                developmentTime: projectData.developmentTime,
                developmentTimeRu: projectData.developmentTimeRu,

                githubLink: projectData.gitHubLink || null,
                demoLink: projectData.demoLink || null,
                numberTeam: projectData.numberTeam,
                teamType: projectData.teamType,

                images: {
                    create: projectData.images.map((img) => ({
                        image: img.image,
                        main: img.main,
                    })),
                },

                stack: {
                    create: projectData.stack.map((item) => ({
                        name: item.name,
                        icon: item.icon,
                        tooltip: item.tooltip
                            ? JSON.parse(JSON.stringify(item.tooltip))
                            : null,
                    })),
                },

                keyFeatures: {
                    create: (projectData.keyFeatures || []).map((feature) => ({
                        title: feature.title,
                        titleRu: feature.titleRu,

                        text: feature.text,
                        textRu: feature.textRu,

                        icon: feature.icon,
                        photo: feature.photo,
                    })),
                },

                description: {
                    create: projectData.description.map((desc) => ({
                        title: desc.title,
                        titleRu: desc.titleRu,

                        icon: desc.icon,

                        content: desc.content,
                        contentRu: desc.contentRu,
                    })),
                },

                metrics: {
                    create: projectData.metrics.map((metric) => ({
                        icon: metric.icon,

                        title: metric.title,
                        titleRu: metric.titleRu,

                        text: metric.text,
                        textRu: metric.textRu,

                        current:
                            typeof metric.current === "string"
                                ? parseFloat(metric.current)
                                : metric.current,
                        max: metric.max,
                        type: metric.type,
                    })),
                },

                commits: {
                    create: projectData.commits.map((commit, index) => ({
                        name: commit.name,
                        nameRu: commit.nameRu || null,
                        date: commit.date,
                        dateRu: commit.dateRu || null,
                        text: commit.text,
                        textRu: commit.textRu || null,
                        order: index,
                    })),
                },
            },

            include: {
                images: true,
                stack: true,
                description: true,
                metrics: true,
                commits: true,
                keyFeatures: true,
            },
        });

        const transformedProject = transformRawProject(newProject);

        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true, project: transformedProject };
    } catch {
        return { success: false, error: "Failed to create project" };
    }
}

function assertUploadOwnership(project: IProject): void {
    for (const value of getProjectAssetValues(project)) {
        if (
            isManageUpload(value) &&
            !isProjectManageUpload(value, project.id)
        ) {
            throw new Error("INVALID_UPLOAD_OWNER");
        }
    }
}

function getProjectAssetValues(project: IProject): string[] {
    return [
        ...project.images.map((item) => item.image),

        ...project.keyFeatures.flatMap((item) => [item.icon, item.photo]),

        ...project.stack.map((item) => item.icon),

        ...project.description.map((item) => item.icon),

        ...project.metrics.map((item) => item.icon),
    ];
}

export async function updateProject(projectData: IProject) {
    await requireAdmin();

    assertUploadOwnership(projectData);

    assertUniqueIds(projectData.images, "image");
    assertUniqueIds(projectData.stack, "stack item");
    assertUniqueIds(projectData.keyFeatures, "key feature");
    assertUniqueIds(projectData.description, "description");
    assertUniqueIds(projectData.metrics, "metric");
    assertUniqueIds(projectData.commits, "commit");

    try {
        const projectId = projectData.id;

        const previousProject = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                images: true,
                stack: true,
                keyFeatures: true,
                description: true,
                metrics: true,
                commits: true,
            },
        });

        if (!previousProject) {
            throw new Error(`Project with id ${projectId} not found`);
        }

        const previousUrls = new Set<string>([
            ...(previousProject?.images.map((item) => item.image) ?? []),

            ...(previousProject?.keyFeatures.flatMap((item) => [
                item.icon,
                item.photo,
            ]) ?? []),

            ...(previousProject?.stack.map((item) => item.icon) ?? []),

            ...(previousProject?.description.map((item) => item.icon) ?? []),

            ...(previousProject?.metrics.map((item) => item.icon) ?? []),
        ]);

        const nextUrls = new Set(getProjectAssetValues(projectData));

        const updatedProject = await prisma.$transaction(async (tx) => {
            const projectFields = {
                category: projectData.category,
                name: projectData.name,
                shortDescription: projectData.shortDescription,
                previewDescription: projectData.previewDescription,
                previewDescriptionRu: normalizeNullable(
                    projectData.previewDescriptionRu,
                ),
                date: projectData.date,
                developmentTime: projectData.developmentTime,
                developmentTimeRu: normalizeNullable(
                    projectData.developmentTimeRu,
                ),
                githubLink: projectData.gitHubLink || null,
                demoLink: projectData.demoLink || null,
                numberTeam: projectData.numberTeam,
                teamType: projectData.teamType,
            };

            if (
                previousProject.category !== projectFields.category ||
                previousProject.name !== projectFields.name ||
                previousProject.shortDescription !== projectFields.shortDescription ||
                previousProject.previewDescription !== projectFields.previewDescription ||
                previousProject.previewDescriptionRu !== projectFields.previewDescriptionRu ||
                previousProject.date !== projectFields.date ||
                previousProject.developmentTime !== projectFields.developmentTime ||
                previousProject.developmentTimeRu !== projectFields.developmentTimeRu ||
                previousProject.githubLink !== projectFields.githubLink ||
                previousProject.demoLink !== projectFields.demoLink ||
                previousProject.numberTeam !== projectFields.numberTeam ||
                previousProject.teamType !== projectFields.teamType
            ) {
                await tx.project.update({
                    where: { id: projectId },
                    data: projectFields,
                });
            }

            await syncImages(tx, projectId, previousProject.images, projectData.images);
            await syncStackItems(tx, projectId, previousProject.stack, projectData.stack);
            await syncKeyFeatures(
                tx,
                projectId,
                previousProject.keyFeatures,
                projectData.keyFeatures,
            );
            await syncDescriptions(
                tx,
                projectId,
                previousProject.description,
                projectData.description,
            );
            await syncMetrics(tx, projectId, previousProject.metrics, projectData.metrics);
            await syncCommits(tx, projectId, previousProject.commits, projectData.commits);

            return await tx.project.findUnique({
                where: { id: projectId },
                include: {
                    images: true,
                    stack: true,
                    keyFeatures: true,
                    description: true,
                    metrics: true,
                    commits: true,
                },
            });
        });

        if (!updatedProject) {
            throw new Error(`Project with id ${projectId} not found`);
        }
        const transformedProject = transformRawProject(updatedProject);

        const removedUrls = [...previousUrls].filter(
            (url) =>
                isProjectManageUpload(url, projectId) && !nextUrls.has(url),
        );

        const deletionResults = await Promise.allSettled(
            removedUrls.map((url) => deleteManagedUpload(url)),
        );

        for (const result of deletionResults) {
            if (result.status === "rejected") {
                console.error(
                    "Failed to delete project upload:",
                    result.reason,
                );
            }
        }

        revalidatePath(`/project/${projectId}`);
        revalidatePath(`/editProject/${projectId}`);
        revalidatePath("/");

        return { success: true, project: transformedProject };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function deleteProject(projectId: number) {
    await requireAdmin();

    try {
        // Сначала связанные поля
        await prisma.projectImage.deleteMany({ where: { projectId } });
        await prisma.stackItem.deleteMany({ where: { projectId } });
        await prisma.keyFeature.deleteMany({ where: { projectId } });
        await prisma.descriptionBlock.deleteMany({ where: { projectId } });
        await prisma.metric.deleteMany({ where: { projectId } });
        await prisma.commit.deleteMany({ where: { projectId } });

        await prisma.project.delete({ where: { id: projectId } });

        revalidatePath(`/project/${projectId}`);
        revalidatePath("/admin");
        revalidatePath(`/editProject/${projectId}`);
        const projectUploadDirectory = path.join(
            uploadConfig.root,
            "projects",
            projectId.toString(),
        );

        await rm(projectUploadDirectory, {
            recursive: true,
            force: true,
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: error };
    }
}
