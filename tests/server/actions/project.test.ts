import { beforeEach, describe, expect, it, vi } from "vitest";
import { join } from "node:path";

import { makeProject } from "../../fixtures/project";

const mocks = vi.hoisted(() => ({
    requireAdmin: vi.fn(),
    revalidatePath: vi.fn(),
    projectCreate: vi.fn(),
    projectFindUnique: vi.fn(),
    projectDelete: vi.fn(),
    transaction: vi.fn(),
    projectImageDeleteMany: vi.fn(),
    stackItemDeleteMany: vi.fn(),
    keyFeatureDeleteMany: vi.fn(),
    descriptionBlockDeleteMany: vi.fn(),
    metricDeleteMany: vi.fn(),
    commitDeleteMany: vi.fn(),
    rm: vi.fn(),
    deleteManagedUpload: vi.fn(),
    transformRawProject: vi.fn(),
}));

vi.mock("next/cache", () => ({
    revalidatePath: mocks.revalidatePath,
}));

vi.mock("@/lib/auth/admin", () => ({
    requireAdmin: mocks.requireAdmin,
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        project: {
            create: mocks.projectCreate,
            findUnique: mocks.projectFindUnique,
            delete: mocks.projectDelete,
        },
        projectImage: {
            deleteMany: mocks.projectImageDeleteMany,
        },
        stackItem: {
            deleteMany: mocks.stackItemDeleteMany,
        },
        keyFeature: {
            deleteMany: mocks.keyFeatureDeleteMany,
        },
        descriptionBlock: {
            deleteMany: mocks.descriptionBlockDeleteMany,
        },
        metric: {
            deleteMany: mocks.metricDeleteMany,
        },
        commit: {
            deleteMany: mocks.commitDeleteMany,
        },
        $transaction: mocks.transaction,
    },
}));

vi.mock("@/lib/transformers/project", () => ({
    transformRawProject: mocks.transformRawProject,
}));

vi.mock("@/lib/uploads/paths", () => ({
    isManageUpload: (value: string) => {
        return value.startsWith("/uploads/");
    },
    isProjectManageUpload: (value: string, projectId: number) => {
        return value.startsWith(`/uploads/${projectId}/`);
    },
}));

vi.mock("@/lib/uploads/deleteUpload", () => ({
    deleteManagedUpload: mocks.deleteManagedUpload,
}));

vi.mock("@/lib/uploads/config", () => ({
    uploadConfig: {
        root: "/tmp/uploads",
        publicPrefix: "/uploads",
        maxImageBytes: 1024,
    },
}));

vi.mock("node:fs/promises", () => ({
    rm: mocks.rm,
}));

import {
    createProject,
    deleteProject,
    updateProject,
} from "@/app/actions/project";

function makeTransactionClient() {
    return {
        project: {
            update: vi.fn().mockResolvedValue(undefined),
            findUnique: vi.fn(),
        },
        projectImage: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        stackItem: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        keyFeature: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        descriptionBlock: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        metric: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
        commit: {
            deleteMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        },
    };
}

function makeStoredProject(overrides: Record<string, unknown> = {}) {
    const project = makeProject();

    return {
        id: project.id,
        category: project.category,
        name: project.name,
        shortDescription: project.shortDescription,
        previewDescription: project.previewDescription,
        previewDescriptionRu: project.previewDescriptionRu,
        date: project.date,
        developmentTime: project.developmentTime,
        developmentTimeRu: project.developmentTimeRu,
        githubLink: project.gitHubLink,
        demoLink: project.demoLink,
        numberTeam: project.numberTeam,
        teamType: project.teamType,
        images: project.images,
        stack: project.stack,
        keyFeatures: project.keyFeatures,
        description: project.description,
        metrics: project.metrics.map((metric) => ({
            ...metric,
            current: Number(metric.current),
        })),
        commits: project.commits,
        ...overrides,
    };
}

