'use server';

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { IFooterItem } from "@/interfaces/general";
import { requireAdmin } from "@/lib/auth/admin";



export async function updateFooter(footer: IFooterItem[]) {
    requireAdmin()

    try {
        // Так как количество footer ограниченное (до 10 шт и это количество ТОЧНО расти не будет),
        // то просто "перезатираем"
        // Удаляем всё старое и неактуальное и добавляем новое актуальное
        await prisma.footerItem.deleteMany();

        await prisma.footerItem.createMany({
            data: footer.map(item => ({
                id: item.id,
                text: item.text,
                icon: item.icon,
                link: item.link ?? null
            }))
        })

        revalidatePath('/')
        revalidatePath('/admin')

        return { success: true }
    } catch (error) {
        console.error('Error updating footer', error)
        return { success: false, error: 'Failed to update footer' }        
    }
}
