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

import { publishEvolution } from "@/app/actions/evolution"
import prisma from "@/lib/prisma"

import { resetDatabase } from "../helpers/resetDatabase"

const draft = [
    {
        id: "milestone-1",
        name: "Initial release",
        nameRu: "Initial release ru",
        date: "January 2026",
        dateRu: "January 2026 ru",
        text:
            "A sufficiently long milestone text.",
        textRu:
            "A sufficiently long milestone text ru.",
        sourceShas: [
            "abcdef1",
        ],
    },
    {
        id: "milestone-2",
        name: "Second release",
        nameRu: "Second release ru",
        date: "February 2026",
        dateRu: "February 2026 ru",
        text:
            "Another sufficiently long milestone text.",
        textRu:
            "Another sufficiently long milestone text ru.",
        sourceShas: [
            "abcdef2",
        ],
    },
]

describe("evolution persistence", () => {
    beforeEach(async () => {
        await resetDatabase()
    })

    it("publishes milestones in order and clears the draft", async () => {
        const project = await prisma.project.create({
            data: {
                category: "Web",
                name: "Project",
                shortDescription: "Short",
                previewDescription: "Preview",
                date: "2026",
                developmentTime: "Two months",
                numberTeam: 1,
                teamType: "Solo",
                evolutionDraft: draft,
                commits: {
                    create: {
                        name: "Old",
                        date: "Old",
                        text: "Old commit text",
                        order: 0,
                    },
                },
            },
        })

        const result = await publishEvolution(
            project.id,
            draft,
        )

        expect(result).toEqual({
            success: true,
            data: {
                publishedCount: 2,
            },
        })

        const persisted =
            await prisma.project.findUnique({
                where: {
                    id: project.id,
                },
                include: {
                    commits: {
                        orderBy: {
                            order: "asc",
                        },
                    },
                },
            })

        expect(
            persisted?.evolutionDraft,
        ).toBeNull()
        expect(
            persisted?.commits,
        ).toHaveLength(2)
        expect(
            persisted?.commits.map(
                (commit) => ({
                    name: commit.name,
                    nameRu: commit.nameRu,
                    order: commit.order,
                }),
            ),
        ).toEqual([
            {
                name: "Initial release",
                nameRu:
                    "Initial release ru",
                order: 0,
            },
            {
                name: "Second release",
                nameRu:
                    "Second release ru",
                order: 1,
            },
        ])
    })

    it("does not create duplicates after repeated publication", async () => {
        const project = await prisma.project.create({
            data: {
                category: "Web",
                name: "Project",
                shortDescription: "Short",
                previewDescription: "Preview",
                date: "2026",
                developmentTime: "Two months",
                numberTeam: 1,
                teamType: "Solo",
            },
        })

        await publishEvolution(
            project.id,
            draft,
        )
        await publishEvolution(
            project.id,
            draft,
        )

        const count = await prisma.commit.count({
            where: {
                projectId: project.id,
            },
        })

        expect(count).toBe(2)
    })
})