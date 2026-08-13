'use server';

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { Stack } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateStack(stack: Stack[]) {
    await requireAdmin()

    try {
        // Так как количество stack ограниченное (до 10 шт и это количество ТОЧНО расти не будет),
        // то просто "перезатираем"
        // Удаляем всё старое и неактуальное и добавляем новое актуальное

        await prisma.$transaction(
            async (tx) => {
                await tx.stack.deleteMany();

                await tx.stack.createMany({
                    data: stack.map(stack => ({
                        id: stack.id,
                        name: stack.name,
                    }))
                })
            }
        )

        revalidatePath('/')
        revalidatePath('/admin')

        return { success: true }
    } catch {
        return { success: false, error: 'Failed to update stack' }        
    }
}
