import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest"

vi.mock("@/lib/auth/admin", () => ({
    requireAdmin: vi.fn().mockResolvedValue({
        user: {
            id: "admin",
            role: "ADMIN",
        },
    }),
}))

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}))

import {
    createProject,
    updateProject,
} from "@/app/actions/project"
import prisma from "@/lib/prisma"

import { makeProject } from "../fixtures/project"
import { resetDatabase } from "../helpers/resetDatabase"

describe("project persistence", () => {
    beforeEach(async () => {
        await resetDatabase()
    })

    it("persists every localized project field", async () => {
        const result = await createProject(
            makeProject(),
        )

        expect(result.success).toBe(true)

        const project = await prisma.project.findFirst({
            include: {
                keyFeatures: true,
                metrics: true,
                commits: {
                    orderBy: {
                        order: "asc",
                    },
                },
            },
        })

        expect(project).not.toBeNull()
        expect(
            project?.keyFeatures[0].textRu,
        ).toBe("Feature text ru")
        expect(
            project?.metrics[0].titleRu,
        ).toBe("Metric title ru")
        expect(
            project?.metrics[0].textRu,
        ).toBe("Metric text ru")
        expect(project?.commits).toEqual([
            expect.objectContaining({
                nameRu: "Commit one ru",
                dateRu: "January 2026 ru",
                textRu: "Commit text ru",
                order: 0,
            }),
            expect.objectContaining({
                nameRu: "Commit two ru",
                dateRu: "February 2026 ru",
                textRu: "Commit text two ru",
                order: 1,
            }),
        ])
    })

    it("replaces commits without duplication", async () => {
        const created = await createProject(
            makeProject(),
        )

        expect(created.success).toBe(true)

        const project = await prisma.project.findFirst()

        expect(project).not.toBeNull()

        const updateData = makeProject({
            id: project!.id,
        })

        const firstUpdate =
            await updateProject(updateData)
        const secondUpdate =
            await updateProject(updateData)

        expect(firstUpdate.success).toBe(true)
        expect(secondUpdate.success).toBe(true)

        const commits = await prisma.commit.findMany({
            where: {
                projectId: project!.id,
            },
            orderBy: {
                order: "asc",
            },
        })

        expect(commits).toHaveLength(2)
        expect(
            commits.map((commit) => commit.order),
        ).toEqual([
            0,
            1,
        ])
    })

    it("keeps localized metrics after update", async () => {
        const created = await createProject(
            makeProject(),
        )

        expect(created.success).toBe(true)

        const project = await prisma.project.findFirst()

        expect(project).not.toBeNull()

        const result = await updateProject(
            makeProject({
                id: project!.id,
                metrics: [
                    {
                        id: 1,
                        icon: "/static/new-metric.svg",
                        title: "Updated metric",
                        titleRu:
                            "Updated metric ru",
                        text:
                            "Updated metric text",
                        textRu:
                            "Updated metric text ru",
                        current: 5,
                        max: 10,
                        type: "score",
                    },
                ],
            }),
        )

        expect(result.success).toBe(true)

        const metric = await prisma.metric.findFirst({
            where: {
                projectId: project!.id,
            },
        })

        expect(metric).toMatchObject({
            title: "Updated metric",
            titleRu: "Updated metric ru",
            text: "Updated metric text",
            textRu: "Updated metric text ru",
        })
    })

    it("rolls back a failed project update", async () => {
        const created = await createProject(
            makeProject(),
        )

        expect(created.success).toBe(true)

        const project = await prisma.project.findFirst({
            include: {
                metrics: true,
            },
        })

        expect(project).not.toBeNull()

        const result = await updateProject(
            makeProject({
                id: project!.id,
                name: "Broken update",
                metrics: [
                    {
                        id: 1,
                        icon: "/static/metric.svg",
                        title: "Metric",
                        titleRu: "Metric ru",
                        text: "Metric text",
                        textRu: "Metric text ru",
                        current: "not-a-number",
                        max: 10,
                        type: "score",
                    },
                ],
            }),
        )

        expect(result.success).toBe(false)

        const persisted =
            await prisma.project.findUnique({
                where: {
                    id: project!.id,
                },
                include: {
                    metrics: true,
                },
            })

        expect(persisted?.name).toBe(
            "Test project",
        )
        expect(
            persisted?.metrics,
        ).toHaveLength(1)
        expect(
            persisted?.metrics[0].current,
        ).toBe(8.5)
    })
})