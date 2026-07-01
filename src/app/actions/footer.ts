'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { IFooterItem } from "@/interfaces/general";



export async function updateFooter(footer: IFooterItem[]) {
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
