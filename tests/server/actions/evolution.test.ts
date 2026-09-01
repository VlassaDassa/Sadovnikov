import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    requireAdmin: vi.fn(),
    revalidatePath: vi.fn(),
    projectFindUnique: vi.fn(),
    projectUpdate: vi.fn(),
    projectCount: vi.fn(),
    transaction: vi.fn(),
    getGithubCommits: vi.fn(),
    generateEvolutionWithGigaChat: vi.fn(),
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
            findUnique: mocks.projectFindUnique,
            update: mocks.projectUpdate,
            count: mocks.projectCount,
        },
        $transaction: mocks.transaction,
    },
}));

vi.mock("@/lib/evolution/getGithubCommits", () => ({
    getGithubCommits: mocks.getGithubCommits,
}));

vi.mock("@/lib/evolution/generateEvolutionWithGigaChat", () => ({
    generateEvolutionWithGigaChat: mocks.generateEvolutionWithGigaChat,
}));

import {
    generateEvolutionDraft,
    publishEvolution,
    saveEvolutionDraft,
} from "@/app/actions/evolution";

const draft = [
    {
        id: "milestone-1",
        name: "Initial release",
        nameRu: "Initial release ru",
        date: "January 2026",
        dateRu: "January 2026 ru",
        text: "A sufficiently long milestone text.",
        textRu: "A sufficiently long milestone text ru.",
        sourceShas: ["abcdef1"],
    },
    {
        id: "milestone-2",
        name: "Second release",
        nameRu: "Second release ru",
        date: "February 2026",
        dateRu: "February 2026 ru",
        text: "Another sufficiently long milestone text.",
        textRu: "Another sufficiently long milestone text ru.",
        sourceShas: ["abcdef2"],
    },
];