describe("project actions", () => {
    beforeEach(() => {
        mocks.requireAdmin.mockResolvedValue({
            user: {
                id: "admin",
                role: "ADMIN",
            },
        });
        mocks.transformRawProject.mockImplementation((value) => value);
        mocks.projectCreate.mockResolvedValue({
            id: 1,
        });
        mocks.deleteManagedUpload.mockResolvedValue(undefined);
        mocks.rm.mockResolvedValue(undefined);
    });

    describe("createProject", () => {
        it("requires an administrator", async () => {
            mocks.requireAdmin.mockRejectedValue(new Error("UNAUTHORIZED"));

            await expect(createProject(makeProject())).rejects.toThrow(
                "UNAUTHORIZED",
            );

            expect(mocks.projectCreate).not.toHaveBeenCalled();
        });

        it("stores localized feature text", async () => {
            const project = makeProject();

            const result = await createProject(project);

            expect(result.success).toBe(true);

            const input = mocks.projectCreate.mock.calls[0][0];

            expect(input.data.keyFeatures.create[0].text).toBe("Feature text");
            expect(input.data.keyFeatures.create[0].textRu).toBe("Feature text ru");
        });

        it("stores localized commits and their order", async () => {
            await createProject(makeProject());

            const input = mocks.projectCreate.mock.calls[0][0];

            expect(input.data.commits.create).toEqual([
                expect.objectContaining({
                    name: "Commit one",
                    nameRu: "Commit one ru",
                    date: "January 2026",
                    dateRu: "January 2026 ru",
                    text: "Commit text",
                    textRu: "Commit text ru",
                    order: 0,
                }),
                expect.objectContaining({
                    name: "Commit two",
                    nameRu: "Commit two ru",
                    date: "February 2026",
                    dateRu: "February 2026 ru",
                    text: "Commit text two",
                    textRu: "Commit text two ru",
                    order: 1,
                }),
            ]);
        });

        it("converts a numeric metric value", async () => {
            await createProject(makeProject());

            const input = mocks.projectCreate.mock.calls[0][0];

            expect(input.data.metrics.create[0].current).toBe(8.5);
        });

        it("returns a safe failure object on database error", async () => {
            mocks.projectCreate.mockRejectedValue(new Error("database failed"));

            const result = await createProject(makeProject());

            expect(result).toEqual({
                success: false,
                error: "Failed to create project",
            });
        });
    });

    describe("updateProject", () => {
        it("rejects an upload owned by another project", async () => {
            const project = makeProject({
                id: 7,
                images: [
                    {
                        id: 1,
                        image: "/uploads/8/gallery/image.webp",
                        main: true,
                    },
                ],
            });

            await expect(updateProject(project)).rejects.toThrow(
                "INVALID_UPLOAD_OWNER",
            );

            expect(mocks.projectFindUnique).not.toHaveBeenCalled();
        });

        it("does not rewrite unchanged commits", async () => {
            const transactionClient = makeTransactionClient();

            transactionClient.project.findUnique.mockResolvedValue(
                makeStoredProject(),
            );

            mocks.projectFindUnique.mockResolvedValue(makeStoredProject());

            mocks.transaction.mockImplementation(async (callback) => {
                return callback(transactionClient);
            });

            const result = await updateProject(makeProject());

            expect(result.success).toBe(true);
            expect(transactionClient.commit.deleteMany).not.toHaveBeenCalled();
            expect(transactionClient.commit.create).not.toHaveBeenCalled();
            expect(transactionClient.commit.update).not.toHaveBeenCalled();
        });

        it("preserves localized metric fields", async () => {
            const transactionClient = makeTransactionClient();

            transactionClient.project.findUnique.mockResolvedValue(
                makeStoredProject({
                    metrics: [
                        {
                            ...makeProject().metrics[0],
                            current: 8.5,
                            title: "Old metric title",
                        },
                    ],
                }),
            );

            mocks.projectFindUnique.mockResolvedValue(
                makeStoredProject({
                    metrics: [
                        {
                            ...makeProject().metrics[0],
                            current: 8.5,
                            title: "Old metric title",
                        },
                    ],
                }),
            );

            mocks.transaction.mockImplementation(async (callback) => {
                return callback(transactionClient);
            });

            await updateProject(makeProject());

            expect(transactionClient.metric.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: expect.objectContaining({
                    title: "Metric title",
                    titleRu: "Metric title ru",
                    text: "Metric text",
                    textRu: "Metric text ru",
                }),
            });
        });

        it("deletes only removed uploads from this project", async () => {
            const transactionClient = makeTransactionClient();

            transactionClient.project.findUnique.mockResolvedValue(
                makeStoredProject({
                    id: 7,
                    images: [
                        {
                            id: 1,
                            image: "/uploads/7/gallery/keep.webp",
                            main: true,
                        },
                    ],
                }),
            );

            mocks.projectFindUnique.mockResolvedValue(makeStoredProject({
                id: 7,
                images: [
                    {
                        id: 2,
                        image: "/uploads/7/gallery/old.webp",
                        main: false,
                    },
                    {
                        id: 1,
                        image: "/uploads/7/gallery/keep.webp",
                        main: true,
                    },
                ],
            }));

            mocks.transaction.mockImplementation(async (callback) => {
                return callback(transactionClient);
            });

            await updateProject(
                makeProject({
                    id: 7,
                    images: [
                        {
                            id: 1,
                            image: "/uploads/7/gallery/keep.webp",
                            main: true,
                        },
                    ],
                }),
            );

            expect(mocks.deleteManagedUpload).toHaveBeenCalledTimes(1);
            expect(mocks.deleteManagedUpload).toHaveBeenCalledWith(
                "/uploads/7/gallery/old.webp",
            );
        });

        it("returns a failure when the transaction fails", async () => {
            mocks.projectFindUnique.mockResolvedValue(makeStoredProject());

            mocks.transaction.mockRejectedValue(
                new Error("transaction failed"),
            );

            const result = await updateProject(makeProject());

            expect(result).toEqual({
                success: false,
                error: "Error: transaction failed",
            });
        });
    });

    describe("deleteProject", () => {
        it("requires an administrator", async () => {
            mocks.requireAdmin.mockRejectedValue(new Error("UNAUTHORIZED"));

            await expect(deleteProject(1)).rejects.toThrow("UNAUTHORIZED");

            expect(mocks.projectDelete).not.toHaveBeenCalled();
        });

        it("deletes all relations and the upload directory", async () => {
            mocks.projectImageDeleteMany.mockResolvedValue(undefined);
            mocks.stackItemDeleteMany.mockResolvedValue(undefined);
            mocks.keyFeatureDeleteMany.mockResolvedValue(undefined);
            mocks.descriptionBlockDeleteMany.mockResolvedValue(undefined);
            mocks.metricDeleteMany.mockResolvedValue(undefined);
            mocks.commitDeleteMany.mockResolvedValue(undefined);
            mocks.projectDelete.mockResolvedValue({
                id: 7,
            });

            const result = await deleteProject(7);

            expect(result).toEqual({
                success: true,
            });
            expect(mocks.projectImageDeleteMany).toHaveBeenCalledWith({
                where: {
                    projectId: 7,
                },
            });
            expect(mocks.commitDeleteMany).toHaveBeenCalledWith({
                where: {
                    projectId: 7,
                },
            });
            expect(mocks.projectDelete).toHaveBeenCalledWith({
                where: {
                    id: 7,
                },
            });
            expect(mocks.rm).toHaveBeenCalledWith(
                join("/tmp/uploads", "projects", "7"),
                {
                    recursive: true,
                    force: true,
                },
            );
        });
    });
});
