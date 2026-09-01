'use server';

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Skill } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateSkills(skills: Skill[]) {
    await requireAdmin()

    try {
        if (new Set(skills.map((skill) => skill.id)).size !== skills.length) {
            throw new Error("Duplicate skill ids are not allowed")
        }

        await prisma.$transaction(async (tx) => {
            const current = await tx.skill.findMany()
            const currentById = new Map(current.map((skill) => [skill.id, skill]))
            const nextIds = new Set(skills.map((skill) => skill.id))
            const removedIds = current
                .filter((skill) => !nextIds.has(skill.id))
                .map((skill) => skill.id)

            if (removedIds.length > 0) {
                await tx.skill.deleteMany({ where: { id: { in: removedIds } } })
            }

            return Promise.all(skills.map((skill, order) => {
                const previous = currentById.get(skill.id)
                const data = { name: skill.name, score: skill.score, order }

                if (!previous) {
                    return tx.skill.create({ data: { id: skill.id, ...data } })
                }

                if (
                    previous.name !== data.name ||
                    previous.score !== data.score ||
                    previous.order !== data.order
                ) {
                    return tx.skill.update({ where: { id: skill.id }, data })
                }

                return previous
            }))
        })

        revalidatePath("/")
        revalidatePath("/admin")

        return {
            success: true,
        }
    } catch {
        return {
            success: false,
            error: "Failed to update skills",
        }
    }
}