describe("evolution actions", () => {
    beforeEach(() => {
        mocks.requireAdmin.mockResolvedValue({
            user: {
                id: "admin",
                role: "ADMIN",
            },
        });
        mocks.projectFindUnique.mockResolvedValue({
            id: 1,
            name: "Project",
            shortDescription: "Short",
            previewDescription: "Preview",
        });
        mocks.projectUpdate.mockResolvedValue({
            id: 1,
        });
        mocks.projectCount.mockResolvedValue(1);
        mocks.getGithubCommits.mockResolvedValue({
            commits: [
                {
                    sha: "abcdef1",
                    message: "Initial commit",
                },
            ],
            totalCommits: 10,
        });
        mocks.generateEvolutionWithGigaChat.mockResolvedValue(draft);

        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-05T07:30:00.000Z"));
    });

    describe("generateEvolutionDraft", () => {
        it("normalizes the repository URL and stores the draft", async () => {
            const result = await generateEvolutionDraft(
                1,
                "  https://github.com/example/project.git  ",
            );

            expect(result).toEqual({
                success: true,
                data: {
                    draft,
                    generatedAt: "2026-08-05T07:30:00.000Z",
                    totalCommits: 10,
                    analyzedCommits: 1,
                },
            });

            expect(mocks.getGithubCommits).toHaveBeenCalledWith(
                "https://github.com/example/project",
            );

            expect(mocks.generateEvolutionWithGigaChat).toHaveBeenCalledWith({
                project: {
                    name: "Project",
                    shortDescription: "Short",
                    previewDescription: "Preview",
                },
                repository: "https://github.com/example/project",
                commits: [
                    {
                        sha: "abcdef1",
                        message: "Initial commit",
                    },
                ],
            });

            expect(mocks.projectUpdate).toHaveBeenCalledWith({
                where: {
                    id: 1,
                },
                data: {
                    githubLink: "https://github.com/example/project",
                    evolutionDraft: draft,
                    evolutionGeneratedAt: new Date("2026-08-05T07:30:00.000Z"),
                },
            });
        });

        it.each([
            [0, "https://github.com/example/project"],
            [1.5, "https://github.com/example/project"],
            [1, "not-a-url"],
        ])(
            "rejects invalid generation input",
            async (projectId, githubLink) => {
                const result = await generateEvolutionDraft(
                    projectId,
                    githubLink,
                );

                expect(result.success).toBe(false);
                expect(mocks.projectFindUnique).not.toHaveBeenCalled();
            },
        );

        it("returns a failure for a missing project", async () => {
            mocks.projectFindUnique.mockResolvedValue(null);

            const result = await generateEvolutionDraft(
                1,
                "https://github.com/example/project",
            );

            expect(result).toEqual({
                success: false,
                error: "Project not found",
            });
            expect(mocks.getGithubCommits).not.toHaveBeenCalled();
        });

        it("does not expose a successful result without admin access", async () => {
            mocks.requireAdmin.mockRejectedValue(new Error("UNAUTHORIZED"));

            const result = await generateEvolutionDraft(
                1,
                "https://github.com/example/project",
            );

            expect(result).toEqual({
                success: false,
                error: "UNAUTHORIZED",
            });
            expect(mocks.projectFindUnique).not.toHaveBeenCalled();
        });

        it("returns an external service error", async () => {
            mocks.getGithubCommits.mockRejectedValue(
                new Error("GitHub rate limit"),
            );

            const result = await generateEvolutionDraft(
                1,
                "https://github.com/example/project",
            );

            expect(result).toEqual({
                success: false,
                error: "GitHub rate limit",
            });
            expect(mocks.projectUpdate).not.toHaveBeenCalled();
        });
    });

    describe("saveEvolutionDraft", () => {
        it("validates and saves a draft", async () => {
            const result = await saveEvolutionDraft(1, draft);

            expect(result).toEqual({
                success: true,
                data: draft,
            });
            expect(mocks.projectUpdate).toHaveBeenCalledWith({
                where: {
                    id: 1,
                },
                data: {
                    evolutionDraft: draft,
                },
            });
        });

        it("rejects an empty draft", async () => {
            const result = await saveEvolutionDraft(1, []);

            expect(result.success).toBe(false);
            expect(mocks.projectCount).not.toHaveBeenCalled();
        });

        it("rejects a missing project", async () => {
            mocks.projectCount.mockResolvedValue(0);

            const result = await saveEvolutionDraft(1, draft);

            expect(result).toEqual({
                success: false,
                error: "Project not found",
            });
            expect(mocks.projectUpdate).not.toHaveBeenCalled();
        });
    });

    describe("publishEvolution", () => {
        it("updates existing commits and creates only new milestones", async () => {
            const transaction = {
                project: {
                    findUnique: vi.fn().mockResolvedValue({
                        id: 1,
                    }),
                    update: vi.fn().mockResolvedValue({
                        id: 1,
                    }),
                },
                commit: {
                    findMany: vi.fn().mockResolvedValue([
                        {
                            id: 10,
                            projectId: 1,
                            name: "Old milestone",
                            nameRu: "Old milestone",
                            date: "Old date",
                            dateRu: "Old date",
                            text: "Old milestone text",
                            textRu: "Old milestone text",
                            order: 0,
                        },
                    ]),
                    deleteMany: vi.fn().mockResolvedValue({
                        count: 1,
                    }),
                    create: vi.fn().mockResolvedValue({ id: 11 }),
                    update: vi.fn().mockResolvedValue({ id: 10 }),
                },
            };

            mocks.transaction.mockImplementation(async (callback) => {
                return callback(transaction);
            });

            const result = await publishEvolution(1, draft);

            expect(result).toEqual({
                success: true,
                data: {
                    publishedCount: 2,
                },
            });

            expect(transaction.commit.deleteMany).not.toHaveBeenCalled();

            expect(transaction.commit.update).toHaveBeenCalledWith({
                where: { id: 10 },
                data: {
                    name: "Initial release",
                    nameRu: "Initial release ru",
                    date: "January 2026",
                    dateRu: "January 2026 ru",
                    text: "A sufficiently long milestone text.",
                    textRu: "A sufficiently long milestone text ru.",
                    order: 0,
                },
            });

            expect(transaction.commit.create).toHaveBeenCalledWith({
                data: [
                    {
                        projectId: 1,
                        name: "Second release",
                        nameRu: "Second release ru",
                        date: "February 2026",
                        dateRu: "February 2026 ru",
                        text: "Another sufficiently long milestone text.",
                        textRu: "Another sufficiently long milestone text ru.",
                        order: 1,
                    },
                ][0],
            });

            expect(transaction.project.update).toHaveBeenCalledWith({
                where: {
                    id: 1,
                },
                data: {
                    evolutionDraft: expect.anything(),
                },
            });

            expect(mocks.revalidatePath).toHaveBeenCalledWith("/", "layout");
        });

        it("rolls back through the transaction on create failure", async () => {
            const transaction = {
                project: {
                    findUnique: vi.fn().mockResolvedValue({
                        id: 1,
                    }),
                    update: vi.fn(),
                },
                commit: {
                    findMany: vi.fn().mockResolvedValue([]),
                    deleteMany: vi.fn(),
                    create: vi.fn().mockRejectedValue(new Error("create failed")),
                    update: vi.fn(),
                },
            };

            mocks.transaction.mockImplementation(async (callback) => {
                return callback(transaction);
            });

            const result = await publishEvolution(1, draft);

            expect(result).toEqual({
                success: false,
                error: "create failed",
            });
            expect(transaction.project.update).not.toHaveBeenCalled();
            expect(mocks.revalidatePath).not.toHaveBeenCalled();
        });

        it("rejects a missing project", async () => {
            const transaction = {
                project: {
                    findUnique: vi.fn().mockResolvedValue(null),
                    update: vi.fn(),
                },
                commit: {
                    findMany: vi.fn(),
                    deleteMany: vi.fn(),
                    create: vi.fn(),
                    update: vi.fn(),
                },
            };

            mocks.transaction.mockImplementation(async (callback) => {
                return callback(transaction);
            });

            const result = await publishEvolution(1, draft);

            expect(result).toEqual({
                success: false,
                error: "Project not found",
            });
            expect(transaction.commit.deleteMany).not.toHaveBeenCalled();
        });
    });
});
