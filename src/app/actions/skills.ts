'use server';

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Skill } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateSkills(skills: Skill[]) {
    requireAdmin()

    try {
        // Так как количество skills ограниченное (до 10 шт и это количество ТОЧНО расти не будет),
        // то просто "перезатираем"
        // Удаляем всё старое и неактуальное и добавляем новое актуальное

        await prisma.skill.deleteMany();

        await prisma.skill.createMany({
            data: skills.map(skill => ({
                id: skill.id,
                name: skill.name,
                score: skill.score
            }))
        })

        revalidatePath('/')
        revalidatePath('/admin')

        return { success: true }
    } catch (error) {
        console.error('Error updating skills', error)
        return { success: false, error: 'Failed to update skills' }        
    }
}
