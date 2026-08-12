'use server';

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Skill } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateSkills(skills: Skill[]) {
    await requireAdmin()

    // Так как количество skills ограниченное (до 10 шт и это количество ТОЧНО расти не будет),
    // то просто "перезатираем"
    // Удаляем всё старое и неактуальное и добавляем новое актуальное

    try {
        await prisma.$transaction(
            async (tx) => {
                await tx.skill.deleteMany()

                await tx.skill.createMany({
                    data: skills.map(
                        (skill) => ({
                            id: skill.id,
                            name: skill.name,
                            score: skill.score,
                        }),
                    ),
                })
            },
        )

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
