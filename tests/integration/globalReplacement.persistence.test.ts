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

import { updateStack } from "@/app/actions/stack"
import prisma from "@/lib/prisma"

import { resetDatabase } from "../helpers/resetDatabase"

describe("global replacement persistence", () => {
    beforeEach(async () => {
        await resetDatabase()

        await prisma.stack.create({
            data: {
                name: "Existing stack",
            },
        })
    })

    it("keeps old data when replacement fails", async () => {
        const result = await updateStack([
            {
                id: 1001,
                name: "Duplicate",
            },
            {
                id: 1002,
                name: "Duplicate",
            },
        ])

        expect(result.success).toBe(false)

        const stack = await prisma.stack.findMany({
            orderBy: {
                id: "asc",
            },
        })

        expect(stack).toEqual([
            expect.objectContaining({
                name: "Existing stack",
            }),
        ])
    })

    it("replaces data after successful authorization", async () => {
        const result = await updateStack([
            {
                id: 1001,
                name: "Vitest",
            },
            {
                id: 1002,
                name: "Playwright",
            },
        ])

        expect(result).toEqual({
            success: true,
        })

        const stack = await prisma.stack.findMany({
            orderBy: {
                id: "asc",
            },
        })

        expect(
            stack.map((item) => item.name),
        ).toEqual([
            "Vitest",
            "Playwright",
        ])
    })
})