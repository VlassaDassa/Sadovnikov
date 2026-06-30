'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Skill } from "@/interfaces/general";



export async function updateSkills(skills: Skill[]) {
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
